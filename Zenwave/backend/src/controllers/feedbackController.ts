import { Request, Response } from "express";
import Feedback from "../models/Feedback";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

class FeedbackController {
  // CREATE feedback
  async createFeedback(req: Request, res: Response) {
    try {
      const { meditationId, rating, comment } = req.body;

      if (!req.user?.id) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const feedback = await Feedback.create({
        userId: req.user.id,
        meditationId,
        rating,
        comment,
      });

      return res.status(201).json(feedback);
    } catch (error) {
      console.error("Error creating feedback:", error);
      res.status(500).json({ message: "Error creating feedback", error });
    }
  }

  // GET feedback for a meditation
  async getFeedbackForMeditation(req: Request, res: Response) {
    try {
      const meditationId = req.params.meditationId;

      const feedback = await Feedback.find({ meditationId }).populate(
        "userId",
        "name email"
      );

      return res.json(feedback);
    } catch (error) {
      console.error("Error fetching feedback:", error);
      res.status(500).json({ message: "Error fetching feedback", error });
    }
  }

  // UPDATE feedback (only owner)

  // DELETE feedback (only owner)
  async deleteFeedback(req: Request, res: Response) {
    try {
      const feedbackId = req.params.id;

      const feedback = await Feedback.findById(feedbackId);

      if (!feedback) {
        return res.status(404).json({ message: "Feedback not found" });
      }

      // Only the creator can delete
      if (feedback.userId.toString() !== req.user?.id) {
        return res.status(403).json({ message: "Forbidden" });
      }

      await feedback.deleteOne();

      return res.json({ message: "Feedback deleted successfully" });
    } catch (error) {
      console.error("Error deleting feedback:", error);
      res.status(500).json({ message: "Error deleting feedback", error });
    }
  }
}

export default new FeedbackController();
