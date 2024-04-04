import inventoryPage from "../../support/PageObjects/inventoryPage";
import cartPage from "../../support/PageObjects/cartPage";

import authHelper from "../../support/helpers/authHelper";
import verifyUrlHelper from "../../support/helpers/verifyUrlHelper";

import * as errorMessages from "../../fixtures/errorMessages.json";
import * as products from "../../fixtures/inventoryProducts.json"; 

import { faker } from "@faker-js/faker";

// Define o tipo de products como um objeto com chave string e valor objeto
const product = products as { [key: string]: { productName: string; description: string; price: string; ID: string; } };
// Conta a quantidade de produtos no arquivo de fixtures
const productCount: number = Object.keys(products).length;

describe("Caso de uso: Testes comprar produtos", () => {
    beforeEach(() => {
        authHelper.visit();
        authHelper.authenticateDefault();
    });
    // Teste para verificar todo o fluxo de compra de um unico produto
    it("Comprar um produto", () => {
        inventoryPage.inventoryItems.each(($el) => {
            const productName = $el.find(".inventory_item_name").text();
            if(productName === product["Sauce Labs Backpack"].productName) {
                $el.find(".btn_primary").click();
            }
        });
        inventoryPage.shoppingCartBadge.should("have.text", "1");
        inventoryPage.shoppingCartLink.click();
        verifyUrlHelper.verifyCart();
        cartPage.cartItem.should("have.length", 1);
        cartPage.cartItemName.should("contain", product["Sauce Labs Backpack"].productName);
        cartPage.checkoutButton.click();
        verifyUrlHelper.verifyCheckout();
        cartPage.firstName.type(faker.person.firstName());
        cartPage.lastName.type(faker.person.lastName());
        cartPage.postalCode.type(faker.address.zipCode());
        cartPage.continueButton.click();
        verifyUrlHelper.verifyCheckoutStepTwo();
        cartPage.cartItem.should("have.length", 1);
        cartPage.cartItemName.should("contain", product["Sauce Labs Backpack"].productName);
        cartPage.finishButton.click();
        verifyUrlHelper.verifyCheckoutComplete();
        cartPage.completeHeader.should("have.text", "THANK YOU FOR YOUR ORDER");
    });
    // Verifica se todos os produtos estão sendo adicionados ao carrinho e finaliza a compra com todos os produtos
    it("Comprar todos os produtos", () => {
        inventoryPage.inventoryItems.each(($el) => {
            $el.find(".btn_primary").click();
        });
        inventoryPage.shoppingCartBadge.should("have.text", "6");
        inventoryPage.shoppingCartLink.click();
        verifyUrlHelper.verifyCart();
        cartPage.cartItem.should("have.length", productCount);
        cartPage.checkoutButton.click();
        verifyUrlHelper.verifyCheckout();
        cartPage.firstName.type(faker.person.firstName());
        cartPage.lastName.type(faker.person.lastName());
        cartPage.postalCode.type(faker.address.zipCode());
        cartPage.continueButton.click();
        verifyUrlHelper.verifyCheckoutStepTwo();
        cartPage.cartItem.should("have.length", productCount);
        cartPage.finishButton.click();
        verifyUrlHelper.verifyCheckoutComplete();
        cartPage.completeHeader.should("have.text", "THANK YOU FOR YOUR ORDER");
    });

    it("Comprar um produto e remover do carrinho", () => {
        inventoryPage.inventoryItems.each(($el) => {
            const productName = $el.find(".inventory_item_name").text();
            if(productName === product["Sauce Labs Backpack"].productName) {
                $el.find(".btn_primary").click();
            }
        });
        inventoryPage.shoppingCartBadge.should("have.text", "1");
        inventoryPage.shoppingCartLink.click();
        verifyUrlHelper.verifyCart();
        cartPage.cartItem.should("have.length", 1);
        cartPage.cartItemName.should("contain", product["Sauce Labs Backpack"].productName);
        cartPage.cartItemRemove.click();
        cartPage.cartItem.should("not.exist");
        cartPage.cartContinueShopping.click();
        inventoryPage.shoppingCartBadge.should("not.exist");
    });
 
    it("Adicionar um produto ao carrinho continuar comprando", () => {
        inventoryPage.inventoryItems.each(($el) => {
            const productName = $el.find(".inventory_item_name").text();
            if(productName === "Sauce Labs Backpack") {
                $el.find(".btn_primary").click();
            }
        });
        inventoryPage.shoppingCartBadge.should("have.text", "1");
        inventoryPage.shoppingCartLink.click();
        verifyUrlHelper.verifyCart();
        cartPage.cartItem.should("have.length", 1);
        cartPage.cartItemName.should("contain", product["Sauce Labs Backpack"].productName);
        cartPage.cartContinueShopping.click();
        inventoryPage.shoppingCartBadge.should("have.text", "1");
    });

    it("Comprar sem adicionar produtos ao carrinho", () => {
        inventoryPage.shoppingCartLink.click();
        verifyUrlHelper.verifyCart();
        cartPage.cartItem.should("not.exist");
        cartPage.checkoutButton.click();
        verifyUrlHelper.verifyCart();
        cartPage.errorField.should("have.text", errorMessages.empty_cart.error);
    });

    it("Comprar sem preencher o primeiro nome", () => {
        inventoryPage.inventoryItems.each(($el) => {
            const productName = $el.find(".inventory_item_name").text();
            if(productName === product["Sauce Labs Backpack"].productName) {
                $el.find(".btn_primary").click();
            }
        });
        inventoryPage.shoppingCartBadge.should("have.text", "1");
        inventoryPage.shoppingCartLink.click();
        verifyUrlHelper.verifyCart();
        cartPage.cartItem.should("have.length", 1);
        cartPage.cartItemName.should("contain", product["Sauce Labs Backpack"].productName);
        cartPage.checkoutButton.click();
        verifyUrlHelper.verifyCheckout();
        cartPage.lastName.type(faker.person.lastName());
        cartPage.postalCode.type(faker.address.zipCode());
        cartPage.continueButton.click();
        verifyUrlHelper.verifyCheckout();
        cartPage.errorField.should("have.text", errorMessages.empty_first_name.error);
    });
    it("Comprar sem preencher o sobrenome", () => {
        inventoryPage.inventoryItems.each(($el) => {
            const productName = $el.find(".inventory_item_name").text();
            if(productName === product["Sauce Labs Backpack"].productName) {
                $el.find(".btn_primary").click();
            }
        });
        inventoryPage.shoppingCartBadge.should("have.text", "1");
        inventoryPage.shoppingCartLink.click();
        verifyUrlHelper.verifyCart();
        cartPage.cartItem.should("have.length", 1);
        cartPage.cartItemName.should("contain", product["Sauce Labs Backpack"].productName);
        cartPage.checkoutButton.click();
        verifyUrlHelper.verifyCheckout();
        cartPage.firstName.type(faker.person.firstName());
        cartPage.postalCode.type(faker.address.zipCode());
        cartPage.continueButton.click();
        verifyUrlHelper.verifyCheckout();
        cartPage.errorField.should("have.text", errorMessages.empty_last_name.error);
    });
    it("Comprar sem preencher o código postal", () => {
        inventoryPage.inventoryItems.each(($el) => {
            const productName = $el.find(".inventory_item_name").text();
            if(productName === product["Sauce Labs Backpack"].productName) {
                $el.find(".btn_primary").click();
            }
        });
        inventoryPage.shoppingCartBadge.should("have.text", "1");
        inventoryPage.shoppingCartLink.click();
        verifyUrlHelper.verifyCart();
        cartPage.cartItem.should("have.length", 1);
        cartPage.cartItemName.should("contain", product["Sauce Labs Backpack"].productName);
        cartPage.checkoutButton.click();
        verifyUrlHelper.verifyCheckout();
        cartPage.firstName.type(faker.person.firstName());
        cartPage.lastName.type(faker.person.lastName());
        cartPage.continueButton.click();
        verifyUrlHelper.verifyCheckout();
        cartPage.errorField.should("have.text", errorMessages.empty_zip_code.error);
    });

    // O cenario abaixo ira falhar pois o campo de código postal atualmente aceita caracteres especiais onde deveria aceitar apenas numeros
    it("Comprar codigo postal inválido", () => {
        inventoryPage.inventoryItems.each(($el) => {
            const productName = $el.find(".inventory_item_name").text();
            if(productName === product["Sauce Labs Backpack"].productName) {
                $el.find(".btn_primary").click();
            }
        });
        inventoryPage.shoppingCartBadge.should("have.text", "1");
        inventoryPage.shoppingCartLink.click();
        verifyUrlHelper.verifyCart();

        cartPage.cartItem.should("have.length", 1);
        cartPage.cartItemName.should("contain", product["Sauce Labs Backpack"].productName);
        cartPage.checkoutButton.click();
        verifyUrlHelper.verifyCheckout();
        cartPage.firstName.type(faker.person.firstName());
        cartPage.lastName.type(faker.person.lastName());
        cartPage.postalCode.type("#@!#fdsfdshahauheuhsauehayeaueha");
        cartPage.continueButton.click();
        verifyUrlHelper.verifyCheckout();
        cartPage.errorField.should("have.text", errorMessages.invalid_zip_code.error);
    });
    it("Comprar sem preencher o primeiro nome, sobrenome e código postal", () => {
        inventoryPage.inventoryItems.each(($el) => {
            const productName = $el.find(".inventory_item_name").text();
            if(productName === "Sauce Labs Backpack") {
                $el.find(".btn_primary").click();
            }
        });
        inventoryPage.shoppingCartBadge.should("have.text", "1");
        inventoryPage.shoppingCartLink.click();
        verifyUrlHelper.verifyCart();
        cartPage.cartItem.should("have.length", 1);
        cartPage.cartItemName.should("contain", product["Sauce Labs Backpack"].productName);
        cartPage.checkoutButton.click();
        verifyUrlHelper.verifyCheckout();
        cartPage.continueButton.click();
        verifyUrlHelper.verifyCheckout();
        cartPage.errorField.should("have.text", errorMessages.empty_first_name.error);
    });
});
