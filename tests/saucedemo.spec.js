import {test,expect} from '@playwright/test'
import {LoginPage} from '../page-objects/loginPage'  

test.beforeEach(async({page}) => {
await page.goto('https://www.saucedemo.com/')
});

test('login for standard user using atomic functions', async ({page}) => {    
    const loginPage = new LoginPage(page)
    await loginPage.enterusername('standard_user')
    await loginPage.enterpassword('secret_sauce')
    await loginPage.clicklogin()
});

test('login for standard user using helper function', async ({page}) => {
    const loginPage = new LoginPage(page)
    await loginPage.login('standard_user','secret_sauce')
});