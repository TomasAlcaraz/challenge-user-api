import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from "bcrypt";
import { validateUser } from "../utils/validate";

export class AuthController {
  static async register(req: Request, res: Response) {
    const { error } = validateUser(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    try {
      const { name, email, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword });
      const token = user.generateAuthToken();
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }

  static async login(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const user = await User.findOne({ where: { email } });
      if (!user)
        return res.status(400).json({ error: "Invalid email or password" });

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword)
        return res.status(400).json({ error: "Invalid email or password" });

      const token = user.generateAuthToken();
      res.json({ user, token });
    } catch (error) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
}
