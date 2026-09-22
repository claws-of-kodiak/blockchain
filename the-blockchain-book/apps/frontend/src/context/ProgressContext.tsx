import { createContext, useContext } from "react";
import { authFetch } from "../services/apiClient";
import { useQuery } from "@tanstack/react-query";

const fetchUserProgress = async (): Promise<number> => {
  const data = await authFetch.get(`/course/userProgress`);
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
  // insert useUser hook to pull real userId
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["progress"],
    queryFn: fetchUserProgress,
    enabled: false,
  });

  const value: ProgressContextType = {
    currentStep: data ?? null,
    isLoading,
    isError,
    refetch,
  };
  return <ProgressContext value={value}>{children}</ProgressContext>;
}

export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context)
    throw new Error("useProgress must be used within ProgressProvider.");
  return context;
};
