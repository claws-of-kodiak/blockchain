import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { BrowserRouter } from "react-router";
import ProgressProvider from "./context/progressContext";

const query = new QueryClient();

export default function AppProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={query}>
      <ProgressProvider>
        <BrowserRouter>{children}</BrowserRouter>
      </ProgressProvider>
    </QueryClientProvider>
  );
}
