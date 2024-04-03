import inventoryPage from "../PageObjects/inventoryPage";

class ShoppingHelper {
    addProductToCart(productName: string) {
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