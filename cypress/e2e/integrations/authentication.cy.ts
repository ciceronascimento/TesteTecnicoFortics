import authentication from "../../support/PageObjects/authenticationPage";


import * as users from "../../fixtures/userCredentials.json";


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
}); 