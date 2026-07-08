import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.js";

export class ProductInfoPage extends BasePage {
  readonly header: Locator;
  readonly productImages: Locator;
  readonly productMetaData: Locator;
  readonly productPriceData: Locator;
  readonly productQuantity: Locator;
  private map: Map<string, string|number>;
  readonly verifysucessmessage: Locator;
  readonly addToCartButton: Locator;
  readonly clickOnShiipingCart:Locator;

  constructor(page: Page) {
    super(page);
    this.header = page.getByRole("heading", { level: 1 });
    this.productImages = page.locator("div#content li img");
    this.productMetaData = page.locator(
      "div#content ul.list-unstyled:nth-of-type(1) li",
    );
    this.productPriceData = page.locator(
      "div#content ul.list-unstyled:nth-of-type(2) li",
    );
    this.productQuantity = page.locator('div#content input[name="quantity"]');
    this.map = new Map<string, string|number>();
    this.verifysucessmessage = page.locator("div.alert.alert-success.alert-dismissible");
    this.addToCartButton = page.getByRole('button', { name: 'Add to Cart' });
    this.clickOnShiipingCart = page.getByRole('link', { name: 'Shopping Cart' });
  }

  async getProductHeader(): Promise<string> {
    return await this.header.innerText();
  }

  async getProductImagesCount(): Promise<number> {
    return await this.productImages.count();
  }

  async getProductInfo(): Promise<Map<string, string|number>> {
    this.map.set('productHeader', await this.getProductHeader());
    this.map.set('productImagesCount', await this.getProductImagesCount());
    
    await this.getProductMetaData();
    await this.getProductPriceData();
    return this.map;
  }
  private async getProductMetaData(): Promise<void> {
    let metadata = await this.productMetaData.allInnerTexts();
    for (let data of metadata) {
      let meta = data.split(":");
      let key = meta[0].trim();
      let value = meta[1].trim();
      this.map.set(key, value);
      console.log(`key: ${key} and value: ${value}`);
    }
  }

  private async getProductPriceData(): Promise<void> {
    let priceData = await this.productPriceData.allInnerTexts();
    let price = priceData[0].trim();
    let exTax = priceData[1].trim();
    let exTaxValue = exTax.split(":")[1].trim();
    this.map.set("price", price);
    this.map.set("ExTaxPrice", exTaxValue);
    console.log(`price: ${price} and ExTaxPrice: ${exTaxValue}`);
  }

  async enterQuantity(quantity: number): Promise<void> {
    await this.productQuantity.fill(quantity.toString());
    console.log(`Entered quantity: ${quantity}`);
  }

  async clickOnAddToCart(): Promise<void> {
    await Promise.all([
      this.page.waitForResponse(response => response.url().includes('/index.php?route=checkout/cart/add') && response.status() === 200),
      this.addToCartButton.click()
    ]);
  }

  async getSuccessMessage(): Promise<string> {
    return await this.verifysucessmessage.innerText();
  }
  async clickOnShoppingCart(): Promise<void> {
    await Promise.all([
      this.page.waitForURL(/route=checkout\/cart/),
      this.clickOnShiipingCart.click()
    ]);
  }
}
