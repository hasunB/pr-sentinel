export interface ValidationResult {
    passed: boolean;
    message: string;
}

/**
 * Validates if the PR title matches Conventional Commits specification.
 * Example: "feat: add login" (Pass) vs "Added login" (Fail)
 */
export function validatePrTitle(title: string): ValidationResult {
    // Regex looks for: type(scope?): description
    const conventionalRegex = /^(feat|fix|docs|style|refactor|perf|test|build|ci|chore|revert)(\([\w-]+\))?:\s.+/;

    if (!conventionalRegex.test(title)) {
        return {
            passed: false,
            message: "**Title Error**: PR title must follow [Conventional Commits](https://www.conventionalcommits.org/).\n\n**Example:** `feat: add new login page` or `fix(auth): handle token expiration`."
        };
    }
    return { passed: true, message: "Title looks good." };
}

/**
 * Checks if the PR body contains a linked issue (e.g., "Closes #123").
 */
export function validateIssueLink(body: string | null | undefined): ValidationResult {
    if (!body) return { passed: false, message: "**Missing Description**: PR body cannot be empty." };

    // Regex matches: "fixes #123", "closes #12", "resolves #1" (case insensitive)
    const issueRegex = /(fixes|closes|resolves)\s+#\d+/i;

    if (!issueRegex.test(body)) {
        return {
            passed: false,
            message: "**No Linked Issue**: Please link a Jira/GitHub issue using keywords like `Fixes #123` or `Closes #456`."
        };
    }
    return { passed: true, message: "Issue linked." };
}