import z from "zod";

export const registerSchema = z.object({
  // THIS DOES NOT EXECUTE AT RUNTIME
  name: z.string().min(1, "Name required"),
  email: z.string().min(1, "Email required"),
  birthDate: z.coerce.date(),
  password: z.string().min(1, "Password required"),
  isAdmin: z.boolean(),
});
export type RegisterForm = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  // THIS DOES NOT EXECUTE AT RUNTIME
  email: z.string().min(1, "Email required"),
  password: z.string().min(1, "Password required"),
});

export type LogInCreds = z.infer<typeof loginSchema>;
