import { createContext } from "react";

export type ProgressContextType = {
  currentStep: number | null;
  isLoading: boolean;
  isError: boolean;
  refetch: () => void;
};

export const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);
