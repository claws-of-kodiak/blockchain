import { useQuery } from "@tanstack/react-query";
import { authFetch } from "../services/apiClient";
import { ProgressContext, type ProgressContextType } from "./context";
import { useMemo } from "react";
import { authClient } from "../services/auth-client";

// const fetchUserProgress = async (): Promise<{ currentStep: number }> => {
//   const data = await authFetch.get(`/progress/user`);
//   // Handle both shapes the backend might return
//   if (data == null || data === 0) return { currentStep: 0 };
//   if (data.error)
//     throw new Error(data.error.message ?? "Failed to load progress");
//   return { currentStep: data.currentStep };
// };

export default function ProgressProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending: sessionPending } = authClient.useSession();
  const email = session?.user.email;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["currentStep", email],
    queryFn: () => authFetch.get(`/progress/user`),
    enabled: !!email,
  });

  const currentSection = data?.sectionTitle ?? "Not found";
  const currentObjective = data?.objectiveLabel ?? "Not found";

  const value: ProgressContextType = useMemo(
    () => ({
      currentSection,
      currentObjective,
      isLoading: isLoading || sessionPending,
      error,
      refetch,
    }),
    [data, isLoading, error, refetch]
  );
  return <ProgressContext value={value}>{children}</ProgressContext>;
}
