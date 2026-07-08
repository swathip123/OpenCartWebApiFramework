import {test,expect} from "../src/fixtures/pagefixtures.js";
import { CsvHelper } from "../src/utlis/CsvHelper.js";
import path from "node:path";

test.beforeEach(async({registerPage})=>{
    await registerPage.goToRegisterPage();
})

// test('login to register Page',async({registerPage})=>{
//     await registerPage.goToRegisterPage();
// });

test('register page title test',async({registerPage})=>{
    const apgetitle=await registerPage.getRegisterPageTitile();
    console.log("register page title is ",apgetitle);
    expect(apgetitle).toContain('Register Account');
})

let testData =CsvHelper.readCsv(path.resolve(process.cwd(), 'src/data/registerData.csv'));
for (let data of testData) {
    test(`general register test - ${data.email} - ${data.firstName}`, async ({ registerPage }) => {
        await registerPage.doRegister(data.firstName, data.lastName, data.email, data.telephone, data.password, data.confirmPassword || data.password);
    });
}
