import { test as base } from '@playwright/test';

export const test = base.extend({
  baseURL: process.env.BASE_URL || 'https://enrichminion.vercel.app'
});
