import { expect, test } from "@playwright/test";

import { LoginPage } from "../src/pages/LoginPage.js";
import { beforeEach } from "node:test";
import { Homepage } from "../src/pages/HomePage.js";

let loginPage:LoginPage;
let homePage :Homepage
   test.beforeEach(async({page})=>{
      loginPage=new LoginPage(page);
     await loginPage.goToLoginPage(); 
      homePage=new Homepage(page);
    })
test('login page title test',async()=>{

    const pageTitle = await loginPage.getLoginPageTitle();
    console.log("login page title is ", pageTitle);
    expect(pageTitle).toContain('Account Login');
    await loginPage.doLogin("swathi.potnuru513@gmail.com","Ganesh@789");
});


test('forget pwd link exixt test',async()=>{
        const iseexist=await loginPage.isForgetpwdLinkExist();
    expect(iseexist).toBeTruthy()

})

test('login to the application',async()=>{
    await loginPage.doLogin('pwtestbatch@open.com','pw123')
expect(await homePage.isLogoutlinkExist()).toBeTruthy();
expect(await homePage.getLoginPageTitle()).toContain('My Account')
})
