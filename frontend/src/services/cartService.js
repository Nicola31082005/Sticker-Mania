const CART_KEY = "cartItems"

export default {
    getAll() {
        const cartItems = JSON.parse(localStorage.getItem(CART_KEY)) || [];
        if (!cartItems) return new Error ("No cart items found!");
        return cartItems
    },
    addItem(data) {
        const cartItems = this.getAll();
        cartItems.push(data);
        localStorage.setItem(CART_KEY, JSON.stringify(cartItems));
        return cartItems;
    },
    removeItem(id) {
        const cartItems = this.getAll();
        const updatedCart = cartItems.filter(cartItem => cartItem._id !== id);
        localStorage.setItem(CART_KEY, JSON.stringify(updatedCart));
        return updatedCart;
    },
    getCartTotalPrice() {
        const cartItems = this.getAll();
        return cartItems.reduce((total, item) => total + item.price, 0);
    }




}