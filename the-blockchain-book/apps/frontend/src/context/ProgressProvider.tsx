import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../services/authClient";
import { authFetch } from "../services/apiClient";
import { ProgressContext, type ProgressContextType } from "./context";
import { useMemo } from "react";

const fetchUserProgress = async (): Promise<{ currentStep: number }> => {
  const data = await authFetch.get(`/progress/user`);
  // Handle both shapes the backend might return
  if (data == null || data === 0) return { currentStep: 0 };
  if (data.error)
    throw new Error(data.error.message ?? "Failed to load progress");
  return { currentStep: data.currentStep };
};

export default function ProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getAccessToken();
  // insert useUser hook to pull real userId
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["currentStep"],
    queryFn: fetchUserProgress,
    enabled: !!token,
  });

  const currentStep = data?.currentStep ?? 0;

  const value: ProgressContextType = useMemo(
    () => ({
      currentStep,
      isLoading,
      error,
      refetch,
    }),
    [data, isLoading, error, refetch]
  );
  return <ProgressContext value={value}>{children}</ProgressContext>;
}
