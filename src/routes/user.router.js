import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
const router = Router()

router.post("/register", (req, res) => {
    res.status(200).json({
        message: "Register route is working"
    });
});

// router.route("/register").post(registerUser)

export default router