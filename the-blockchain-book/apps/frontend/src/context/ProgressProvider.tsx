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

  // ERROR with GET fetch below
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["progress", email],
    queryFn: () => authFetch.get(`/progress/user`),
    enabled: !!email,
  });

  // DATA RETURNING NULL FROM REPO
  const { sectionTitle, sectionId, objectiveLabel, objectiveId } = data ?? {};

  const value: ProgressContextType = useMemo(
    () => ({
      details: {
        sectionTitle,
        sectionId,
        objectiveLabel,
        objectiveId,
      },
      isData: !!data,
      isLoading: isLoading || sessionPending,
      error,
      refetch,
    }),
    [
      sectionTitle,
      sectionId,
      objectiveLabel,
      objectiveId,
      isLoading,
      sessionPending,
      error,
      refetch,
    ]
  );
  return <ProgressContext value={value}>{children}</ProgressContext>;
}
