import { test, expect, Page, Locator } from "@playwright/test";

exports.InventoryPage = class InventoryPage {
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
  }

  async addProductsToCart() {
    await this.addFirstProductToCart();
    await this.addSecondProductToCart();
    await this.shopingCartCountBadge.click({ force: true });
    var cartcount = await this.shopingCartCountBadge.textContent();
    expect(cartcount).toBe("2");
  }

  async addFirstProductToCart() {
    await this.firstProduct.click();
    await this.clickOnAddToCartButton();
    await this.backToProductsLink.click();
  }

  async addSecondProductToCart() {
    await this.secondProduct.click();
    await this.clickOnAddToCartButton();
    await this.backToProductsLink.click();
  }

  async clickOnAddToCartButton() {
    await this.addToCartButton.click();
  }

  async clickOnRemoveFromCartButton() {
    await this.removeFromCartButton.click();
  }
};