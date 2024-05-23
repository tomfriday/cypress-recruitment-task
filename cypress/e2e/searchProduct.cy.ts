import {mainPage} from "../pages/MainPage";
import {registrationPage} from "../pages/RegistrationPage";
import {loginPage} from "../pages/LoginPage";
import {global} from "../support/global";
import {productSearchPage} from "../pages/ProductSearchpage";

// we assume that there is no user in the environment
// and we register a new one each time so that the tests are renewable

let runID: string = global.createRunID();
let email: string = `testuser_${runID}@0sssjomb.mailosaur.net`;
const serverID: string = "0sssjomb";
const password: string = "password123";
let filters: {
  producent: string;
  priceFrom: number;
  searchCategory: string;
  priceTo: number;
};

describe("template spec", () => {
  before(() => {
    cy.fixture("filters").then((data) => {
      filters = data;
    });
    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.visit("/customer/account/register/standard");
    global.acceptCookies();
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

    cy.clearAllCookies();
    cy.clearAllLocalStorage();
    cy.mailosaurGetMessage(serverID, {sentTo: email}).then((email) => {
      let confirmSignupLink = email.html.links[1].href;
      cy.visit(confirmSignupLink);
    });
    global.acceptCookies();
    loginPage.fillEmail(email);
    loginPage.fillPassword(password);
    loginPage.submit();
    cy.get("div").contains(loginPage.elements.loginAssertion());
    cy.url().should("contain", "/customer/account");
    //those functions might be done via backend in normal project
  });

  it("search products related to 'elektronika' ", () => {
    mainPage.searchProduct(filters.searchCategory);
  });
  it("use specific filters", () => {
    productSearchPage.choosePriceFrom(filters.priceFrom.toString());
    productSearchPage.choosePriceTo(filters.priceTo.toString());
    productSearchPage.chooseProducent(filters.producent);
  });
  it("check that the displayed products match the search criteria and filters applied.", () => {
    productSearchPage.verifySearchResultContainsKeyword(filters.searchCategory);
    productSearchPage.verifyAllProductsAreFromProducer(filters.producent);
    productSearchPage.verifyAllProductsAreInPriceRange(
      filters.priceFrom,
      filters.priceTo
    );
  });
});
