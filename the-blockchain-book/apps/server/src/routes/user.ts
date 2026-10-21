import express from "express";
import db from "../db";
import { AuthRequest, requireAuth } from "../middleware/middleware";
import { UserRepository } from "../repositories/UserRepositories";

const userRouter = express.Router();
const userRepo = new UserRepository(db);

userRouter.use(requireAuth);

userRouter.get("/user", async (req: AuthRequest, res, next) => {
  try {
    if (!req.payload) throw new Error("Auth failed");
    const id = req.payload.id;
    const progress = await userRepo.getProgressById(id);
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

// Try to move to next objective in same section,
// if doesnt exist try to move to next section,
// if doesnt exist course complete
userRouter.post(
  "/unlockStep/:objectiveId",
  async (req: AuthRequest, res, next) => {
    try {
      if (!req.payload) throw new Error("Auth failed");
      const userId = req.payload.id;
      const objectiveId = req.params.objectiveId as string;
      const newProgress = await userRepo.unlockNextStep(userId, objectiveId);
      return res.status(200).json(newProgress);
    } catch (err) {
      next(err);
    }
  }
);

userRouter.delete("/deleteProgress", async (req: AuthRequest, res, next) => {
  try {
    if (!req.payload) throw new Error("Auth failed");
    const userId = req.payload.id;
    await userRepo.deleteProgress(userId);
    return res.status(204).end();
  } catch (err) {
    next(err);
  }
});

export default userRouter;
