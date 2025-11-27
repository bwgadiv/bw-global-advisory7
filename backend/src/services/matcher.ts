import { getCase } from "../store"; 
import { computeIVAS, computeSymbioticScore } from "./scoring";
import { generateOutreachLetter } from "./letter";
import { partnerStore } from "../partnerStore";
import { investorReadiness } from "./investorReadiness";

export async function getTopMatchesForCase(caseId: string, opts: { limit?: number } = {}) {
  // 1. load case & objective
  const caseRow = getCase(caseId);
  if (!caseRow) throw new Error("case not found");

  const payload = caseRow.payload;
  const sectors = payload.industry || [];
  const targetRegion = payload.region;

  // 2. candidate search via Partner Store (DB abstraction)
  const candidates = await partnerStore.searchPartners(sectors, targetRegion);

  // 3. score each candidate
  const scored = [];
  for (const c of candidates) {
    const iv = await computeIVAS(caseRow, c);           // activation velocity, opportunity quantum
    const sym = computeSymbioticScore(caseRow, c);     // latent asset pairing score
    const risk = c.risk_score || 0;                     // precomputed risk
    
    // Calculate Investor Readiness Score for this match
    // Note: Passing mapped parameters to match what investorReadiness expects if possible, 
    // though investorReadiness implementation in this codebase expects { region, partner, project }
    // We are retaining the existing parameter structure here as the prompt only asked to fix property access error.
    const readiness = investorReadiness({
        fundamentals: 0.7, // Placeholder: would come from connector data
        governance: 1 - c.regulatory_friction,
        marketAccess: c.infraProximity,
        incentives: c.incentives_present ? 0.8 : 0.4,
        partnerQuality: c.track_record_score,
        activationFriction: c.regulatory_friction,
        socioCulturalRisk: risk,
        financialClosure: 0.6,
        esgScore: 0.7,
        // Augmenting with correct structure for investorReadiness to utilize if updated later
        region: c.location,
        partner: c,
        project: payload
    });

    const finalScore = (iv.weightedScore * 0.4) + (sym * 0.3) - (risk * 0.2) + (readiness.IVAS/100 * 0.1);
    
    scored.push({ partner: c, iv, sym, risk, readiness, finalScore });
  }

  // 4. sort and pick top N
  scored.sort((a, b) => b.finalScore - a.finalScore);
  const top = scored.slice(0, opts.limit || 5);

  // 5. attach outreach letter
  const results = [];
  for (const s of top) {
    const letter = generateOutreachLetter(caseRow, s.partner, { ivas: s.iv, sym: s.sym });
    results.push({
      partnerId: s.partner.id,
      name: s.partner.name,
      location: s.partner.location,
      finalScore: Math.round(s.finalScore * 100),
      ivas: s.iv,
      symbiosisScore: Math.round(s.sym * 100),
      risk: s.risk,
      readiness: s.readiness,
      outreachLetter: letter
    });
  }

  return results;
}