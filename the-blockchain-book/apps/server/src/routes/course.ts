import express from "express";
import { CourseRepository } from "../repositories/CourseRepositories";
import pool from "../db";
import { extractBearerToken } from "../util/auth";
import { AuthRepository } from "../repositories/AuthRepositories";

const courseRouter = express.Router();
const courseRepo = new CourseRepository(pool);
const authRepo = new AuthRepository(pool);

courseRouter.get("/userProgress", async (req, res) => {
  const userId = "asdfjkl"; // Need to pull token from Authorization
  const stepObj = await courseRepo.getProgressById(userId);
  if (stepObj === null)
    return res.status(404).json({ message: "No user progress found." });
  const currentStep = Number(stepObj.currentStep);
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
  // Getting Error after this is called for some reason.
  const { userId, nextStep } = req.body;
  const currentStep = await courseRepo.unlockNextStep(userId, nextStep);
  console.log("currentStep response", currentStep);
  return res.status(201).json(currentStep);
});

export default courseRouter;
