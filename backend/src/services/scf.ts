
// SCF logic ported from frontend
export function runSCF(capitalInvestmentUSD: number, localLaborShare = 0.5, supplyChainLocalMultiplier = 1.8, years = 5) {
  const directJobs = Math.round(capitalInvestmentUSD / 100000 * (0.7 + localLaborShare));
  const indirectJobs = Math.round(directJobs * supplyChainLocalMultiplier);
  const inducedJobs = Math.round((directJobs + indirectJobs) * 0.6);
  const totalEconomicImpactUSD = Math.round(capitalInvestmentUSD * (1 + supplyChainLocalMultiplier * 0.6 + 0.5));
  const annualizedImpact = Math.round(totalEconomicImpactUSD / years);

  return { directJobs, indirectJobs, inducedJobs, totalEconomicImpactUSD, annualizedImpact };
}
