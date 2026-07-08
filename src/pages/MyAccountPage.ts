
import { Locator,Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class MyAccountPage extends BasePage {

readonly clickOnaddressBook: Locator;

    readonly isHerderisEixsted: Locator;
    readonly clickOnEdit: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly company: Locator;
    readonly address1: Locator;
readonly city: Locator;
readonly postalCode: Locator;
readonly country: Locator;
readonly region: Locator;
readonly defaultaddress: Locator;


constructor(page:Page){
    super(page);
    this.clickOnaddressBook=page.getByRole('link',{name:'Address Book',exact:true});
    this.isHerderisEixsted=page.getByRole('heading',{name:'My Account',level:2});
    this.clickOnEdit=page.getByRole('link',{name:'Edit',exact:true}).first();
    this.firstName=page.getByLabel('First Name');
    this.lastName=page.getByLabel('Last Name');
    this.company=page.getByPlaceholder('Company');
    this.address1=page.getByLabel('Address 1');
    this.city=page.getByLabel('City');
    this.postalCode=page.getByLabel('Post Code');
    this.country=page.locator('select[name="country_id"]');
    this.region=page.locator('select[name="zone_id"]');
    this.defaultaddress=page.getByLabel('Default Address');
}
async clickOnAddressBook():Promise<void>{
    await Promise.all([
        this.page.waitForURL(/route=account\/address/),
        this.clickOnaddressBook.click()
    ]);
}
async isHeaderExist():Promise<boolean>{
    return await this.isHerderisEixsted.isVisible();
}
async clickOnEditLink():Promise<void>{
    await Promise.all([
        this.page.waitForURL(/route=account\/address\/edit/),
        this.clickOnEdit.click()
    ]);
}
async doeditAddress(firstName:string,lastName:string,company:string,address1:string,city:string,postalCode:string,country:string,
    region:string):Promise<void>{
     await this.firstName.fill(firstName);
     await this.lastName.fill(lastName);
     await this.company.fill(company);
     await this.address1.fill(address1);
     await this.city.fill(city);
     await this.postalCode.fill(postalCode);
     await this.country.selectOption({ label: country });
     await this.region.locator('option', { hasText: region }).waitFor({ state: 'attached' });
     await this.region.selectOption({ label: region });
}
}
