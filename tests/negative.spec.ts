import { test, expect } from "@playwright/test";

test("Email and password are requiered", async ({ page }) => {
    await page.goto("https://electroneek.com/account/auth/login/start");
    await page.click("text = Continue"); //Attempt to login
    const emailError = await page.locator("#mat-error-0");
    const passwordError = await page.locator("#mat-error-1");
    await expect(emailError).toContainText("E-mail is required");
    await expect(passwordError).toContainText("Password is required");
    //await delay(4000);
})

test("Email and password do not match", async ({ page }) => {
    await page.goto("https://electroneek.com/account/auth/login/start");
    await page.fill("#mat-input-0", "testing@tester.test");
    await page.fill("#mat-input-1", "testpass");
    await page.click("text = Continue");
    const errorMessage = await page.locator(".fuse-alert-message");
    await expect(errorMessage).toContainText("Your username and/or password do not match");
    //await delay(4000);
})

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}


test("Talk to us form submission", async ({ page }) => {
    await page.goto("https://electroneek.com/blog/");
    await page.locator("text = Talk to us").click();

    await page.fill("[name = firstname]", "testing");
    await page.fill("[name = lastname]", "tester");
    await page.fill("[name = email]", "testing@tester.test");
    await page.fill("[name = phone]", "0000000000");
    await page.locator("[name = country_list]").selectOption("United States");
    await page.locator("[name = are_you_a_managed_services_provider_]").selectOption("No");
    await page.locator("[name = agree]").check();
    //await delay(4000);
    await page.click("text = Submit");
    await expect(page.locator("text = We’ve received your message!")).toBeVisible();
    //await delay(4000);
})