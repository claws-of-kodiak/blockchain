import { useContext } from "react";
import { CourseContext } from "../../context/context";

// Custom Hook for clean consumption in components
export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used within a SectionsProvider");
  }
  return context;
}
