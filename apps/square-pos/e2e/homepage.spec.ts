import { test, expect } from "@playwright/test";

test("homepage has title", async ({ page }) => {
  await page.goto("http://localhost:3000/signin");
  await expect(page).toHaveURL("http://localhost:3000/signin");
  await expect(page.getByRole("heading", { name: "Welcome Back" })).toBeVisible();
});