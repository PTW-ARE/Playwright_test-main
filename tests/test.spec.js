const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
});


test('TC01', async ({ page }) => {
    // await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.locator('#username').fill('student');
    await page.locator('#password').fill('Password123');



    // await page.getByLabel('Username').fill('student');
    // await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();

    // await page.getByRole('heading', { name: 'Logged In Successfully' });


    // await expect(page).toHaveURL('https://practicetestautomation.com/logged-in-successfully/');
    await expect(page.locator('h1')).toHaveText('Logged In Successfully');

    // getByRole('heading', { name: 'Logged In Successfully' })
    // await page.screenshot({ path: "screenshot_login.png" });
    await page.screenshot({ path: "./tests/screenshot_login.png" });

})

test('TC02', async ({ page }) => {
    // await page.goto('https://practicetestautomation.com/practice-test-login/');
    await page.locator('#username').fill('incorrectUser ');
    await page.locator('#password').fill('Password123');



    // await page.getByLabel('Username').fill('student');
    // await page.getByLabel('Password').fill('Password123');
    await page.getByRole('button', { name: 'Submit' }).click();

    // await page.getByRole('heading', { name: 'Logged In Successfully' });

    await expect(page.locator('#error')).toHaveText('Your username is invalid!');

})

test('TC03', async ({ page }) => {

    // await page.goto('https://practicetestautomation.com/practice-test-login/');
    // await page.locator('#username').fill('incorrectUser ');
    // await page.locator('#password').fill('Password123');

    await page.getByLabel('Username').fill('student');
    await page.getByLabel('Password').fill('incorrectPassword');
    await page.getByRole('button', { name: 'Submit' }).click();

    // await page.getByRole('heading', { name: 'Logged In Successfully' });

    // await expect(page.locator('#error')).toHaveText('Your password is invalid!');
    await expect(page.getByText('Your username is invalid!')).toHaveText('Your username is invalid!');

    // await page.screenshot({ path: "./tests/screenshot_login.png" });

})