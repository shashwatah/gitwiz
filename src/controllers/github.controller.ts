import QueryController from "./query.controller";
import { QueryData, DataEdge } from "./../types/github.interfaces";
import { Tag, ProcessedData } from "./../types/general.interfaces";

export default class GithubController {
  private url: string;
  private query: string;
  private token: string;

  private queryController: QueryController;

  constructor(query: string, token: string) {
    this.url = "https://api.github.com/graphql";
    this.query = query;
    this.token = token;
    this.queryController = new QueryController(this.url, this.token);
  }

  makeQuery(): Promise<Array<DataEdge>> {
    return new Promise((resolve, reject) => {
      this.queryController
        .fetchData(
          `query { rateLimit { cost remaining resetAt } search(query: \"${encodeURI(
            this.query
          )}\", type: REPOSITORY, first: 100) { repositoryCount edges { node { ... on Repository { name nameWithOwner url homepageUrl description parent { nameWithOwner } languages(first:5) { nodes { name } } releases(last:1) { nodes { tagName } } forkCount stargazers { totalCount } diskUsage createdAt repositoryTopics(first:10) { nodes { topic { name } } } } } } } }`
        )
        .then((response: QueryData) => {
          if (response.rateLimit?.remaining === 0) {
            throw new Error(
              "GithubControllerError/makeQuery(): Github rate limit exceeded"
            );
          }
          if (response.data?.search.edges) {
            if (response.data?.search.edges.length === 0) {
              throw new Error(
                "GithubControllerError/makeQuery(): Query returned 0 results"
              );
            } else {
              resolve(response.data?.search.edges);
            }
          } else {
            throw new Error("GithubControllerError/makeQuery(): GitHub Error");
          }
        })
        .catch((error: string) => {
          reject(error);
        });
    });
  }

  processData(): Promise<Array<ProcessedData>> {
    let processedDataArray: Array<ProcessedData> = [];

    return new Promise(async (resolve, reject) => {
      this.makeQuery()
        .then((response: Array<DataEdge>) => {
          if (response !== undefined) {
            response.forEach((edge: DataEdge) => {
              let tags: Array<Tag> = [];

              if (!edge.node.parent?.nameWithOwner) {
                if (edge.node.languages.nodes.length > 0) {
                  for (const lang of edge.node.languages.nodes) {
                    tags.push({
                      type: "language",
                      icon: true,
                      content: lang.name,
                    });
                  }
                }
                edge.node.releases.nodes.length > 0
                  ? tags.push({
                      type: "release",
                      icon: true,
                      content: edge.node.releases.nodes[0].tagName,
                    })
                  : true;
                tags.push({
                  type: "star",
                  icon: true,
                  content: edge.node.stargazers.totalCount,
                });
                tags.push({
                  type: "fork",
                  icon: true,
                  content: edge.node.forkCount,
                });
                tags.push({
                  type: "disk",
                  icon: false,
                  content: `${edge.node.diskUsage} KB`,
                });
                if (edge.node.repositoryTopics.nodes.length > 0) {
                  for (const repoTopic of edge.node.repositoryTopics.nodes) {
                    tags.push({
                      type: "repoTopic",
                      icon: false,
                      content: repoTopic.topic.name,
                    });
                  }
                }

                processedDataArray.push({
                  platform: "GitHub",
                  link: edge.node.url,
                  name: edge.node.name,
                  domain: "https://www.github.com",
                  sub: edge.node.nameWithOwner,
                  desc:
                    edge.node.description !== null ? edge.node.description : "",
                  tags: tags,
                });
              }
            });
            resolve(processedDataArray);
          } else {
            reject(
              "GithubControllerError/processData(): makeQuery() response was undefined"
            );
          }
        })
        .catch((error) => {
          console.log(error.message);
          resolve([]);
        });
    });
  }
}
