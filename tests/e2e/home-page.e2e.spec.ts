import { test, expect } from '@playwright/test';

test.describe('Home Page', () => {
    test('displays signup button', async ({ page }) => {
        await page.goto('http://localhost:3000');

        expect(await page.getByTestId('signup-button')).toBeDefined();
    });
});