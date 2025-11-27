
// Rudimentary IVAS score calculation ported from frontend
export function computeIVAS(asset: any, context: { regionAmbition?: number, regulatoryFriction?: number }): any {
  const opportunityQuantum = Math.min(100, Math.log1p(asset.marketEstimateUSD) * 10);
  const symbioticConfidence = Math.min(100, (context.regionAmbition ?? 50) + (asset.synergyScore * 5));
  const activationFriction = Math.min(100, (context.regulatoryFriction ?? 40));

  const ivasScore = Math.round(
    0.45 * opportunityQuantum +
    0.4 * symbioticConfidence +
    0.15 * (100 - activationFriction)
  );

  const activationMonths = Math.max(6, Math.round(48 * (activationFriction / 100)));

  const rationale = `IVAS combines opportunity ($${asset.marketEstimateUSD}), local confidence (${Math.round(symbioticConfidence)}), and friction (${Math.round(activationFriction)}).`;

  return {
    ivasScore,
    activationMonths,
    breakdown: {
      opportunityQuantum: Math.round(opportunityQuantum),
      symbioticConfidence: Math.round(symbioticConfidence),
      activationFriction: Math.round(activationFriction),
    },
    rationale
  };
}
