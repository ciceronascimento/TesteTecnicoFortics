import authentication from "../../support/PageObjects/authenticationPage";


import * as users from "../../fixtures/userCredentials.json";

import * as errors from "../../fixtures/errorMessages.json";

// const user: { username: string; password: string }[] = users;


describe("Caso de uso - Autenticar", () => {

  beforeEach(() => {
    const baseUrl: string | null = Cypress.config("baseUrl");
    cy.visit(`${baseUrl}/index.html`);
  });


  it("Autenticar com credenciais válidas", () => {
    authentication.username.type(users.standard_user.username);
    authentication.password.type(users.standard_user.password);
    authentication.loginButton.click();
    cy.url().should("include", "inventory.html");
  });

  it("Autenticar com usuario inválido", () => {
    authentication.username.type(users.incorrected_user.username);
    authentication.password.type(users.incorrected_password.password);
    authentication.loginButton.click();
    authentication.errorMessage.should("have.text", errors.invalid_username.error);
  });

  it("Autenticar com senha inválida", () => {
    authentication.username.type(users.standard_user.username);
    authentication.password.type(users.incorrected_password.password);
    authentication.loginButton.click();
    authentication.errorMessage.should("have.text", errors.invalid_password.error);
  });

  it("Autenticar com usuário bloqueado", () => {
    authentication.username.type(users.locked_out_user.username);
    authentication.password.type(users.locked_out_user.password);
    authentication.loginButton.click();
    authentication.errorMessage.should("have.text", errors.locked_out_user.error);
  });

  it("Autenticar com usuário em branco", () => {
    authentication.password.type(users.standard_user.password);
    authentication.loginButton.click();
    authentication.errorMessage.should("have.text", errors.empty_username.error);
  });

  it("Autenticar com senha em branco", () => {
    authentication.username.type(users.standard_user.username);
    authentication.loginButton.click();
    authentication.errorMessage.should("have.text", errors.empty_password.error);
  });

  it("Autenticar com usuário e senha em branco", () => {
    authentication.loginButton.click();
    authentication.errorMessage.should("have.text", errors.empty_username.error);
  });

  it("Autenticar com usuário e senha válidos e sair", () => {
    authentication.username.type(users.standard_user.username);
    authentication.password.type(users.standard_user.password);
    authentication.loginButton.click();
    cy.url().should("include", "inventory.html");
    cy.get(".bm-burger-button").click();
    cy.get("#logout_sidebar_link").click();
    cy.url().should("include", "index.html");
  });

}); 