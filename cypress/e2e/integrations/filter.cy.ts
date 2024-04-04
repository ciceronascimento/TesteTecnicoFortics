import inventoryPage from "../../support/PageObjects/inventoryPage";

import authHelper from "../../support/helpers/authHelper";
import filterHelper from "../../support/helpers/filterHelper";


// testes de filtros, foram separados em um arquivo unico para melhor organização

describe("Caso de uso: Testes de filtros", () => {
    beforeEach(() => {
        authHelper.visit();
        authHelper.authenticateDefault();
    });

    it("Filtrar produtos por preço (low to high)", () => {
        // captura os produtos ordenados
        const sortedProducts = filterHelper.filtrarProdutosPorPreco('low to high');
        inventoryPage.filterSelect.select('Price (low to high)');
        // verifica se os preços dos produtos exibidos correspondem aos preços ordenados
        inventoryPage.inventoryItemPrice.should($el => {
            const items = $el.map((index, el) => {
                return el.innerText.split('\n')[0];
            }).get();
            const productPrices = sortedProducts.map(item => '$' + item.price);
            expect(items).to.deep.eq(productPrices);
        });
        
    });

    it("Filtrar produtos por preço (high to low)", () => {
        const sortedProducts = filterHelper.filtrarProdutosPorPreco('high to low');
        inventoryPage.filterSelect.select('Price (high to low)');
        inventoryPage.inventoryItemPrice.should($el => {
            const items = $el.map((index, el) => {
                return el.innerText.split('\n')[0];
            }).get();
            const productPrices = sortedProducts.map(item => '$' + item.price);
            expect(items).to.deep.eq(productPrices);
        });
    });

    it("Filtrar produtos por nome (Z to A)", () => {
        // captura os nomes dos produtos ordenados
        const sortedProductNames = filterHelper.filtrarProdutosPorNome('Z to A');
        inventoryPage.filterSelect.select('Name (Z to A)');
        // verificar se os nomes dos produtos exibidos correspondem aos nomes ordenados
        inventoryPage.inventoryItems.should($el => {
            const items = $el.map((index, el) => {
                return el.innerText.split('\n')[0];
            }).get();
            expect(items).to.deep.eq(sortedProductNames);
        });
   });
    it("Filtrar produtos por nome (A to Z)", () => {
        const sortedProductNames = filterHelper.filtrarProdutosPorNome('A to Z');
        inventoryPage.filterSelect.select('Name (A to Z)');
        inventoryPage.inventoryItems.should($el => {
            const items = $el.map((index, el) => {
                return el.innerText.split('\n')[0];
            }).get();
            expect(items).to.deep.eq(sortedProductNames);
        });
    });
});