import { Request, Response, NextFunction } from "express"; // Ensure Express types are imported

import { AuthRepository } from "../repositories/AuthRepositories";
import { extractBearerToken } from "../util/auth";
import db from "../db";
import type { User } from "@repo/validations";

const authRepo = new AuthRepository(db);

export interface AuthRequest extends Request {
  payload?: Omit<User, "passwordHash">;
}

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<any> => {
  if (!req.headers.authorization) throw new Error("No authorization found");
  const email = extractBearerToken(req.headers.authorization);
  if (!email) throw new Error("No email found");
  const user = await authRepo.findUserByEmail(email);
  if (!user) return res.status(401).json({ message: "Invalid user." });
  const payload = {
    id: user.id,
    email: user.email,
    birthDate: user.birthDate,
    createdAt: user.createdAt,
    isAdmin: user.isAdmin,
  };
  req.payload = payload;
  next();
};
