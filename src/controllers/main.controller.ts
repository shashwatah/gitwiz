import { GITHUB_TOKEN, GITLAB_TOKEN } from "./../utils/env";

import GithubController from './github.controller';
import GitlabController from './gitlab.controller';
import { rejects } from "assert";

export default class MainController {
    private query: string;
    private githubController: GithubController;
    private gitlabController: GitlabController;

    constructor(query: string) {
        this.query = query;
        this.githubController = new GithubController(this.query, `${GITHUB_TOKEN}`);
        this.gitlabController = new GitlabController(this.query, `${GITLAB_TOKEN}`);
    }

    getResults(): Promise<Array<object>> {
        return new Promise(async (resolve, reject) => {
           const [githubResults, gitlabResults] = await Promise.all([
               this.githubController.processData(),
               this.gitlabController.processData()
           ]);

           resolve(githubResults.concat(gitlabResults));
        });
    }
}