import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "./apiClient";

export async function getContent(objectiveId: string) {
  const res = await authFetch.get(`/course/content/${objectiveId}`);
  return res;
}

async function createContent(objectiveId: string, textBox) {
  const res = await authFetch.post(`/course/content/${objectiveId}`, {
    textBox,
  });
  return res;
}

async function updateContent({ text, objectiveId }) {
  const res = await authFetch.put(`/course/${objectiveId}`, { text });
  return res;
}
async function deleteContent(contentId: string) {
  const res = await authFetch.delete(`/course/${contentId}`);
  return res;
}

export function useContentClient() {
  const queryClient = useQueryClient();

  // Helper to refresh the Context data cache
  const refreshCache = () =>
    queryClient.invalidateQueries({ queryKey: ["content"] });

  // Define individual mutations implicitly
  const createContentMut = useMutation({
    mutationFn: createContent,
    onSuccess: refreshCache,
  });
  const updateContentMut = useMutation({
    mutationFn: updateContent,
    onSuccess: refreshCache,
  });
  const deleteContentMut = useMutation({
    mutationFn: deleteContent,
    onSuccess: refreshCache,
  });

  // Expose a clean object interface to your components
  return {
    createContent: {
      mutate: createContentMut.mutate,
      mutateAsync: createContentMut.mutateAsync, // Great to include both!
      isPending: createContentMut.isPending,
      error: createContentMut.error,
      isSuccess: createContentMut.isSuccess,
    },
    updateContent: {
      mutate: updateContentMut.mutate,
      mutateAsync: updateContentMut.mutateAsync,
      isPending: updateContentMut.isPending,
      error: updateContentMut.error,
      isSuccess: deleteContentMut.isSuccess,
    },
    deleteContent: {
      mutate: deleteContentMut.mutate,
      isPending: deleteContentMut.isPending,
      error: deleteContentMut.error,
    },
  };
}
