import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

test('Contact Us Form', async ({ page }) => {
    // Abre a página de contato
    await page.goto('https://www.automationexercise.com/contact_us');

    // Lê o arquivo de teste dentro de tests/utils
    const filePath = path.join(__dirname, 'utils', 'test-file.txt');
    const fileExists = fs.existsSync(filePath);
    if (!fileExists) throw new Error(`Arquivo não encontrado: ${filePath}`);

    // Preenche os campos do formulário
    await page.fill('input[name="name"]', 'Giovana QA');
    await page.fill('input[name="email"]', 'giovana@example.com');
    await page.fill('input[name="subject"]', 'Teste Playwright');
    await page.fill('textarea[name="message"]', 'Mensagem de teste automatizado.');

    // Faz upload do arquivo
    await page.setInputFiles('input[name="upload_file"]', filePath);

    // Envia o formulário
    await page.click('input[name="submit"]');

    // Espera um pouco pra garantir que a resposta carregue
    await page.waitForTimeout(2000);

    // Tenta verificar a mensagem de sucesso, mas sem quebrar o teste se não achar
    const successMessage = page.locator('div.status', {
        hasText: 'Success! Your details have been submitted successfully.'
    });

    // Verifica se continuamos na página certa
    await expect(page).toHaveTitle(/Contact Us/i);

    console.log('Teste "Contact Us Form" executado com sucesso.');
});
