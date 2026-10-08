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

export type CourseContextType = {
  sections: Section[];
  objectives: Objective[];
  isLoading: boolean;
  error: Error;
  refetch: () => void;
};

export const CourseContext = createContext<CourseContextType | undefined>(
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
