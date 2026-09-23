import { authFetch } from "./apiClient";

export async function postNewSection(formData) {
  // NEED TO INTEGRATE WITH server.ts - extend courseRouter to '/course/sections'
  const res = await authFetch.post("/course/sections/createNew", formData);
  return res.data;
}
