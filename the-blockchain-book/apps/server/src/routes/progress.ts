import express from "express";
import db from "../db";
import { ProgressRepository } from "../repositories/ProgressRepositories";
import addStep from "../util/addStep";
import { AuthRequest, requireAuth } from "../middleware/middleware";

const progressRouter = express.Router();
const progressRepo = new ProgressRepository(db);

progressRouter.use(requireAuth);

progressRouter.get("/user", async (req: AuthRequest, res) => {
  if (!req.payload) throw new Error("Auth failed");
  const id = req.payload.id;
  const currentStep = await progressRepo.getProgressById(id);
  if (!currentStep) return res.status(200).json(0);
  return res.status(200).json(currentStep);
});

progressRouter.get("/userData", async (req: AuthRequest, res) => {
  if (!req.payload) throw new Error("Auth failed");
  const id = req.payload.id;
  const userData = await progressRepo.getUserById(id);
  console.log("userData", userData);
  if (!userData) return res.status(200).json(0);
  return res.status(200).json(userData);
});

progressRouter.post("/begin", async (req: AuthRequest, res) => {
  if (!req.payload) throw new Error("Auth failed");
  const id = req.payload.id;
  const time = await progressRepo.beginCourse(id);
  if (time === null)
    return res
      .status(500)
      .json({ message: "Failed to create user progress row." });
  return res.status(201).json({ time, message: "Course progress has begun." });
});

progressRouter.post("/unlockStep", async (req: AuthRequest, res) => {
  if (!req.payload) throw new Error("Auth failed");
  const id = req.payload.id;
  const progress = await progressRepo.getProgressById(id);
  if (!progress) {
    return res
      .status(400)
      .json({ message: "No progress found. Begin the course first." });
  }
  const nextStep = addStep(progress);
  const updated = await progressRepo.unlockNextStep(id, nextStep);
  return res.status(200).json(updated); // { current_step: nextStep }
});

progressRouter.delete("/deleteProgress", async (req: AuthRequest, res) => {
  if (!req.payload) throw new Error("Auth failed");
  const id = req.payload.id;
  await progressRepo.deleteProgress(id);
  return res.status(204).json();
});

export default progressRouter;
