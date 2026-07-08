import { expect, test } from "@playwright/test";
import { LoginPage } from "../src/pages/LoginPage.js";
import { Homepage } from "../src/pages/HomePage.js";

import { beforeEach } from "node:test";

let loginPage:LoginPage;
let homePage:Homepage;
   test.beforeEach(async({page})=>{
      loginPage=new LoginPage(page);
     await loginPage.goToLoginPage(); 
await loginPage.doLogin('pwtestbatch@open.com','pw123')  
homePage=new Homepage(page); 
 })
test('verify homepage title',async()=>{
    
    const pagetitle = await homePage.getLoginPageTitle();
    expect(pagetitle).toContain('My Account')
    console.log(pagetitle);
})

test('logout is exist or not ',async()=>{
    expect( homePage.isLogoutlinkExist).toBeTruthy();
})

test('homePage headers exist test', async()=>{
    const headers =await homePage.getHomePageHeaders();
    console.log(headers);
expect.soft(headers).toHaveLength(4)
expect(headers).toEqual([
    'My Account',
    'My Orders',
    'My Affiliate Account',
    'Newsletter'
])

})