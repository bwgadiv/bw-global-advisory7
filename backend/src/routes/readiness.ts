import express from "express";
import { investorReadiness } from "../services/investorReadiness";

const router = express.Router();

// POST /api/readiness -> { target, project } -> readiness result
router.post("/", async (req, res) => {
  try {
      const payload = req.body;
      const score = investorReadiness(payload);
      res.json(score);
  } catch (e: any) {
      res.status(500).json({ error: e.message });
  }
});

export default router;
