// helper criado com o intuito de melhorar a organizaçao, reutilizaçao e autenticacao dos testes

import authentication from "../../support/PageObjects/authenticationPage";

import * as users from "../../fixtures/userCredentials.json";

class authHelper {
    visit() {
        const baseUrl: string | null = Cypress.config("baseUrl");
        cy.visit(`${baseUrl}/index.html`);
    }
    // autentica com usuario padrão
    authenticateDefault() {
        authentication.username.type(users.standard_user.username);
        authentication.password.type(users.standard_user.password);
        authentication.loginButton.click();
    }
    logout() {
        cy.url().should("include", "inventory.html");
        cy.get(".bm-burger-button").click();
        cy.get("#logout_sidebar_link").click();
        cy.url().should("include", "index.html");
    }
}

export default new authHelper();