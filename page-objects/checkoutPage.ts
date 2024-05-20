import { test, expect, Page, Locator } from "@playwright/test";

export class CheckoutPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  readonly page: Page;
  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly zippostalCode: Locator;
  readonly continueButton: Locator;
  readonly cancelButton: Locator;
  readonly checkoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.firstName = page.locator('[data-test="firstName"]');
    this.lastName = page.locator('[data-test="lastName"]');
    this.zippostalCode = page.locator('[data-test="postalCode"]');
    this.continueButton = page.locator('[data-test="continue"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  /**
   * Enter User information on checkout page
   * @param {string} firstname
   * @param {string} lastName
   * @param {string} zipPostalCode
   */
  async enterUserInformation(
    firstName: string,
    lastNames: string,
    zippostalCode: string
  ) {
    await this.enterFirstName(firstName);
    await this.enterLastName(lastNames);
    await this.enterZipPostalCode(zippostalCode);
  }

  /**
   * Enter First Name
   * @param {string} firstName
   */
  async enterFirstName(firstName: string) {
    await this.firstName.fill(firstName);
  }

  /**
   * Enter Last Name
   * @param {string} lastName
   */
  async enterLastName(lastName: string) {
    await this.lastName.fill(lastName);
  }

  /**
   * Enter Zip Postal Code
   * @param {string} zipPostalCode
   */
  async enterZipPostalCode(zipPostalCode: string) {
    await this.zippostalCode.fill(zipPostalCode);
  }

  /** Clicks Continue Button on checkout Page
   * @param No arguments
   */
  async clickContinueButton() {
    await this.continueButton.click();
  }

  /** Clicks CHeckout Button on checkout Page
   * @param No arguments
   */
  async clickCheckoutButton() {
    await this.checkoutButton.click();
  }

  /** Clicks Cancel Button on checkout Page
   * @param No arguments
   */
  async clickCancelButton() {
    await this.cancelButton;
  }
}
