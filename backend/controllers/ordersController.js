import { Router } from "express";
import ordersService from "../services/ordersService.js";
import getErrorMessage from "../utils/getError.js";
import { sendEmail } from "../services/emailService.js";

const ordersController = Router();

ordersController.post("/submit-order", async (req, res) => {
  const orderData = req.body;

  try {
    // Validate that required fields are present
    if (
      !orderData.cartItems ||
      !orderData.customerInfo ||
      !orderData.totalPrice
    ) {
      return res.status(400).json({
        message:
          "Missing required fields. Please provide cartItems, customerInfo, and totalPrice.",
      });
    }

    // Create the order
    const newOrder = await ordersService.createOrder(orderData);

    // Send an order confirmation email
    try {
      await sendEmail({
        to: orderData.customerInfo.email,
        subject: "Order Confirmation",
        message: `Thank you for your order! Your order ID is ${newOrder._id}.`,
      });
      console.log(
        `Order confirmation email sent to ${orderData.customerInfo.email}`
      );
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
    }

    // Return success response
    res.status(201).json({
      message: "Order created successfully!",
      order: {
        _id: newOrder._id,
        totalPrice: newOrder.totalPrice,
        createdAt: newOrder.createdAt,
      },
    });
  } catch (error) {
    console.error("Order creation error:", error);
    const err = getErrorMessage(error);
    return res.status(400).json({ message: err });
  }
});

export default ordersController;
