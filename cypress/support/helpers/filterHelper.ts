import inventoryPage from "../../support/PageObjects/inventoryPage";

import * as products from "../../fixtures/inventoryProducts.json"; 

const product = products as { [key: string]: { productName: string; description: string; price: string; ID: string; } };

class FilterHelper {
    filtrarProdutosPorNome(ordenacao: 'Z to A' | 'A to Z') {
        // Cria uma matriz de nomes de produtos a partir da constante product
        const productNames = Object.values(product).map(item => item.productName);
        // Ordena os nomes dos produtos com base no parâmetro de ordenação recebido
        const sortedProductNames = productNames.sort((a, b) => {
            if (ordenacao === 'Z to A') {
                return b.localeCompare(a);
            } else if (ordenacao === 'A to Z') {
                return a.localeCompare(b);
            }
            return 0;
        });
        // Seleciona o filtro na página com base na ordenação
        inventoryPage.filterSelect.select(`Name (${ordenacao})`);
        // Verifica se os nomes dos produtos exibidos correspondem aos nomes ordenados
        inventoryPage.inventoryItems.should($el => {
            const items = $el.map((index, el) => {
                return el.innerText.split('\n')[0];
            }).get();
            expect(items).to.deep.eq(sortedProductNames);
        });
    }

    filtrarProdutosPorPreco(ordenacao: 'low to high' | 'high to low') {

        const productsCopy = { ...product };

        const sortedProducts = Object.values(productsCopy).sort((a, b) => {
            const priceA = parseFloat(a.price);
            const priceB = parseFloat(b.price);

            if (ordenacao === 'low to high') {
                return priceA - priceB;
            } else if (ordenacao === 'high to low') {
                return priceB - priceA;
            }

            // Se os preços forem iguais, ordena alfabeticamente pelo nome
            return 0;
        });
        inventoryPage.filterSelect.select(`Price (${ordenacao})`);
        // Verifica se os produtos exibidos correspondem aos preços ordenados
        inventoryPage.inventoryItemPrice.should($el => {
            const items = $el.map((index, el) => {
                return el.innerText.split('\n')[0];
            }).get();
            const productPrices = sortedProducts.map(item => '$' + item.price);
            expect(items).to.deep.eq(productPrices);
        });
    }
    
}

export default new FilterHelper();