import { AuthRepository } from "../repositories/AuthRepositories";
import { extractBearerToken } from "../util/auth";
import db from "../db";

const authRepo = new AuthRepository(db);

export const requireAuth = async (req, res, next): Promise<void> => {
  if (!req.headers.authorization) throw new Error("No authorization found");
  const email = extractBearerToken(req.headers.authorization);
  if (!email) throw new Error("No email found");
  const user = await authRepo.findUserByEmail(email);
  if (!user) return res.status(401).json({ message: "Invalid user." });
  const payload = {
    id: user.id,
    email: user.email,
    birthData: user.birthDate,
    createAt: user.createdAt,
    isAdmin: user.isAdmin,
  };
  req.payload = payload;
  next();
};
