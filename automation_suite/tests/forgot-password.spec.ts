import { expect } from '@playwright/test';
import { test } from './fixtures';

test('Forgot Password shows success toast and triggers reset API', async ({ page }) => {
  await page.goto('/login');
  await page.getByRole('link', { name: /forgot password/i }).click();
  const email = process.env.TEST_EMAIL || `existing+qa@example.com`;
  await page.getByLabel('Email').fill(email);
  const [req, res] = await Promise.all([
    page.waitForRequest(r => r.url().includes('/api/auth/forgot-password') && r.method() === 'POST'),
    page.waitForResponse(r => r.url().includes('/api/auth/forgot-password'))
  ]);
  await page.getByRole('button', { name: /send|submit|reset/i }).click();
  const status = res.status();
  // Accept 200/202 as queued/successful responses
  expect([200, 202]).toContain(status);
  // Verify UI shows success message visible
  await expect(page.getByText(/password reset link sent|we have sent/i)).toBeVisible();
});