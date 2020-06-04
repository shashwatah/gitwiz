import { GITHUB_TOKEN, GITLAB_TOKEN } from "./../utils/env";

import NodeCache from "node-cache";

import GithubController from "./github.controller";
import GitlabController from "./gitlab.controller";

import { ProcessedData } from "./../types/general.interfaces";

import { shuffleArray } from "./../utils/shuffleArray";

export default class MainController {
  private query: string;
  private githubController: GithubController;
  private gitlabController: GitlabController;
  private cache: NodeCache;

  constructor(query: string, cache: NodeCache) {
    this.query = query;
    this.githubController = new GithubController(this.query, `${GITHUB_TOKEN}`);
    this.gitlabController = new GitlabController(this.query, `${GITLAB_TOKEN}`);
    this.cache = cache;
  }

  getResults(): Promise<Array<ProcessedData>> {
    return new Promise(async (resolve, reject) => {
      let cachedData: Array<ProcessedData> | undefined = this.cache.get(
        this.query
      );

      if (cachedData === undefined) {
        const [githubResults, gitlabResults] = await Promise.all([
          this.githubController.processData(),
          this.gitlabController.processData(),
        ]);

        const resultArray: Array<ProcessedData> = githubResults
          .slice(0, 20)
          .concat(shuffleArray(githubResults.slice(20).concat(gitlabResults)));
        if (resultArray.length > 0) {
          resolve(resultArray);
        } else {
          reject("MainQueryController/getResults(): Query returned 0 results");
        }

        this.cache.set(this.query, resultArray);

        resolve(resultArray);
      } else {
        resolve(cachedData);
      }
    });
  }
}
