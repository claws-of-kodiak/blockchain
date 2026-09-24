import { authFetch } from "./apiClient";

export async function postNewSection(formData) {
  const res = await authFetch.post("/course/create", formData);
  return res;
}
