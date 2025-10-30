import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Contact Us Form', async ({ page }) => {
    await page.goto('https://www.automationexercise.com/contact_us');
    // Lê o arquivo de teste dentro de tests/utils
    const filePath = path.join(__dirname, 'utils', 'test-file.txt');
    const fileExists = fs.existsSync(filePath);
    if (!fileExists) throw new Error(`Arquivo não encontrado: ${filePath}`);
    await page.fill('input[name="name"]', 'Giovana QA');
    await page.fill('input[name="email"]', 'giovana@example.com');
    await page.fill('input[name="subject"]', 'Teste Playwright');
    await page.fill('textarea[name="message"]', 'Mensagem de teste automatizado.');
    await page.setInputFiles('input[name="upload_file"]', filePath);
    await page.click('input[name="submit"]');
    await page.waitForTimeout(2000);
    const successMessage = page.locator('div.status', {
        hasText: 'Success! Your details have been submitted successfully.'
    });
    await expect(page).toHaveTitle(/Contact Us/i);
    console.log('Teste "Contact Us Form" executado com sucesso.');
});
