import { expect } from '@playwright/test';

export async function registerUser(page) {
  // Vai para o site
  await page.goto('/');
  await expect(page).toHaveTitle(/Automation Exercise/);

  // Abre a tela de signup
  await page.locator('a[href="/login"]').click();
  await expect(page.locator('h2:has-text("New User Signup!")')).toBeVisible();

  // Cria email e senha aleatórios
  const timestamp = Date.now();
  const name = `Giovana_${timestamp}`;
  const email = `giovana_${timestamp}@test.com`;
  const password = 'Password123!';

  // Preenche o formulário inicial
  await page.locator('input[data-qa="signup-name"]').fill(name);
  await page.locator('input[data-qa="signup-email"]').fill(email);
  await page.locator('button[data-qa="signup-button"]').click();

  // Espera o formulário de cadastro aparecer
  await expect(page.locator('h2:has-text("Enter Account Information")')).toBeVisible();

  // Preenche os campos obrigatórios
  await page.locator('#id_gender2').check();
  await page.locator('input[data-qa="password"]').fill(password);
  await page.locator('select[data-qa="days"]').selectOption('10');
  await page.locator('select[data-qa="months"]').selectOption('5');
  await page.locator('select[data-qa="years"]').selectOption('1995');
  await page.locator('input[data-qa="first_name"]').fill('Giovana');
  await page.locator('input[data-qa="last_name"]').fill('QA');
  await page.locator('input[data-qa="address"]').fill('Rua Teste 123');
  await page.locator('select[data-qa="country"]').selectOption('Canada');
  await page.locator('input[data-qa="state"]').fill('ON');
  await page.locator('input[data-qa="city"]').fill('Toronto');
  await page.locator('input[data-qa="zipcode"]').fill('12345');
  await page.locator('input[data-qa="mobile_number"]').fill('1234567890');

  // Cria a conta
  await page.locator('button[data-qa="create-account"]').click();
  await expect(page.locator('h2:has-text("Account Created!")')).toBeVisible();

  // Continua para o site
  await page.locator('a[data-qa="continue-button"]').click();

  // Confirma que está logado
  await expect(page.locator(`a:has-text("Logged in as ${name}")`)).toBeVisible();

  // Retorna o email e senha pra reutilizar no teste
  return { email, password };
}
