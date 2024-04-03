import authHelper from "../../support/helpers/authHelper";
import filterHelper from "../../support/helpers/filterHelper";

describe("Caso de uso: Testes de filtros", () => {
    beforeEach(() => {
        authHelper.visit();
        authHelper.authenticateDefault();
    });

    it("Filtrar produtos por preço (low to high)", () => {
        filterHelper.filtrarProdutosPorPreco('low to high');
    });

    it("Filtrar produtos por preço (high to low)", () => {
        filterHelper.filtrarProdutosPorPreco('high to low');
    });

    it("Filtrar produtos por nome (Z to A)", () => {
        filterHelper.filtrarProdutosPorNome('Z to A');
   });
    it("Filtrar produtos por nome (A to Z)", () => {
        filterHelper.filtrarProdutosPorNome('A to Z');
    });

});