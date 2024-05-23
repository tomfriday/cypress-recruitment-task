export interface IProductSearchPage {
  choosePriceFrom(price: string): void;
  choosePriceTo(price: string): void;
  chooseProducent(producent: string): void;
  verifySearchResultContainsKeyword(keyword: string): void;
  verifyAllProductsAreFromProducer(producent: string): void;
  verifyAllProductsAreInPriceRange(minPrice: number, maxPrice: number): void;
  goToProductDetails(): void;
}

class ProductSearchPage implements IProductSearchPage {
  elements = {
    priceFromInput: () => cy.get("#price_from"),
    priceToInput: () => cy.get("#price_to"),
    producent: (producent: string) => cy.contains(producent),
    availableShopCheckbox: () => cy.contains("Dostępny w sklepach"),
    searchResultInfo: () =>
      cy.get(".listingHeaderScss-header__title-mCG > span"),
    productTitles: () => cy.get(".listingItemHeaderScss-name-M0z"),
    productPrice: () => cy.get(".priceScss-wrapper-2Eb"),
    searchList: () => cy.get(".listingItemsDesktopScss-content-1Tj"),
    firstElementFromList: () => this.elements.productTitles().first(),
  };

  choosePriceFrom(price: string) {
    this.elements.priceFromInput().type(price);
  }

  choosePriceTo(price: string) {
    this.elements.priceToInput().type(price);
  }

  chooseProducent(producent: string) {
    this.elements.producent(producent).click();
  }

  verifySearchResultContainsKeyword(keyword: string) {
    this.elements.searchResultInfo().contains(keyword).should("be.visible");
  }

  verifyAllProductsAreFromProducer(producent: string) {
    this.elements.productTitles().each(($el) => {
      cy.wrap($el).should("contain.text", producent);
    });
  }

  verifyAllProductsAreInPriceRange(minPrice: number, maxPrice: number) {
    this.elements.productPrice().each(($el) => {
      cy.wrap($el)
        .invoke("text")
        .then((text) => {
          const price = parseFloat(text.replace(" zł", "").replace(",", "."));
          expect(price).to.be.at.least(minPrice);
          expect(price).to.be.at.most(maxPrice);
        });
    });
  }
  goToProductDetails() {
    this.elements.firstElementFromList().click();
  }
}

export const productSearchPage = new ProductSearchPage();
