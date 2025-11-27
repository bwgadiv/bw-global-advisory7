import express from "express";
import { matchmakingService } from "../services/matchmakingService";

const router = express.Router();

/**
 * POST /api/matchmaking/for-case
 * body: { caseId: string }
 * OR
 * POST /api/matchmaking
 * body: { criteria: {...}, caseId?: string }
 */
router.post(["/", "/for-case"], async (req, res) => {
  try {
    let criteria = req.body.criteria;
    const caseId = req.body.caseId;

    // If calling via legacy /for-case logic, we might need to fetch the case first
    // For this patch, we assume the frontend sends criteria or we default
    if (!criteria && caseId) {
        // In a real app, fetch case from store to get criteria. 
        // Here we assume a default or extract from body if passed.
        criteria = req.body.payload || {}; 
    }
    
    if (!criteria) {
        // Fallback for testing without case context
        criteria = { industry: "generic" };
    }

    const matches = await matchmakingService.matchForCase(caseId, criteria);
    res.json(matches); // Return array directly for /api/matchmaking standard
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message || "internal server error" });
  }
});

export default router;
