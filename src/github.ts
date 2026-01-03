import * as github from "@actions/github";
import * as core from "@actions/core";

export class GitHubClient {
  private octokit;
  private context;

  constructor(token: string) {
    this.octokit = github.getOctokit(token);
    this.context = github.context;
  }

  /**
   * Gets the metadata of the current Pull Request.
   */
  getPrDetails() {
    const pr = this.context.payload.pull_request;
    if (!pr) {
      throw new Error("This action must be run on a pull_request event.");
    }
    return {
      number: pr.number,
      title: pr.title,
      body: pr.body,
      owner: this.context.repo.owner,
      repo: this.context.repo.repo,
    };
  }

  /**
   * Fetches the raw text difference (diff) of the code changes.
   * This is what we send to the AI.
   */
  async getPrDiff(): Promise<string> {
    const { owner, repo, number } = this.getPrDetails();
    
    const response = await this.octokit.rest.pulls.get({
      owner,
      repo,
      pull_number: number,
      mediaType: {
        format: "diff", // This tells GitHub to give us the raw code changes
      },
    });

    // Validating that data is string, typically axios/octokit returns string for diff format
    return String(response.data);
  }

  /**
   * Posts a comment on the Pull Request.
   */
  async postComment(message: string) {
    const { owner, repo, number } = this.getPrDetails();

    await this.octokit.rest.issues.createComment({
      owner,
      repo,
      issue_number: number,
      body: message,
    });
  }
}