class InventoryPage {

    get inventoryItems() {
        return cy.get(".inventory_item");
    }

    get inventoryItemName() {
        return cy.get(".inventory_item_name");
    }

    get inventoryItemPrice() {
        return cy.get(".inventory_item_price");
    }

    get inventoryItemButton() {
        return cy.get(".btn_primary");
    }

    get shoppingCartBadge() {
        return cy.get(".shopping_cart_badge");
    }

    get shoppingCartLink() {
        return cy.get(".shopping_cart_link");
    }
    get filterSelect() {
        return cy.get(".product_sort_container");
    }

}
export default new InventoryPage();