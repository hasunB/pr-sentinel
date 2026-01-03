<div align="center">

# 🛡️ PR Sentinel

**Your AI-Powered Gatekeeper for Pull Request Quality.**  
*Enforce conventions, automate summaries, and keep your codebase clean.*

[![GitHub Release](https://img.shields.io/github/v/release/hasunB/pr-sentinel?style=for-the-badge&color=blue)](https://github.com/hasunB/pr-sentinel/releases)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)
[![Build Status](https://img.shields.io/github/actions/workflow/status/hasunB/pr-sentinel/test.yml?style=for-the-badge)](https://github.com/hasunB/pr-sentinel/actions)

[Features](#-features) • [Usage](#-usage) • [Configuration](#-configuration) • [Development](#-development)

</div>

---

## 🚀 Overview

**PR Sentinel** is a GitHub Action that acts as an intelligent guardian for your Pull Requests. It combines **strict rule enforcement** with **Generative AI** to ensure every PR is well-documented and compliant before it even reaches a human reviewer.

Stop wasting time on "fix typos" commits and ambiguous PR descriptions. Let Sentinel handle the routine checks.

## ✨ Features

- **📏 Conventional Commits Enforcement**: Validates that PR titles follow the [Conventional Commits](https://www.conventionalcommits.org/) standard (e.g., `feat:`, `fix:`, `chore:`).
- **🔗 Issue Linking**: Ensures every PR body links to a tracking issue (e.g., `Closes #123`, `Fixes #456`).
- **🤖 AI-Powered Summaries**: Uses **Google Gemini AI** to analyze the code diff and generate a concise, human-readable summary of the changes.
- **💬 Automated Reporting**: Posts a beautifully formatted comment on the PR with pass/fail status and the AI summary.
- **🚫 Block Bad PRs**: Automatically fails the status check if validation rules aren't met.

## 📦 Usage

Add **PR Sentinel** to your GitHub Actions workflow file (e.g., `.github/workflows/pr-checks.yml`).

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
          gemini-api-key: ${{ secrets.GEMINI_API_KEY }} # Optional: Enable for AI summaries
```

## ⚙️ Configuration

| Input | Description | Required | Default |
| :--- | :--- | :---: | :--- |
| `github-token` | The GitHub token to interact with the PR API. | **Yes** | `${{ github.token }}` |
| `gemini-api-key` | Google Gemini API Key. If provided, AI summary is generated. | No | `""` |
| `model-name` | Specific Gemini model version to use. | No | `gemini-2.5-flash-lite` |

## 📸 Example Report

When **PR Sentinel** runs, it leaves a comment like this:

> ### 🛡️ PR Sentinel Report
>
> **Rules Check:**
> - Title looks good.
> - Issue linked.
>
> ---
> ### 🤖 AI Summary
> **Key Changes:**
> - Added `ValidationService` class to handle input sanitization.
> - Updated `AuthController` to use the new validation logic.
> - **Note**: Replaced legacy validation calls in `src/utils.ts`.

## 🛠️ Development

Want to contribute? Follow these steps to set up your local environment.

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/hasunB/pr-sentinel.git
    cd pr-sentinel
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Build the project**:
    ```bash
    npm run build
    ```

4.  **Run tests**:
    ```bash
    # Create a .env file with GITHUB_TOKEN and GEMINI_API_KEY first!
    npm run test
    ```

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

<div align="center">
  <sub>Built with ❤️ by <a href="https://github.com/hasunB">Hasun Akash Bandara</a></sub>
</div>
