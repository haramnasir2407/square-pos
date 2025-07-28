import { expect, test } from "@playwright/test";

test("Sign in with Square sandbox account via app", async ({ page }) => {
  test.setTimeout(30000);
  // Step 1: Go to Square login page
  await page.goto(
    "https://app.squareup.com/login?app=developer&lang_code=en&return_to=https://developer.squareup.com/console/en/sandbox-test-accounts"
  );

  // Step 2: Log into Square
  await page.getByTestId("username-input").fill("haram.nasir@carbonteq.com");
  await page.keyboard.press("Enter");
  await page.getByTestId("login-password-input").fill("Haram@carbonteq");
  await page.keyboard.press("Enter");

  // Step 3: Bypass 2FA promotional modals (if shown)
  const remindMeBtn = page.locator(
    '[id="2fa-post-login-promo-sms-remind-me-btn"] button:has-text("Remind me next time")'
  );
  if (await remindMeBtn.isVisible()) {
    await remindMeBtn.click();
  }

  const continueBtn = page.locator(
    '[id="2fa-post-login-promo-opt-out-modal-continue"] button:has-text("Continue to Square")'
  );
  if (await continueBtn.isVisible()) {
    await continueBtn.click();
  }

  // Step 4: Click sandbox test account (opens popup)
  const table = page.getByTestId("sandbox-test-accounts-table");
  await expect(table).toBeVisible();

  const accountLink = table.locator("a").first();
  await expect(accountLink).toBeVisible();

  await accountLink.click();
  const popupPromise = page.waitForEvent("popup");
  const popup = await popupPromise;

  // Step 5: Complete sign-in on your app
  await popup.waitForLoadState("domcontentloaded");
  await popup.goto("http://localhost:3000/signin");
  await popup.getByRole("button", { name: /sign in/i }).click();
  await popup.getByRole("button", { name: /allow/i }).click();

  // Step 6: Validate success (e.g., redirected to dashboard)
  await popup.waitForURL(/.*dashboard/);
  await expect(popup.getByText("Welcome")).toBeVisible();
});
