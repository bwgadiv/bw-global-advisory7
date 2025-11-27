
import { readPolicy } from "./policyStore";
import { pepLookup } from "./services/pepService";

export type EthicsFlag = "BLOCK" | "CAUTION" | "OK";

export type EthicsReport = {
  overallScore: number; // 0-100 (higher = lower risk)
  overallFlag: EthicsFlag;
  breakdown: {
    sanctionsScore: number;
    pepScore: number;
    corruptionScore: number;
    envScore: number;
    humanRightsScore: number;
  };
  flags: { name: string; flag: EthicsFlag; reason: string; evidence?: string[] }[];
  mitigation: { step: string; detail: string }[];
  timestamp: string;
  version: string;
};

const ENGINE_VERSION = "ethics-v2.0.0-blueprint";

// Checks
async function checkSanctionsAndPEP(targetNames: string[]): Promise<{ risk: number; evidence: string[]; isBlock: boolean }> {
  const evidence: string[] = [];
  let maxRisk = 0;
  let isBlock = false;
  
  for (const name of targetNames) {
    const pepRes = await pepLookup(name);
    if (pepRes.matched) {
        // Simulate Sanctions Check vs PEP Check differentiation
        // In real system, provider returns type. Here we use score.
        // Score > 0.8 implies Sanction (BLOCK), Score > 0.1 implies PEP (CAUTION)
        if (pepRes.score > 0.8) {
            evidence.push(`SANCTION MATCH: "${name}"`);
            isBlock = true;
            maxRisk = 1.0;
        } else {
            evidence.push(`PEP MATCH: "${name}"`);
            maxRisk = Math.max(maxRisk, 0.5);
        }
    }
  }
  return { risk: maxRisk, evidence, isBlock };
}

async function checkCorruptionIndicators(context: any): Promise<{ risk: number; evidence: string[] }> {
  const evidence: string[] = [];
  let risk = 0;
  // Blueprint Rule: CPI < 40 => CAUTION
  // We mock CPI lookup based on region string
  const region = context.project?.region || "";
  let cpi = 50; // Default safe
  if (region.includes("Emerging") || region.includes("Africa") || region.includes("Latin America")) {
      cpi = 35; // Mock low CPI
  }

  if (cpi < 40) {
      evidence.push(`Regional CPI (${cpi}) below threshold (<40)`);
      risk = 0.6;
  }
  
  return { risk, evidence };
}

async function checkEnvironmentalRisk(context: any): Promise<{ risk: number; evidence: string[] }> {
  const evidence: string[] = [];
  let risk = 0;
  if (context && context.project && context.project.industry) {
    const industry = context.project.industry.toLowerCase();
    // Blueprint Rule: High Risk Industry w/o Mitigation => BLOCK? Or High Risk
    if (["mining", "oil", "gas", "defense", "extraction"].some(x => industry.includes(x))) {
      evidence.push(`High-impact industry detected: ${context.project.industry}`);
      risk = 0.8;
    }
  }
  return { risk, evidence };
}

export async function runEthicsChecks(casePayload: any): Promise<EthicsReport> {
  const targetNames: string[] = [];
  if (casePayload.context && casePayload.context.target) {
      targetNames.push(casePayload.context.target);
  }

  const context = casePayload.context || { project: {} };

  const [sanctionsRes, corruptionRes, envRes] = await Promise.all([
    checkSanctionsAndPEP(targetNames),
    checkCorruptionIndicators(context),
    checkEnvironmentalRisk(context)
  ]);

  // Scoring: 100 = No Risk, 0 = Max Risk
  const sanctionsScore = Math.round((1 - sanctionsRes.risk) * 100);
  const corruptionScore = Math.round((1 - corruptionRes.risk) * 100);
  const envScore = Math.round((1 - envRes.risk) * 100);
  const humanRightsScore = 100; // Placeholder
  const pepScore = sanctionsScore;

  // Logic Aggregation
  let overallFlag: EthicsFlag = "OK";
  const flags = [];

  // 1. BLOCK RULES
  if (sanctionsRes.isBlock) {
      overallFlag = "BLOCK";
      flags.push({ name: "Sanctions", flag: "BLOCK" as EthicsFlag, reason: "Target appears on sanctions list.", evidence: sanctionsRes.evidence });
  }
  // Check High Risk Industry without Mitigation (Mock check for uploaded doc)
  if (envRes.risk > 0.7 && !casePayload.uploadedDocument) {
       // If risk is high and no docs, maybe BLOCK or CAUTION. Blueprint says BLOCK if no mitigation.
       // We'll treat "uploadedDocument" as mitigation presence for MVP.
       overallFlag = "BLOCK";
       flags.push({ name: "High-Risk Industry", flag: "BLOCK" as EthicsFlag, reason: "High-risk sector without mitigation documentation.", evidence: envRes.evidence });
  }

  // 2. CAUTION RULES (Only if not already blocked)
  if (overallFlag !== "BLOCK") {
      if (corruptionRes.risk > 0.5) {
          overallFlag = "CAUTION";
          flags.push({ name: "Corruption Risk", flag: "CAUTION" as EthicsFlag, reason: "CPI below threshold.", evidence: corruptionRes.evidence });
      }
      if (sanctionsRes.risk > 0 && !sanctionsRes.isBlock) { // PEP
          overallFlag = "CAUTION";
          flags.push({ name: "PEP Detected", flag: "CAUTION" as EthicsFlag, reason: "Politically Exposed Person identified.", evidence: sanctionsRes.evidence });
      }
  }

  // Calculate Overall Score (Weighted)
  const overallScore = Math.round(
      (sanctionsScore * 0.4) + 
      (corruptionScore * 0.3) + 
      (envScore * 0.3)
  );

  const mitigation: { step: string; detail: string }[] = [];
  if (overallFlag === "BLOCK") {
    mitigation.push({ step: "STOP WORK", detail: "Mandatory ethics committee review required." });
    mitigation.push({ step: "Enhanced Due Diligence", detail: "Request UBO and source of funds declaration." });
  } else if (overallFlag === "CAUTION") {
    mitigation.push({ step: "Senior Sign-off", detail: "Requires approval from Regional Director." });
    mitigation.push({ step: "ABC Provisions", detail: "Include stringent Anti-Bribery clauses in contracts." });
  } else {
    mitigation.push({ step: "Standard Monitoring", detail: "Annual compliance review." });
  }

  return {
    overallScore,
    overallFlag,
    breakdown: {
        sanctionsScore, pepScore, corruptionScore, envScore, humanRightsScore
    },
    flags,
    mitigation,
    timestamp: new Date().toISOString(),
    version: ENGINE_VERSION
  };
}
