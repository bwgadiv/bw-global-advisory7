
export const DEFAULT_WEIGHTS = {
  ER: 0.25, // Economic Readiness
  SP: 0.20, // Symbiotic Fit
  PS: 0.15, // Political Stability (mapped from CC/Region in simple ver)
  PR: 0.15, // Partner Reliability
  EA: 0.10, // Ethical Alignment
  CA: 0.10, // Activation Velocity
  UT: 0.05  // User Transparency
};

function clamp(n: number) { return Math.max(0, Math.min(100, n || 50)); }

export function computeSPI(input: any) {
  // Map input keys to formula keys
  const s = {
    ER: clamp(input.ER), 
    SP: clamp(input.SP), 
    PS: clamp(input.CC), // Using Cultural/Regional fit as proxy for stability in MVP
    PR: clamp(input.PR), 
    EA: clamp(input.EA),
    CA: clamp(input.CA), 
    UT: clamp(input.UT)
  };
  
  const w = { ...DEFAULT_WEIGHTS, ...(input.weights || {}) };

  // Normalize weights to ensure they sum to 1
  const sum = Object.values(w).reduce((a: number, b: number) => a + b, 0) as number;
  const n: any = {};
  Object.keys(w).forEach(k => (n[k] = (w as any)[k] / sum));

  let spi = 0;
  Object.keys(s).forEach(k => {
      if ((n as any)[k]) {
          spi += (s as any)[k] * (n as any)[k];
      }
  });

  // Calculate Confidence Interval based on User Transparency (UT)
  // Lower transparency = Higher uncertainty
  const uncertaintyFactor = 1 - (s.UT / 100);
  const margin = 12 * uncertaintyFactor; // Max +/- 12 points

  return {
    spi: +spi.toFixed(2),
    ciLow: +(spi - margin).toFixed(2),
    ciHigh: +(spi + margin).toFixed(2),
    breakdown: s,
    weights: n,
    generatedAt: new Date().toISOString()
  };
}
