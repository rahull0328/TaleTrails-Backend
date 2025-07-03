import express from "express";
import { register, login, logout, getUserInfo } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/getUserInfo").get(isAuthenticated, getUserInfo);

export default router;
