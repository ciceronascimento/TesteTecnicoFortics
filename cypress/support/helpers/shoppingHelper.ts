//helper criado para auxiliar nos testes que envolvem adicçao e remoçao de produtos do carrinho
import inventoryPage from "../PageObjects/inventoryPage";

class ShoppingHelper {
    addProductToCart(productName: string) {
        //percorre todos os produtos e verifica qual produto é igual ao produto passado por parametro para adicionar ao carrinho
        inventoryPage.inventoryItems.each(($el) => {
            const itemText = $el.find(".inventory_item_name").text();
            if (itemText.includes(productName)) {
                $el.find(".btn_primary").click();
            }
        });
    }
    removeProductFromCart(productName: string) {
        inventoryPage.inventoryItems.each(($el) => {
            const itemText = $el.find(".inventory_item_name").text();
            if (itemText.includes(productName)) {
                $el.find(".btn_secondary").click();
            }
        });
    }
}
export default new ShoppingHelper();