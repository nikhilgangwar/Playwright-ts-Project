import { test, expect, Page, Locator } from "@playwright/test";

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

  async login(username: string, password: string) {
    await this.enterusername(username);
    await this.enterpassword(password);
    await this.clicklogin();
  }

  async enterusername(username: string) {
    await this.usernameInput.fill(username);
  }

  async enterpassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async clicklogin() {
    await this.loginButton.click();
  }

  async getError() {
    return await this.error.textContent();
  }
};
