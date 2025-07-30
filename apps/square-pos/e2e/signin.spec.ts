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

  // Step 3: Bypass 2FA promotional modals
  const remindMeBtn = page.locator(
    '[id="2fa-post-login-promo-sms-remind-me-btn"]'
  );
  if (await remindMeBtn.isVisible()) {
    await remindMeBtn.click();
  }

  const continueBtn = page.locator(
    '[id="2fa-post-login-promo-opt-out-modal-continue"]'
  );
  if (await continueBtn.isVisible()) {
    await continueBtn.click();
  }

  // Step 4: Click sandbox test account (opens popup)

  await page.waitForSelector('[data-testid="sandbox-test-accounts-table"]', {
    timeout: 100000,
  });

  await expect(page.getByTestId("sandbox-test-accounts-table")).toContainText(
    "Default Test Account"
  );
  const popupPromise = page.waitForEvent("popup");
  await page.getByTestId("sandbox-test-accounts-table").locator("a").click();
  const popup = await popupPromise;
  await popup.goto("https://app.squareupsandbox.com/dashboard/");

  // Step 5: Complete sign-in on your app
  // await popup.waitForLoadState("domcontentloaded");
  await popup.goto("http://localhost:3000/signin");
  await popup.getByRole("button", { name: /sign in/i }).click();
  await popup.getByRole("button", { name: /allow/i }).click();

  // Step 6: Validate success (e.g., redirected to dashboard)
  await popup.waitForURL(/.*dashboard/);
  await expect(popup.getByText("Welcome")).toBeVisible();
});
