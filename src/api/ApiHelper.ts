import { APIRequestContext } from "@playwright/test";

export class ApiHelper{
    private readonly request : APIRequestContext;
    private readonly baseURL: string;

    constructor(request :APIRequestContext,baseURL:string){
        this.request = request;
        this.baseURL = baseURL.replace(/\/$/, "");
    }

    private async parseResponse(response: Awaited<ReturnType<APIRequestContext["get"]>>) {
        const contentType = response.headers()["content-type"] || "";
        const bodyText = await response.text();

        if (!contentType.includes("application/json")) {
            throw new Error(
                `Expected JSON response but received '${contentType}' with status ${response.status()}.\n` +
                `Response body starts with: ${bodyText.slice(0, 120)}`
            );
        }

        return bodyText ? JSON.parse(bodyText) : null;
    }

    private getUrl(endpoint:string): string {
        return `${this.baseURL}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
    }

    //GET
    async get(endpoint:string, headers?:Record<string,string>){
        let response=await this.request.get(this.getUrl(endpoint),{
            headers:headers
        })
        return {
            status:response.status(),
            body: await this.parseResponse(response)
        }
    }


    //POST
    async post(endpoint:string,data:object, headers?:Record<string,string>){
       let response= await this.request.post(this.getUrl(endpoint),{
            data:data,
            headers:headers
        })

        return{
            status:response.status(),
            body:await this.parseResponse(response)


        }
    }

    //PUT
    async put(endpoint:string,data:object, headers?:Record<string,string>){
       let response= await this.request.put(this.getUrl(endpoint),{
            data:data,
            headers:headers
        })
         return{
            status:response.status(),
            body:await this.parseResponse(response)


        }
    }
    //Delete
 async delete(endpoint:string,headers?:Record<string,string>){
       let response= await this.request.delete(this.getUrl(endpoint),{
            headers:headers
        })
         return{
            status:response.status(),
           
        }
    }


}
