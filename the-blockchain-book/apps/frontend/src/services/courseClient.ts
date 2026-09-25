import { authFetch } from "./apiClient";

export async function postNewSection(formData) {
  const res = await authFetch.post("/course/create", formData);
  return res;
}
// export async function deleteSection(sectionId) {
//   const res = await authFetch.post("/course/deleteSection", sectionId);
//   return res;
// }
