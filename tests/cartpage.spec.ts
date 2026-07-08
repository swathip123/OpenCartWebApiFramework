import{test,expect} from '../src/fixtures/pagefixtures.js';

test.beforeEach(async({loginPage})=>{
    await loginPage.goToLoginPage(); 
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
});
let productName="MacBook Pro";

test('verify product info page',async({cartPage,productInfoPage})=>{
    await productInfoPage.clickOnShoppingCart();
    await cartPage.getCartPageHeader();
    await cartPage.getProductName();
    await cartPage.getProductModel();


})