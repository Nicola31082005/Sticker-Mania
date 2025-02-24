import { Router } from "express";
import ordersService from "../services/ordersService.js";
import getErrorMessage from "../utils/getError.js";

const ordersController = Router();

ordersController.post("/submit-order", async (req, res) => {
    const ordersData = req.body;

    try {
        const newOrder = await ordersService.createOrder(ordersData);
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