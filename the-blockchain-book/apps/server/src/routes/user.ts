import express from "express";
import db from "../db";
import addStep from "../util/addStep";
import { AuthRequest, requireAuth } from "../middleware/middleware";
import { UserRepository } from "../repositories/UserRepositories";
import { CourseRepository } from "../repositories/CourseRepositories";

const userRouter = express.Router();
const userRepo = new UserRepository(db);
const courseRepo = new CourseRepository(db);

userRouter.use(requireAuth);

userRouter.get("/user", async (req: AuthRequest, res, next) => {
  try {
    if (!req.payload) throw new Error("Auth failed");
    const id = req.payload.id;
    const currentStep = await userRepo.getProgressById(id);
    if (!currentStep) return res.status(200).json(0);
    return res.status(200).json(currentStep);
  } catch (err) {
    next(err);
  }
});

userRouter.get("/userData", async (req: AuthRequest, res, next) => {
  try {
    if (!req.payload) throw new Error("Auth failed");
    const id = req.payload.id;
    const userData = await userRepo.getUserById(id);
    console.log("userData", userData);
    if (!userData) return res.status(200).json(0);
    return res.status(200).json(userData);
  } catch (err) {
    next(err);
  }
});

userRouter.post("/begin", async (req: AuthRequest, res, next) => {
  try {
    if (!req.payload) throw new Error("Auth failed");
    const userId = req.payload.id;
    const { objectiveId, sectionId } = await courseRepo.getFirstSteps();
    if (objectiveId === null || sectionId === null)
      throw Error("Missing first step data.");
    const time = await userRepo.beginCourse(userId, objectiveId, sectionId);
    if (time === null)
      return res
        .status(500)
        .json({ message: "Failed to create user progress row." });
    return res
      .status(201)
      .json({ time, message: "Course progress has begun." });
  } catch (err) {
    next(err);
  }
});

userRouter.post("/unlockStep", async (req: AuthRequest, res, next) => {
  try {
    if (!req.payload) throw new Error("Auth failed");
    const id = req.payload.id;
    const progress = await userRepo.getProgressById(id);
    console.log(progress);
    if (!progress) {
      return res
        .status(400)
        .json({ message: "No progress found. Begin the course first." });
    }
    const nextObj = addStep(progress);
    const updated = await userRepo.unlockNextStep(id, nextObj);
    return res.status(200).json(updated);
  } catch (err) {
    next(err);
  }
});

userRouter.delete("/deleteProgress", async (req: AuthRequest, res, next) => {
  try {
    if (!req.payload) throw new Error("Auth failed");
    const id = req.payload.id;
    await userRepo.deleteProgress(id);
    return res.status(204).json();
  } catch (err) {
    next(err);
  }
});

export default userRouter;
