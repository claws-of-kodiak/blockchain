import { useQuery } from "@tanstack/react-query";
import { getAccessToken } from "../services/authClient";
import { authFetch } from "../services/apiClient";
import { useMemo } from "react";
import { UserContext, type UserContextType } from "./context";
import type { User } from "@repo/validations";

const fetchUser = async (): Promise<Omit<User, "passwordHash">> => {
  const data = await authFetch.get(`/progress/userData`);
  return data;
};

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const token = getAccessToken();
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser,
    enabled: !!token,
  });

  const value: UserContextType = useMemo(
    () => ({
      id: data?.id,
      email: data?.email,
      birthDate: data?.birthDate,
      createdAt: data?.createdAt,
      isLoading,
      error,
      refetch,
    }),
    [data, isLoading, error, refetch]
  );
  return <UserContext value={value}>{children}</UserContext>;
}
