import express from "express";
import { matchmakingService } from "../services/matchmakingService";

const router = express.Router();

// GET /api/partners -> list sample partners
router.get("/", async (req, res) => {
  const partners = await matchmakingService.listPartners();
  res.json(partners);
});

// POST /api/partners -> add partner
router.post("/", async (req, res) => {
  try {
      const p = req.body;
      const created = await matchmakingService.addPartner(p);
      res.status(201).json(created);
  } catch (e: any) {
      res.status(500).json({ error: e.message });
  }
});

export default router;
