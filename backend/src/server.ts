
import express from "express";
import cors from "cors";
import { createCase, getCase, listCases } from "./store";
import { enqueue } from "./queue";

// Import routers
import pepRouter from "./routes/pep";
import policyRouter from "./routes/policy";
import ethicsRouter from "./routes/ethics";
import adminRouter from "./routes/adminCases";
import matchmakingRouter from "./routes/matchmaking";
import partnersRouter from "./routes/partners";
import readinessRouter from "./routes/readiness";
import analyzeRouter from "./routes/analyze";
import aiRouter from "./routes/ai";
import optionActionRouter from "./routes/optionAction"; // NEW

const app = express();
app.use(cors() as any);
app.use(express.json() as any);

// Mount routers
app.use("/api", pepRouter);
app.use("/api", policyRouter);
app.use("/api", ethicsRouter);
app.use("/api", adminRouter);
app.use("/api", analyzeRouter);
app.use("/api/matchmaking", matchmakingRouter);
app.use("/api/partners", partnersRouter);
app.use("/api/readiness", readinessRouter);
app.use("/api/ai", aiRouter);
app.use("/api/option-action", optionActionRouter); // NEW

// Base Case Routes
app.post("/api/cases", (req, res) => {
  try {
    const c = createCase(req.body);
    enqueue({ id: c.id, payload: req.body });
    res.json({ ok: true, case: c });
  } catch (e: any) {
    res.status(500).json({ ok: false, error: e.message });
  }
});

app.get("/api/cases/:id", (req, res) => {
  const c = getCase(req.params.id);
  if (!c) {
      res.status(404).json({ ok: false });
      return;
  }
  res.json({ ok: true, case: c });
});

app.get("/api/cases", (_, res) => {
  res.json({ ok: true, cases: listCases() });
});

// Route to handle intake specifically if needed separate from generic cases
app.post("/api/intake", async (req, res) => {
    // This could trigger the orchestrator directly for "instant match"
    try {
        const { orchestrator } = await import('./services/orchestrator');
        const c = createCase(req.body);
        
        // Trigger deep orchestration immediately
        await orchestrator.enqueueJob({ 
            type: 'orchestrate', 
            caseId: c.id, 
            payload: req.body, 
            storePath: '' // uses default
        });
        
        // Return immediately, client polls or uses what's available. 
        // For instant match, we might want to wait a bit or return initial matches from partnerService
        // For now, standard async ack.
        res.json({ ok: true, caseId: c.id, matches: [] }); 
    } catch (e: any) {
        res.status(500).json({ ok: false, error: e.message });
    }
});

const PORT = process.env.PORT ? Number(process.env.PORT) : 5002;
app.listen(PORT, () => {
  console.log(`BWGA backend listening on http://localhost:${PORT}`);
});
