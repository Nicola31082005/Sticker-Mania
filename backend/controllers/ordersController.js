import { Router } from "express";
import ordersService from "../services/ordersService.js";
import getErrorMessage from "../utils/getError.js";
import { sendEmail } from "../services/emailService.js";

const ordersController = Router();

ordersController.post("/submit-order", async (req, res) => {
    const ordersData = req.body;

    try {
        const newOrder = await ordersService.createOrder(ordersData);
         // Send an email to the user
        // await sendEmail({
        //     to: ordersData.email, // User's email from the form
        //     subject: "Order Confirmation", // Email subject
        //     text: `Thank you for your order! Your order ID is ${newOrder._id}.`, // Plain text body
        //     html: `<p>Thank you for your order! Your order ID is <strong>${newOrder._id}</strong>.</p>`, // HTML body
        // });

        res
        .status(201)
        .json({ message: 'Order created successfully!', order: newOrder });
    } catch (error) {
        const err = getErrorMessage(error);
        return res
        .status(400)
        .json({ message: err })
    }
})


export default ordersController