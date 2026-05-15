import { Router } from "express";
import bcrypt from "bcryptjs";
import { db, usersTable, insertUserSchema } from "@workspace/db";
import { generateToken, authenticate, findUserByEmail, findUserById, type AuthRequest } from "../middlewares/auth";
import { z } from "zod";

const router = Router();

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

router.post("/auth/register", async (req, res) => {
  try {
    const data = insertUserSchema.parse(req.body);
    const existing = await findUserByEmail(data.email);
    if (existing) {
      res.status(409).json({ error: "Email already registered" });
      return;
    }
    const passwordHash = await bcrypt.hash(data.passwordHash, 12);
    const [user] = await db.insert(usersTable).values({ ...data, passwordHash }).returning({
      id: usersTable.id,
      email: usersTable.email,
      role: usersTable.role,
      firstName: usersTable.firstName,
      lastName: usersTable.lastName,
    });
    const token = generateToken(user);
    res.status(201).json({ user, token });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation failed", details: err.errors });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/auth/login", async (req, res) => {
  try {
    const { email, password } = loginSchema.parse(req.body);
    const user = await findUserByEmail(email);
    if (!user) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }
    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      res.status(401).json({ error: "Invalid email or password" });
      return;
    }
    const token = generateToken({ id: user.id, email: user.email, role: user.role });
    res.json({
      user: { id: user.id, email: user.email, role: user.role, firstName: user.firstName, lastName: user.lastName },
      token,
    });
  } catch (err) {
    if (err instanceof z.ZodError) {
      res.status(400).json({ error: "Validation failed", details: err.errors });
      return;
    }
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/auth/me", authenticate, async (req: AuthRequest, res) => {
  const user = await findUserById(req.user!.id);
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  const { passwordHash, ...safeUser } = user;
  res.json({ user: safeUser });
});

export default router;
