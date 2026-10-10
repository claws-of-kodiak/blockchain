import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authFetch } from "./apiClient";
import type { Objective, Section } from "@repo/validations";
import { clearPosition } from "./positionClient";

// Conditional check for position
async function postNewSection(formData: Section) {
  const { position } = formData;
  let res: Response;
  if (position === null) {
    res = await authFetch.post("/course/addSection", formData);
  }
  if (position) {
    const newSection = { ...formData, position };
    res = await authFetch.post("/course/insertSection", newSection);
    clearPosition();
  }
  return res;
}
async function deleteSection(sectionId: string) {
  const res = await authFetch.delete(`/course/deleteSection/${sectionId}`);
  return res;
}

export async function getObjectives(sectionId: string) {
  const res = await authFetch.get(`/course/getObjectives/${sectionId}`);
  return res;
}

async function postNewObjective(formData: Objective) {
  const { position } = formData;
  let res: Response;
  if (position === null) {
    res = await authFetch.post("/course/addObjective", formData);
  }
  if (position) {
    const newSection = { ...formData, position };
    res = await authFetch.post("/course/insertObjective", newSection);
    clearPosition();
  }
}
async function deleteObjective(objectiveId: string) {
  const res = await authFetch.delete(`/course/deleteObjective/${objectiveId}`);
  return res;
}

export function useCourseClient() {
  const queryClient = useQueryClient();

  // Helper to refresh the Context data cache
  const refreshCache = () =>
    queryClient.invalidateQueries({ queryKey: ["course-content"] });

  // Define individual mutations implicitly
  const addSectionMut = useMutation({
    mutationFn: postNewSection,
    onSuccess: refreshCache,
  });
  const deleteSectionMut = useMutation({
    mutationFn: deleteSection,
    onSuccess: refreshCache,
  });
  const addObjectiveMut = useMutation({
    mutationFn: postNewObjective,
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
    addObjective: {
      mutate: addObjectiveMut.mutate,
      mutateAsync: addObjectiveMut.mutateAsync, // Great to include both!
      isPending: addObjectiveMut.isPending,
      error: addObjectiveMut.error,
      isSuccess: addObjectiveMut.isSuccess,
    },
    deleteObjective: {
      mutate: deleteObjectiveMut.mutate,
      isPending: deleteObjectiveMut.isPending,
      error: deleteObjectiveMut.error,
    },
  };
}
