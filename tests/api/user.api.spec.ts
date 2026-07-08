import {test, expect} from'@playwright/test';
let AUTH_Token={Authorization:'Bearer 28c6a17b25ec6e28632ba45fecd729621eff5427dc2f43c43a0827a3b197e99d'};


test('get user test',async({request})=>{
  let response= await request.get('https://gorest.co.in/public/v2/users',{
        headers:AUTH_Token

    })

    console.log(response);
    console.log(await response.json());
console.log( response.status());
console.log( response.statusText())
})

test('create user test',async({request})=>{
    let userData={
        name:'venky',
        email:`automation_${Date.now()}@gmail.com`,
        gender:'male',
        status:'active'
    };

    // js object to json : serialization
    let response=await request.post('https://gorest.co.in/public/v2/users',{
        headers:AUTH_Token,
        data:userData
    });
    console.log(response);
    console.log(await response.json());
console.log( response.status());// 201
console.log( response.statusText())// created

})

test('update user test',async({request})=>{
    let userData={
  name: 'venky11',
  email: 'automation_1783271181859@gmail.com',
  gender: 'male',
  status: 'Inactive'
}

    // js object to json : serialization
    let response=await request.put('https://gorest.co.in/public/v2/users/8537386',{
        headers:AUTH_Token,
        data:userData
    });
    console.log(response);
    console.log(await response.json());
console.log( response.status());// 201
console.log( response.statusText())// created

})