// step-definitions/homepage.ts
import { Given, When, Then } from "@cucumber/cucumber";
import { HomePage } from "../pages/homepage";
import { OurWorld } from "../types";

Given("I view {string}", async function (this: OurWorld, url: string) {
  // Use the page instance from the World instance to navigate
  await this.page.goto(`https://${url}`);
});

When("I click signup button", async function(this: OurWorld) {
  let homePage = new HomePage(this.page);
  await homePage.clickSignUpButton();
  //await this.page.click(`"Sign up"`);
});

Then("I expect sign up title on signup page", async function (
  this: OurWorld
) {
  const heading1Text = (await this.page.textContent("h1")) as string;
  console.log(heading1Text);
});