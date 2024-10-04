const { test, expect } = require('@playwright/test');

// ข้อมูลสำหรับทดสอบ
const testCases = {
    valid: { username: 'student', password: 'Password123', expectedHeading: 'Logged In Successfully', expectError: false },
    invalidUsername: { username: 'incorrectUser', password: 'Password123', expectedError: 'Your username is invalid!', expectError: true },
    invalidPassword: { username: 'student', password: 'incorrectPassword', expectedError: 'Your password is invalid!', expectError: true }
};

// ฟังก์ชันสำหรับล็อกอิน
async function login(page, username, password) {
    await page.fill('#username', username);
    await page.fill('#password', password);
    
    await page.getByRole('button', { name: 'Submit' }).click();
}

test.beforeEach(async ({ page }) => {
    await page.goto('https://practicetestautomation.com/practice-test-login/');
});

test('TC01 - Successful Login', async ({ page }) => {
    const { username, password, expectedHeading } = testCases.valid;
    await login(page, username, password);

    const heading = await page.locator('h1');
    await expect(heading).toHaveText(expectedHeading);

    await page.screenshot({ path: './tests/screenshot_login_success.png' });
});

test('TC02 - Invalid Username', async ({ page }) => {
    const { username, password, expectedError } = testCases.invalidUsername;
    await login(page, username, password);

    const error = page.locator('#error');
    await expect(error).toHaveText(expectedError);

    await page.screenshot({ path: './tests/screenshot_invalid_username.png' });
});

test('TC03 - Invalid Password', async ({ page }) => {
    const { username, password, expectedError } = testCases.invalidPassword;
    await login(page, username, password);

    const error = page.locator('#error');
    await expect(error).toHaveText(expectedError);

    await page.screenshot({ path: './tests/screenshot_invalid_password.png' });
});
