import { addTale, getAllTales } from "../controllers/tale.controller.js";
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js"

const router = express.Router()

router.route("/addTale").post(isAuthenticated, addTale)
router.route("/getAllTales").get(isAuthenticated, getAllTales)

export default router;