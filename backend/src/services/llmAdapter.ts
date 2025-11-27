
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";

const API_KEY = process.env.API_KEY;

export interface LLMRequest {
  prompt: string;
  model?: string;
  temperature?: number;
  jsonMode?: boolean;
  schema?: any;
  systemInstruction?: string;
}

export interface LLMResponse {
  text: string;
  usage?: any;
  raw?: GenerateContentResponse;
}

export const llmAdapter = {
  async generate(req: LLMRequest): Promise<LLMResponse> {
    if (!API_KEY) {
        console.warn("[LLM Adapter] No API Key set. Returning mock response.");
        return { text: "Simulation: Backend API Key not configured." };
    }

    try {
      const ai = new GoogleGenAI({ apiKey: API_KEY });
      const modelName = req.model || "gemini-2.5-flash";
      
      const config: any = {
        temperature: req.temperature ?? 0.7,
      };

      if (req.jsonMode) {
        config.responseMimeType = "application/json";
      }
      
      if (req.schema) {
        config.responseSchema = req.schema;
        config.responseMimeType = "application/json";
      }

      if (req.systemInstruction) {
        config.systemInstruction = req.systemInstruction;
      }

      const response = await ai.models.generateContent({
        model: modelName,
        contents: req.prompt,
        config: config
      });

      return {
        text: response.text || "",
        raw: response
      };
    } catch (e: any) {
      console.error("[LLM Adapter] Error:", e);
      throw new Error("AI Generation Failed: " + e.message);
    }
  }
};
