import inventoryPage from "../../support/PageObjects/inventoryPage";

import authHelper from "../../support/helpers/authHelper";
import shoppingHelper from "../../support/helpers/shoppingHelper";

import * as products from "../../fixtures/inventoryProducts.json"; 

// Converte o json em um objeto para facilitar a manipulação e contagem de produtos
const product = products as { [key: string]: { productName: string; description: string; price: string; ID: string; } };
const productCount: number = Object.keys(products).length;

describe("Caso de uso: Testes de produtos", () => {
    beforeEach(() => {
        authHelper.visit();
        authHelper.authenticateDefault();
    });

    // lista todos os produtos e verifica se a quantidade de produtos é a mesma que o json
    it("Listar todos os produtos", () => {
        inventoryPage.inventoryItems.should("have.length", productCount);
    }); 

    it("Listar todos os produtos com nome, descrição e preço", () => {
        //percorre todos os produtos e verifica se o nome, descrição e preço estão corretos com o json em fixtures
        inventoryPage.inventoryItems.each(($el) => {
            const productName = $el.find(".inventory_item_name").text();
            const productDescription = $el.find(".inventory_item_desc").text();
            const productPrice = $el.find(".inventory_item_price").text();
            expect(product[productName].productName).to.equal(productName);
            expect(product[productName].description).to.equal(productDescription);
            expect("$" + product[productName].price).to.equal(productPrice);
        });
    });

    it("Adicionar um produto ao carrinho", () => {
        shoppingHelper.addProductToCart(product["Sauce Labs Bike Light"].productName);
        inventoryPage.shoppingCartBadge.should("have.text", "1");
        shoppingHelper.addProductToCart(product["Sauce Labs Bolt T-Shirt"].productName);
        inventoryPage.shoppingCartBadge.should("have.text", "2");
    });
    it("Adicionar todos os produtos ao carrinho", () => {
        //percorre e adiciona todos os produtos ao carrinho
        inventoryPage.inventoryItems.each(($el) => {
            $el.find(".btn_primary").click();
        });
        inventoryPage.shoppingCartBadge.should("have.text", "6");
    });

    it("Remover um produto do carrinho", () => {
        shoppingHelper.addProductToCart(product["Sauce Labs Backpack"].productName);
        inventoryPage.shoppingCartBadge.should("have.text", "1");
        shoppingHelper.removeProductFromCart(product["Sauce Labs Backpack"].productName);
        inventoryPage.shoppingCartBadge.should("not.exist");
    });
});