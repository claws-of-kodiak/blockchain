import { useMemo } from "react";
import { UserContext, type UserContextType } from "./context";
import { authClient } from "../services/auth-client";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, isPending, error, refetch } = authClient.useSession();
  const user = session?.user;

  const value: UserContextType = useMemo(
    () => ({
      id: user?.id,
      email: user?.email,
      birthDate: user?.birthDate,
      createdAt: user?.createdAt,
      isAdmin: user?.isAdmin,
      isLoading: isPending,
      error,
      refetch,
    }),
    [user, isPending, error, refetch]
  );
  return <UserContext value={value}>{children}</UserContext>;
}
