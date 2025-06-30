import { addTale, getAllTales, editTale, deleteTale } from "../controllers/tale.controller.js";
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

router.route("/addTale").post(isAuthenticated, singleUpload, addTale);
router.route("/getAllTales").get(isAuthenticated, getAllTales);
router.route("/editTale/:id").put(isAuthenticated, editTale)
router.route("/deleteTale/:id").delete(isAuthenticated, deleteTale)

export default router;