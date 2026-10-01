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

export const handleErrors = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.status || 500;
  const errorRoute = req.route ? req.route.path : "unknwon";
  console.error(`Error at ${errorRoute}`);
  console.error(err.stack);

  res.status(statusCode).json({
    code: "ANY_ERROR",
    path: "error",
    message: err.message || `Unaccounted Error with server.`,
    requestId: "insert_random_string",
  });
};
