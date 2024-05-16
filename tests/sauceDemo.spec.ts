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
});

test("Login for standard user using atomic functions", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);
  const checkoutConfirmationPage = new CheckoutConfirmationPage(page);

  await loginPage.enterusername(process.env.STANDARDUSER);
  await loginPage.enterpassword(process.env.PASSWORD);
  await loginPage.clicklogin();

  await inventoryPage.addProductfromProductDetailPage(1);
  await inventoryPage.addProductfromProductDetailPage(2);
  await inventoryPage.addProductfromProductDetailPage(3);
  await inventoryPage.addProductfromProductDetailPage(4);
  await inventoryPage.addProductfromProductDetailPage(5);
  await inventoryPage.addProductfromProductDetailPage(6);
  await inventoryPage.goToShopingCart();
  await checkoutPage.clickCheckoutButton();

  const firstName = faker.person.firstName();
  var lastName = faker.person.lastName();
  var zipPostalCode = faker.location.zipCode();

  await checkoutPage.enterUserInformation(firstName, lastName, zipPostalCode);

  await checkoutPage.clickContinueButton();

  await expect(page).toHaveURL(
    "/checkout-step-two.html"
  );

  await checkoutConfirmationPage.clickFinishButton();
});

test("login for standard user using helper function", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login(process.env.STANDARDUSER, process.env.PASSWORD);
});

test.afterEach(async ({ page }) => {
  await page.close();
});

test("Test running using different environments", async ({ page }) => {
  console.log(config.environmentName)
  console.log(config.baseURL)
  console.log(config.standardUser.userName)
  console.log(config.lockedUser.userName)  
});
