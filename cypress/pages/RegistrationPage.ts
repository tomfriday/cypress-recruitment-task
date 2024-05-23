export interface IRegistrationPage {
  fillEmail(email: string): void;
  fillPassword(password: string): void;
  confirmConsent(): void;
  submit(): void;
}

class RegistrationPage implements IRegistrationPage {
  elements = {
    emailInput: () => cy.get("#createAccoutFormId_email"),
    passwordInput: () => cy.get("#createAccoutFormId_password"),
    repeatPasswordInput: () => cy.get("#createAccoutFormId_confirm"),
    confirmConsentCheckbox: () =>
      cy.contains("Zapoznałem się i akceptuję regulamin sklepu internetowego"),
    confirmBtn: () => cy.get(".UIButtonScss-container-1RC"),
    successRegisterPopup: () =>
      cy.get(".welcomeInSuccessPopupCss-popup_red-sit"),
  };

  fillEmail(email: string) {
    this.elements.emailInput().type(email);
  }

  fillPassword(password: string) {
    this.elements.passwordInput().type(password);
    this.elements.repeatPasswordInput().type(password);
  }
  confirmConsent() {
    this.elements.confirmConsentCheckbox().click();
  }

  submit() {
    this.elements.confirmBtn().click();
  }
}
export const registrationPage = new RegistrationPage();
