import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "./apiClient";
import type { Section } from "@repo/validations";

export async function getObjectives(sectionId: string) {
  const res = await authFetch.get(`/course/getObjectives/${sectionId}`);
  return res;
}

async function postNewSection(formData: Section) {
  const res = await authFetch.post("/course/addSection", formData);
  return res;
}
async function deleteSection(sectionId: string) {
  const res = await authFetch.delete(`/course/deleteSection/${sectionId}`);
  return res;
}
async function deleteObjective(objectiveId: string) {
  const res = await authFetch.delete(`/course/deleteObjective/${objectiveId}`);
  return res;
}

export function useCourseClient() {
  const queryClient = useQueryClient();

  // Helper to refresh the Context data cache
  const refreshCache = () =>
    queryClient.invalidateQueries({ queryKey: ["sections"] });

  // Define individual mutations implicitly
  const addSectionMut = useMutation({
    mutationFn: postNewSection,
    onSuccess: refreshCache,
  });
  const deleteSectionMut = useMutation({
    mutationFn: deleteSection,
    onSuccess: refreshCache,
  });
  const deleteObjectiveMut = useMutation({
    mutationFn: deleteObjective,
    onSuccess: refreshCache,
  });

  // Expose a clean object interface to your components
  return {
    addSection: {
      mutate: addSectionMut.mutate,
      mutateAsync: addSectionMut.mutateAsync, // Great to include both!
      isPending: addSectionMut.isPending,
      error: addSectionMut.error,
      isSuccess: addSectionMut.isSuccess,
    },
    deleteSection: {
      mutate: deleteSectionMut.mutate,
      isPending: deleteSectionMut.isPending,
      error: deleteSectionMut.error,
    },
    deleteObjective: {
      mutate: deleteObjectiveMut.mutate,
      isPending: deleteObjectiveMut.isPending,
      error: deleteObjectiveMut.error,
    },
  };
}
