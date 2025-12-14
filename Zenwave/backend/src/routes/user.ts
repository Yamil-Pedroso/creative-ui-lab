import { Router } from "express";
import userController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", userController.register);

router.post("/login", userController.login);

router.get("/profile", authMiddleware, userController.getProfile);

router.put("/profile", authMiddleware, userController.updateProfile);

router.post("/logout", authMiddleware, userController.logout);

export default router;
