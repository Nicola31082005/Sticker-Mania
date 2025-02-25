import { Router } from "express";
import ordersService from "../services/ordersService.js";
import getErrorMessage from "../utils/getError.js";
import { sendEmail } from "../services/emailService.js";

const ordersController = Router();

ordersController.post("/submit-order", async (req, res) => {
    const ordersData = req.body;

    try {
        const newOrder = await ordersService.createOrder(ordersData);

        // Send an order confirmation email
        try {
            await sendEmail({
                to: ordersData.email, // User's email from the form
                subject: "Order Confirmation", // Email subject
                message: `Thank you for your order! Your order ID is ${newOrder._id}.`,
            });
            console.log(`Order confirmation email sent to ${ordersData.email}`);
        } catch (emailError) {
            console.error("Error sending confirmation email:", emailError);
        }

        res.status(201).json({ message: 'Order created successfully!', order: newOrder });
    } catch (error) {
        const err = getErrorMessage(error);
        return res.status(400).json({ message: err });
    }
});

export default ordersController;
