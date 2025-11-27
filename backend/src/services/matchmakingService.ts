import { pool } from "../db/pool";
import { v4 as uuidv4 } from "uuid";
import { enqueue } from "./queue";
import { investorReadiness } from "./investorReadiness";

type Partner = {
  id: string;
  name: string;
  country: string;
  sectors: string[];
  size: "small" | "medium" | "large";
  incentives?: string[];
  metadata?: any;
};

const seedPartners: Partner[] = [
  { id: "p-1", name: "Pagadian Logistics Co", country: "PH", sectors: ["logistics", "ports"], size: "small" },
  { id: "p-2", name: "Mindanao Aquaculture Labs", country: "PH", sectors: ["agritech", "aquaculture"], size: "small" },
  { id: "p-3", name: "Cebu Manufacturing Park", country: "PH", sectors: ["manufacturing", "electronics"], size: "medium" },
  { id: "p-4", name: "Vietnam Tech Park", country: "VN", sectors: ["electronics", "assembly"], size: "large" },
  { id: "p-5", name: "Nairobi Green Energy Coop", country: "KE", sectors: ["energy", "renewable"], size: "medium" },
  { id: "p-6", name: "Gdansk Maritime Services", country: "PL", sectors: ["logistics", "maritime"], size: "large" }
];

export const matchmakingService = {
  async listPartners(): Promise<Partner[]> {
    // If DB available, query it; else return seed data
    if (!pool) return seedPartners;
    try {
        const res = await pool.query("SELECT * FROM partners LIMIT 100");
        return res.rows.length > 0 ? res.rows : seedPartners; // Fallback to seed if DB empty for demo
    } catch (e) {
        console.error("DB Error listing partners, falling back to seed:", e);
        return seedPartners;
    }
  },

  async addPartner(p: Partial<Partner>) {
    if (!pool) {
      const created = { 
          ...p, 
          id: p.id || uuidv4(),
          sectors: p.sectors || [],
          size: p.size || "small"
      } as Partner;
      seedPartners.push(created);
      return created;
    }
    
    const res = await pool.query(
      `INSERT INTO partners (name, country, sectors, size, metadata) VALUES ($1,$2,$3,$4,$5) RETURNING *`,
      [p.name, p.country, p.sectors || [], p.size || "small", p.metadata || {}]
    );
    return res.rows[0];
  },

  async matchForCase(caseId: string | undefined, criteria: any) {
    // criteria: { industry, projectSize, timelineMonths, requiredIncentives[], region? }
    const partners = await this.listPartners();
    
    // Compute fit score + investor readiness per partner
    const scored = partners.map((p) => {
      let industryFit = 0;
      if (criteria.industry) {
          // Simple array intersection check or substring match
          const targetInd = criteria.industry.toLowerCase();
          industryFit = p.sectors.some(s => s.toLowerCase().includes(targetInd) || targetInd.includes(s.toLowerCase())) ? 1 : 0;
      }
      
      const sizeFit = criteria.projectSize === "large" ? (p.size === "large" ? 1 : 0.6) : 1;
      
      // Region fit (bonus)
      let regionFit = 0;
      if (criteria.region) {
          if (p.country && criteria.region.includes(p.country)) regionFit = 0.2;
      }

      // Base fit 0-1
      const fit = Math.min(1, (industryFit * 0.7) + (sizeFit * 0.3) + regionFit);
      
      // Run readiness (IVAS) with combined payload
      const readiness = investorReadiness({ region: p.country, partner: p, project: criteria });
      
      // Final composite score
      const composite = 0.6 * fit + 0.4 * (readiness.IVAS / 100);
      
      return { 
          partner: p, 
          fit, 
          readiness, 
          compositeScore: Math.round(composite * 100) 
      };
    });

    // Sort descending
    scored.sort((a, b) => b.compositeScore - a.compositeScore);

    // Enqueue a background job for deep multi-agent analysis
    enqueue({ 
        name: "deep-match-analysis", 
        payload: { caseId, criteria, topMatchId: scored[0]?.partner.id } 
    });

    return scored;
  }
};
