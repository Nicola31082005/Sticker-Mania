import { Schema, model } from "mongoose";

const ordersSchema = new Schema({
    cart: [{
        size: {type: String, required: true},
        quantity: Number,
        price: {type: String, required: true},
        image: {type: String, required: true},
        material: {type: String, required: true},
    }],
    email: {type: String, required: true},
    name: {type: String, required: true},
    city: {type: String, required: true},
    address: {type: String, required: true},
    number: {type: String, required: true},
    totalPrice: {type: Number, required: true}
})


const Orders = model("Orders", ordersSchema)

export default Orders;