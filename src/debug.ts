import * as dotenv from "dotenv";
import { validatePrTitle, validateIssueLink } from "./rules";
import { generatePrSummary } from "./ai";

// Load environment variables from .env
dotenv.config();

async function testLocal() {
  console.log("🔍 --- STARTING LOCAL TEST ---");

  // 1. Test the Rules Engine
  console.log("\n1️⃣  Testing Rules Engine:");
  
  const badTitle = "added login page";
  const goodTitle = "feat: add login page";
  
  console.log(`Checking '${badTitle}':`, validatePrTitle(badTitle).passed ? "✅" : "❌");
  console.log(`Checking '${goodTitle}':`, validatePrTitle(goodTitle).passed ? "✅" : "❌");

  const badBody = "I fixed the bug";
  const goodBody = "This PR fixes #123 regarding the login crash.";
  
  console.log(`Checking Body (No Link):`, validateIssueLink(badBody).passed ? "✅" : "❌");
  console.log(`Checking Body (With Link):`, validateIssueLink(goodBody).passed ? "✅" : "❌");

  // 2. Test the AI (Requires API Key)
  console.log("\n2️⃣  Testing AI Connection (Gemini):");
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("❌ SKIPPING AI TEST: No GEMINI_API_KEY found in .env file.");
  } else {
    const dummyDiff = `
      function add(a, b) {
    -   return a - b;
    +   return a + b;
      }
    `;

    console.log("⏳ Sending dummy diff to Google Gemini...");
    try {
      const summary = await generatePrSummary(apiKey, dummyDiff);
      console.log("\n--- 🤖 AI RESPONSE ---");
      console.log(summary);
      console.log("----------------------\n");
    } catch (error) {
      console.error("❌ AI Request Failed:", error);
    }
  }
}

testLocal();