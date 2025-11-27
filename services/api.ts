
const BASE_URL = 'http://localhost:5002/api';

export const api = {
    async post(endpoint: string, body: any) {
        const res = await fetch(`${BASE_URL}${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        if (!res.ok) throw new Error(`API call failed: ${res.statusText}`);
        return res.json();
    },

    async get(endpoint: string) {
        const res = await fetch(`${BASE_URL}${endpoint}`);
        if (!res.ok) throw new Error(`API call failed: ${res.statusText}`);
        return res.json();
    },

    // Specific Shortcuts
    async generateAI(prompt: string, model?: string, jsonMode?: boolean) {
        return this.post('/ai/generate', { prompt, model, jsonMode });
    },

    async quickAnalyze(params: any) {
        return this.post('/analyze', params);
    }
};
