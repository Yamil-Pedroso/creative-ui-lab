import { Request, Response, NextFunction } from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";

const rateLimiter = new RateLimiterMemory({
  points: 20, // 20 requests
  duration: 1, // por segundo
});

export const rateLimiterMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  rateLimiter
    .consume(req.ip || "unknown")
    .then(() => {
      next();
    })
    .catch(() => {
      res.status(429).json({ message: "Too many requests. Slow down." });
    });
};
