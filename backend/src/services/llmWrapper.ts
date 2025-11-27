
import fetch from "node-fetch";

interface LLMResult {
  ok: boolean;
  text?: string;
  results?: any[];
  raw?: any;
}

async function callOpenAI(payload: any): Promise<LLMResult> {
  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return { ok: false, text: '<<OPENAI_KEY_MISSING_FALLBACK: Analysis unavailable>>' };
  }
  try {
    const res = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    const j: any = await res.json();
    const text = (j.choices && j.choices[0] && (j.choices[0].message?.content || j.choices[0].text)) || JSON.stringify(j);
    return { ok: true, text, raw: j };
  } catch (e) {
    console.error('OpenAI call error', e);
    return { ok: false, text: '<<OPENAI_ERROR_FALLBACK: Analysis error>>' };
  }
}

async function callGeminiLike(query: string): Promise<LLMResult> {
  const key = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  if (!key) {
    return { ok: false, results: [{ title: 'Fallback result', snippet: 'Gemini key missing — web retrieval disabled in demo mode.' }] };
  }
  try {
    const cx = process.env.GOOGLE_CX;
    if (key && cx) {
      const url = `https://www.googleapis.com/customsearch/v1?key=${key}&cx=${cx}&q=${encodeURIComponent(query)}`;
      const r = await fetch(url);
      const j: any = await r.json();
      const items = (j.items || []).map((it: any) => ({ title: it.title, link: it.link, snippet: it.snippet }));
      return { ok: true, results: items };
    }
    return { ok: false, results: [{ title: 'Fallback result', snippet: 'No web API configured.' }] };
  } catch (e) {
    console.error('web search error', e);
    return { ok: false, results: [{ title: 'Error', snippet: 'Web retrieval error' }] };
  }
}

export async function transformText({ role='system', instructions='', content='' } = {}) {
  const systemPrompt = instructions || 'Transform the content for clarity and structure.';
  const payload = {
    model: 'gpt-4o-mini', 
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: content }
    ],
    max_tokens: 800,
    temperature: 0.2
  };
  const response = await callOpenAI(payload);
  return response;
}

export async function generateSummary(text: string, maxSentences = 6) {
  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return { ok: true, text: 'No content provided.' };
  }
  const prompt = `Summarize the following content into ${maxSentences} short bullet points, focusing on objectives, constraints, and key actors:\n\n${text}`;
  const resp = await transformText({ instructions: prompt, content: text });
  if (resp.ok) return resp;
  
  const clipped = text.split('\n').slice(0, 10).join(' ').slice(0, 800);
  const fallback = `Summary (fallback): ${clipped.slice(0, 400)}...`;
  return { ok: false, text: fallback };
}

export async function searchWeb(query: string) {
  return await callGeminiLike(query);
}
