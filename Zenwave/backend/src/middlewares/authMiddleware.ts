import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
}

const authMiddleware = (req: any, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1];
  console.log("AUTH HEADER:", req.headers.authorization);

  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token", error });
  }
};

export default authMiddleware;
