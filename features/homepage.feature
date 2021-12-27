Feature: Random
  A random feature using some Playwright stuff
Scenario: Gov uk accessibility statement link
  Given I view 'letcode.in/'
  When I click signup button
  Then I expect sign up title on signup page