import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { BrowserRouter } from "react-router";

const query = new QueryClient();

export default function AppProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={query}>
      <BrowserRouter>{children}</BrowserRouter>
    </QueryClientProvider>
  );
}
