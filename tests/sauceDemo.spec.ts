import dotenv from "dotenv";
const stack = process.env.STACK || "automation-au";
const config = require(`../config/${stack}.json`);
import { test, expect, Page, Locator } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { InventoryPage } from "../page-objects/inventoryPage";
import { CheckoutPage } from "../page-objects/checkoutPage";
import { CheckoutConfirmationPage } from "../page-objects/checkoutConfirmationPage";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  //await argosScreenshot(page, "Login Page");
});

test("Login for standard user using atomic functions", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);
  const checkoutConfirmationPage = new CheckoutConfirmationPage(page);

  await loginPage.enterusername(process.env.STANDARDUSER);
  await loginPage.enterpassword(process.env.PASSWORD);
  //await argosScreenshot(page, "Login Page - Entered Credentials");
  await loginPage.clicklogin();

  await inventoryPage.expectPagetitleisProducts();
  //await argosScreenshot(page, "Products Page");
  await inventoryPage.addProductfromProductDetailPage(1);
  await inventoryPage.addProductfromProductDetailPage(2);
  //await argosScreenshot(page, "Added Products to Cart");
  await inventoryPage.addProductfromProductDetailPage(3);
  await inventoryPage.addProductfromProductDetailPage(4);
  await inventoryPage.addProductfromProductDetailPage(5);
  await inventoryPage.addProductfromProductDetailPage(6);
  await inventoryPage.goToShopingCart();
  // await argosScreenshot(page, "Shoping Cart Page");
  await checkoutPage.clickCheckoutButton();
  // await argosScreenshot(page, "Checkout Page");

  const firstName = faker.person.firstName();
  var lastName = faker.person.lastName();
  var zipPostalCode = faker.location.zipCode();

  //await argosScreenshot(page, "User Information Page");
  await checkoutPage.enterUserInformation(firstName, lastName, zipPostalCode);
  //await argosScreenshot(    page,    "User Information Page - Entered User Information"  );
  await checkoutPage.clickContinueButton();

  await expect(page).toHaveURL("/checkout-step-two.html");

  await checkoutConfirmationPage.clickFinishButton();
  // await argosScreenshot(page, "Checkout Confirmation Page");
});

test("login for standard user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.STANDARDUSER, process.env.PASSWORD);
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.expectPagetitleisProducts();
});

test("login for Locked user", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.LOCKEDUSER, process.env.PASSWORD);
  const errorContent = await page.locator('[data-test="error"]').textContent();
  await expect(errorContent).toContain(
    "Epic sadface: Sorry, this user has been locked out."
  );
});

test("login for performance glitch user", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.login(
    process.env.PERFORMANCEGLITCHUSER,
    process.env.PASSWORD
  );
  const inventoryPage = new InventoryPage(page);
  await inventoryPage.expectPagetitleisProducts();
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("Test running using different environments", async ({ page }) => {
  console.log(config.environmentName);
  console.log(config.baseURL);
  console.log(config.standardUser.userName);
  //console.log(config.lockedUser.userName)
});
