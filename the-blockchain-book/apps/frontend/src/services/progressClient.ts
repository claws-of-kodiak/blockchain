import { authFetch } from "./apiClient";

export const progress = {
  begin: async (options: RequestInit = {}) => {
    return authFetch.post("/progress/begin", { ...options });
  },

  nextStep: async (nextStep: number, options: RequestInit = {}) => {
    return authFetch.post(
      "/progress/unlockStep",
      { nextStep: nextStep },
      { ...options }
    );
  },

  delete: async (options: RequestInit = {}) => {
    return authFetch.delete("/progress/deleteProgress", { ...options });
  },
};
