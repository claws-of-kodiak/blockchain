import { createContext, useContext } from "react";
import { publicFetch } from "../services/apiClient";
import { userId } from "../pages/ProgressPage";
import { useQuery } from "@tanstack/react-query";

const fetchUserProgress = async (): Promise<number> => {
  const data = publicFetch.get(`/course/userProgress/${userId}`);
  return Number(data);
};

type ProgressContextType = {
  currentStep: number;
  nextStep: number;
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
    enabled: !!userId,
  });

  const value: ProgressContextType = {
    currentStep: data ?? null,
    nextStep: data + 0.1,
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
