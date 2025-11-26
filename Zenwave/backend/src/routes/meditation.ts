import { Router } from "express";
import meditationController from "../controllers/meditationController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

//  All meditations
router.get("/", meditationController.getAllMeditations);

// Single meditation
router.get("/:id", meditationController.getMeditationById);

// CREATE meditation
router.post("/", authMiddleware, meditationController.createMeditation);

// UPDATE meditation
router.put("/:id", authMiddleware, meditationController.updateMeditation);

// DELETE meditation
router.delete("/:id", authMiddleware, meditationController.deleteMeditation);

export default router;
