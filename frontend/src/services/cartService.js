let cartItems = []

export default {
    getAll() {
        if (!cartItems) return new Error ("No cart items found!");
        return cartItems
    },
    addItem(data) {
        return cartItems.push(data)
    },
    removeItem(id) {
        const itemForDelete = cartItems.filter(cartItem => cartItem._id === id)[0];
        cartItems.splice(cartItems.indexOf(itemForDelete), 1)
        return cartItems
    },




}