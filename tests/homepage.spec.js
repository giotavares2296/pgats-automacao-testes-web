import { test, expect } from '@playwright/test';

test('Verify Subscription in home page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Automation Exercise/);

    // Scroll até o rodapé
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await expect(page.locator('h2:has-text("Subscription")')).toBeVisible();

    // Gera e insere um email de teste
    const email = `sub_${Date.now()}@test.com`;
    await page.locator('#susbscribe_email').fill(email);
    await page.locator('#subscribe').click();

    // Valida a mensagem de sucesso (forma mais segura)
    const successMsg = page.locator('.alert-success', { hasText: 'You have been successfully subscribed!' });
    await expect(successMsg).toBeVisible();

    console.log('Teste "Verify Subscription in home page" executado com sucesso.');
});
