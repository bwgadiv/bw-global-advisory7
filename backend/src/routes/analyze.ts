
import express from "express";
import { computeSPI } from "../spi";
import { runEthicsChecks } from "../ethicsEngine";
import { matchmakingService } from "../services/matchmakingService";

const router = express.Router();

/**
 * POST /api/analyze
 * Returns: { spi, ethics, topMatches, quickLAI }
 */
router.post("/analyze", async (req, res) => {
  try {
    const payload = req.body;

    // 1. Run deterministic engines
    const spi = computeSPI(payload);
    const ethics = await runEthicsChecks({ context: { project: payload } });

    // 2. Quick Matchmaking Heuristic
    // If specific industry/region provided, get top 3
    let topMatches: any[] = [];
    if (payload.industry && payload.region) {
        const criteria = {
            industry: Array.isArray(payload.industry) ? payload.industry[0] : payload.industry,
            region: payload.region,
            projectSize: "medium" // Default assumption for quick scan
        };
        // Reusing matchForCase logic but purely for quick scan
        topMatches = await matchmakingService.matchForCase(undefined, criteria);
        topMatches = topMatches.slice(0, 3);
    }

    // 3. Quick LAI (Latent Asset Identifier) Stub
    // In full version, this calls the LAIWorker
    const quickLAI = {
        assets: ["Workforce/Infra Overlap", "Regulatory Arbitrage"],
        score: 85
    };

    res.json({
      ok: true,
      result: {
        spi,
        ethics,
        topMatches,
        quickLAI,
        timestamp: new Date().toISOString()
      }
    });
  } catch (e: any) {
    console.error(e);
    res.status(500).json({ ok: false, error: e.message });
  }
});

export default router;
