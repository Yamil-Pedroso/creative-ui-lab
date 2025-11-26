import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

class UserController {
  async register(req: Request, res: Response) {
    try {
      const { email, password, name } = req.body;

      const exists = await User.findOne({ email });
      if (exists)
        return res.status(400).json({ message: "User already exists" });

      const hashed = await bcrypt.hash(password, 10);

      const user = new User({
        email,
        password: hashed,
        name,
      });

      await user.save();

      res.status(201).json({
        message: "User registered successfully",
        user,
      });
    } catch (error) {
      res.status(500).json({ message: "Error registering user", error });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ email });
      if (!user)
        return res.status(400).json({ message: "Invalid credentials" });

      const match = await bcrypt.compare(password, user.password);
      if (!match)
        return res.status(400).json({ message: "Invalid credentials" });

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET as string,
        { expiresIn: "7d" }
      );

      res.json({ token, user });
    } catch (error) {
      res.status(500).json({ message: "Error logging in", error });
    }
  }

  async getProfile(req: any, res: Response) {
    try {
      const user = await User.findById(req.user.id).populate("favorites");
      res.json(user);
    } catch (error) {
      res.status(500).json({ message: "Error fetching profile", error });
    }
  }

  async toggleFavorite(req: any, res: Response) {
    try {
      const user = await User.findById(req.user.id);
      if (!user) return res.status(404).json({ message: "User not found" });

      const meditationId = req.params.id;

      const alreadyFav = user.favorites.includes(meditationId);

      if (alreadyFav) {
        user.favorites = user.favorites.filter((id) => id !== meditationId);
      } else {
        user.favorites.push(meditationId);
      }

      await user.save();
      res.json({ favorites: user.favorites });
    } catch (error) {
      res.status(500).json({ message: "Error updating favorites", error });
    }
  }

  // ⭐ UPDATE USER
  async updateProfile(req: any, res: Response) {
    try {
      const userId = req.user.id;
      const { name, email, password } = req.body;

      const updates: any = {};

      if (name) updates.name = name;
      if (email) updates.email = email;

      if (password) {
        const hashed = await bcrypt.hash(password, 10);
        updates.password = hashed;
      }

      const updatedUser = await User.findByIdAndUpdate(userId, updates, {
        new: true,
      });

      res.json({
        message: "User updated successfully",
        user: updatedUser,
      });
    } catch (error) {
      res.status(500).json({ message: "Error updating user", error });
    }
  }

  // LOGOUT USER
  async logout(req: Request, res: Response) {
    // Since JWT is stateless, logout can be handled on the client side
    res.json({ message: "User logged out successfully" });
  }
}

export default new UserController();
