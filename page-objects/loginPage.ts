import {Page, Locator} from "@playwright/test";

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.locator('[data-test="username"]');
    this.passwordInput = page.locator('[data-test="password"]');
    this.loginButton = page.locator('[data-test="login-button"]');
    this.error = page.locator(".error");
  }

  /**
   *Enter username and password and click on login button
   * @param username username string
   * @param password Password string
   */
  async login(username: any, password: any) {
    await this.enterusername(username);
    await this.enterpassword(password);
    await this.clicklogin();
  }
  /**
   * Enter username
   * @param username
   */
  async enterusername(username: any) {
    await this.usernameInput.fill(username);
  }
  /**
   * Enter password
   * @param password string
   */

  async enterpassword(password: any) {
    await this.passwordInput.fill(password);
  }
  /**
   * Click on login button
   * @param no parameters
   */
  async clicklogin() {
    await this.loginButton.click();
  }
  /**
   * get the error message on login page
   * @param no parameters
   */
  async getError() {
    return await this.error.textContent();
  }
}
