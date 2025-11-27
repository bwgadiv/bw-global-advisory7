import fs from 'fs';
import path from 'path';
import { identifyLatentAssets } from './lai';
import { computeIVAS } from './ivas';
import { runSCF } from './scf';
import { searchPartners } from './partnerConnector';
import { getEntityRating } from './ratings';
import { assembleNSIL } from './nsilProcessor';
import { generateSummary } from './llmWrapper';
import { extractTextFromPath } from './fileIngest';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Ensure we point to the correct data directory relative to built files or source
const DATA_DIR = path.join(__dirname, "../../data");
if (!fs.existsSync(DATA_DIR)) {
    try { fs.mkdirSync(DATA_DIR, { recursive: true }); } catch (e) {}
}
const STORE_FILE = path.join(DATA_DIR, "data_store.json");

type Job = { type: string; caseId: string; payload: any; storePath: string };

const queue: Job[] = [];
let processing = false;

function persistStore(storePath: string, storeObj: any) {
  try { fs.writeFileSync(storePath, JSON.stringify(storeObj, null, 2), 'utf8'); } catch(e) { console.warn('persist failed', e); }
}

export async function enqueueJob(job: Job) {
  queue.push(job);
  setTimeout(processNext, 0);
  return Promise.resolve();
}

async function processNext() {
  if (processing) return;
  const job = queue.shift();
  if (!job) return;
  processing = true;
  try {
    if (job.type === 'orchestrate') {
      await orchestrateCase(job);
    }
  } catch (e) {
    console.error('orchestrator job error', e);
  }
  processing = false;
  if (queue.length > 0) setTimeout(processNext, 0);
}

async function orchestrateCase(job: Job) {
  const { caseId, payload, storePath } = job;
  // Fallback to local constant path if storePath not provided or valid
  const effectiveStorePath = storePath || STORE_FILE;
  
  let store: any = {};
  try { 
      if (fs.existsSync(effectiveStorePath)) {
          store = JSON.parse(fs.readFileSync(effectiveStorePath, 'utf8')); 
      }
  } catch (e) { 
      store = { cases: {}, matches: {}, nsil_reports: {} }; 
  }
  
  if (!store.cases) store.cases = {};
  if (!store.matches) store.matches = {};
  if (!store.nsil_reports) store.nsil_reports = {};

  const region = payload.region || { name: payload.regionName || 'Global - Unspecified', rawFeatures: payload.rawFeatures || [] };

  // If a file path was provided, ingest it
  let briefingText = '';
  if (payload.briefingFilePath) {
    const ing = extractTextFromPath(payload.briefingFilePath);
    briefingText = ing.ok ? ing.text || '' : '';
  }

  // If briefing text exists, run summary via LLM wrapper (fallbacks handled inside)
  let briefingSummary = '';
  if (briefingText && briefingText.length > 0) {
    const sum = await generateSummary(briefingText, 6);
    briefingSummary = sum.text || briefingText.slice(0, 800);
  }

  // Run LAI heuristics
  const lais = identifyLatentAssets(region);

  const top = lais[0] || null;
  let ivas = null, scf = null;
  if (top) {
    ivas = computeIVAS(top, { regionAmbition: payload.regionAmbition || 60, regulatoryFriction: payload.regulatoryFriction || 40 });
    scf = runSCF(Math.max(1000000, (top.marketEstimateUSD || 100000)));
  }

  // Partner search via neutral connector
  const partners = await searchPartners({ region: region.name, sector: payload.sector, maxResults: 10 });

  // assemble matches
  const matches: any[] = [];
  if (top) {
    matches.push({ 
        matchType: 'baseline', 
        title: top.title, 
        location: region.name, 
        entityName: `${region.name} Local Authority`, 
        entityType: 'government', 
        score: Math.min(100, 50 + Math.round((ivas ? ivas.ivasScore : 50) / 1.2)), 
        incentives: 'TBD', 
        velocity: `${Math.max(6, Math.round((ivas ? ivas.activationMonths : 12)))} months` 
    });
  }
  partners.forEach((p: any) => matches.push({ 
      matchType: 'partner', 
      title: p.name, 
      entityName: p.name, 
      entityType: p.type, 
      score: p.score || 60, 
      incentives: p.notes || '' 
  }));

  // Build ratings
  const matchesWithRatings = matches.map(m => ({ match: m, rating: getEntityRating(m.entityName, m.entityType) }));

  // Build NSIL (structured)
  const nsil = assembleNSIL(caseId, payload, lais, ivas, scf, matchesWithRatings);
  
  store.cases[caseId] = { id: caseId, payload, status: 'done', createdAt: new Date().toISOString(), briefingSummary };
  store.matches[caseId] = matchesWithRatings;
  store.nsil_reports[caseId] = nsil.xml;
  
  persistStore(effectiveStorePath, store);
}

export const orchestrator = { processNext, enqueueJob };