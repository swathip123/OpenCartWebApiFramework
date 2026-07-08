import {test as baseTest} from "@playwright/test";
import path from "node:path";
import { Homepage } from "../pages/HomePage.js";
import { LoginPage } from "../pages/LoginPage.js";
import { CsvHelper } from "../utlis/CsvHelper.js";
import { RegisterPage } from "../pages/RegisterPage.js";
import { MyAccountPage } from "../pages/MyAccountPage.js";
import { ProductInfoPage } from "../pages/ProductInfoPage.js";
import { CartPage } from "../pages/CartPage.js";
//define types of page fixtures
type pageFixtures={
    loginPage:LoginPage,
    homePage:Homepage,
    testData:Record<string,string>[],
    registerPage:RegisterPage,
    myAccountPage: MyAccountPage,
    productInfoPage: ProductInfoPage,
    cartPage:CartPage
}
//extend playwright base test
export const test = baseTest.extend<pageFixtures>({
    loginPage:async({page},use)=>{
        let loginPage=new LoginPage(page);
        await use(loginPage);
    },
    homePage:async({page},use)=>{
        let homePage=new Homepage(page);
        await use(homePage);
    },
    testData:async({},use)=>{
        let  testData = CsvHelper.readCsv(path.resolve(process.cwd(), "src/data/loginData.csv"));
        await use(testData);
    },
    registerPage:async({page},use)=>{
        let registerPage=new RegisterPage(page);
        await use(registerPage);
    },
    myAccountPage:async({page},use)=>{
        let myAccountPage=new MyAccountPage(page);
        await use(myAccountPage);
    },
    productInfoPage:async({page},use)=>{
        let productInfoPage=new ProductInfoPage(page);
        await use(productInfoPage);
    },
    cartPage:async({page},use)=>{
        let cartPage=new CartPage(page);
        await use(cartPage);
    }

});


export {expect} from'@playwright/test';
function aynsc(arg0: { page: any; }, use: any) {
    throw new Error("Function not implemented.");
}

