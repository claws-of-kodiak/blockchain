import express from "express";
import pool from "../db";
import { CourseRepository } from "../repositories/CourseRepositories";
import { extractBearerToken } from "../util/auth";
import { AuthRepository } from "../repositories/AuthRepositories";

const courseRouter = express.Router();
const courseRepo = new CourseRepository(pool);
const authRepo = new AuthRepository(pool);

courseRouter.get("/", async (req, res) => {
  const sections = await courseRepo.getSections();
  const objectives = await courseRepo.getObjectives();
  if (!sections || !objectives)
    return res.status(404).json({ message: "No course content found." });
  return res.status(200).json({ sections, objectives });
});

courseRouter.post("/create", async (req, res) => {
  try {
    if (!req.headers.authorization) throw new Error("No authorization found");
    const email = extractBearerToken(req.headers.authorization);
    if (!email) throw new Error("No email found");
    const user = await authRepo.findUserByEmail(email);
    if (!user) return res.status(401).json({ message: "Invalid user." });
    const { title } = req.body;
    const createdAt = await courseRepo.createSection(user.id, title);
    return res
      .status(201)
      .json({ createdAt, message: "Section insert success!" });
  } catch (err) {
    console.log(err.message);
    return res.status(500).json({ message: "500 Sever Error - check logs" });
  }
});

courseRouter.post("/addSection", (req, res) => {});

courseRouter.post("/updateSection", (req, res) => {});

courseRouter.delete("/deleteSection", (req, res) => {});

courseRouter.post("/addObjective", (req, res) => {});

courseRouter.post("/updateObjective", (req, res) => {});

courseRouter.delete("/deleteObjective", (req, res) => {});

export default courseRouter;
