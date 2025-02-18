import { Router } from "express";

const ordersController = Router();

ordersController.post("/submit-order", (req, res) => {
    const ordersData = req.body;
    console.log(ordersData);

})


export default ordersController