import express from "express";
import pool from "../db";
import { AuthRepository } from "../repositories/AuthRepositories";

const authRouter = express.Router();
const authRepo = new AuthRepository(pool);

authRouter.post("/login", async (req, res) => {
  const { email } = req.body; // Insert password bcrypt.compare() later
  const user = await authRepo.findUserByEmail(email);
  console.log("RETURNING: ", user);
  if (!user) throw new Error("Failed log in attempt.");
  const accessToken = user.email;
  return res.status(200).json({ accessToken });
});

authRouter.post("/register", async (req, res) => {
  const { email, birthDate, password } = req.body;
  // Install and integrate bcrypt()
  const hash = password;
  const newEmail = await authRepo.registerUser(email, birthDate, hash);
  if (newEmail === null)
    return res.status(500).json({ message: "Failed to insert user." });
  return res.status(201).json(newEmail);
});

export default authRouter;
