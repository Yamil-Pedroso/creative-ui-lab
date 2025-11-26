import { Router } from "express";
import sessionController from "../controllers/sessionController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

// ⭐ Start a session
router.post("/", authMiddleware, sessionController.startSession);

// ⭐ Finish session
router.patch("/:id", authMiddleware, sessionController.finishSession);

// ⭐ Get all sessions for logged user
router.get("/", authMiddleware, sessionController.getUserSessions);

export default router;
