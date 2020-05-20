// import { GITLAB_TOKEN } from './../utils/env';
import QueryController from './query.controller';

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

    makeQuery(): Promise<Array<object>>{
        interface Success {
            message?: string,
            data?: {
                projects: {
                    edges: Array<object>
                }
            }
        };

        return new Promise((resolve, reject) => {
            this.queryController.fetchData(`query{projects(search:\"${this.query}\"){edges{node{name id description starCount avatarUrl nameWithNamespace archived createdAt webUrl}}}}`)
            .then((response: Success) => {
                resolve(response.data?.projects.edges);
            })
            .catch((error: string) => {
                reject(error)
            });
        });
    }
}

// const controller = new GitlabController("flight", `${GITLAB_TOKEN}`);
// controller.makeQuery().then(res => console.log(res)).catch(err => console.log(err));