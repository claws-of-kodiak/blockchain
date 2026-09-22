import { publicFetch } from "./apiClient";

export default async function registerUser(formData) {
  const res = await publicFetch.post("/auth/register", formData);
  return res;
}
