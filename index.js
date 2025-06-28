import dotenv from "dotenv";
import express from "express";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";
import connectDB from "./utils/connectDB.js";

//routes
import userRoutes from "./routes/user.route.js"
import taleRoutes from "./routes/tale.route.js"

dotenv.config({});

const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 8000;

//api routes
app.use("/api/user", userRoutes)
app.use("/api/tale", taleRoutes)

app.listen(PORT, () => {
  connectDB();
  console.log(`Server Connected on ${PORT} !`);
});