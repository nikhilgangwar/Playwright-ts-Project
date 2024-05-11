import { test, expect, Page, Locator } from "@playwright/test";
import { LoginPage } from "../page-objects/loginPage";
import { InventoryPage } from "../page-objects/inventoryPage";
import { CheckoutPage } from "../page-objects/checkoutPage";

test.beforeEach(async ({ page }) => {
  await page.goto("https://www.saucedemo.com/");
});

test("Login for standard user using atomic functions", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const inventoryPage = new InventoryPage(page);
  const checkoutPage = new CheckoutPage(page);
  await loginPage.enterusername("standard_user");
  await loginPage.enterpassword("secret_sauce");
  await loginPage.clicklogin();
  //await inventoryPage.addProductsToCart();
  await inventoryPage.addProductfromProductDetailPage(1);
  await inventoryPage.addProductfromProductDetailPage(2);
  await inventoryPage.addProductfromProductDetailPage(3);
  await inventoryPage.addProductfromProductDetailPage(4);
  await inventoryPage.addProductfromProductDetailPage(5);
  await inventoryPage.addProductfromProductDetailPage(6);
  await inventoryPage.goToShopingCart();
  await checkoutPage.clickCheckoutButton();

  await checkoutPage.enterUserInformation("nikhl", "test", "124566");

  await checkoutPage.clickContinueButton();

  await expect(page).toHaveURL(
    "https://www.saucedemo.com/checkout-step-two.html"
  );
  await page.locator('[data-test="finish"]').click();
});

test("login for standard user using helper function", async ({ page }) => {
  const loginPage = new LoginPage(page);
  await loginPage.login("standard_user", "secret_sauce");
});

test.afterEach(async ({ page }) => {
  await page.close();
});
