//import {BasePage} from "./BasePage.js"

import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";


export class LoginPage extends BasePage{

    //private locators 

    private readonly emailId:Locator;
    private readonly password:Locator;
    private readonly forgottenPasswordLink:Locator;
    private readonly login :Locator;
    private readonly logo:Locator;
    private readonly loginerrorMrssgae:Locator;


    //constructor of the calss -to initlaize the locators
    constructor(page:Page){
        super(page);
        this.emailId=page.getByRole('textbox',{name:'E-Mail Address'});
        this.password=page.getByRole('textbox',{name:'Password'});
        this.forgottenPasswordLink=page.getByRole('link',{name:'Forgotten Password'}).first();
        this.login=page.getByRole('button',{name:'Login'});
        this.logo=page.getByRole("img",{name:'naveenopencart'});
        this.loginerrorMrssgae=page.getByText('Warning: No match for E-Mail Address and/or Password.');
    };

    //public [age actions]

    async goToLoginPage() : Promise<void>{
        await this.page.goto('/opencart/index.php?route=account/login', { waitUntil: 'domcontentloaded' });
        await this.emailId.waitFor({ state: 'visible', timeout: 15000 });
    }

    async goToLoinPage() : Promise<void>{
        await this.goToLoginPage();
    }

    async getLoginPageTitle():Promise<string>{
        return await this.page.title();
    }
 async isForgetpwdLinkExist():Promise<boolean>{
        return await this.forgottenPasswordLink.isVisible();
    }
async doLogin(userName:string,password:string) :Promise<void>{
     console.log(`user cred : ${userName} : ${password}`);
     await this.emailId.fill(userName);
     await this.password.fill(password);
     await this.login.click();
}

async isLoginErrorMessageExist():Promise<boolean>{
    return await this.loginerrorMrssgae.isVisible();
} 

}