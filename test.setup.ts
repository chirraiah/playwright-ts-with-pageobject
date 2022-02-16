// test.setup.ts
import { Before, BeforeAll, AfterAll, After } from "@cucumber/cucumber";
import playwright, {  BrowserType } from "playwright";
import { OurWorld } from "./types";
import {playwrightconfig} from "./config/playwrightconfig";
import { Browser, TestInfo } from "@playwright/test";
BeforeAll(async function () {
  // Browsers are expensive in Playwright so only create 1
  /*
  global.browser = await chromium.launch({
    headless:playwrightconfig.headless,
    slowMo: 50,
  });*/

  const automationBrowsers = ['chromium', 'firefox', 'webkit'];
  type AutomationBrowser = typeof automationBrowsers[number];
  const automationBrowser = 'webkit' as AutomationBrowser;
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
Before(async function (this: OurWorld,scenario: any) {
  this.context = await global.browser.newContext({
    recordVideo: {
      dir: "./recordings"
    }
  });
  this.page = await this.context.newPage();
  

  /*
    if (video) {
      const title = this..title;
      // in case someone forgets to name his test..
      if (title) {
        // replace all occurences of spaces in the test title
        const videoFileName = testInfo.title.replace(/ /g, "-");

        // save new video with test title as name
        video.saveAs(`${baseDir}/${videoFileName}.webm`);

        // delete old video with random ID as name
        video.delete();
      }
    } */
});
// Cleanup after each scenario
After(async function (this: OurWorld,scenario: any) {
  const scenarioStatus = scenario.result?.status;
  console.log(`scenario status ${scenarioStatus}`);
  const video = this.page.video();
  if (scenarioStatus === 'PASSED') {
    video.delete(); // delete video
  } else {
    let baseDir='./recordings';
    let scenarioName = scenario.pickle.name.replace(/\W/g, "_");
    video.saveAs(`${baseDir}/${scenarioName}.webm`);
    video.delete(); // delete old video
  }
  await this.page.close();
  await this.context.close();
});
