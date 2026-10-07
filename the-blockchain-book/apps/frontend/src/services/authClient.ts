import type { LogInCreds, RegisterForm } from "@repo/validations";
import { authClient } from "./auth-client";

export async function registerUser(form: RegisterForm) {
  const { data, error } = await authClient.signUp.email({
    email: form.email,
    password: form.password,
    name: form.name,
    birthDate: form.birthDate,
  });
  if (error) throw new Error(error.message ?? "Registration failed");
  return data;
}

export async function login({ email, password }: LogInCreds) {
  const { data, error } = await authClient.signIn.email({ email, password });
  if (error) throw new Error(error.message ?? "Invalid email or password");
  return data;
}

export async function loginWithGoogle() {
  await authClient.signIn.social({
    provider: "google",
    callbackURL: `${window.location.origin}/dashboard`, // must be an absolute URL if cross-origin
  });
}

export async function logout() {
  await authClient.signOut({
    callbackURL: "/",
  });
}

/// BEFORE BETTER-AUTH LIB ///
// import type { LogInCreds, RegisterForm } from "@repo/validations";
// import { publicFetch } from "./apiClient";

// export async function registerUser(formData: RegisterForm) {
//   const res = await publicFetch.post("/auth/register", formData);
//   return res;
// }

// export async function login(creds: LogInCreds): Promise<boolean> {
//   const res = await publicFetch.post("/auth/login", creds);
//   setAccessToken(res.accessToken);
//   return true;
// }

// export async function logout() {
//   localStorage.removeItem("token");
//   // Insert more server logic when implemented
// }

// export function setAccessToken(email: string) {
//   localStorage.setItem("token", email);
//   return console.log("Email set as accessToken");
// }

// export function getAccessToken() {
//   const email: string = localStorage.getItem("token");
//   return email;
// }

// export function refreshAccessToken() {
//   setTimeout(() => console.log("pending token refresh"), 1000);
//   // If fails handle redirect to get refreshToken from db
//   return null;
// }
