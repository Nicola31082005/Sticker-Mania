import express from "express";
import routes from "./routes.js";
import "dotenv/config";
import db from "./config/db.js";

const app = express();

// Connect with db
await db();



app.use(routes)



app.listen(5000, () => console.log('Server is listening on port: 5000'))