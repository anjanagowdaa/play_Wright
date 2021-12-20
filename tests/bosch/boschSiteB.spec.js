const { test, expect } = require("@playwright/test");

const { boschAppCreds, binAppCreds } = require("../../config");
//console.log(binAppCreds.host);

test("test", async ({ page }) => {
  // Go to boschAppCreds.host/
  await page.goto(boschAppCreds.host);

  // Go to boschAppCreds.host/user/login
  await page.goto(boschAppCreds.host);

  // Click [placeholder="username"]
  await page.click('[placeholder="username"]');

  // Fill [placeholder="username"]
  await page.fill('[placeholder="username"]', boschAppCreds.username);

  // Click [placeholder="password"]
  await page.click('[placeholder="password"]');

  // Fill [placeholder="password"]
  await page.fill('[placeholder="password"]', boschAppCreds.password);

  // Click button:has-text("Login")
  await Promise.all([
    page.waitForNavigation(/*{ url: 'boschAppCreds.host/dashboard' }*/),
    page.click('button:has-text("Login")'),
  ]);

  await page.waitForLoadState("networkidle");
  const locator = page.locator("//tbody/tr[2]/td[7]");
  const locator_innertext = await locator.innerText();
  // console.log("SiteB/WingB refreshed at" + locator_innertext);
  //await expect(locator).toContainText(locator_innertext);

  await expect(locator).toContainText(locator_innertext);
  const words = locator_innertext.split(" ");
  //console.log(words[0]);
  //console.log(words[1]);

  if (locator_innertext === "a few seconds ago " || "a minute ago ") {
    console.log("SiteB/WingB Refreshed " + locator_innertext);
  } else if (words[0] < 10) {
    console.log("SiteA/WingA Application Refreshed " + locator_innertext);
  } else {
    console.log("SiteA/WingA Application failed to Refresh within 10 minutes");
  }

  // switch (locator_innertext) {
  //   case "a few seconds ago":
  //     console.log("Application Refreshed " + locator_innertext);
  //     break;
  //   case "a minute ago":
  //     console.log("Application Refreshed " + locator_innertext);
  //     break;
  //   case "2 minutes ago":
  //     console.log("Application Refreshed " + locator_innertext);
  //     break;
  //   case "3 minutes ago":
  //     console.log("Application Refreshed " + locator_innertext);
  //     break;
  //   case "4 minutes ago":
  //     console.log("Application Refreshed " + locator_innertext);
  //     break;
  //   case "5 minutes ago":
  //     console.log("Application Refreshed " + locator_innertext);
  //     break;
  //   case "6 minutes ago":
  //     console.log("Application Refreshed " + locator_innertext);
  //     break;
  //   case "7 minutes ago":
  //     console.log("Application Refreshed " + locator_innertext);
  //     break;
  //   case "8 minutes ago":
  //     console.log("Application Refreshed " + locator_innertext);
  //     break;
  //   case "9 minutes ago":
  //     console.log("Application Refreshed " + locator_innertext);
  //     break;
  //   default:
  //     console.log("Application failed to Refresh");
  // }

  // Click text=Bosch Admin
  await page.click("text=Bosch Admin");

  // Click text=Logout
  await page.click("text=Logout");
  await expect(page).toHaveURL(
    boschAppCreds.host +
      "/user/login?redirect=http%3A%2F%2Fiot2.hyperthings.in%3A6010%2Fdashboard"
  );

  // Close page
  await page.close();
});
