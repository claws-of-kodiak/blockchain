import { useQuery } from "@tanstack/react-query";
import { authFetch } from "../services/apiClient";
import { sortByPosition } from "../util/sortByPosition";
import { authClient } from "../services/auth-client";
import { CourseContext, type CourseContextType } from "./context";

export default function CourseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const userId = session?.user.id;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["course-content", userId],
    queryFn: () => authFetch.get("/course"),
    enabled: !!userId,
  });

  const sections = sortByPosition(data?.sections) || [];
  const objectives = data?.objectives || [];

  const value: CourseContextType = {
    sections,
    objectives,
    isLoading: isLoading || sessionPending,
    error,
    refetch,
  };
  return <CourseContext value={value}>{children}</CourseContext>;
}
