import fetch from "node-fetch";

export default class QueryController {
    private url: string;
    private token: string;
    
    constructor(url: string, token: string) {
        this.url = url;
        this.token = token;
    }

    fetchData(queryString: string): Promise<object>{
        interface Success {
            message: string,
            data: object
        };

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
                    const data: Success = {
                        message: "success",
                        data: response.data
                    }
                    resolve(data);
                } else {
                    throw new Error("Error retrieving data");
                }
            }).catch(error => {
                reject(error);
            });
        }); 
    }
}