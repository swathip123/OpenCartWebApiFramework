import { ApiHelper } from '../../src/api/ApiHelper.js';
import {test ,expect} from '../../src/fixtures/apifixtures.js'

const TOKEN=process.env.API_TOKEN!;
const AUTH_HEADER={Authorization :`Bearer ${TOKEN}`};

test.describe.serial('running e2e go rest curd api tests',()=>{
test('GET API -- get all users ',async({apiHelper})=>{
   let response= await apiHelper.get('/public/v2/users',AUTH_HEADER);
   expect( response.status).toBe(200);
   //expect((response.body.length)).toBeGreaterThan(0);
})

let userid: number;
test('create a user ',async({apiHelper})=>{
    let userData={
        name:'venky',
        email:`automation_${Date.now()}@gmail.com`,
        gender:'male',
        status:'active'
    };
    let response = await apiHelper.post('/public/v2/users', userData, AUTH_HEADER);
    expect(response.status).toBe(201);
    expect(response.body.name).toBe(userData.name)
     userid=response.body.id;
    console.log(userid)
})

test('update a user ',async({apiHelper})=>{
    let userData={
        name:'venky updated',
        
    };
    let response = await apiHelper.put(`/public/v2/users/${userid}`, userData, AUTH_HEADER);
    expect(response.status).toBe(200);
    expect(response.body.name).toBe(userData.name)
     userid=response.body.id;
    console.log(userid)
})

})