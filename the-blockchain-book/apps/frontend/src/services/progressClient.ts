import { authFetch } from "./apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const progress = {
  begin: async (options: RequestInit = {}) => {
    return authFetch.post("/progress/begin", { ...options });
  },

  nextStep: async () => {
    return authFetch.post("/progress/unlockStep");
  },

  delete: async (options: RequestInit = {}) => {
    return authFetch.delete("/progress/deleteProgress", { ...options });
  },
};

export function useProgressClient() {
  const queryClient = useQueryClient();

  // Invalidates query cache when progress changes
  const refreshCache = () =>
    queryClient.invalidateQueries({ queryKey: ["currentStep"] });

  const beginMut = useMutation({
    mutationFn: (options?: RequestInit) => progress.begin(options),
    onSuccess: refreshCache,
  });

  const nextStepMut = useMutation({
    mutationFn: () => progress.nextStep(),
    onSuccess: refreshCache,
  });

  const deleteMut = useMutation({
    mutationFn: (options?: RequestInit) => progress.delete(options),
    onSuccess: refreshCache,
  });

  return {
    beginCourse: {
      mutate: beginMut.mutate,
      mutateAsync: beginMut.mutateAsync,
      isPending: beginMut.isPending,
      error: beginMut.error,
    },
    unlockStep: {
      mutate: nextStepMut.mutate,
      mutateAsync: nextStepMut.mutateAsync,
      isPending: nextStepMut.isPending,
      error: nextStepMut.error,
    },
    deleteProgress: {
      mutate: deleteMut.mutate,
      mutateAsync: deleteMut.mutateAsync,
      isPending: deleteMut.isPending,
      error: deleteMut.error,
    },
  };
}
