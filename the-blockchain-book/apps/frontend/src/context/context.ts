import { createContext } from "react";

export type ProgressContextType = {
  currentStep: number | null;
  isLoading: boolean;
  error: Error;
  refetch: () => void;
};

export const ProgressContext = createContext<ProgressContextType | undefined>(
  undefined
);

export type SectionsContextType = {
  sections: [];
  objectives: [];
  isLoading: boolean;
  error: Error;
  refetch: () => void;
};

export const SectionsContext = createContext<SectionsContextType | undefined>(
  undefined
);
