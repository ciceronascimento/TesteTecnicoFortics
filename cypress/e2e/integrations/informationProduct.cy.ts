import inventoryPage from "../../support/PageObjects/inventoryPage";
import informationProductPage from "../../support/PageObjects/informationProductPage";

import authHelper from "../../support/helpers/authHelper";
import verifyUrlHelper from "../../support/helpers/verifyUrlHelper";

import * as products from "../../fixtures/inventoryProducts.json";

const product = products as { [key: string]: { productName: string; description: string; price: string; ID: string; } };

// Testes para garnatir o funcionamento da tela de informações do produto
describe("Caso de uso: Visualizar informações do produto", () => {
    beforeEach(() => {
        authHelper.visit();
        authHelper.authenticateDefault();
    });

    it("Visualizar informações do produto", () => {
        // percorre todos os produtos e verifica qual produto é igual ao produto "Sauce Labs Backpack para clicar e visualizar informações
        inventoryPage.inventoryItems.each(($el) => {
            const productName = $el.find(".inventory_item_name").text();
            if(productName === product["Sauce Labs Backpack"].productName) {
                $el.find(".inventory_item_name").click();
            }
        });
        verifyUrlHelper.verifyInventoryItem();
        informationProductPage.productTitle.should("have.text", product["Sauce Labs Backpack"].productName);
        informationProductPage.productDescription.should("have.text", product["Sauce Labs Backpack"].description);
        informationProductPage.productPrice.should("have.text", '$' +  product["Sauce Labs Backpack"].price);
        //Necessario usar o force:true para forçar o clique, pois o botão está coberto por outro elemento
        informationProductPage.backButton.click({ force: true });
        verifyUrlHelper.verifyInventory();

    });
    it("Verifica funcionalidade de carrinho na tela de informações do produto", () => {
        inventoryPage.inventoryItems.each(($el) => {
            const productName = $el.find(".inventory_item_name").text();
            if(productName === product["Sauce Labs Backpack"].productName) {
                $el.find(".inventory_item_name").click();
            }
        });
        informationProductPage.productTitle.should("have.text", product["Sauce Labs Backpack"].productName);
        informationProductPage.productDescription.should("have.text", product["Sauce Labs Backpack"].description);
        informationProductPage.productPrice.should("have.text", '$' + product["Sauce Labs Backpack"].price);
        informationProductPage.addToCartButton.click();
        inventoryPage.shoppingCartBadge.should("have.text", "1");
        informationProductPage.removeCartButton.click();
        inventoryPage.shoppingCartBadge.should("not.exist");
    });
});