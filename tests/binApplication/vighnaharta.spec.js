const { test, expect } = require("@playwright/test");
const { vignaharthaCreds } = require("../../config");

test("test", async ({ page }) => {
  // Go to https://ibin.hyperthings.in/
  await page.goto(vignaharthaCreds.host + "/");

  // Go to https://ibin.hyperthings.in/dashboard
  await page.goto(vignaharthaCreds.host + "/dashboard");

  // Go to https://ibin.hyperthings.in/login
  await page.goto(vignaharthaCreds.host + "/login");

  // Click input[type="username"]
  await page.click('input[type="username"]');

  // Fill input[type="username"]
  await page.fill('input[type="username"]', vignaharthaCreds.username);

  // Click input[type="password"]
  await page.click('input[type="password"]');

  // Fill input[type="password"]
  await page.fill('input[type="password"]', vignaharthaCreds.password);

  // Click button:has-text("Login")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'https://ibin.hyperthings.in/dashboard' }*/),
    page.click('button:has-text("Login")'),
  ]);

  await page.waitForLoadState("networkidle");
  const locator = page.locator(
    "//body/div[@id='root']/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]"
  );
  const locator_innertext = await locator.innerText();
  console.log("Devices online are " + locator_innertext + " out of 30");

  await page.waitForLoadState("networkidle");
  const locator2 = page.locator(
    "//body/div[@id='root']/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]"
  );
  const locator_innertext2 = await locator2.innerText();
  console.log(
    "Devices offline for 24Hrs are " + locator_innertext2 + " out of 30"
  );

  await page.waitForLoadState("networkidle");
  const locator3 = page.locator(
    "//body/div[@id='root']/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[3]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]"
  );
  const locator_innertext3 = await locator3.innerText();
  console.log("Total Devices offline " + locator_innertext3 + " out of 30");

  await page.waitForLoadState("networkidle");
  const locator4 = page.locator(
    "//body/div[@id='root']/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[4]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]"
  );
  const locator_innertext4 = await locator4.innerText();
  console.log(
    "Devices with Good Battery are " + locator_innertext4 + " out of 30"
  );

  await page.waitForLoadState("networkidle");
  const locator5 = page.locator(
    "//body/div[@id='root']/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[5]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]"
  );
  const locator_innertext5 = await locator5.innerText();
  console.log(
    "Devices with Low Battery are " + locator_innertext5 + " out of 30"
  );

  await page.waitForLoadState("networkidle");
  const locator6 = page.locator(
    "//body/div[@id='root']/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[6]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]"
  );
  const locator_innertext6 = await locator6.innerText();
  console.log("Devices Tampered are " + locator_innertext6 + " out of 30");

  await page.waitForLoadState("networkidle");
  // Click button:has-text("Welcome Demo BTS 3,")
  await page.click('button:has-text("Welcome Demo BTS 3,")');

  await page.waitForLoadState("networkidle");
  // Click button[role="menuitem"]:has-text("logout")
  await page.click('button[role="menuitem"]:has-text("logout")');
  await expect(page).toHaveURL(vignaharthaCreds.host + "/login");

  await page.waitForLoadState("networkidle");
  // Close page
  await page.close();
});
