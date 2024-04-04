// helper criado para separar responsabilidades com os testes de filtro, melhorando a organização e manutenção do código

import * as products from "../../fixtures/inventoryProducts.json"; 

const product = products as { [key: string]: { productName: string; description: string; price: string; ID: string; } };

class FilterHelper {
    // Método para filtrar produtos por nome (Z to A e A to Z)
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
        return sortedProductNames;
    }

    // Método para filtrar produtos por preço (low to high e high to low)
    filtrarProdutosPorPreco(ordenacao: 'low to high' | 'high to low') {
        // Cria uma cópia do objeto product
        const productsCopy = { ...product };
        // Ordena os produtos com base no parâmetro de ordenação recebido
        const sortedProducts = Object.values(productsCopy).sort((a, b) => {
            // Converte os preços dos produtos para números decimais
            const priceA = parseFloat(a.price);
            const priceB = parseFloat(b.price);
            // Compara os preços dos produtos com base no parâmetro de ordenação recebido
            if (ordenacao === 'low to high') {
                return priceA - priceB;
            } else if (ordenacao === 'high to low') {
                return priceB - priceA;
            }
            return 0;
        });
        return sortedProducts;
    }
}
export default new FilterHelper();