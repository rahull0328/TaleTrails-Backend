import express from "express"
import { register, login } from "../controllers/user.controller.js"

const router = express.Router()

router.route("/register").post(register);
router.route("/login").get(login)

export default router;