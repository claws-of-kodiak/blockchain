import { useQuery } from "@tanstack/react-query";
import { authFetch } from "../services/apiClient";
import { SectionsContext, type SectionsContextType } from "./context";
import { sortByPosition } from "../util/sortByPosition";
import { authClient } from "../services/auth-client";

export default function SectionsProvider({
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

  const value: SectionsContextType = {
    sections,
    objectives,
    isLoading: isLoading || sessionPending,
    error,
    refetch,
  };
  return <SectionsContext value={value}>{children}</SectionsContext>;
}
