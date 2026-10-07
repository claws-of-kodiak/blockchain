import { useQuery } from "@tanstack/react-query";
import { authFetch } from "../services/apiClient";
import { SectionsContext, type SectionsContextType } from "./context";
import { sortByPosition } from "../util/sortByPosition";

type Section = any;
type Objective = any;

type CourseContent = {
  sections: Section;
  objectives: Objective;
};

const fetchCourseContent = async (): Promise<CourseContent> => {
  const data = await authFetch.get("/course");
  return data;
};

export default function SectionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = "";
  // insert useUser hook to pull real userId
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["course-content"],
    queryFn: fetchCourseContent,
    enabled: !!token,
  });

  const sections = sortByPosition(data?.sections) || [];
  const objectives = data?.objectives || [];

  const value: SectionsContextType = {
    sections,
    objectives,
    isLoading,
    error,
    refetch,
  };
  return <SectionsContext value={value}>{children}</SectionsContext>;
}
