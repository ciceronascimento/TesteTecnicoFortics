import authentication from "../../support/PageObjects/authenticationPage";

import * as users from "../../fixtures/userCredentials.json";

class authHelper {
    visit() {
        const baseUrl: string | null = Cypress.config("baseUrl");
        cy.visit(`${baseUrl}/index.html`);
    }
    authenticateDefault() {
        authentication.username.type(users.standard_user.username);
        authentication.password.type(users.standard_user.password);
        authentication.loginButton.click();
    }
}

export default new authHelper();