import { test, expect } from '@playwright/test';

test.describe('Signup Flow', () => {
    test('validates empty form and submits correctly', async ({ page }) => {
        await page.goto('http://localhost:3000');

        await page.getByTestId('signup-button').click();

        await expect(page).toHaveURL(/.*\/signup/);

        await page.getByTestId('submit-signup-button').click();

        await expect(page.locator('text=Field is required.')).toHaveCount(4);

        await page.getByLabel('First name').fill('Ricardo');
        await page.getByLabel('Last name').fill('Malveiro');
        await page.getByLabel('Email').fill('ricardo@malveiro.org');
        await page.getByTestId('password_input').fill('somePassword');

        await page.getByTestId('submit-signup-button').click();

        await expect(page).toHaveURL(/.*\/signup\/success/);
    });

    test('return to homepage on cancel click', async ({ page }) => {
        await page.goto('http://localhost:3000/signup');

        await page.getByTestId('cancel-signup-button').click();

        await expect(page).not.toHaveURL(/.*\/signup/);
    });
});