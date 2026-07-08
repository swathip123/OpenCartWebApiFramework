import {test, expect} from'@playwright/test';
import { request } from 'node:http';
let token ;
let AUTH_TOKEN={Authorization:`'${token}'`}
test('get the Authorization',async({request})=>{

    const response = await request.post(
    'https://fakestoreapi.com/auth/login',
    {
      data: {
        username: 'mor_2314',
        password: '83r5^_'
      }
    }
  );

  //expect(response.status()).toBe(200);

  const body = await response.json();

  console.log(body);
  token=body.token;
  console.log("Token:", body.token);
})

test('get the Products',async({request})=>{

    const response = await request.get(
    'https://fakestoreapi.com/Products/10',
    {
     headers:AUTH_TOKEN
    }
  );

  expect(response.status()).toBe(200);

  const body = await response.json();

  console.log(body);
  token=body.token;
  console.log("Token:", body.token);
})

test('Add a new the Products',async({request})=>{

    let userData={
  "title": "Swathi",
  "price": 1000,
  "description": "Post  The payment",
  "category": "Mobile",
  "image": "http://example.com"
}
    const response = await request.get(
    'https://fakestoreapi.com/Products',
    {
     headers:AUTH_TOKEN,
     data:userData
    }
  );

  expect(response.status()).toBe(200);
  console.log('response text:', response);
  const body = await response.json();
  console.log(response.statusText);
})


test('update user test',async({request})=>{
    let userData={
  title: 'SanDisk SSD PLUS 1TB Internal SSD - SATA III 6 Gb/s',
  price: 109,
  description: 'Easy upgrade for faster boot up, shutdown, application load and response (As compared to 5400 RPM SATA 2.5” hard drive; Based on published specifications and internal benchmarking tests using PCMark vantage scores) Boosts burst write performance, making it ideal for typical PC workloads The perfect balance of performance and reliability Read/write speeds of up to 535MB/s/450MB/s (Based on internal testing; Performance may vary depending upon drive capacity, host device, OS and application.)',
  category: 'electronics',
  image: 'https://fakestoreapi.com/img/61U7T1koQqL._AC_SX679_t.png',
  rating: { rate: 4.9, count: 470 }
}

    // js object to json : serialization
    let response=await request.put('https://fakestoreapi.com/Products/10',{
        headers:AUTH_TOKEN,
        data:userData
    });
    console.log(response);
    console.log(await response.json());
console.log( response.status());// 201
console.log( response.statusText())// created

})

