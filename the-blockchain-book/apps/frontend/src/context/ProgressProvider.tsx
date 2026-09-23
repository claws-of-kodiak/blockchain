import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../services/authClient";
import { authFetch } from "../services/apiClient";
import { ProgressContext, type ProgressContextType } from "./context";

const fetchUserProgress = async (): Promise<number> => {
  const data = await authFetch.get(`/course/progress`);
  return data;
};

export default function ProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getAccessToken();
  // insert useUser hook to pull real userId
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["progress"],
    queryFn: fetchUserProgress,
    enabled: !!token,
  });

  const value: ProgressContextType = {
    currentStep: data ?? null,
    isLoading,
    error,
    refetch,
  };
  return <ProgressContext value={value}>{children}</ProgressContext>;
}
