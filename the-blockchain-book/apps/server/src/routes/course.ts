import express from "express";
import { CourseRepository } from "../repositories/CourseRepositories";
import pool from "../db";
import { extractBearerToken } from "../util/auth";
import { AuthRepository } from "../repositories/AuthRepositories";

const courseRouter = express.Router();
const courseRepo = new CourseRepository(pool);
const authRepo = new AuthRepository(pool);

courseRouter.get("/progress", async (req, res) => {
  if (!req.headers.authorization) throw new Error("No authorization found");
  const email = extractBearerToken(req.headers.authorization);
  if (!email) throw new Error("No email found");
  const user = await authRepo.findUserByEmail(email);
  if (!user) return res.status(401).json({ message: "Invalid user." });
  const stepRes = await courseRepo.getProgressById(user.id);
  const currentStep = Number(stepRes.current_step);
  console.log("currentStep ", currentStep);
  return res.status(200).json(currentStep);
});

courseRouter.post("/begin", async (req, res) => {
  if (!req.headers.authorization) throw new Error("No authorization found");
  const email = extractBearerToken(req.headers.authorization);
  if (!email) throw new Error("No email found");
  const user = await authRepo.findUserByEmail(email);
  const time = await courseRepo.beginCourse(user.id);
  if (time === null)
    return res
      .status(500)
      .json({ message: "Failed to create user progress row." });
  return res.status(201).json({ time, message: "Course progress has begun." });
});

courseRouter.post("/unlockStep", async (req, res) => {
  if (!req.headers.authorization) throw new Error("No authorization found");
  const email = extractBearerToken(req.headers.authorization);
  if (!email) throw new Error("No email found");
  const user = await authRepo.findUserByEmail(email);
  const currentStep = await courseRepo.unlockNextStep(
    user.id,
    req.body.nextStep
  );
  console.log("currentStep response", currentStep);
  return res.status(201).json(currentStep);
});

courseRouter.delete("/deleteProgress", async (req, res) => {
  if (!req.headers.authorization) throw new Error("No authorization found");
  const email = extractBearerToken(req.headers.authorization);
  if (!email) throw new Error("No email found");
  const user = await authRepo.findUserByEmail(email);
  await courseRepo.deleteProgress(user.id);
  return res.status(204).json();
});

export default courseRouter;
