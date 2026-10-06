import express from "express";
import db from "../db";
import { AuthRepository } from "../repositories/AuthRepositories";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";

const authRouter = express.Router();
const authRepo = new AuthRepository(db);

authRouter.all("/*", toNodeHandler(auth));

authRouter.post("/login", async (req, res, next) => {
  try {
    const { email } = req.body; // Insert password bcrypt.compare() later
    const user = await authRepo.findUserByEmail(email);
    console.log("RETURNING: ", user);
    if (!user) throw new Error("Failed log in attempt.");
    const accessToken = user.email;
    return res.status(200).json({ accessToken });
  } catch (err) {
    next(err);
  }
});

authRouter.post("/register", async (req, res, next) => {
  try {
    const { email, birthDate, password, isAdmin } = req.body;
    // Install and integrate bcrypt()
    const hash = password;
    const newEmail = await authRepo.registerUser(
      email,
      birthDate,
      hash,
      isAdmin
    );
    if (newEmail === null)
      return res.status(500).json({ message: "Failed to insert user." });
    return res.status(201).json(newEmail);
  } catch (err) {
    next(err);
  }
});

export default authRouter;
