import authHelper from "../../support/helpers/authHelper";
import shoppingHelper from "../../support/helpers/shoppingHelper";
import inventoryPage from "../../support/PageObjects/inventoryPage";

import filterHelper from "../../support/helpers/filterHelper";

import * as products from "../../fixtures/inventoryProducts.json"; 


const product = products as { [key: string]: { productName: string; description: string; price: string; ID: string; } };
const productCount: number = Object.keys(products).length;


describe("Caso de uso: Testes de produtos", () => {
    beforeEach(() => {
        authHelper.visit();
        authHelper.authenticateDefault();
    });


    it("Listar todos os produtos", () => {
        inventoryPage.inventoryItems.should("have.length", productCount);
    }); 

    it("Listar todos os produtos com nome, descrição e preço", () => {
        //percorre todos os produtos e verifica se o nome, descrição e preço estão corretos com o json em fixtures
        inventoryPage.inventoryItems.each(($el, index) => {
            const productName = $el.find(".inventory_item_name").text();
            const productDescription = $el.find(".inventory_item_desc").text();
            const productPrice = $el.find(".inventory_item_price").text();
            expect(product[productName].productName).to.equal(productName);
            expect(product[productName].description).to.equal(productDescription);
            expect("$" + product[productName].price).to.equal(productPrice);
        });
    });

    it("Adicionar um produto ao carrinho", () => {
        shoppingHelper.addProductToCart("Sauce Labs Backpack");
        inventoryPage.shoppingCartBadge.should("have.text", "1");
        shoppingHelper.addProductToCart("Sauce Labs Bike Light");
        inventoryPage.shoppingCartBadge.should("have.text", "2");
    });
    it("Adicionar todos os produtos ao carrinho", () => {
        inventoryPage.inventoryItems.each(($el) => {
            $el.find(".btn_primary").click();
        });
        inventoryPage.shoppingCartBadge.should("have.text", "6");
    });

    it("Remover um produto do carrinho", () => {
        shoppingHelper.addProductToCart("Sauce Labs Backpack");
        inventoryPage.shoppingCartBadge.should("have.text", "1");
        shoppingHelper.removeProductFromCart("Sauce Labs Backpack");
        inventoryPage.shoppingCartBadge.should("not.exist");
    });
});