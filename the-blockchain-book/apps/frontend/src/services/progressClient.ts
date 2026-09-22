import { authFetch } from "./apiClient";

export const progress = {
  begin: async (options: RequestInit = {}) => {
    return authFetch.post("/course/begin", { ...options });
  },

  nextStep: async (nextStep: number, options: RequestInit = {}) => {
    return authFetch.post(
      "/course/unlockStep",
      { nextStep: nextStep },
      { ...options }
    );
  },

  delete: async (options: RequestInit = {}) => {
    return authFetch.delete("/course/deleteProgress", { ...options });
  },
};
