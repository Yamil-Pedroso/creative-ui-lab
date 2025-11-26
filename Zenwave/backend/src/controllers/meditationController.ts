import { Request, Response } from "express";
import Meditation from "../models/Meditation";
import { cacheGet, cacheSet } from "../utils/cache";

class MeditationController {
  // ⭐ GET ALL – /api/meditations
  async getAllMeditations(req: Request, res: Response) {
    try {
      const cached = await cacheGet("meditations_all");
      const countMedications = await Meditation.countDocuments();

      if (cached) {
        console.log("⚡ From Redis");
        return res.json(cached);
      }

      const meditations = await Meditation.find();

      await cacheSet(
        "meditations_all",
        { count: countMedications, meditations },
        60
      );

      console.log("🐢 From Mongo");
      return res.json({ count: countMedications, meditations });
    } catch (error) {
      console.error("Error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // ⭐ GET BY ID – /api/meditations/:id
  async getMeditationById(req: Request, res: Response) {
    try {
      const meditation = await Meditation.findById(req.params.id);

      if (!meditation) {
        return res.status(404).json({ message: "Meditation not found" });
      }

      return res.json(meditation);
    } catch (error) {
      console.error("Error getting meditation:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // ⭐ CREATE – POST /api/meditations
  async createMeditation(req: Request, res: Response) {
    try {
      const {
        title,
        category,
        duration,
        level,
        description,
        audioUrl,
        image,
        video,
      } = req.body;

      const meditation = await Meditation.create({
        title,
        category,
        duration,
        level,
        description,
        audioUrl,
        image, // <-- AHORA correcto
        video, // <-- AHORA correcto
      });

      return res.status(201).json({
        message: "Meditation created",
        meditation,
      });
    } catch (error) {
      console.error("Error creating meditation:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // ⭐ UPDATE – PUT /api/meditations/:id
  async updateMeditation(req: Request, res: Response) {
    try {
      const updated = await Meditation.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ message: "Meditation not found" });
      }

      return res.json({
        message: "Meditation updated",
        meditation: updated,
      });
    } catch (error) {
      console.error("Error updating meditation:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  // ⭐ DELETE – DELETE /api/meditations/:id
  async deleteMeditation(req: Request, res: Response) {
    try {
      const deleted = await Meditation.findByIdAndDelete(req.params.id);

      if (!deleted) {
        return res.status(404).json({ message: "Meditation not found" });
      }

      return res.json({ message: "Meditation deleted" });
    } catch (error) {
      console.error("Error deleting meditation:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new MeditationController();
