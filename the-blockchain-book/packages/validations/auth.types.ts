import z from "zod";

export type RegisterForm = z.infer<typeof registerSchema>;

export const registerSchema = z.object({
  // THIS DOES NOT EXECUTE AT RUNTIME
  email: z.string().min(1, "Email required"),
  birthDate: z.date(),
  password: z.string().min(1, "Password required"),
});

export const loginSchema = z.object({
  // THIS DOES NOT EXECUTE AT RUNTIME
  email: z.string().min(1, "Email required"),
  password: z.string().min(1, "Password required"),
});

export type LogInCreds = z.infer<typeof loginSchema>;
