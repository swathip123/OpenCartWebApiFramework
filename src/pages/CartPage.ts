import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class CartPage extends BasePage {
  readonly header: Locator;
  readonly productImages: Locator;
  readonly productName:Locator;
  readonly productModel:Locator;
  readonly productQuantity:Locator;
  readonly productUnitPrice:Locator;
  readonly productTotal:Locator;
  readonly checkoutButton:Locator;
readonly checkoutButtonNext :Locator
  constructor(page: Page) {
    super(page);
    this.header = page.getByRole("heading", { level: 1 });
    this.productImages = page.locator("div#content img");
    this.productName=page.locator('div#content td.text-left a');
    this.productModel=page.locator('div#content td:nth-of-type(2)');
    this.productQuantity=page.locator('div#content input[name*="quantity"]');
    this.productUnitPrice=page.locator('div#content td:nth-of-type(4)');
    this.productTotal=page.locator('div#content td:nth-of-type(5)');
    this.checkoutButton=page.getByRole('link',{name:'Checkout'});
    this.checkoutButtonNext=page.getByRole('link',{name:'Checkout'});

  }

  async getCartPageHeader(): Promise<string> {
    return await this.header.innerText();
  }
  async getProductName(): Promise<string> {
    return await this.productName.innerText();
  }
  async getProductModel(): Promise<string> {
    return await this.productModel.innerText();
  }
}