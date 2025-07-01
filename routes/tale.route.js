import { addTale, getAllTales, editTale, deleteTale, addToFavourites, searchTale, filterTale } from "../controllers/tale.controller.js";
import express from "express";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/multer.js";

const router = express.Router();

//CRUD
router.route("/addTale").post(isAuthenticated, singleUpload, addTale);
router.route("/getAllTales").get(isAuthenticated, getAllTales);
router.route("/editTale/:id").put(isAuthenticated, editTale)
router.route("/deleteTale/:id").delete(isAuthenticated, deleteTale)

//other functionalities
router.route("/addToFavourites/:id").put(isAuthenticated, addToFavourites)
router.route("/searchTale").get(isAuthenticated, searchTale)
router.route("/filterTale").get(isAuthenticated, filterTale)

export default router;