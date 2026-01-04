<div align="center">

# 🛡️ PR Sentinel
### The AI-Powered Quality Gate for Professional Teams

[![GitHub Release](https://img.shields.io/github/v/release/hasunB/pr-sentinel?style=for-the-badge&color=blue)](https://github.com/hasunB/pr-sentinel/releases)
[![Marketplace](https://img.shields.io/badge/Marketplace-PR%20Sentinel-fe7d37?style=for-the-badge&logo=github)](https://github.com/marketplace/actions/pr-sentinel)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/hasunB/pr-sentinel/test.yml?style=for-the-badge)](https://github.com/hasunB/pr-sentinel/actions)

<p align="center">
  <a href="#-features">Features</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-configuration">Configuration</a> •
  <a href="#-faq--troubleshooting">FAQ</a>
</p>

</div>

---

## 🚀 Why PR Sentinel?

**Stop being the "Bad Cop" in code reviews.**

Engineers hate nagging colleagues to "fix the title" or "add a description." Reviewers hate staring at raw diffs with no context. **PR Sentinel** automates the boring stuff so you can focus on the code.

| ❌ Without Sentinel | ✅ With Sentinel |
| :--- | :--- |
| "Please rename this PR to match conventions..." | **Auto-Block:** Fails bad titles instantly. |
| "What does this change do?" (Empty description) | **Auto-Summary:** AI writes the release notes. |
| Reviewers waste 10 mins understanding context. | Reviewers get a **30-second summary** before reading code. |

---

## ✨ Features

- **📏 Conventional Commits Guard**: Strictly enforces standards (e.g., `feat: login`, `fix: api`). No more messy git logs.
- **🔗 Issue Link Enforcer**: Ensures every PR connects to work (e.g., `Closes #123`).
- **🤖 AI Code Summaries**: Uses **Google Gemini** (Flash models) to read the diff and explain changes in plain English.
- **💬 Beautiful Reports**: Posts a clean, formatted comment on the PR with pass/fail status.
- **💸 Zero Cost Architecture**: Works with the **Free Tier** of Google Gemini (15 requests/min). You pay nothing.

---

## ⚡ Quick Start

You can get this running in **2 minutes**.

### 1. Get your Free AI Key 🔑
You don't need a credit card.
1. Go to **[Google AI Studio](https://aistudio.google.com/app/apikey)**.
2. Click **"Create API Key"**.
3. Copy the key (starts with `AIzaSy...`).

### 2. Add Secrets to GitHub 🔒
1. Go to your Repo **Settings** > **Secrets and variables** > **Actions**.
2. Create a **New Repository Secret**.
3. Name: `GEMINI_API_KEY`
4. Paste your key.

### 3. Create the Workflow 📂
Create a file at `.github/workflows/pr-sentinel.yml`:

```yaml
name: "PR Sentinel"

on:
  pull_request:
    types: [opened, edited, synchronize, reopened]

jobs:
  review:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      pull-requests: write # Required to post comments
    steps:
      - name: Checkout Code
        uses: actions/checkout@v4

      - name: Run PR Sentinel
        uses: hasunB/pr-sentinel@v1
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
          gemini-api-key: ${{ secrets.GEMINI_API_KEY }}
```
### 📸 What it looks like

```
🛡️ PR Sentinel Report

Rules Check:

✅ Title follows Conventional Commits.
✅ Issue linked (Fixes #42).

🤖 AI Summary

Key Changes:
Added ValidationService class to handle input sanitization.
Updated AuthController to use the new validation logic.
Note: Replaced legacy validation calls in src/utils.ts.

```
### ⚙️ Configuration

| Input | Description | Required | Default |
| :--- | :--- | :---: | :--- |
| `github-token` | The GitHub token to interact with the PR API. | **Yes** | `${{ github.token }}` |
| `gemini-api-key` | Google Gemini API Key. If provided, AI summary is generated. | No* | `""` |
| `model-name` | AI Model to use. Supports gemini-1.5-flash or gemini-pro. | No | `gemini-2.5-flash-lite` |

**Note**: If gemini-api-key is missing, the Action will still enforce rules but skip the AI summary.

### ❓ FAQ & Troubleshooting
**Does this cost money?** No. Google Gemini's Free Tier allows 15 requests per minute free of charge. This is more than enough for most teams.

**Is my code safe?** Yes. This Action is stateless. Your code goes from GitHub Actions -> Google Gemini API -> Back to GitHub. It is never stored on any third-party server owned by the action author.

**The AI step failed with a 404?** Google sometimes updates model names. Try setting model-name: gemini-1.5-flash or gemini-pro in your workflow file.

### 🛠️ Local Development
Want to fork and modify?

```bash
1. Clone
git clone [https://github.com/hasunB/pr-sentinel.git](https://github.com/hasunB/pr-sentinel.git)

2. Install
npm install

3. Build (Compiles TS to dist/index.js)
npm run all

4. Test (Create a .env file first!)
npm run test
```

<div align="center"><sub>Built with ❤️ by <a href="https://github.com/hasunB">Hasun Akash Bandara</a></sub><br/>
<sub><i>Found a bug? <a href="https://www.google.com/search?q=https://github.com/hasunB/pr-sentinel/issues">Open an issue</a>.</i></sub></div>