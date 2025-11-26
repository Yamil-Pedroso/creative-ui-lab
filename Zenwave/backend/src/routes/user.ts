import { Router } from "express";
import userController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

// ⭐ Create user
router.post("/register", userController.register);

// ⭐ Login user
router.post("/login", userController.login);

// ⭐ Get logged user profile
router.get("/profile", authMiddleware, userController.getProfile);

// ⭐ Update logged user profile
router.put("/profile", authMiddleware, userController.updateProfile);

// LOGOUT user
router.post("/logout", authMiddleware, userController.logout);

export default router;
