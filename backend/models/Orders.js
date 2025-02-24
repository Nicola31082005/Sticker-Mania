import { Schema, model } from "mongoose";

const ordersSchema = new Schema({
    updatedCartItems: [{
        _id: { type: String, required: true },
        previewUrl: {type: String, required: true},
        size: {type: String, required: true},
        price: {type: Number, required: true},
        quantity: {type: Number, required: true},
        material: {type: String, required: true},
    }],
    email: {type: String, required: true},
    name: {type: String, required: true},
    city: {type: String, required: true},
    address: {type: String, required: true},
    phone: {type: Number, required: true},
    totalPrice: {type: Number, required: true}
})


const Orders = model("Orders", ordersSchema)

export default Orders;