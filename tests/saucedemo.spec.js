import {test,expect} from '@playwright/test'
import {LoginPage} from '../page-objects/loginPage'
import {InventoryPage} from '../page-objects/inventoryPage'
import {CheckoutPage} from '../page-objects/checkoutPage'
import { describe } from 'node:test';

test.beforeEach(async({page}) => {
await page.goto('https://www.saucedemo.com/')
});

describe('LoginPage', () => {

test('login for standard user using atomic functions', async ({page}) => {    
    const loginPage = new LoginPage(page)
    const inventoryPage = new InventoryPage(page)
    const checkoutPage = new CheckoutPage(page)
    await loginPage.enterusername('standard_user')
    await loginPage.enterpassword('secret_sauce')
    await loginPage.clicklogin()
    await inventoryPage.addProductsToCart();
    await page.locator('[data-test="checkout"]').click()  
    //await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html')
    await checkoutPage.enterUserInformation('nikhl','test','124566')

     await checkoutPage.clickContinueButton();
   // await page.locator('[data-test="continue"]').click()
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html')
    await page.locator('[data-test="finish"]').click()

})


test.skip('login for standard user using helper function', async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.login('standard_user','secret_sauce')
});
})

