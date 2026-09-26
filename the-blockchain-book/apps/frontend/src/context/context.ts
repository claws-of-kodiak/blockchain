import type { Objective, Section } from "@repo/validations";
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
  sections: Section[];
  objectives: Objective[];
  isLoading: boolean;
  error: Error;
  refetch: () => void;
};

export const SectionsContext = createContext<SectionsContextType | undefined>(
  undefined
);
