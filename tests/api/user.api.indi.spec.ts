import { ApiHelper } from '../../src/api/ApiHelper.js';
import {test ,expect} from '../../src/fixtures/apifixtures.js'

const TOKEN=process.env.API_TOKEN!;
const AUTH_HEADER={Authorization :`Bearer ${TOKEN}`};

//helper--generic function -create a fresh user

async function createUser(apiHelper:any){
    let userData={
            name:'venky API',
            email:`automation_${Date.now()}@gmail.com`,
            gender:'male',
            status:'active'
        };
        let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
        expect(response.status).toBe(201);
        expect(response.body.name).toBe(userData.name)
        return response.body;
}


//test 1: create a user test +verify
//POST--userid--Get/userid--verify

test('POST-crete a user',async({apiHelper})=>{
    let userResponse = await createUser(apiHelper)

let response= await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER)
expect(response.status).toBe(200)

})

//test2 : update a user test--verify

test('PUT--update  a user',async({apiHelper})=>{
    let userResponse = await createUser(apiHelper)
   let userdata = { name:'venky 143',
            email:`automation_${Date.now()}@gmail.com`,
            gender:'male',
            status:'inactive'
        };

        let putresponse =await apiHelper.put(`/public/v2/users/${userResponse.id}`,userdata,AUTH_HEADER)
        expect(putresponse.status).toBe(200);
        expect(putresponse.body.name).toBe(userdata.name)
expect(putresponse.body.status).toBe(userdata.status)

//get
let getresponse= await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER)
expect(getresponse.status).toBe(200)
  expect(getresponse.body.name).toBe(userdata.name)
expect(getresponse.body.status).toBe(userdata.status)

})

//test =3 Delete user + verify 

test('Delete- delete a user ',async({apiHelper})=>{
    let userResponse = await createUser(apiHelper)
    let deleteresponse=await apiHelper.delete(`/public/v2/users/${userResponse.id}`, AUTH_HEADER)
    expect(deleteresponse.status).toBe(204);

    //get 
    let getresponse= await apiHelper.get(`/public/v2/users/${userResponse.id}`, AUTH_HEADER)
expect(getresponse.status).toBe(404)
expect(getresponse.body.message).toBe('Resource not found')
})