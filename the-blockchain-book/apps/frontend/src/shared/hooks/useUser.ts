import { useContext } from "react";
import { UserContext } from "../../context/context";

// Custom Hook for clean consumption in components
export function useUser() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
