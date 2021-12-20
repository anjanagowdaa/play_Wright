const { test, expect } = require("@playwright/test");

test("test", async ({ page }) => {
  // Go to http://35.206.94.22:7006/
  await page.goto("http://35.206.94.22:7006/");

  // Go to http://35.206.94.22:7006/dashboard
  await page.goto("http://35.206.94.22:7006/dashboard");

  // Go to http://35.206.94.22:7006/login
  await page.goto("http://35.206.94.22:7006/login");

  // Click input[type="username"]
  await page.click('input[type="username"]');

  // Fill input[type="username"]
  await page.fill('input[type="username"]', "qeeri@hyperthings.in");

  // Click input[type="password"]
  await page.click('input[type="password"]');

  // Fill input[type="password"]
  await page.fill('input[type="password"]', "qeeri@123#");

  // Click button:has-text("Login")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://35.206.94.22:7006/dashboard' }*/),
    page.click('button:has-text("Login")'),
  ]);

  // Click button:has-text("Welcome QEERI,")
  await page.click('button:has-text("Welcome QEERI,")');

  // Click button[role="menuitem"]:has-text("logout")
  await page.click('button[role="menuitem"]:has-text("logout")');
  await expect(page).toHaveURL("http://35.206.94.22:7006/login");
  await page.title;

  // Close page
  await page.close();
});
