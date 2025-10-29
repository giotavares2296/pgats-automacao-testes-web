import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  use: {
    browserName: 'chromium',
    headless: false, // deixa o navegador visível
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    baseURL: 'https://automationexercise.com',
  },
  reporter: [['html', { open: 'never' }]],
});