import express from "express";
import db from "../db";
import { extractBearerToken } from "../util/auth";
import { AuthRepository } from "../repositories/AuthRepositories";
import { ProgressRepository } from "../repositories/ProgressRepositories";
import addStep from "../util/addStep";

const progressRouter = express.Router();
const progressRepo = new ProgressRepository(db);
const authRepo = new AuthRepository(db);

progressRouter.get("/user", async (req, res) => {
  if (!req.headers.authorization) throw new Error("No authorization found");
  const email = extractBearerToken(req.headers.authorization);
  if (!email) throw new Error("No email found");
  const user = await authRepo.findUserByEmail(email);
  if (!user) return res.status(401).json({ message: "Invalid user." });
  const currentStep = await progressRepo.getProgressById(user.id);
  if (!currentStep) return res.status(200).json(0);
  return res.status(200).json(currentStep);
});

progressRouter.post("/begin", async (req, res) => {
  if (!req.headers.authorization) throw new Error("No authorization found");
  const email = extractBearerToken(req.headers.authorization);
  if (!email) throw new Error("No email found");
  const user = await authRepo.findUserByEmail(email);
  const time = await progressRepo.beginCourse(user.id);
  if (time === null)
    return res
      .status(500)
      .json({ message: "Failed to create user progress row." });
  return res.status(201).json({ time, message: "Course progress has begun." });
});

progressRouter.post("/unlockStep", async (req, res) => {
  if (!req.headers.authorization) throw new Error("No authorization found");
  const email = extractBearerToken(req.headers.authorization);
  if (!email) throw new Error("No email found");
  const user = await authRepo.findUserByEmail(email);
  const progress = await progressRepo.getProgressById(user.id);
  if (!progress) {
    return res
      .status(400)
      .json({ message: "No progress found. Begin the course first." });
  }
  const nextStep = addStep(progress);
  const updated = await progressRepo.unlockNextStep(user.id, nextStep);
  return res.status(200).json(updated); // { current_step: nextStep }
});

progressRouter.delete("/deleteProgress", async (req, res) => {
  if (!req.headers.authorization) throw new Error("No authorization found");
  const email = extractBearerToken(req.headers.authorization);
  if (!email) throw new Error("No email found");
  const user = await authRepo.findUserByEmail(email);
  await progressRepo.deleteProgress(user.id);
  return res.status(204).json();
});

export default progressRouter;
