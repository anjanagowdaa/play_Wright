const { test, expect } = require("@playwright/test");
const { fmsBadalpurCreds, fmsMumbaiCreds } = require("../../config");

test("test", async ({ page }) => {
  await page.goto(fmsMumbaiCreds.host + "/");

  await page.goto(fmsMumbaiCreds.host + "/dashboard");

  await page.goto(fmsMumbaiCreds.host + "/login");

  await page.click('input[type="username"]');

  await page.fill('input[type="username"]', fmsMumbaiCreds.username);

  await page.click('input[type="password"]');

  await page.fill('input[type="password"]', fmsMumbaiCreds.password);

  await Promise.all([
    page.waitForNavigation(/*{ url: 'http://35.206.94.22:7001/dashboard' }*/),
    page.click('button:has-text("Login")'),
  ]);

  await page.waitForLoadState("networkidle");
  const totalDevice = page.locator(
    "//body/div[@id='root']/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[4]/div[1]/div[1]/div[1]/div[1]/div[1]/span[2]"
  );
  const totalDevice_innertext = await totalDevice.innerText();

  await page.waitForLoadState("networkidle");
  const locator = page.locator(
    "//body/div[@id='root']/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[4]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]"
  );
  const locator_innertext = await locator.innerText();
  console.log(
    "Devices online are " + locator_innertext + totalDevice_innertext
  );

  await page.waitForLoadState("networkidle");
  const locator1 = page.locator(
    "//body/div[@id='root']/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[5]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]"
  );
  const locator_innertext1 = await locator1.innerText();
  console.log(
    "Devices offline for 48H-72H are " +
      locator_innertext1 +
      totalDevice_innertext
  );

  await page.waitForLoadState("networkidle");
  const locator2 = page.locator(
    "//body/div[@id='root']/div[1]/div[2]/div[2]/div[1]/div[1]/div[1]/div[6]/div[1]/div[1]/div[1]/div[1]/div[1]/span[1]"
  );
  const locator_innertext2 = await locator2.innerText();
  console.log(
    "Devices offline for 72H " + locator_innertext2 + totalDevice_innertext
  );

  await page.click('button:has-text("Welcome MCGM,")');

  await page.click('button[role="menuitem"]:has-text("logout")');
  await expect(page).toHaveURL(fmsBadalpurCreds.host + "/login");

  await page.close();
});
