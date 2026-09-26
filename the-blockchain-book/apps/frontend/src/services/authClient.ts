import type { LogInCreds, RegisterForm } from "@repo/validations";
import { publicFetch } from "./apiClient";

export async function registerUser(formData: RegisterForm) {
  const res = await publicFetch.post("/auth/register", formData);
  return res;
}

export async function login(creds: LogInCreds): Promise<boolean> {
  const res = await publicFetch.post("/auth/login", creds);
  setAccessToken(res.accessToken);
  return true;
}

export async function logout() {
  localStorage.removeItem("token");
  // Insert more server logic when implemented
}

export function setAccessToken(email: string) {
  localStorage.setItem("token", email);
  return console.log("Email set as accessToken");
}

export function getAccessToken() {
  const email: string = localStorage.getItem("token");
  return email;
}

export function refreshAccessToken() {
  setTimeout(() => console.log("pending token refresh"), 1000);
  // If fails handle redirect to get refreshToken from db
  return null;
}
