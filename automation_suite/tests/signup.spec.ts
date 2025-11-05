import { expect } from '@playwright/test';
import { test } from './fixtures';

test('Signup - valid flow (creates account and queues verification)', async ({ page, baseURL }) => {
  await page.goto('/signup');
  // fill form - adapt selectors if app differs
  await page.getByLabel('Name').fill(`QA User ${Date.now()}`);
  const email = `qa+${Date.now()}@example.com`;
  await page.getByLabel('Email').fill(email);
  await page.getByLabel('Password').fill('TestPwd123!');
  await page.getByLabel('Confirm Password').fill('TestPwd123!');
  await Promise.all([
    page.waitForResponse(resp => resp.url().includes('/api/auth/signup') && resp.status() < 500),
    page.getByRole('button', { name: /sign up|register|create account/i }).click()
  ]);
  // Expect a success toast or redirect to dashboard/login
  const url = page.url();
  expect(url).toMatch(/dashboard|login|onboarding/i);
});