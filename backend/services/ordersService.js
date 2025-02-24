import Orders from "../models/Orders.js"

export default {
    async createOrder(ordersData) {
        return await Orders.create(ordersData);
    },


}