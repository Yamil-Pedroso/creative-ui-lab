import path from "path";
import dotenv from "dotenv";

// Detect environment
const isProd = process.env.NODE_ENV === "production";

// Load config.env in dev, .env in prod
dotenv.config({
  path: isProd
    ? path.join(process.cwd(), ".env") // Producción
    : path.join(__dirname, "config", "config.env"), // Desarrollo local
});

import express, { Application, Request, Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Routes
import userRoutes from "./routes/user";
import meditationRoutes from "./routes/meditation";
import favoritesRoutes from "./routes/favorite";
import feedbackRoutes from "./routes/feedback";
import sessionRoutes from "./routes/session";

const app: Application = express();

// CORS
app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://creative-ui-lab.vercel.app",
      "https://creative-ui-lab-3868.vercel.app",
    ],
    credentials: true,
  })
);

app.use(express.json());

app.use(
  helmet({
    crossOriginOpenerPolicy: { policy: "unsafe-none" },
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);

app.use(morgan("dev"));

// Static files
app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.use("/video", express.static(path.join(__dirname, "../public/video")));

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/meditations", meditationRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Meditation API is running 🚀");
});

export default app;
