import express from "express";
import db from "../db";
import { AuthRequest, requireAuth } from "../middleware/middleware";
import { UserRepository } from "../repositories/UserRepositories";
import { CourseRepository } from "../repositories/CourseRepositories";

const userRouter = express.Router();
const userRepo = new UserRepository(db);
const courseRepo = new CourseRepository(db);

userRouter.use(requireAuth);

userRouter.get("/user", async (req: AuthRequest, res, next) => {
  console.log("GET /progress/user fires");
  try {
    if (!req.payload) throw new Error("Auth failed");
    const id = req.payload.id;
    console.log("id", id);
    const progress = await userRepo.getProgressById(id);
    // RETURNING NULL FROM REPO
    console.log("progress", progress);
    if (!progress) return res.status(200).json(null);
    return res.status(200).json(progress);
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

// Try to move to next objective in same section,
// if doesnt exist try to move to next section,
// if doesnt exist course complete
userRouter.post("/unlockStep", async (req: AuthRequest, res, next) => {
  try {
    if (!req.payload) throw new Error("Auth failed");
    const id = req.payload.id;
    const progress = await userRepo.getProgressById(id);
    if (!progress) {
      return res
        .status(400)
        .json({ message: "No progress found. Begin the course first." });
    }
    const newProgress = await userRepo.unlockNextStep(id, progress);
    if (newProgress.status === "complete")
      return res.status(409).json({ message: newProgress.message });
    return res.status(200).json(newProgress);
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
