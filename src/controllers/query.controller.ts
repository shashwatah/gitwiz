import fetch from "node-fetch";

interface QueryData {
    rateLimit?: object,
    message: string,
    data: object
};

export default class QueryController {
    private url: string;
    private token: string;
    
    constructor(url: string, token: string) {
        this.url = url;
        this.token = token;
    }

    fetchData(queryString: string): Promise<object>{
        return new Promise(async (resolve, reject) => {
            await fetch(this.url, {
                method: 'POST',
                headers: {
                    'Authorization': `token ${this.token}`,
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    query: queryString
                })
            })
            .then(async response => await response.json())
            .then(response => {
                if(response.data) {
                    const queryData: QueryData = {
                        message: "success",
                        data: response.data
                    }
                    resolve(queryData);
                } else if(response.errors[0]) {
                    throw new Error(`QueryControllerError/fetchData(): ${response.errors[0].message}`);
                } else {
                    throw new Error("QueryControllerError/fetchData(): Error retrieving data");
                }
            }).catch(error => {
                reject(error);
            });
        }); 
    }
}