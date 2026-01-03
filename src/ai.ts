import { GoogleGenerativeAI } from "@google/generative-ai";
import * as core from "@actions/core";

export async function generatePrSummary(apiKey: string, diff: string, modelName: string = "gemini-2.5-flash-lite"): Promise<string | null> {
  if (!diff) return null;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: modelName });

    const prompt = `
      You are an expert Senior Software Engineer acting as a code reviewer.
      Analyze the following code diff from a Pull Request.
      
      Task:
      1. Write a concise summary of the changes.
      2. Highlight any major features added or bugs fixed.
      3. If you see any obvious security risks or "hacky" code, mention them politely.
      4. Use bullet points.
      5. Keep it professional and short.
      
      Git Diff:
      ${diff.substring(0, 30000)} // Limit characters to avoid token limits
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    core.warning(`AI Generation Failed: ${error}`);
    return null; // Fail gracefully, don't crash the whole action
  }
}