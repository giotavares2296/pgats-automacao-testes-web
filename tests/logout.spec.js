import { test, expect } from '@playwright/test';
import { registerUser } from './utils/register-user';

test('Logout User', async ({ page }) => {
    const user = await registerUser(page);
    await page.goto('/');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.locator('a[href="/logout"]').click();
    await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();

    console.log('Teste "Logout User" executado com sucesso.');
});
