import { Router } from "express";
import ordersService from "../services/ordersService.js";

const ordersController = Router();

ordersController.post("/submit-order", async (req, res) => {
    const ordersData = req.body;

    try {
        await ordersService.createOrder(ordersData);
        res.end()
    } catch (error) {
        console.error(error.message)
    }

})


export default ordersController