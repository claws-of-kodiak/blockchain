import type { Objective, Section, User } from "@repo/validations";
import { createContext } from "react";

export type ProgressContextType = {
  currentSection: string | null;
  currentObjective: string | null;
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

export type UserContextType = Omit<User, "passwordHash"> & {
  isLoading: boolean;
  error: Error;
  refetch: () => void;
};

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);
