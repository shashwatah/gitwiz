// import { GITHUB_TOKEN } from './../utils/env';
import QueryController from './query.controller';

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

    makeQuery(): Promise<object>{ 
        interface Success {
            message?: string,
            data?: {
                search: {
                    edges: Array<object>
                }
            }
        };

        return new Promise((resolve, reject) => {
            this.queryController.fetchData(`query { rateLimit { cost remaining resetAt } search(query: \"${this.query}\", type: REPOSITORY, first: 100) { edges { node { ... on Repository { id name createdAt description url __typename owner { avatarUrl login id __typename url } } } } } }`)
            .then((response: Success) => {
                resolve(response.data?.search.edges);
            })
            .catch((error: string) => {
                reject(error);
            });
        });     
    }
}

// const controller = new GithubController("insta", `${GITHUB_TOKEN}`);
// controller.makeQuery().then(res => console.log(res)).catch(err => console.log(err));