import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class RegisterPage extends BasePage{
    private readonly firstName : Locator;
    private readonly lastName : Locator;
    private readonly email : Locator;
    private readonly telephone : Locator;
    private readonly password : Locator;
    private readonly confirmPassword : Locator;

    constructor(page:Page){
super(page);
this.firstName=page.getByRole('textbox',{name:'First Name'});
this.lastName=page.getByRole('textbox',{name:'Last Name'});
this.email=page.getByRole('textbox',{name:'E-Mail'});
this.telephone=page.getByRole('textbox',{name:'Telephone'});
this.password=page.getByRole('textbox',{name:'* Password',exact:true});
this.confirmPassword=page.getByRole('textbox',{name:'Password Confirm'});
    }


    async goToRegisterPage():Promise<void>{
        await this.page.goto('/opencart/index.php?route=account/register',{waitUntil:'domcontentloaded'})
    }
    async getRegisterPageTitile():Promise<string>{
        return await this.page.title();

    }
    async doRegister(firstName:string,lastName:string,email:string,telephone:string,password:string,confirmPassword:string):
    Promise<void>{
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.email.fill(email);
        await this.telephone.fill(telephone);
        await this.password.fill(password);
        await this.confirmPassword.fill(confirmPassword);
}
}
