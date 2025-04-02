import express from "express";
import routes from "./routes.js";
import "dotenv/config";
import db from "./config/db.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(
    cors({
      origin: [
       "https://sticker-project-chi.vercel.app",
       "http://localhost:4173",
        "http://localhost:3000",
      ],
      credentials: true,
    })
  );
app.use(routes)


// Connect with db
db();

const PORT = process.env.PORT;


app.listen(PORT, "0.0.0.0" ,() => console.log(`Server is listening on port: ${PORT}`))