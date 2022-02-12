import { Page } from "playwright";
import { OurWorld } from "../types";

export class HomePage {
   homePageObject: Page

    constructor(page: Page) {
        this.homePageObject = page;
    }

    public async clickSignUpButton() {
        await this.homePageObject.click(`"Sign up"`);
    }

    public async getSignUpText(){
      return (await this.homePageObject.textContent("h1"));
    }
}