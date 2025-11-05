import { expect } from '@playwright/test';
import { test } from './fixtures';

test('Login - successful', async ({ page }) => {
  await page.goto('/login');
  // Use env-provided test account or prompt to set via fixtures
  const testEmail = process.env.TEST_EMAIL || 'existing+qa@example.com';
  const testPwd = process.env.TEST_PASSWORD || 'TestPwd123!';
  await page.getByLabel('Email').fill(testEmail);
  await page.getByLabel('Password').fill(testPwd);
  await Promise.all([
    page.waitForResponse(resp => resp.url().includes('/api/auth/login') && resp.status() === 200),
    page.getByRole('button', { name: /login|sign in/i }).click()
  ]);
  // Verify redirect to dashboard
  await expect(page).toHaveURL(/dashboard/);
});