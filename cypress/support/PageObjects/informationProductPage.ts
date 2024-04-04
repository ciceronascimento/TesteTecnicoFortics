class InforMationProductPage {
    get backButton() {
        return cy.get(".inventory_details_back_button");
    }
    get productTitle() {
        return cy.get(".inventory_details_name");
    }
    get productDescription() {
        return cy.get(".inventory_details_desc");
    }
    get productPrice() {
        return cy.get(".inventory_details_price");
    }
    get addToCartButton() {
        return cy.get(".btn_primary:contains('ADD TO CART')");
    }
    get removeCartButton() {
        return cy.get(".btn_secondary:contains('REMOVE')");
    }
}
export default new InforMationProductPage();