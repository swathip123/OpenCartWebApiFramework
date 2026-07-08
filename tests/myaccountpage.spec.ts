import {test,expect} from "../src/fixtures/pagefixtures.js";
import { CsvHelper } from "../src/utlis/CsvHelper.js";
import path from "node:path";

test.describe.configure({ mode: 'serial' });




   test.beforeEach(async({loginPage})=>{
      
     await loginPage.goToLoginPage(); 
      await loginPage.doLogin(process.env.APP_USERNAME!, process.env.APP_PASSWORD!)  

    })

    test('verify homepage title',async({myAccountPage})=>{
       expect(await myAccountPage.isHeaderExist()).toBeTruthy();
    })

    let testdata = CsvHelper.readCsv(path.resolve(process.cwd(), 'src/data/editaddressBokkData.csv'));
    for(let data of testdata){
        test(`edit address book deatils - ${data.country}`,async({myAccountPage})=>{
           await myAccountPage.clickOnAddressBook();
           await myAccountPage.clickOnEditLink();
           await myAccountPage.doeditAddress(data.firstName,data.lastName,data.company,data.address1,data.city,data.postalCode,data.country,data.region);
    })
}
