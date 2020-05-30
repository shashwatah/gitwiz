import { GITHUB_TOKEN, GITLAB_TOKEN } from "./../utils/env";

import GithubController from './github.controller';
import GitlabController from './gitlab.controller';

import { ProcessedData } from './../types/general.interfaces';

import { shuffleArray } from './../utils/shuffleArray';

export default class MainController {
    private query: string;
    private githubController: GithubController;
    private gitlabController: GitlabController;

    constructor(query: string) {
        this.query = query;
        this.githubController = new GithubController(this.query, `${GITHUB_TOKEN}`);
        this.gitlabController = new GitlabController(this.query, `${GITLAB_TOKEN}`);
    }

    getResults(): Promise<Array<ProcessedData>> {
        return new Promise(async (resolve, reject) => {
           const [githubResults, gitlabResults] = await Promise.all([
               this.githubController.processData(),
               this.gitlabController.processData()
           ]);

           const resultArray: Array<ProcessedData> = githubResults.slice(0,20).concat(shuffleArray(githubResults.slice(20).concat(gitlabResults)));
           if(resultArray.length > 0) {
               resolve(resultArray);
           } else {
               reject("MainQueryController/getResults(): Query returned 0 results");
           }
           resolve(resultArray);
        });
    }
}