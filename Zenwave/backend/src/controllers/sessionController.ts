import { Request, Response } from "express";
import { Types } from "mongoose";
import Session from "../models/Session";

class SessionController {
  // ⭐ START a meditation session
  async startSession(req: any, res: Response) {
    try {
      const userId = req.user?.id;
      const { meditationId } = req.body;

      if (!userId || !meditationId) {
        return res
          .status(400)
          .json({ message: "User ID and meditation ID are required" });
      }

      const session = await Session.create({
        userId: new Types.ObjectId(userId),
        meditationId: new Types.ObjectId(meditationId),
        startTime: new Date(),
        duration: 0,
      });

      return res.status(201).json({
        message: "Session started",
        session,
      });
    } catch (error) {
      console.error("Error starting session:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // ⭐ FINISH a meditation session
  async finishSession(req: any, res: Response) {
    try {
      const userId = req.user?.id;
      const sessionId = req.params.id;

      const session = await Session.findOne({
        _id: sessionId,
        userId,
      });

      if (!session) {
        return res.status(404).json({ message: "Session not found" });
      }

      // Calculate duration automatically
      const endTime = new Date();
      const duration = (endTime.getTime() - session.startTime.getTime()) / 1000; // secs

      session.endTime = endTime;
      session.duration = duration;

      await session.save();

      return res.json({
        message: "Session finished",
        session,
      });
    } catch (error) {
      console.error("Error finishing session:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  // ⭐ GET all sessions by logged user
  async getUserSessions(req: any, res: Response) {
    try {
      const userId = req.user?.id;

      const sessions = await Session.find({ userId })
        .populate("meditationId")
        .sort({ startTime: -1 });

      return res.json(sessions);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new SessionController();
