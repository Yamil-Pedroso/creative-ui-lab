import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// Routes
import userRoutes from "./routes/user";
import meditationRoutes from "./routes/meditation";
import favoritesRoutes from "./routes/favorite";
import feedbackRoutes from "./routes/feedback";
import sessionRoutes from "./routes/session";

// Cargar archivo config.env
dotenv.config({ path: "./config.env" });

const app: Application = express();

// Middlewares globales
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
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

// static files
import path from "path";

app.use("/images", express.static(path.join(__dirname, "../public/images")));
app.use("/video", express.static(path.join(__dirname, "../public/video")));

// Rutas
app.use("/api/auth", userRoutes);
app.use("/api/meditations", meditationRoutes);
app.use("/api/favorites", favoritesRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/users", userRoutes);

// Ruta default
app.get("/", (req: Request, res: Response) => {
  res.send("Meditation API is running 🚀");
});

// Manejo de rutas no encontradas
//app.all(".*", (req, res) => {
//  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
//});

export default app;
