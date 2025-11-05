import { expect } from '@playwright/test';
import { test } from './fixtures';

test('Google Sign-in shows provider disabled error', async ({ page }) => {
  await page.goto('/login');
  // Intercept provider API call and inspect response if possible
  const [request, response] = await Promise.all([
    page.waitForRequest(req => req.url().includes('/api/auth/provider') && req.method() === 'POST'),
    page.waitForResponse(resp => resp.url().includes('/api/auth/provider'))
  ]);
  // Click Google sign-in (button text may vary)
  await page.getByRole('button', { name: /google/i }).click();
  // Check response body for validation_failed
  const body = await response.json();
  expect(body).toBeTruthy();
  expect(body.error_code || body.msg).toBeDefined();
  // Accept either explicit provider-disabled or backend returns 400 validation_failed
  expect(body.msg.toLowerCase()).toContain('provider');
});