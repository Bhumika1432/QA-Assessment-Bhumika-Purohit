const { test, expect } = require('@playwright/test');

test('OomnieEye login page smoke test', async ({ page }) => {
  await page.goto('http://base-application-stage.oomnieye.com/', { waitUntil: 'domcontentloaded' });
  await expect(page.getByText('OomnieEye')).toBeVisible();
  await expect(page.getByRole('button', { name: /sign in/i })).toBeVisible();
});

test('Incomplete email should not authenticate', async ({ page }) => {
  await page.goto('http://base-application-stage.oomnieye.com/', { waitUntil: 'domcontentloaded' });
  const email = page.locator('input[type="email"]');
  const password = page.locator('input[type="password"]');
  await email.fill('test123@gmail');
  await password.fill('TEST_PASSWORD');
  await page.getByRole('button', { name: /sign in/i }).click();
  // Expected behavior: validation should block authentication.
  await expect(page).not.toHaveURL(/dashboard/i);
});
