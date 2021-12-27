// step-definitions/homepage.ts
import { Given, When, Then } from "@cucumber/cucumber";
import { HomePage } from "../pages/homepage";
import { OurWorld } from "../types";
import expect from 'expect';

let homePage : HomePage;

Given("I view {string}", async function (this: OurWorld, url: string) {
  // Use the page instance from the World instance to navigate
  await this.page.goto(`https://${url}`);
});

When("I click signup button", async function(this: OurWorld) {
  homePage = new HomePage(this.page);
  await homePage.clickSignUpButton();
});

Then("I expect sign up title on signup page", async function (this: OurWorld) {
  const headingText = await homePage.getSignUpText()
  expect(headingText).toEqual('SIGN UP');
});