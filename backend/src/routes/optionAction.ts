
import express from 'express';
import { generateSummary, transformText, searchWeb } from '../services/llmWrapper';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    const { optionId, caseId, contextText } = req.body || {};
    if (!optionId) {
        res.status(400).json({ error: 'optionId required' });
        return;
    }

    if (optionId === 'clarify') {
      const payload = { instructions: 'Refine this objective into 3 concise bullet points to use in the report.', content: contextText || '' };
      const resp = await transformText({ instructions: payload.instructions, content: payload.content });
      res.json({ insertedText: resp.text || 'Clarify fallback' });
      return;
    }

    if (optionId === 'partners') {
      const query = `Potential partners for ${contextText || 'target mission'}`;
      const web = await searchWeb(query);
      res.json({ insertedText: (web.results && web.results.length>0) ? web.results.slice(0,3) : [{ title:'No web API configured', snippet: web.results && web.results[0]?.snippet || '' }] });
      return;
    }

    if (optionId === 'risk') {
      const resp = await transformText({ instructions: 'Write a short risk snapshot with 3 priority risks and mitigation suggestions', content: contextText || '' });
      res.json({ insertedText: resp.text || 'Risk snapshot fallback' });
      return;
    }

    res.json({ insertedText: 'Option placeholder' });
  } catch (e) {
    console.error('option action error', e);
    res.status(500).json({ error: 'option action failed' });
  }
});

export default router;
