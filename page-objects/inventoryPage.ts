import { test, expect, Page, Locator } from "@playwright/test";

import { products } from "../test-data/products.json";

export class InventoryPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  readonly page: Page;
  readonly firstProduct: Locator;
  readonly secondProduct: Locator;
  readonly addToCartButton: Locator;
  readonly removeFromCartButton: Locator;
  readonly backToProductsLink: Locator;
  readonly shopingCartCountBadge: Locator;
  readonly productPageTitle: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstProduct = page.locator('[data-test="item-4-title-link"]');
    this.secondProduct = page.locator('[data-test="item-5-title-link"]');
    this.addToCartButton = page.locator('[data-test="add-to-cart"]');
    this.removeFromCartButton = page.locator('[data-test="remove"]');
    this.backToProductsLink = page.locator('[data-test="back-to-products"]');
    this.shopingCartCountBadge = page.locator(
      '[data-test="shopping-cart-badge"]'
    );
    this.productPageTitle = page.locator('[data-test="title"]');
  }

  async clickOnAddToCartButton() {
    await this.addToCartButton.click({ force: true });
  }

  async clickOnRemoveFromCartButton() {
    await this.removeFromCartButton.click();
  }

  async addProductfromProductDetailPage(id: number) {
    const product = products[id - 1];
    const datatestvalue = product.datatest;
    await this.page.locator("[data-test=" + datatestvalue + "]").click();

    await this.clickOnAddToCartButton();
    await this.backToProductsLink.click();
  }

  /**
   * Add a new product based on Array index of product (test-data/products.json)
   * @param id number start index of product is 0 and end index of product is 5
   */
  async addProductfromProductListPage(id: number) {
    const product = products[id - 1];
    const datatestvalue = product.datatest;
    const datatestbuttonvalue = product.datatestbutton;
    await this.page.locator("[data-test=" + datatestbuttonvalue + "]").click();
  }

  /**
   * Click on Shoping Cart Badge to go to Shoping Cart Page
   * @param No arguments
   */
  async goToShopingCart() {
    await this.shopingCartCountBadge.click({ force: true });
  }

  /**
   * Expect Page title is Product on Product List page
   * @param No arguments
   */
  async expectPagetitleisProducts() {
    await expect(
      this.productPageTitle.filter({ hasText: "Products" })
    ).toBeTruthy();
  }
}
