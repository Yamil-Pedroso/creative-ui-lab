import { Request, Response } from "express";
import Favorite from "../models/Favorite";
import { Types } from "mongoose";

class FavoritesController {
  async getUserFavorites(req: Request, res: Response) {
    try {
      const userId = req.user?.id;

      const favorites = await Favorite.findOne({ user: userId }).populate(
        "meditations"
      );

      return res.json({
        favorites: {
          meditations: favorites?.meditations || [],
        },
      });
    } catch (error) {
      console.error("Error getting favorites:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async addFavorite(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const meditationId = req.params.meditationId;

      const meditationObj = new Types.ObjectId(meditationId);

      let favorites = await Favorite.findOne({ user: userId });

      if (!favorites) {
        favorites = await Favorite.create({
          user: userId,
          meditations: [meditationObj],
        });
      } else {
        if (!favorites.meditations.some((id) => id.equals(meditationObj))) {
          favorites.meditations.push(meditationObj);
          await favorites.save();
        }
      }

      await favorites.populate("meditations");

      return res.json({
        favorites: {
          meditations: favorites.meditations,
        },
      });
    } catch (error) {
      console.error("Error adding favorite:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async removeFavorite(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const meditationId = req.params.meditationId;

      const meditationObj = new Types.ObjectId(meditationId);

      const favorites = await Favorite.findOne({ user: userId });

      if (!favorites) {
        return res.status(404).json({ message: "No favorites found" });
      }

      favorites.meditations = favorites.meditations.filter(
        (id) => !id.equals(meditationObj)
      );

      await favorites.save();
      await favorites.populate("meditations");

      return res.json({
        favorites: {
          meditations: favorites.meditations,
        },
      });
    } catch (error) {
      console.error("Error removing favorite:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }

  async isFavorite(req: Request, res: Response) {
    try {
      const userId = req.user?.id;
      const meditationId = req.params.meditationId;

      const meditationObj = new Types.ObjectId(meditationId);

      const favorites = await Favorite.findOne({ user: userId });

      const exists = favorites?.meditations.some((id) =>
        id.equals(meditationObj)
      );

      return res.json({ isFavorite: exists || false });
    } catch (error) {
      console.error("Error checking favorite:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}

export default new FavoritesController();
