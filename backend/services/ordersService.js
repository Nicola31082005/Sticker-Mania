import Orders from "../models/Orders.js"

export default {
    async createOrder(ordersData) {
        await Orders.create(ordersData);
    },


}