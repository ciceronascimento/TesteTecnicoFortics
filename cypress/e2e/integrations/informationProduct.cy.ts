import authHelper from "../../support/helpers/authHelper";
import informationProductPage from "../../support/PageObjects/informationProductPage";
import inventoryPage from "../../support/PageObjects/inventoryPage";
describe("Caso de uso: Visualizar informações do produto", () => {
    beforeEach(() => {
        authHelper.visit();
        authHelper.authenticateDefault();
    });

    it("Visualizar informações do produto", () => {
        inventoryPage.inventoryItemName.first().click();
        informationProductPage.productTitle.should("have.text", "Sauce Labs Backpack");
        informationProductPage.productDescription.should("have.text", "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.");
        informationProductPage.productPrice.should("have.text", "$29.99");
        //Necessario usar o force:true para forçar o clique, pois o botão está coberto por outro elemento
        informationProductPage.backButton.click({ force: true });
        cy.url().should("include", "inventory.html");
    });
    it.only("Verifica funcionalidade de carrinho na tela de informações do produto", () => {
        inventoryPage.inventoryItemName.first().click();
        informationProductPage.productTitle.should("have.text", "Sauce Labs Backpack");
        informationProductPage.productDescription.should("have.text", "carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.");
        informationProductPage.productPrice.should("have.text", "$29.99");
        informationProductPage.addToCartButton.click();
        inventoryPage.shoppingCartBadge.should("have.text", "1");
        informationProductPage.removeCartButton.click();
        inventoryPage.shoppingCartBadge.should("not.exist");
    });
});