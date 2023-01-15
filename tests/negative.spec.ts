import { test, expect } from "@playwright/test";

test("Email and password are requiered", async ({ page }) => {
    await page.goto("https://electroneek.com/account/auth/login/start");
    await page.click("text = Continue"); //Attempt to login
    const emailError = await page.locator("#mat-error-0");
    const passwordError = await page.locator("#mat-error-1");
    await expect(emailError).toContainText("E-mail is required");
    await expect(passwordError).toContainText("Password is required");
})

test("Email and password do not match", async ({ page }) => {
    await page.goto("https://electroneek.com/account/auth/login/start");
    await page.fill("#mat-input-0", "testing@tester.test");
    await page.fill("#mat-input-1", "testpass");
    await page.click("text = Continue");
    const errorMessage = await page.locator(".fuse-alert-message");
    await expect(errorMessage).toContainText("Your username and/or password do not match");
})