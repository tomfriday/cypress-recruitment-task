export interface IProductDetailsPage {
  addToCart(): void;
}
class ProductDetailsPage implements IProductDetailsPage {
  elements = {
    productName: () => cy.get(".productTitleCss-header-1aq"),
    productPrice: () => cy.get(".uiPriceScss-price-1Qg"),
    addToCardBtn: () => cy.get('button[value="Dodaj do koszyka"]'),
  };
  addToCart() {
    this.elements.addToCardBtn().click({force: true});
  }
}
export const productDetailsPage = new ProductDetailsPage();
