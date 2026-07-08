import { Locator, Page } from "playwright/test";


export class BasePage{

    readonly page:Page;

    //common locators and methods for all pages can be defined here
    protected readonly logo:Locator;
    protected readonly searchBox:Locator;
    protected readonly searchButton:Locator;
constructor (page:Page){
this.page =page;
this.logo=page.getByRole('link',{name:'Your Store'});
this.searchBox=page.getByRole('textbox',{name:'Search'});
this.searchButton=page.locator('#search button');
}

async isLogoExist():Promise<boolean>{
    return await this.logo.isVisible();
}

async doSearch(productName:string):Promise<void>{
    await this.searchBox.fill(productName);
    await this.searchButton.click();
}

//page level actions can be defined here
async getPageTitle():Promise<string>{
    return await this.page.title();

}
async getPageURL():Promise<string>{
    return this.page.url();
}
async getcurrentTitle():Promise<string>{
    return await this.page.title();
}

async takeScreenshot(screenshotName:string):Promise<Buffer>{
    return await this.page.screenshot({path:`screenshots/${screenshotName}.png`,fullPage:true});
}
}