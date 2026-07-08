import {test,expect} from "../src/fixtures/pagefixtures.js";
import { CsvHelper } from "../src/utlis/CsvHelper.js";




   test.beforeEach(async({loginPage})=>{
      
     await loginPage.goToLoginPage(); 
      
    })
test('login page title test',async({loginPage})=>{

    const pageTitle = await loginPage.getLoginPageTitle();
    console.log("login page title is ", pageTitle);
    expect(pageTitle).toContain('Account Login');
    await loginPage.doLogin("swathi.potnuru513@gmail.com","Ganesh@789");
});


test('forget pwd link exixt test',async({loginPage}
)=>{
        const iseexist=await loginPage.isForgetpwdLinkExist();
    expect(iseexist).toBeTruthy()

})

test('login to the application',async({loginPage,homePage})=>{
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!)
expect(await homePage.isLogoutlinkExist()).toBeTruthy();
expect(await homePage.getLoginPageTitle()).toContain('My Account')
})

//DD-1.sequence mode --only 1 test is running with test data one by one 
test('login to app using wring credentials',async({loginPage,testData})=>{
    for(let data of testData){
        await loginPage.doLogin(data.username,data.password);
        expect(await loginPage.isLoginErrorMessageExist()).toBeTruthy();
    }
})

//DD-2 without fixtures , parallel mode , read csv file data drirectly an dloop the test method

let testDate=CsvHelper.readCsv("src/data/loginData.csv");
for(let data of testDate){
    test(`login to app using wrong credentials - ${data.username} - ${data.password}`,async({loginPage,testData})=>{
    for(let data of testData){
        await loginPage.doLogin(data.username,data.password);
        expect(await loginPage.isLoginErrorMessageExist()).toBeTruthy();
    }
})
}
