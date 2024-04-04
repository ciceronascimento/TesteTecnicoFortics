class CartPage {
    get cartItems() {
        return cy.get(".cart_item");
    }
    get cartItemName() {
        return cy.get(".inventory_item_name");
    }
    get cartItemPrice() {   
        return cy.get(".inventory_item_price");
    }
    get cartItemButton() {
        return cy.get(".btn_primary");
    }
    get shoppingCartBadge() {
        return cy.get(".shopping_cart_badge");
    }   
    get shoppingCartLink() {
        return cy.get(".shopping_cart_link");
    }
    get checkoutButton() {
        return cy.get(".btn_action:contains('CHECKOUT')");
    }
    get firstName() {
        return cy.get("#first-name");
    }
    get lastName() {
        return cy.get("#last-name");
    }
    get postalCode() {
        return cy.get("#postal-code");
    }
    get continueButton() {
        return cy.get(".btn_primary[value='CONTINUE']");
    }
    get finishButton() {
        return cy.get(".btn_action:contains('FINISH')");
    }
    get completeHeader() {
        return cy.get(".complete-header");
    }
    get checkoutStepOne() {
        return cy.url().should("include", "checkout-step-one.html");
    }
    get checkoutStepTwo() {
        return cy.url().should("include", "checkout-step-two.html");
    }
    get checkoutComplete() {
        return cy.url().should("include", "checkout-complete.html");
    }
    get cartItem() {
        return cy.get(".cart_item");
    }
    get cartItemLabel() {
        return cy.get(".cart_item_label");
    }
    get cartItemRemove() {
        return cy.get(".cart_button:contains('REMOVE')");
    }
    get cartContinueShopping() {
        return cy.get(".btn_secondary:contains('Continue Shopping')");
    }
    get errorField() {
        return cy.get('[data-test="error"]')
    }
}
export default new CartPage();