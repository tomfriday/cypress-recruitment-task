export interface IGlobal {
  createRunID(): string;
  acceptCookies(): void;
}

class Global implements IGlobal {
  elements = {
    cookieBtnAccept: () => cy.get(".cookiesBlockScss-acceptButton-5-h"),
  };
  createRunID() {
    return Date.now().toString().substring(8);
  }
  acceptCookies() {
    this.elements.cookieBtnAccept().click();
  }
}

export const global = new Global();
