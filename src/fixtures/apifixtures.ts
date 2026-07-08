import {test as baseTest} from '@playwright/test'
import { ApiHelper } from '../api/ApiHelper.js'

//defines the types for API fixtures
type ApiFixtures={
    apiHelper:ApiHelper
    contactApiHelper:ApiHelper
}

export let test=baseTest.extend<ApiFixtures>({

    apiHelper:async ({request},use)=>{
        if (!process.env.API_BASE_URL) {
            throw new Error('API_BASE_URL is missing. Add it to the active config/.env.<ENV> file.');
        }

        let apiHelper=new ApiHelper(request, process.env.API_BASE_URL)
        await use(apiHelper)
    },

    contactApiHelper:async ({request},use)=>{
        if (!process.env.CONTACT_API_BASE_URL) {
            throw new Error('CONTACT_API_BASE_URL is missing. Add it to the active config/.env.<ENV> file.');
        }

        let contactApiHelper=new ApiHelper(request, process.env.CONTACT_API_BASE_URL)
        await use(contactApiHelper)
    }

})

export {expect} from '@playwright/test'
