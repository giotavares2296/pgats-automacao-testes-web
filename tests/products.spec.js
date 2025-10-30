import { test, expect } from '@playwright/test';

test('Verify All Products and Product Detail Page', async ({ page }) => {
    // Acessa a página inicial
    await page.goto('/');
    await expect(page).toHaveTitle(/Automation Exercise/);

    // Vai para a página de produtos
    await page.locator('a[href="/products"]').click();
    await expect(page.locator('h2.title:has-text("All Products")')).toBeVisible();

    // Verifica se há produtos listados
    const products = page.locator('.features_items .col-sm-4');
    const count = await products.count();
    expect(count).toBeGreaterThan(0);

    // Acessa o primeiro produto
    await products.first().locator('a:has-text("View Product")').click();

    // Valida detalhes do produto dentro do container .product-information
    const info = page.locator('.product-information');
    await expect(info.locator('h2')).toBeVisible();
    await expect(info.locator('p:has-text("Category")')).toBeVisible();

    // Preço: filtra por "Rs." seguido de número e pega o primeiro match
    const price = info
        .locator('span')
        .filter({ hasText: /^Rs\.\s*\d/ })
        .first();
    await expect(price).toBeVisible();

    await expect(info.locator('b:has-text("Availability")')).toBeVisible();
    await expect(info.locator('p:has-text("Condition")')).toBeVisible();
    await expect(info.locator('p:has-text("Brand")')).toBeVisible();

    console.log('Teste "Verify All Products and Product Detail Page" executado com sucesso.');
});

test('Search Product', async ({ page }) => {
    //  Acessa a página inicial
    await page.goto('/');
    await expect(page).toHaveTitle(/Automation Exercise/);

    // Vai para a página de produtos
    await page.locator('a[href="/products"]').click();
    await expect(page.locator('h2.title:has-text("All Products")')).toBeVisible();

    // Realiza busca por produto
    await page.locator('#search_product').fill('Tshirt');
    await page.locator('#submit_search').click();

    // Valida resultado da busca
    await expect(page.locator('h2.title:has-text("Searched Products")')).toBeVisible();

    const searchResults = page.locator('.features_items .col-sm-4');
    const resultCount = await searchResults.count();
    expect(resultCount).toBeGreaterThan(0);

    console.log('Teste "Search Product" executado com sucesso.');
});
