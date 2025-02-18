import { Router } from "express";
import homeController from "./controllers/homeController.js";
import ordersController from "./controllers/ordersController.js";

const routes = Router();

routes.use(homeController)
routes.use(ordersController)


export default routes