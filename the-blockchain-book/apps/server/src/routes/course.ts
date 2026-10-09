import express from "express";
import db from "../db";
import { CourseRepository } from "../repositories/CourseRepositories";
import { AuthRequest, requireAuth } from "../middleware/middleware";

const courseRouter = express.Router();
const courseRepo = new CourseRepository(db);

courseRouter.use(requireAuth);

courseRouter.get("/", async (req, res, next) => {
  try {
    const sections = await courseRepo.getAllSections();
    const objectives = await courseRepo.getAllObjectives();
    if (!sections && !objectives)
      return res.status(200).json({ message: "No course content found." });
    return res.status(200).json({ sections, objectives });
  } catch (err) {
    next(err);
  }
});
// Query will insert at MAX position + 1
courseRouter.post("/addSection", async (req: AuthRequest, res, next) => {
  try {
    const userId = req.payload?.id;
    if (!userId) throw new Error("Error passing user payload from requireAuth");
    const { title } = req.body;
    const createdAt = await courseRepo.createSection(userId, title);
    return res
      .status(201)
      .json({ createdAt, message: "Section insert success!" });
  } catch (err) {
    next(err);
  }
});
// INSERT BELOW OTHER SECTION
courseRouter.post("/insertSection", async (req: AuthRequest, res, next) => {
  try {
    const userId = req.payload?.id;
    if (!userId) throw new Error("Error passing user payload from requireAuth");
    const { title, position } = req.body;
    console.log("/inserSection triggered", title, position);
    const createdAt = await courseRepo.insertSection(userId, title, position);
    return res
      .status(201)
      .json({ createdAt, message: "Section insert success!" });
  } catch (err) {
    next(err);
  }
});

courseRouter.delete("/deleteSection/:id", async (req, res, next) => {
  try {
    const sectionid: string = req.params.id;
    if (!sectionid)
      return res.status(400).json({ message: "No section id found." });
    await courseRepo.deleteSection(sectionid); // NEED TO ADJUST POSITIONS DOWN
    return res.status(200).json({ message: "Section deleted" });
  } catch (err) {
    next(err);
  }
});

courseRouter.post("/addObjective", async (req, res, next) => {
  try {
    const createdAt = await courseRepo.createObjective(req.body);
    return res
      .status(201)
      .json({ createdAt, message: "Section insert success!" });
  } catch (err) {
    next(err);
  }
});

courseRouter.get("/getObjectives/:sectionId", async (req, res, next) => {
  try {
    const sectionId = req.params.sectionId;
    const section = await courseRepo.getSectionObjectives(sectionId);
    if (!section) throw new Error("No section found.");
    return res.status(200).json(section);
  } catch (err) {
    next(err);
  }
});

courseRouter.post("/updateObjective", (req, res, next) => {});

courseRouter.delete("/deleteObjective/:objectiveId", async (req, res, next) => {
  try {
    const objectiveId: string = req.params.objectiveId;
    console.log(objectiveId);
    if (!objectiveId)
      return res.status(400).json({ message: "No objective id found." });
    await courseRepo.deleteObjective(objectiveId); // NEED TO ADJUST POSITIONS DOWN
    return res.status(200).json({ message: "Objective deleted." });
  } catch (err) {
    next(err);
  }
});

export default courseRouter;
