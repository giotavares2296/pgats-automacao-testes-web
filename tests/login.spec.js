const { test, expect } = require('@playwright/test');
const { registerUser } = require('./utils/register-user');

test('Login User with correct email and password', async ({ page }) => {
  // Cria usuário novo antes de testar login
  const { email, password } = await registerUser(page, 'Giovana Test', 'Password123!');

  // Faz logout antes de logar novamente
  await page.locator('a[href="/logout"]').click();

  await page.locator('a[href="/login"]').click();
  await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();

  await page.locator('input[data-qa="login-email"]').fill(email);
  await page.locator('input[data-qa="login-password"]').fill(password);
  await page.locator('button[data-qa="login-button"]').click();

  await expect(page.locator('a:has-text("Logged in as")')).toBeVisible();

  console.log('Teste "Login User with correct email and password" executado com sucesso.');
});

test('Login User with incorrect email and password', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Automation Exercise/);

  await page.locator('a[href="/login"]').click();
  await expect(page.locator('h2:has-text("Login to your account")')).toBeVisible();

  await page.locator('input[data-qa="login-email"]').fill('wrong_email@test.com');
  await page.locator('input[data-qa="login-password"]').fill('wrongpass123');
  await page.locator('button[data-qa="login-button"]').click();

  await expect(page.locator('p:has-text("Your email or password is incorrect!")')).toBeVisible();

});