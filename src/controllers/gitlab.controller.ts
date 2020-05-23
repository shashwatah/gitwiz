// import { GITLAB_TOKEN } from './../utils/env';
import QueryController from './query.controller';
import { rejects } from 'assert';

interface QueryData {
    message?: string,
    data?: {
        projects: {
            edges: Array<DataEdge>
        }
    }
};

interface DataEdge {
    node: {
        name: string,
        nameWithNamespace: string,
        webUrl: string, 
        description: string,
        starCount: number,
        forksCount: number,
        repository: {
            rootRef: string
        },
        createdAt: string
    }
};

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

    makeQuery(): Promise<Array<DataEdge>>{
        return new Promise((resolve, reject) => {
            this.queryController.fetchData(`query { projects(search: \"${this.query}\") { edges { node { name nameWithNamespace webUrl description starCount forksCount repository { rootRef } createdAt } } } }`)
            .then((response: QueryData) => {
                if(response.data?.projects.edges) {
                    if(response.data?.projects.edges.length === 0) {
                        throw new Error("GitlabControllerError/makeQuery(): Query returned 0 results");
                    } else {
                        resolve(response.data?.projects.edges);
                    }
                } else {
                    throw new Error("GitlabControllerError/makeQuery(): Gitlab Error")
                }
            })
            .catch((error: string) => {
                reject(error)
            });
        });
    }

    processData(): Promise<Array<object>>{
        var processedData: Array<object> = [];
        return new Promise((resolve, reject) => {
            this.makeQuery().then((response: Array<DataEdge>) => {
                if(response !== undefined ) {
                    response.forEach((edge: DataEdge) => {
                        processedData.push({
                            platform: "gitlab",
                            htmlString: 
                            `<div class="res">
                                <button class="res-el res-tag res-pf-tag res-gl-tag">GitLab</button>
                                <a class="res-link" href="${edge.node.webUrl}">
                                    <p class="res-el res-title">${edge.node.name}</p>
                                    <p class="res-el res-sub">https://www.gitlab.com > ${edge.node.webUrl.substring(20)}</p>
                                </a>
                                ${edge.node.description !== null ? edge.node.description.length > 0 ? `<p class="res-el res-desc">${edge.node.description}</p>` : "" : "" }
                                <div class="res-data-tag-container">
                                    ${edge.node.repository !== null ? edge.node.repository.rootRef !== null ? `<button class="res-tag res-data-tag"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16" width="10" height="16" style="display: inline-block; fill: currentcolor; user-select: none; vertical-align: text-bottom;"><path fill-rule="evenodd" d="M10 5c0-1.11-.89-2-2-2a1.993 1.993 0 00-1 3.72v.3c-.02.52-.23.98-.63 1.38-.4.4-.86.61-1.38.63-.83.02-1.48.16-2 .45V4.72a1.993 1.993 0 00-1-3.72C.88 1 0 1.89 0 3a2 2 0 001 1.72v6.56c-.59.35-1 .99-1 1.72 0 1.11.89 2 2 2 1.11 0 2-.89 2-2 0-.53-.2-1-.53-1.36.09-.06.48-.41.59-.47.25-.11.56-.17.94-.17 1.05-.05 1.95-.45 2.75-1.25S8.95 7.77 9 6.73h-.02C9.59 6.37 10 5.73 10 5zM2 1.8c.66 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2C1.35 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2zm0 12.41c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm6-8c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg> ${edge.node.repository.rootRef}</button>` : "" : "" }
                                    <button class="res-tag res-data-tag"><svg aria-hidden="true" class="octicon" height="16" role="img" viewBox="0 0 14 16" width="14" style="display: inline-block; fill: currentcolor; user-select: none; vertical-align: text-bottom;"><path fill-rule="evenodd" d="M14 6l-4.9-.64L7 1 4.9 5.36 0 6l3.6 3.26L2.67 14 7 11.67 11.33 14l-.93-4.74L14 6z"></path></svg> ${edge.node.starCount}</button>
                                    <button class="res-tag res-data-tag"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 16" width="10" height="16" style="display: inline-block; fill: currentcolor; user-select: none; vertical-align: text-bottom;"><path fill-rule="evenodd" d="M8 1a1.993 1.993 0 00-1 3.72V6L5 8 3 6V4.72A1.993 1.993 0 002 1a1.993 1.993 0 00-1 3.72V6.5l3 3v1.78A1.993 1.993 0 005 15a1.993 1.993 0 001-3.72V9.5l3-3V4.72A1.993 1.993 0 008 1zM2 4.2C1.34 4.2.8 3.65.8 3c0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3 10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2zm3-10c-.66 0-1.2-.55-1.2-1.2 0-.65.55-1.2 1.2-1.2.65 0 1.2.55 1.2 1.2 0 .65-.55 1.2-1.2 1.2z"></path></svg> ${edge.node.forksCount}</button>
                                </div>
                            </div>`
                        });
                    });
                    resolve(processedData);
                } else {
                    reject("GithubControllerError/processData(): makeQuery() response was undefined");
                }
            }).catch(error => {
                reject(error);
            })
        });
    }
}

// const controller = new GitlabController("flight", `${GITLAB_TOKEN}`);
// controller.makeQuery().then(res => console.log(res)).catch(err => console.log(err));

// <div class="res">
//             <button class="res-el res-tag res-pf-tag res-gl-tag">GitLab</button>
//             <p class="res-el res-title">orion</p>
//             <p class="res-el res-sub">KSSBro/orion > https://github.com/KSSBro/orion</p>
//             <p class="res-el res-desc">Orion is an Open-Source Search Engine for social networking websites, built with Node.js.</p>
//         </div>