import { authFetch } from "./apiClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const progress = {
  nextStep: async (currentObjectiveId: string) => {
    return authFetch.post(`/progress/unlockStep/${currentObjectiveId}`);
  },

  delete: async (options: RequestInit = {}) => {
    return authFetch.delete("/progress/deleteProgress", { ...options });
  },
};

export function useProgressClient(currentObjectiveId: string) {
  const queryClient = useQueryClient();

  // Invalidates query cache when progress changes
  const refreshCache = () =>
    queryClient.invalidateQueries({
      queryKey: ["progress"],
    });

  const nextStepMut = useMutation({
    mutationFn: () => progress.nextStep(currentObjectiveId),
    onSuccess: refreshCache,
  });

  const deleteMut = useMutation({
    mutationFn: (options?: RequestInit) => progress.delete(options),
    onSuccess: refreshCache,
  });

  return {
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
