import { test, expect, Page, Locator } from "@playwright/test";

exports.CheckoutPage = class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly zippostalCode: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.zippostalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');

    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  async enterUserInformation(
    firstname: string,
    lastNames: string,
    zippostalCode: string
  ) {
    await this.enterFirstName(firstname);
    await this.enterLastName(lastNames);
    await this.enterZipPostalCode(zippostalCode);
  }

  async enterFirstName(firstName: string) {
    await this.firstName.fill(firstName);
  }

  async enterLastName(lastName: string) {
    await this.lastName.fill(lastName);
  }

  async enterZipPostalCode(zipPostalCode: string) {
    await this.zippostalCode.fill(zipPostalCode);
  }

  async clickContinueButton() {
    await this.continueButton.click();
  }

  async clickCancelButton() {
    await this.cancelButton;
  }
};
