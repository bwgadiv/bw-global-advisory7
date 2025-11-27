
/**
 * investorReadiness(payload)
 * Input: { region: string, partner?: object, project?: object }
 * Output: Detailed scoring object including IVAS, Opportunity Quantum, Confidence Intervals.
 */

function clamp(n: number, a = 0, b = 100) { return Math.max(a, Math.min(b, n)); }

export function investorReadiness(payload: any) {
  const { region, partner, project } = payload || {};
  
  // 1) Opportunity Quantum: estimate by sector
  const sector = (project?.industry || (partner?.sectors && partner.sectors[0]) || "generic").toLowerCase();
  const sectorBase: Record<string, number> = {
    agritech: 20_000_000,
    aquaculture: 15_000_000,
    manufacturing: 50_000_000,
    electronics: 70_000_000,
    logistics: 10_000_000,
    energy: 100_000_000,
    generic: 5_000_000
  };
  
  // Partial match logic for sector base
  let OpportunityQuantum = sectorBase.generic;
  for (const key in sectorBase) {
      if (sector.includes(key)) {
          OpportunityQuantum = sectorBase[key];
          break;
      }
  }

  // 2) SymbioticConfidence: heuristics combining region stability, partner size and incentives
  let regionStability = 60;
  if (typeof region === "string") {
    const r = region.toUpperCase();
    if (r.includes("PH") || r.includes("PHILIPPINES")) regionStability = 58;
    if (r.includes("VN") || r.includes("VIETNAM")) regionStability = 65;
    if (r.includes("US") || r.includes("USA")) regionStability = 90;
    if (r.includes("EU") || r.includes("UK") || r.includes("GERMANY")) regionStability = 85;
  }

  const partnerScore = partner ? (partner.size === "large" ? 70 : partner.size === "medium" ? 60 : 45) : 50;
  const incentiveBoost = (project?.requiredIncentives && project.requiredIncentives.length) ? 5 : 0;

  const SymbioticConfidence = clamp(Math.round((regionStability * 0.6) + (partnerScore * 0.3) + incentiveBoost));

  // 3) Activation Velocity (Time Factor)
  // Converted to a score: 18 months = 50, 6 months = 90
  let timelineMonths = 18;
  if (partner && partner.size === "large") timelineMonths = 12;
  if (project?.timelineMonths) timelineMonths = Math.min(timelineMonths, project.timelineMonths);
  
  // 0-100 score where lower months is better. Map 36mo->0, 0mo->100
  const VelocityScore = clamp(Math.round(100 - (timelineMonths / 36 * 100)));

  // 4) IVAS Formula: (Quantum * 0.45) + (Confidence * 0.45) + (Velocity * 0.1)
  // Normalize OpportunityQuantum into 0-100 by log scale (log10(100M) = 8)
  const qNorm = Math.log10(Math.max(1, OpportunityQuantum)) / 8 * 100; 
  
  const IVAS = clamp(Math.round(
      (qNorm * 0.45) + 
      (SymbioticConfidence * 0.45) + 
      (VelocityScore * 0.10)
  ));

  // 5) Uncertainty: base on data sparsity
  let dataSparsity = 20; 
  if (!partner) dataSparsity += 25;
  if (!project || !project.industry) dataSparsity += 20;
  
  const UncertaintyMonths = Math.ceil((dataSparsity / 10) * 3); 

  const uncertaintyFactor = clamp((UncertaintyMonths / 24) * 100, 0, 100); 
  const band = Math.round((uncertaintyFactor / 100) * 20); 

  const CI = { low: clamp(IVAS - band), high: clamp(IVAS + band) };

  // 6) Flags
  const flags = {
    ethicalRisk: false,
    sanctions: false,
    bankingRisk: false
  };
  
  if (partner?.metadata?.alerts) {
      if (partner.metadata.alerts.includes("sanction")) flags.sanctions = true;
      if (partner.metadata.alerts.includes("pe")) flags.ethicalRisk = true;
  }

  return {
    IVAS,
    OpportunityQuantum,
    SymbioticConfidence,
    ActivationVelocityMonths: timelineMonths,
    UncertaintyMonths,
    CI,
    flags,
    humanReadable: `${IVAS}%`
  };
}
