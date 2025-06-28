import { addTale } from "../controllers/tale.controller.js";
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"

const router = express.Router()

router.route("/addTale").post(isAuthenticated, addTale)

export default router;