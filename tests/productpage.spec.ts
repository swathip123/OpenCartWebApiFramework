import{test,expect} from '../src/fixtures/pagefixtures.js';

test.beforeEach(async({loginPage})=>{
    await loginPage.goToLoginPage(); 
    await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!);
});
let productName="MacBook Pro";
test('verify product info page',async({homePage,productInfoPage})=>{
    await homePage.dosearch('MacBook');
    await homePage.selectProductFromResults(productName);
    await productInfoPage.getProductInfo();
    await productInfoPage.enterQuantity(2);
    await productInfoPage.clickOnAddToCart();
    const successMessage = await productInfoPage.getSuccessMessage();
    expect(successMessage).toContain(`Success: You have added ${productName} to your shopping cart!`);
});
