import { Schema, model } from "mongoose";

const ordersSchema = new Schema({
  updatedCartItems: [
    {
      _id: {
        type: String,
        required: [true, "Cart item ID is required."],
      },
      previewUrl: {
        type: String,
        required: [true, "Preview URL is required."],
      },
      size: {
        type: String,
        enum: {
          values: ["small", "medium", "large"],
          message: "Size must be one of: small, medium, large.",
        },
        required: [true, "Size is required."],
      },
      price: {
        type: Number,
        required: [true, "Price is required."],
        min: [10, "Price must be at least $10."],
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required."],
        min: [5, "Minimum quantity is 5."],
      },
      material: {
        type: String,
        enum: {
          values: ["glossy", "matte", "waterproof"],
          message: "Material must be one of: glossy, matte, waterproof.",
        },
        required: [true, "Material is required."],
      },
    },
  ],
  email: {
    type: String,
    required: [true, "Email is required."],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please provide a valid email address.",
    ],
  },
  name: {
    type: String,
    required: [true, "Full name is required."],
    minlength: [2, "Name must be at least 2 characters long."],
  },
  city: {
    type: String,
    required: [true, "City is required."],
    minlength: [2, "City name must be at least 2 characters long."],
  },
  address: {
    type: String,
    required: [true, "Shipping address is required."],
    minlength: [5, "Address must be at least 5 characters long."],
  },
  phone: {
    type: String, // Changed to String to handle phone numbers with special characters
    required: [true, "Phone number is required."],
    match: [
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/,
      "Please provide a valid phone number.",
    ],
  },
  totalPrice: {
    type: Number,
    required: [true, "Total price is required."],
    min: [10, "Total price must be at least $10."],
  },
});

const Orders = model("Orders", ordersSchema);

export default Orders;