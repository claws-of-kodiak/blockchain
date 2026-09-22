import { createContext } from "react";
import { authFetch } from "../services/apiClient";
import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../services/authClient";

const fetchUserProgress = async (): Promise<number> => {
  const data = await authFetch.get(`/course/progress`);
  return data;
};

type ProgressContextType = {
  currentStep: number | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

export const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export default function ProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getAccessToken();
  // insert useUser hook to pull real userId
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["progress"],
    queryFn: fetchUserProgress,
    enabled: !!token,
  });

  const value: ProgressContextType = {
    currentStep: data ?? null,
    isLoading,
    isError,
    refetch,
  };
  return <ProgressContext value={value}>{children}</ProgressContext>;
}
