# Privacy Policy for PR Sentinel

**Last Updated: January 2026**

## 1. Data Collection
PR Sentinel is a "Stateless" GitHub Action.
* **We do not collect, store, or transmit** your code, PR descriptions, or user data to any server owned by the developer.
* **We do not use analytics** or tracking cookies.

## 2. Third-Party Processing (Google Gemini)
This Action relies on the Google Gemini API to generate summaries.
* The data (Pull Request Diffs) is sent directly from your GitHub Action Runner to Google's API.
* This transmission is authenticated using **your own API Key** (`GEMINI_API_KEY`).
* The developer of PR Sentinel has no access to this data flow.
* Google's handling of this data is governed by the [Google Generative AI Terms of Service](https://policies.google.com/terms).

## 3. Contact
If you have concerns about privacy or specific AI outputs, please open an issue on the [GitHub Repository](https://github.com/hasunB/pr-sentinel/issues).