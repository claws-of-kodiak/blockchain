import express from "express";
import db from "../db";
import { CourseRepository } from "../repositories/CourseRepositories";
import { extractBearerToken } from "../util/auth";
import { AuthRepository } from "../repositories/AuthRepositories";

const courseRouter = express.Router();
const courseRepo = new CourseRepository(db);
const authRepo = new AuthRepository(db);

courseRouter.get("/", async (req, res) => {
  const sections = await courseRepo.getAllSections();
  const objectives = await courseRepo.getAllObjectives();
  if (!sections && !objectives)
    return res.status(200).json({ message: "No course content found." });
  return res.status(200).json({ sections, objectives });
});

courseRouter.post("/addSection", async (req, res) => {
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
    console.error(err.message);
    return res.status(500).json({ message: "500 Sever Error - check logs" });
  }
});

courseRouter.delete("/deleteSection/:id", async (req, res) => {
  try {
    const sectionid: string = req.params.id;
    if (!sectionid)
      return res.status(400).json({ message: "No section id found." });
    await courseRepo.deleteSection(sectionid);
    return res.status(200).json({ message: "Section deleted" });
  } catch (err) {
    console.error("Unexpected error with server");
    return res.status(500).json({ message: "Error with server - check logs" });
  }
});

courseRouter.post("/addObjective", async (req, res) => {
  try {
    if (!req.headers.authorization) throw new Error("No authorization found");
    const email = extractBearerToken(req.headers.authorization);
    if (!email) throw new Error("No email found");
    const user = await authRepo.findUserByEmail(email);
    if (!user) return res.status(401).json({ message: "Invalid user." });
    const createdAt = await courseRepo.createObjective(req.body);
    return res
      .status(201)
      .json({ createdAt, message: "Section insert success!" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "500 Sever Error - check logs" });
  }
});

courseRouter.get("/getObjectives/:sectionId", async (req, res) => {
  const sectionId = req.params.sectionId;
  const section = await courseRepo.getSectionObjectives(sectionId);
  if (!section) throw new Error("No section found.");
  return res.status(200).json(section);
});

courseRouter.post("/updateObjective", (req, res) => {});

courseRouter.delete("/deleteObjective/:objectiveId", async (req, res) => {
  try {
    const objectiveId: string = req.params.objectiveId;
    console.log(objectiveId);
    if (!objectiveId)
      return res.status(400).json({ message: "No objective id found." });
    await courseRepo.deleteObjective(objectiveId);
    return res.status(200).json({ message: "Objective deleted." });
  } catch (err) {
    console.error("Unexpected error with server");
    return res.status(500).json({ message: "Error with server - check logs" });
  }
});

export default courseRouter;
