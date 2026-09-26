import { authFetch } from "./apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const progress = {
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

export function useProgressClient() {
  const queryClient = useQueryClient();

  // Invalidates query cache when progress changes
  const refreshCache = () =>
    queryClient.invalidateQueries({ queryKey: ["progress"] });

  const beginMut = useMutation({
    mutationFn: () => progress.begin(),
    onSuccess: refreshCache,
  });

  const nextStepMut = useMutation({
    mutationFn: (nextStep: number) => progress.nextStep(nextStep),
    onSuccess: refreshCache,
  });

  const deleteMut = useMutation({
    mutationFn: () => progress.delete(),
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
