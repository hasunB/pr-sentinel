import * as core from "@actions/core";
import "dotenv/config";
import { GitHubClient } from "./github";
import { validatePrTitle, validateIssueLink } from "./rules";
import { generatePrSummary } from "./ai";

async function run() {
    try {
        // 1. Get Inputs
        const token = core.getInput("github-token") || process.env.GITHUB_TOKEN || "";
        const geminiKey = core.getInput("gemini-api-key") || process.env.GEMINI_API_KEY;
        const modelName = core.getInput("model-name");

        const client = new GitHubClient(token);
        const pr = client.getPrDetails();

        console.log(`Checking PR #${pr.number}: ${pr.title}`);

        // 2. Run Rule Validations
        const titleResult = validatePrTitle(pr.title);
        const issueResult = validateIssueLink(pr.body);

        let commentBody = "### 🛡️ PR Sentinel Report\n\n";
        let hasFailures = false;

        // Append Rule Results
        commentBody += `**Rules Check:**\n`;
        commentBody += `- ${titleResult.message}\n`;
        commentBody += `- ${issueResult.message}\n\n`;

        if (!titleResult.passed || !issueResult.passed) {
            hasFailures = true;
        }

        // 3. Run AI Summary (if Key is provided)
        if (geminiKey) {
            console.log("Generating AI summary...");
            const diff = await client.getPrDiff();
            const aiSummary = await generatePrSummary(geminiKey, diff, modelName);

            if (aiSummary) {
                commentBody += `---\n### 🤖 AI Summary\n${aiSummary}`;
            }
        }

        // 4. Post the Report
        await client.postComment(commentBody);

        // 5. Set Action Status
        if (hasFailures) {
            core.setFailed("PR Quality Checks Failed. See comment for details.");
        }

    } catch (error) {
        // If anything crashes, fail the action
        if (error instanceof Error) core.setFailed(error.message);
    }
}

run();