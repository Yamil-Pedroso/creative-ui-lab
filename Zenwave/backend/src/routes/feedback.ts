import { Router } from "express";
import feedbackController from "../controllers/feedbackController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

// ⭐ Create feedback for a meditation
router.post("/", authMiddleware, feedbackController.createFeedback);

// ⭐ Get feedback for a specific meditation
router.get(
  "/meditation/:meditationId",
  feedbackController.getFeedbackForMeditation
);

// ⭐ Delete feedback (only owner)
router.delete("/:id", authMiddleware, feedbackController.deleteFeedback);

export default router;
