import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import morgan from "morgan";
import multer from "multer";
import colors from "colors";
import router from "./routes/route.js";

// Database
import connect from "./database/conn.js";

// dotenv config
dotenv.config();
const port = process.env.PORT;

// REST OBJ
const app = express();

// Middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("tiny"));
app.disable("x-powered-by"); //less hackers know about our stack
app.use(bodyParser.urlencoded({ extended: false }));

// HTTP GET
app.get("/", (req, res) => {
  res.send("Server is now running");
});
// API Routes
app.use("/api/v1", router);

// start server when we have a valid connection
connect()
  .then(() => {
    try {
      app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`.bgCyan);
      });
    } catch (error) {
      console.log("Cannot connect to the server");
    }
  })
  .catch((error) => {
    console.log("Invalid Database");
  });
