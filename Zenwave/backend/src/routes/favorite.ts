import { Router } from "express";
import favoritesController from "../controllers/favoritesController";
import authMiddleware from "../middlewares/authMiddleware";

const router = Router();

router.get("/", authMiddleware, favoritesController.getUserFavorites);
router.post("/:meditationId", authMiddleware, favoritesController.addFavorite);
router.delete(
  "/:meditationId",
  authMiddleware,
  favoritesController.removeFavorite
);
router.get(
  "/check/:meditationId",
  authMiddleware,
  favoritesController.isFavorite
);

export default router;
