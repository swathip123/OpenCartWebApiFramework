//import {BasePage} from "./BasePage.js"

import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";


export class Homepage extends BasePage{

    //private locators 

    private readonly logoutlink:Locator;
    private readonly headers:Locator;
private readonly search:Locator;
private readonly searchbutton:Locator;

    //constructor of the calss -to initlaize the locators
    constructor(page:Page){
        super(page);
        this.logoutlink=page.getByRole('link',{name:'Logout'});
        this.headers=page.getByRole('heading',{level:2});
        this.search=page.getByRole('textbox',{name:'Search'});
        this.searchbutton=page.locator('#search button');
    };

    //public [age actions]

    async gethomePagelinkexist() : Promise<string>{
    return await this.page.title();   
 }

    async isLogoutlinkExist() : Promise<boolean>{
       return await this.logoutlink.isVisible();
    }

    async getLoginPageTitle():Promise<string>{
        return await this.page.title();
    }
    async getHomePageHeaders():Promise<string[]>{
       return await this.headers.allInnerTexts();
    }

async dosearch(prodctName:string):Promise<void>{
    await this.search.fill(prodctName);
    await Promise.all([
        this.page.waitForURL(/route=product\/search/),
        this.searchbutton.click()
    ]);
}

async selectProductFromResults(prodctName:string):Promise<void>{
    const productLink=this.page.locator('.product-thumb .caption').getByRole('link',{name:prodctName,exact:true});
    await Promise.all([
        this.page.waitForURL(/route=product\/product/),
        productLink.click()
    ]);

}
} 
