import express from "express";
import pool from "../db";
import { CourseRepository } from "../repositories/CourseRepositories";

const courseRouter = express.Router();
const courseRepo = new CourseRepository(pool);

courseRouter.get("/create", (req, res) => {});

courseRouter.post("/addSection", (req, res) => {});

courseRouter.post("/updateSection", (req, res) => {});

courseRouter.delete("/deleteSection", (req, res) => {});

courseRouter.post("/addObjective", (req, res) => {});

courseRouter.post("/updateObjective", (req, res) => {});

courseRouter.delete("/deleteObjective", (req, res) => {});

export default courseRouter;
