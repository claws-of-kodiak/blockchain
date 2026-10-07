import "dotenv/config";
import { betterAuth } from "better-auth";
import { pool } from "../db";

export const auth = betterAuth({
  database: pool,
  trustedOrigins: [process.env.REACT_APP_URL!],
  baseURL: process.env.BETTER_AUTH_URL,
  user: {
    modelName: "users",
    fields: {
      email: "email",
      createdAt: "created_at",
    },
    additionalFields: {
      birthDate: {
        type: "date",
        fieldName: "birth_date",
        required: false,
      },
      passwordHash: {
        type: "string",
        fieldName: "password_hash",
        required: false,
      },
      isAdmin: {
        type: "boolean",
        fieldName: "is_admin",
        defaultValue: false,
      },
    },
  },
  advanced: {
    database: {
      generateId: "uuid",
    },
  },
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 3,
  },
  socialProviders: {
    google: {
      enabled: true,
      clientId: process.env.BETTER_AUTH_GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.BETTER_AUTH_GOOGLE_CLIENT_SECRET as string,
    },
  },
});
