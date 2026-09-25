import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../services/authClient";
import { authFetch } from "../services/apiClient";
import { SectionsContext, type SectionsContextType } from "./context";

type Section = any;
type Objective = any;

type CourseContent = {
  sections: Section;
  objectives: Objective;
};

const fetchCourseContent = async (): Promise<CourseContent> => {
  const data = await authFetch.get(`/course`);
  return data;
};

export default function SectionsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getAccessToken();
  // insert useUser hook to pull real userId
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["sections"],
    queryFn: fetchCourseContent,
    enabled: !!token,
  });

  const sections = data.sections || null;
  const objectives = data.objectives || null;

  const value: SectionsContextType = {
    sections,
    objectives,
    isLoading,
    error,
    refetch,
  };
  return <SectionsContext value={value}>{children}</SectionsContext>;
}
