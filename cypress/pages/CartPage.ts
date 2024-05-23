export interface ICartPage {
  verifyCartItem(name: string, price: number): void;
}

class CartPage implements ICartPage {
  elements = {
    productPrice: () =>
      cy.get(".productScss-cartProduct__main__summary-1H0.col_m_3"),
    productName: () => cy.get(".productScss-productName-2Vl"),
    summaryCartPrice: () => cy.get("checkoutValueScss-price-23G"),
    quantityInput: () => cy.get(".changeQtyButtonsScss-quantity__input-Lbj"),
  };

  verifyCartItem(name: string, price: number) {
    this.elements.productName().should("contain.text", name);
    this.elements
      .productPrice()
      .invoke("text")
      .then((priceText) => {
        const actualPrice = parseFloat(
          priceText.replace(" zł", "").replace(",", ".")
        );
        expect(actualPrice).to.equal(price);
      });
  }
}

export const cartPage = new CartPage();
