import { createAuthClient } from "better-auth/react";
import "dotenv/config";

export const authClient = createAuthClient({
  baseURL: process.env.REACT_APP_URL,
});
