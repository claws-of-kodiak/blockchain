import { betterAuth } from "better-auth";
import "dotenv/config";
import { pool } from "../db";

export const auth = betterAuth({
  database: pool,
  trustedOrigins: [process.env.CLIENT_APP_URL!],
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
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});
