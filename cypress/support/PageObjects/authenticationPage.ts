class AuthenticationPage {
    get username() {
        return cy.get('[data-test="username"]')
    }
    get password() {
        return cy.get('[data-test="password"]')
    }
    get loginButton() {
        return cy.get('#login-button')
    }
    get errorMessage() {
        return cy.get('[data-test="error"]')
    }
}
export default new AuthenticationPage();