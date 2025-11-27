
import express from 'express';
import { llmAdapter } from '../services/llmAdapter';

const router = express.Router();

router.post('/generate', async (req, res) => {
  try {
    const result = await llmAdapter.generate(req.body);
    res.json(result);
  } catch (error: any) {
    console.error("AI Route Error:", error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
