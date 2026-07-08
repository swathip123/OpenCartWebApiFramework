import { expect, test } from '../src/fixtures/pagefixtures.js';

   test.beforeEach(async({loginPage})=>{
     await loginPage.goToLoginPage(); 
await loginPage.doLogin('pwtestbatch@open.com','pw123')  
 })
test('verify homepage title',async({homePage})=>{
    
    const pagetitle = await homePage.getLoginPageTitle();
    expect(pagetitle).toContain('My Account')
    console.log(pagetitle);
})

test('logout is exist or not ',async({homePage})=>{
    expect( homePage.isLogoutlinkExist()).toBeTruthy();
})

test('homePage headers exist test', async({homePage} )=>{
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