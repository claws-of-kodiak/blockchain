import { useContext } from "react";
import { ProgressContext } from "../context/ProgressContext";

// Custom Hook for clean consumption in components
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error("useListings must be used within a ListingProvider");
  }
  return context;
};
