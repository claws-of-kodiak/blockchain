import express from "express";
import pool from "../db";
import { extractBearerToken } from "../util/auth";
import { AuthRepository } from "../repositories/AuthRepositories";
import { ProgressRepository } from "../repositories/ProgressRepositories";

const progressRouter = express.Router();
const progressRepo = new ProgressRepository(pool);
const authRepo = new AuthRepository(pool);

progressRouter.get("/user", async (req, res) => {
  if (!req.headers.authorization) throw new Error("No authorization found");
  const email = extractBearerToken(req.headers.authorization);
  if (!email) throw new Error("No email found");
  const user = await authRepo.findUserByEmail(email);
  if (!user) return res.status(401).json({ message: "Invalid user." });
  const stepRes = await progressRepo.getProgressById(user.id);
  const currentStep = Number(stepRes.current_step);
  console.log("currentStep ", currentStep);
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
  const currentStep = await progressRepo.unlockNextStep(
    user.id,
    req.body.nextStep
  );
  console.log("currentStep response", currentStep);
  return res.status(201).json(currentStep);
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
