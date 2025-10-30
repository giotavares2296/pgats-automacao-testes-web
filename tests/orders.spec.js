import { test, expect } from '@playwright/test';
import { registerUser } from './utils/register-user';

test('Place Order: Register before Checkout', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Automation Exercise/);

    const user = await registerUser(page);

    await page.locator('a[href="/products"]').click();
    await expect(page.locator('.features_items')).toBeVisible();

    const firstProduct = page.locator('.features_items .col-sm-4').first();
    await firstProduct.waitFor({ state: 'visible' });

    const addToCartButton = firstProduct.locator('a.add-to-cart');
    await addToCartButton.first().scrollIntoViewIfNeeded();
    await page.waitForTimeout(800);
    await addToCartButton.first().click({ force: true });

    await page.locator('u:has-text("View Cart")').click();
    await expect(page.locator('li:has-text("Shopping Cart")')).toBeVisible();

    await page.locator('.btn.btn-default.check_out').click();
    await expect(page.locator('h2:has-text("Address Details")')).toBeVisible();

    await page.locator('textarea[name="message"]').fill('Por favor, entregar com cuidado.');
    await page.locator('a:has-text("Place Order")').click();

    await page.locator('input[data-qa="name-on-card"]').fill('Giovana QA');
    await page.locator('input[data-qa="card-number"]').fill('4111111111111111');
    await page.locator('input[data-qa="cvc"]').fill('123');
    await page.locator('input[data-qa="expiry-month"]').fill('12');
    await page.locator('input[data-qa="expiry-year"]').fill('2026');

    const payButton = page.locator('button[data-qa="pay-button"]');
    await payButton.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1000);
    await payButton.click({ force: true });

    const confirmationMessage = page.locator('p:has-text("Congratulations! Your order has been confirmed!")');
    await confirmationMessage.waitFor({ state: 'visible', timeout: 15000 });
    await expect(confirmationMessage).toBeVisible();

    const continueButton = page.locator('a:has-text("Continue")');
    await continueButton.scrollIntoViewIfNeeded();
    await continueButton.click({ force: true });

    await page.locator('a[href="/delete_account"]').click();
    await expect(page.locator('b:has-text("Account Deleted!")')).toBeVisible({ timeout: 10000 });
    await page.locator('a[data-qa="continue-button"]').click();

    console.log('Teste "Place Order: Register before Checkout" executado com sucesso.');
});
