const { test, expect } = require("@playwright/test");
const { airQualityCreds } = require("../../config");
test("test", async ({ page }) => {
  await page.goto(airQualityCreds.host + "/");

  await page.goto(airQualityCreds.host + "/dashboard");

  await page.goto(airQualityCreds.host + "/login");

  await page.click('input[type="username"]');

  await page.fill('input[type="username"]', airQualityCreds.username);

  await page.click('input[type="password"]');

  await page.fill('input[type="password"]', airQualityCreds.password);

  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://35.206.94.22:7006/dashboard' }*/),
    page.click('button:has-text("Login")'),
  ]);

  await page.click('button:has-text("Sites")');
  await expect(page).toHaveURL("http://35.206.94.22:7006/sites");

  await page.click("text=Al Rayyan, Qatar");

  await page.waitForLoadState("networkidle");
  const locator1 = page.locator(
    "//body/div[@id='root']/div[1]/div[2]/div[2]/div[3]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[4]/span[1]"
  );
  const locator_innertext1 = await locator1.innerText();
  console.log("QEERI1 is " + locator_innertext1);

  await page.waitForLoadState("networkidle");
  const locator2 = page.locator(
    "//body/div[@id='root']/div[1]/div[2]/div[2]/div[3]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[4]/span[1]"
  );
  const locator_innertext2 = await locator2.innerText();
  console.log("QEERI2 is " + locator_innertext2);

  await page.waitForLoadState("networkidle");
  const locator3 = page.locator(
    "//body/div[@id='root']/div[1]/div[2]/div[2]/div[3]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[4]/span[1]"
  );
  const locator_innertext3 = await locator3.innerText();
  console.log("QEERI3 is " + locator_innertext3);

  await page.click('button:has-text("Welcome QEERI,")');
  await page.waitForLoadState("networkidle");
  await page.click('button[role="menuitem"]:has-text("logout")');
  await expect(page).toHaveURL("http://35.206.94.22:7006/login");

  await page.close;
});
