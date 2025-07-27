import { test, expect } from '@playwright/test';

test('Sign in with Square', async ({ page }) => {
  await page.goto('https://app.squareup.com/login?app=developer&lang_code=en&return_to=https://developer.squareup.com/console/en/sandbox-test-accounts');
  await page.getByTestId('username-input').fill('haram.nasir@carbonteq.com');
  await page.getByTestId('username-input').press('Enter');
  await page.getByTestId('login-password-input').fill('Haram@carbonteq');
  await page.getByTestId('login-password-input').press('Enter');
  await page.locator('[id="2fa-post-login-promo-sms-remind-me-btn"]').getByRole('button', { name: 'Remind me next time' }).click();
  await page.locator('[id="2fa-post-login-promo-opt-out-modal-continue"]').getByRole('button', { name: 'Continue to Square' }).click();
  const page1Promise = page.waitForEvent('popup');
  await page.getByTestId('sandbox-test-accounts-table').locator('a').click();
  const page1 = await page1Promise;
  await page1.goto('http://localhost:3000/signin');
  await page1.getByRole('button', { name: 'Success checkmark Sign in' }).click();
  await page1.getByRole('button', { name: 'Allow' }).click();
});