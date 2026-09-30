import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { BrowserRouter } from "react-router";
import ProgressProvider from "./context/ProgressProvider";
import SectionsProvider from "./context/SectionsProvider";
import UserProvider from "./context/UserProvider";

const query = new QueryClient();

export default function AppProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={query}>
      <SectionsProvider>
        <UserProvider>
          <ProgressProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </ProgressProvider>
        </UserProvider>
      </SectionsProvider>
    </QueryClientProvider>
  );
}
