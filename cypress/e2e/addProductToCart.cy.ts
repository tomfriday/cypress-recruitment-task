import {mainPage} from "../pages/MainPage";
import {registrationPage} from "../pages/RegistrationPage";
import {loginPage} from "../pages/LoginPage";
import {global} from "../support/global";
import {productSearchPage} from "../pages/ProductSearchpage";
import {productDetailsPage} from "../pages/ProductDetailsPage";
import {cartPage} from "../pages/CartPage";

let runID: string = global.createRunID();
let email: string = `testuser_${runID}@0sssjomb.mailosaur.net`;
const serverID: string = "0sssjomb";
const password: string = "password123";
const exactProductName =
  "Etui na laptopa DICOTA Skin URBAN MacBook Air 15 cali M2 antracyt D32026";
const exactProdutPrice = "103,98";

let filters: {
  producent: string;
  priceFrom: number;
  searchCategory: string;
  priceTo: number;
};

before(() => {
  cy.fixture("filters").then((data) => {
    filters = data;
  });
  cy.clearAllCookies();
  cy.clearAllLocalStorage();
});
describe("template spec", () => {
  before(() => {
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
    mainPage.searchProduct(filters.searchCategory);
    productSearchPage.choosePriceFrom(filters.priceFrom.toString());
    productSearchPage.choosePriceTo(filters.priceTo.toString());
    productSearchPage.chooseProducent(filters.producent);
    cy.contains(exactProductName).should("be.visible");

    //those functions might be done via backend in normal project
  });

  it("go to first product details Page and product to cart", () => {
    productSearchPage.goToProductDetails(exactProductName);
    productDetailsPage.addToCart();
  });
  it("go to Cart", () => {
    mainPage.goToCart();
    cy.contains("Twój koszyk").should("be.visible");
  });
  it("check all datas on Cart Page", () => {
    cartPage.elements.productName().should("contain", exactProductName);
    cartPage.elements.productPrice().should("contain", exactProdutPrice);
  });
});

// I could also do this dynamically, not to declare exact price and name of product
// before the test, i could choose first product from the list,
// get it's name and price and compare those info on the cart page
