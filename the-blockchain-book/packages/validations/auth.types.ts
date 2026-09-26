import z from "zod";

export const loginSchema = z.object({
  // THIS DOES NOT EXECUTE AT RUNTIME
  email: z.string().min(1, "Email required"),
  password: z.string().min(1, "Password required"),
});

export type LogInCreds = z.infer<typeof loginSchema>;
