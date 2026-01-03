// import { GoogleGenerativeAI } from "@google/generative-ai";
// import * as dotenv from "dotenv";

// dotenv.config();

// async function listAvailableModels() {
//   const apiKey = process.env.GEMINI_API_KEY;
//   if (!apiKey) {
//     console.error("❌ No API Key found in .env");
//     return;
//   }

//   const genAI = new GoogleGenerativeAI(apiKey);
  
//   try {
//     // This connects to Google and asks "What models can I use?"
//     // Note: We use the 'genAI' instance directly, not a specific model yet.
//     // The SDK method to list models might vary by version, so we try the standard fetch.
    
//     console.log("🔍 Querying Google for available models...");
    
//     // There isn't a direct helper in the simplified SDK for listing models easily 
//     // without using the admin API, but we can try a basic connection test 
//     // using the most standard model: 'gemini-pro'.
    
//     const model = genAI.getGenerativeModel({ model: "gemini-pro" });
//     const result = await model.generateContent("Hello");
//     console.log("✅ 'gemini-pro' IS WORKING! Use this model name.");
    
//   } catch (error: any) {
//     console.log("\n❌ 'gemini-pro' failed.");
//     console.log("Error details:", error.message);
//   }
// }

// listAvailableModels();

