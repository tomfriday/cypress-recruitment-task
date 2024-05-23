export interface ImainPage {
  searchProduct(product: string): void;
  goToCart(): void;
}

class MainPage implements ImainPage {
  elements = {
    searchInput: () => cy.get('[data-t1="productSearch"]'),
    cartBtn: () => cy.get('button[data-t1="basket"]'),
    goToCartBtn: () => cy.get(".miniCartFooterScss-to__basket-EPY"),
  };

  searchProduct(product: string) {
    this.elements.searchInput().type(product).type("{enter}");
  }
  goToCart() {
    this.elements.cartBtn().click({force: true});
    this.elements.goToCartBtn().click({force: true});
  }
}
export const mainPage = new MainPage();
