import { test, expect, Page, Locator } from "@playwright/test";

export class CheckoutConfirmationPage {
  /**
   * @param {import('@playwright/test').Page} page
   */

  readonly page: Page;
  readonly finishButton: Locator;
  readonly cancelButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.finishButton = page.locator('[data-test="finish"]');
    this.cancelButton = page.locator('[data-test="cancel"]');
  }

  /**
   * Clicks Finish button
   * @param No arguments
   */
  async clickFinishButton() {
    await this.finishButton.click();
  }

  /**
   * Clicks the cancel button
   * @param No arguments
   */
  async clickCancelButton() {
    await this.cancelButton.click();
  }
}
