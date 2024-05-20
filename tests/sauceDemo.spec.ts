import dotenv from "dotenv";
const stack = process.env.STACK || "automation-au";
const config = require(`../config/${stack}.json`);
import { test, expect, Page, Locator } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { InventoryPage } from "../page-objects/inventoryPage";
import { CheckoutPage } from "../page-objects/checkoutPage";
import { CheckoutConfirmationPage } from "../page-objects/checkoutConfirmationPage";
import { faker } from "@faker-js/faker";

test.describe("Login, Add products and checkout should be successful", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    //await argosScreenshot(page, "Login Page");
  });
  test("Login for standard user and products listing page should be displayed", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    //Enter username and password
    await loginPage.login(process.env.STANDARDUSER, process.env.PASSWORD);
    const inventoryPage = new InventoryPage(page);

    //expect products List page
    await inventoryPage.expectPagetitleisProducts();
  });
  test("Login for standard user Add Products from detail page to Cart and checkout should be successful", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutConfirmationPage = new CheckoutConfirmationPage(page);

    //Enter username
    await loginPage.enterusername(process.env.STANDARDUSER);

    //Enter password
    await loginPage.enterpassword(process.env.PASSWORD);

    //Login
    await loginPage.clicklogin();

    //expect products page
    await inventoryPage.expectPagetitleisProducts();

    //Add Products
    await inventoryPage.addProductfromProductDetailPage(1);

    await inventoryPage.addProductfromProductDetailPage(2);

    //Go to Shoping Cart
    await inventoryPage.goToShopingCart();

    //Checkout
    await checkoutPage.clickCheckoutButton();

    //Generate user information
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const zipPostalCode = faker.location.zipCode();

    //Enter User Information
    await checkoutPage.enterUserInformation(firstName, lastName, zipPostalCode);

    //Continue
    await checkoutPage.clickContinueButton();

    //expect checkout confirmation page
    await expect(page).toHaveURL("/checkout-step-two.html");

    //Finish
    await checkoutConfirmationPage.clickFinishButton();
  });

  test("Login for standard user Add Products from List page to Cart and checkout should be successful", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);
    const checkoutConfirmationPage = new CheckoutConfirmationPage(page);

    //Enter username
    await loginPage.enterusername(process.env.STANDARDUSER);

    //Enter password
    await loginPage.enterpassword(process.env.PASSWORD);

    //Login
    await loginPage.clicklogin();

    //expect products page
    await inventoryPage.expectPagetitleisProducts();

    //Add Products from Product List page to Cart
    await inventoryPage.addProductfromProductListPage(1);

    //Add Products from Product List page to Cart
    await inventoryPage.addProductfromProductListPage(2);

    //Add Products from Product List page to Cart
    await inventoryPage.addProductfromProductListPage(3);

    //Go to Shoping Cart
    await inventoryPage.goToShopingCart();

    //Checkout
    await checkoutPage.clickCheckoutButton();

    //Generate user information
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const zipPostalCode = faker.location.zipCode();

    //Enter User Information
    await checkoutPage.enterUserInformation(firstName, lastName, zipPostalCode);

    //Continue
    await checkoutPage.clickContinueButton();

    //expect checkout confirmation page
    await expect(page).toHaveURL("/checkout-step-two.html");

    //Finish
    await checkoutConfirmationPage.clickFinishButton();
  });
});

test.describe("Test for negative scenarios", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    //await argosScreenshot(page, "Login Page");
  });
  test("Login for Locked user", async ({ page }) => {
    const loginPage = new LoginPage(page);

    //Enter username and password
    await loginPage.login(process.env.LOCKEDUSER, process.env.PASSWORD);
    const errorContent = await page
      .locator('[data-test="error"]')
      .textContent();

    //expect error message
    await expect(errorContent).toContain(
      "Epic sadface: Sorry, this user has been locked out."
    );
  });

  test("Login for performance glitch user should take sometime on Login", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    //Enter username and password
    await loginPage.login(
      process.env.PERFORMANCEGLITCHUSER,
      process.env.PASSWORD
    );
    const inventoryPage = new InventoryPage(page);

    //expect products page
    await inventoryPage.expectPagetitleisProducts();
  });

  test("Login for invalid user should show error on login page", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);

    //Enter Invalid username and password
    await loginPage.login(
      faker.internet.userName.toString(),
      process.env.PASSWORD
    );
    const errorContent = await page
      .locator('[data-test="error"]')
      .textContent();

    //expect error message
    await expect(errorContent).toContain(
      "Epic sadface: Username and password do not match any user in this service"
    );
  });

  test("Login for Problem user Add Products from detail page to Cart and checkout should show error for last name", async ({
    page,
  }) => {
    const loginPage = new LoginPage(page);
    const inventoryPage = new InventoryPage(page);
    const checkoutPage = new CheckoutPage(page);
    //const checkoutConfirmationPage = new CheckoutConfirmationPage(page);

    //Enter username
    await loginPage.enterusername(process.env.PROBLEMUSER);

    //Enter password
    await loginPage.enterpassword(process.env.PASSWORD);

    //Login
    await loginPage.clicklogin();

    //await page.waitForTimeout(10000);
    //expect products page
    await inventoryPage.expectPagetitleisProducts();
    //await page.waitForTimeout(10000);
    //Add Products
    await inventoryPage.addProductfromProductListPage(1);

    await inventoryPage.addProductfromProductListPage(2);

    //Go to Shoping Cart
    await inventoryPage.goToShopingCart();

    //Checkout
    await checkoutPage.clickCheckoutButton();

    //generate user information
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const zipPostalCode = faker.location.zipCode();

    //Enter User Information
    await checkoutPage.enterUserInformation(firstName, lastName, zipPostalCode);

    //Continue
    await checkoutPage.clickContinueButton();
    await page.waitForTimeout(1000);
    //expect Error on checkout confirmation page
    const errorContent = await page
      .locator('[data-test="error"]')
      .textContent();
    await expect(errorContent).toContain("Error: Last Name is required");
  });
});

test.afterEach(async ({ page }) => {
  await page.close();
});

/* this test is only sample for running tests with different environments using dotenv using different config files
test("Test running using different environments", async ({ page }) => {
  console.log(config.environmentName);
  console.log(config.baseURL);
  console.log(config.standardUser.userName);
  //console.log(config.lockedUser.userName)
});
*/
