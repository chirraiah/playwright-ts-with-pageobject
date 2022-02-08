// test.setup.ts
import { Before, BeforeAll, AfterAll, After } from "@cucumber/cucumber";
import playwright, {  BrowserType } from "playwright";
import { OurWorld } from "./types";
import {playwrightconfig} from "./config/playwrightconfig";
BeforeAll(async function () {
  // Browsers are expensive in Playwright so only create 1
  /*
  global.browser = await chromium.launch({
    headless:playwrightconfig.headless,
    slowMo: 50,
  });*/

  const automationBrowsers = ['chromium', 'firefox', 'webkit'];
  type AutomationBrowser = typeof automationBrowsers[number];
  const automationBrowser = 'chromium' as AutomationBrowser;
  const browserType: BrowserType = playwright[automationBrowser];
  const browser = await browserType.launch({
      headless: false,
  });
  global.browser=browser;

});
AfterAll(async function () {
  await global.browser.close();
});
// Create a new test context and page per scenario
Before(async function (this: OurWorld) {
  this.context = await global.browser.newContext();
  this.page = await this.context.newPage();
});
// Cleanup after each scenario
After(async function (this: OurWorld) {
  await this.page.close();
  await this.context.close();
});
