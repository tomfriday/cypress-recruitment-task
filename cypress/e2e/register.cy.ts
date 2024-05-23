import {global} from "../support/global";
import {registrationPage} from "../pages/RegistrationPage";
import {loginPage} from "../pages/LoginPage";

let runID = global.createRunID();
let email = `testuser_${runID}@0sssjomb.mailosaur.net`;
const serverID = "0sssjomb";

const password = "password123";

describe("template spec", () => {
  before(() => {
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
  });

  it("passes", () => {
    cy.visit("/customer/account/register/standard");
    global.acceptCookies();
  });
  it("register", () => {
    registrationPage.fillEmail(email);
    registrationPage.fillPassword(password);
    registrationPage.confirmConsent();
    registrationPage.submit();
    cy.mailosaurGetMessage(serverID, {sentTo: email}).then((email) => {
      expect(email.subject).to.equal(
        "Please confirm your NEONET S.A. w restrukturyzacji account"
      );
      registrationPage.elements.successRegisterPopup().should("be.visible");
    });
  });
  it("retrieve Link", () => {
    cy.mailosaurGetMessage(serverID, {sentTo: email}).then((email) => {
      let confirmSignupLink = email.html.links[1].href; // click to submit the registration button
      cy.clearAllCookies();
      cy.clearAllLocalStorage();
      cy.visit(confirmSignupLink);
      global.acceptCookies();
    });
  });

  it("verify registration via mailtrap", () => {
    loginPage.fillEmail(email);
    loginPage.fillPassword(password);
    loginPage.submit();
    cy.get("div").contains(loginPage.elements.loginAssertion());
    cy.url().should("contain", "/customer/account");
  });
});
