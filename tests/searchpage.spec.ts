import { expect, test } from '../src/fixtures/pagefixtures.js';

   test.beforeEach(async({loginPage})=>{
     await loginPage.goToLoginPage(); 
await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!)  
 })

 test('Seach with Product Name',async({homePage})=>{
    await homePage.dosearch("macbook");
    expect(await homePage.getLoginPageTitle()).toContain('Search - macbook');
 })
