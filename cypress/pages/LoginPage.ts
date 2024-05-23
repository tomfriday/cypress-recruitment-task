export interface ILoginPage {
  fillEmail(email: string): void;
  fillPassword(password: string): void;
  submit(): void;
}

class LoginPage implements ILoginPage {
  elements = {
    emailInput: () => cy.get("#username"),
    passwordInput: () => cy.get("#password"),
    submitBtn: () => cy.get('button[type="submit"]').contains("Zaloguj"),
    loginAssertion: () => "Miło Cię ponownie gościć na Neonet.pl",
  };

  fillEmail(email: string) {
    this.elements.emailInput().type(email);
  }

  fillPassword(password: string) {
    this.elements.passwordInput().type(password);
  }

  submit() {
    this.elements.submitBtn().click();
  }
}

export const loginPage = new LoginPage();
