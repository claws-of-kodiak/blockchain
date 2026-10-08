import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { ReactNode } from "react";
import { BrowserRouter } from "react-router";
import ProgressProvider from "./context/ProgressProvider";
import UserProvider from "./context/UserProvider";
import CourseProvider from "./context/CourseProvider";

const query = new QueryClient();

export default function AppProviderWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <QueryClientProvider client={query}>
      <CourseProvider>
        <UserProvider>
          <ProgressProvider>
            <BrowserRouter>{children}</BrowserRouter>
          </ProgressProvider>
        </UserProvider>
      </CourseProvider>
    </QueryClientProvider>
  );
}
