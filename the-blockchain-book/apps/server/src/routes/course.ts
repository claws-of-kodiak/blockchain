import express from "express";
import { CourseRepository } from "../repositories/CourseRepositories";
import pool from "../db";

const courseRouter = express.Router();
const courseRepo = new CourseRepository(pool);

courseRouter.get("/course/userProgress/:id", async (req, res) => {
  const userId: string = req.params.id;
  const currentStep = await courseRepo.getProgressById(userId);
  if (currentStep === null)
    return res.status(404).json({ message: "No user progress found." });
  return res.status(200).json({ currentStep, message: "User progress found." });
});

courseRouter.post("/begin", async (req, res) => {
  const userId: string = req.body.userId;
  console.log("req.body.userID", userId);
  // ◻ Check if userId already exists in db
  const time = await courseRepo.beginCourse(userId);
  if (time === null)
    return res
      .status(500)
      .json({ message: "Failed to create user progress row." });
  return res.status(200).json({ time, message: "Course progress has begun." });
});

courseRouter.post("/unlockStep", async (req, res) => {
  // Getting Error after this is called for some reason.
  const { userId, nextStep } = req.body;
  const currentStep = await courseRepo.unlockNextStep(userId, nextStep);
  console.log("currentStep response", currentStep);
  return res.status(200).json(currentStep);
});

export default courseRouter;
