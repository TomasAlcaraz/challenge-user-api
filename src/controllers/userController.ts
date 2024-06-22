import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { validateUser } from "../utils/validate";

export class UserController {
  static async getUsers(req: Request, res: Response) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async createUser(req: Request, res: Response) {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      res.status(201).json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async getUserById(req: Request, res: Response) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async updateUser(req: Request, res: Response) {
    const { error } = validateUser(req.body, true);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });

      const { name, email, password } = req.body;
      const hashedPassword = password
        ? await bcrypt.hash(password, 10)
        : user.password;
      await user.update({ name, email, password: hashedPassword });
      res.json(user);
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async deleteUser(req: Request, res: Response) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) return res.status(404).json({ error: "User not found" });

      await user.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
