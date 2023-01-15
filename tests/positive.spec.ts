import { test, expect } from "@playwright/test";

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
    await page.click("text = Submit");
    await expect(page.locator("text = We’ve received your message!")).toBeVisible();
})

test("Subscribe submission", async ({ page }) => {
    await page.goto("https://electroneek.com/blog/");
    await page.locator('button:is(:text("Subscribe"))').click();
    await page.fill("[name = email]", "testing@tester.test");
    await page.locator("[name = agree]").check();
    await page.click("text = Submit");
    await expect(page.locator("text = Thank you for the subscription!")).toBeVisible();
})