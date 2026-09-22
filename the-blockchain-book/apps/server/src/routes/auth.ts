import express from "express";
import pool from "../db";
import { AuthRepository } from "../repositories/AuthRepositories";

const authRouter = express.Router();
const authRepo = new AuthRepository(pool);

authRouter.post("/register", async (req, res) => {
  const { email, birthDate, password } = req.body;
  // Install and integrate bcrypt()
  const hash = password;
  const newUserId = await authRepo.registerUser(email, birthDate, hash);
  if (newUserId === null)
    return res.status(500).json({ message: "Failed to insert user." });
  return res.status(201).json(newUserId);
});

export default authRouter;
