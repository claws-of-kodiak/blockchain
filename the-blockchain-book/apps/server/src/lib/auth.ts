import { betterAuth } from "better-auth";
import "dotenv/config";
import { pool } from "../db";

export const auth = betterAuth({
  database: pool,
  trustedOrigins: [process.env.CLIENT_APP_URL!],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 3,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
  user: {
    additionalFields: {
      birthDate: { type: "date", required: true },
      isAdmin: { type: "boolean" },
    },
  },
});
