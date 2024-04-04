// helper utilizado para verificar a url da página atual garantindo uma melhor legibilidade
class VerifyUrlHelper {
    verifyInventory() {
        cy.url().should("include", "inventory.html");
    }

    verifyInventoryItem() {
        cy.url().should("include", "inventory-item.html");
    }

    verifyIndex() {
        cy.url().should("include", "index.html");
    }
    verifyCart() {
        cy.url().should("include", "cart.html");
    }
    verifyCheckout() {
        cy.url().should("include", "checkout-step-one.html");
    }
    verifyCheckoutComplete() {
        cy.url().should("include", "checkout-complete.html");
    }
    verifyCheckoutStepTwo() {
        cy.url().should("include", "checkout-step-two.html");
    }
}
export default new VerifyUrlHelper();