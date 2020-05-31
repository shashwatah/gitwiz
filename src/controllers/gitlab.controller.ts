import QueryController from "./query.controller";
import { QueryData, DataEdge } from "./../types/gitlab.interfaces";
import { Tag, ProcessedData } from "./../types/general.interfaces";

export default class GitlabController {
  private url: string;
  private query: string;
  private token: string;

  private queryController: QueryController;

  constructor(query: string, token: string) {
    this.url = "https://gitlab.com/api/graphql";
    this.query = query;
    this.token = token;
    this.queryController = new QueryController(this.url, this.token);
  }

  makeQuery(): Promise<Array<DataEdge>> {
    return new Promise((resolve, reject) => {
      this.queryController
        .fetchData(
          `query { projects(search: \"${encodeURI(this.query)}\") { edges { node { name nameWithNamespace webUrl description starCount forksCount repository { rootRef } createdAt } } } }`
        )
        .then((response: QueryData) => {
          if (response.data?.projects.edges) {
            if (response.data?.projects.edges.length === 0) {
              throw new Error(
                "GitlabControllerError/makeQuery(): Query returned 0 results"
              );
            } else {
              resolve(response.data?.projects.edges);
            }
          } else {
            throw new Error("GitlabControllerError/makeQuery(): Gitlab Error");
          }
        })
        .catch((error: string) => {
          reject(error);
        });
    });
  }

  processData(): Promise<Array<ProcessedData>> {
    let processedDataArray: Array<ProcessedData> = [];
    return new Promise((resolve, reject) => {
      this.makeQuery()
        .then((response: Array<DataEdge>) => {
          if (response !== undefined) {
            response.forEach((edge: DataEdge) => {
              let tags: Array<Tag> = [];

              if(edge.node.repository !== null) {
                  if(edge.node.repository.rootRef !== null) {
                      tags.push({
                          type: "branch",
                          icon: true,
                          content: edge.node.repository.rootRef
                      });
                  }
              }

              tags.push({
                  type: "star",
                  icon: true,
                  content: edge.node.starCount
              });

              tags.push({
                  type: "fork",
                  icon: true,
                  content: edge.node.forksCount
              });

              processedDataArray.push({
                platform: "GitLab",
                link: edge.node.webUrl,
                name: edge.node.name,
                domain: "https://www.gitlab.com",
                sub: edge.node.webUrl.substring(19),
                desc: edge.node.description !== null ? edge.node.description : "",
                tags: tags,
              });
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


