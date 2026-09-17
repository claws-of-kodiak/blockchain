import express from "express";
import { CourseRepository } from "../repositories/CourseRepositories";
import pool from "../db";

const courseRouter = express.Router();
const courseRepo = new CourseRepository(pool);

courseRouter.post("/begin", async (req, res) => {
  const userId = req.body.userId;
  console.log("req.body.userID", userId);
  const time = await courseRepo.beginCourse(userId);
  if (time === null)
    return res
      .status(500)
      .json({ message: "Failed to create user progress row." });
  return res.status(200).json({ time, message: "Course progress has begun." });
});

courseRouter.get("/unlockStep", (req, res) => {
  console.log("Recieved request to course/unlockStep", req);
  return res.status(200).json({ message: "You have unlocked the next step." });
});

export default courseRouter;
