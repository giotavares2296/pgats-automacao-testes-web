import { test, expect } from '@playwright/test';

test('Verify All Products and Product Detail Page', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.locator('a[href="/products"]').click();
    await expect(page.locator('h2.title:has-text("All Products")')).toBeVisible();
    const products = page.locator('.features_items .col-sm-4');
    const count = await products.count();
    expect(count).toBeGreaterThan(0);
    await products.first().locator('a:has-text("View Product")').click();
    const info = page.locator('.product-information');
    await expect(info.locator('h2')).toBeVisible();
    await expect(info.locator('p:has-text("Category")')).toBeVisible();
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
    await page.goto('/');
    await expect(page).toHaveTitle(/Automation Exercise/);
    await page.locator('a[href="/products"]').click();
    await expect(page.locator('h2.title:has-text("All Products")')).toBeVisible();
    await page.locator('#search_product').fill('Tshirt');
    await page.locator('#submit_search').click();
    await expect(page.locator('h2.title:has-text("Searched Products")')).toBeVisible();
    const searchResults = page.locator('.features_items .col-sm-4');
    const resultCount = await searchResults.count();
    expect(resultCount).toBeGreaterThan(0);
    console.log('Teste "Search Product" executado com sucesso.');
});
