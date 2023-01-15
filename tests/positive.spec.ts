import { test, expect } from "@playwright/test";


test("Subscribe submission", async ({ page }) => {
    await page.goto("https://electroneek.com/blog/");
    await page.locator('//button[text()="Subscribe"]').click();
    await page.fill("[placeholder = Corporate email]", "testing@tester.test");
    await page.locator("[name = agree]").check();
    await delay(4000);
    await page.click("text = Submit");
    await expect(page.locator("text = Thank you for the subscription!")).toBeVisible();
    await delay(4000);
    //await page.pause();
})

function delay(time) {
    return new Promise(function (resolve) {
        setTimeout(resolve, time)
    });
}