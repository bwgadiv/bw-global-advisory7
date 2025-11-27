
// simplified IVAS stub: returns weighted values
export async function computeIVAS(caseRow: any, partner: any) {
  // Opportunity Quantum: match on sector size + partner capacity (0..1)
  // Mocking marketSizeIndex from caseRow if not present
  const marketSizeIndex = 0.8; 
  const opportunityQuantum = Math.min(1, (partner.capacity_index || 0.5) * marketSizeIndex);

  // Symbiotic Confidence: partner history + gov incentives presence (0..1)
  const symConfidence = Math.min(1, (partner.track_record_score || 0.5) + ((partner.incentives_present) ? 0.2 : 0));

  // Activation Velocity: regulatory friction estimate inversely scaled (0..1)
  const activationVelocity = Math.max(0.01, 1 - (partner.regulatory_friction || 0.4));

  // Weighted composite
  const weightedScore = (opportunityQuantum * 0.5) + (symConfidence * 0.3) + (activationVelocity * 0.2);

  return {
    opportunityQuantum,
    symConfidence,
    activationVelocity,
    weightedScore,
    humanReadable: `${Math.round(weightedScore * 100)}%`
  };
}

export function computeSymbioticScore(caseRow: any, partner: any) {
  // crude latent asset pairing heuristics: shared workforce skills + infrastructure proximity + supply chain overlap
  const skillsMatch = (partner.skillOverlap || 0.4);
  const infraMatch = (partner.infraProximity || 0.3);
  const supplyOverlap = (partner.supplyOverlap || 0.2);
  return Math.min(1, skillsMatch * 0.5 + infraMatch * 0.3 + supplyOverlap * 0.2);
}
