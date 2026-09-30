import LandingPage from "./pages/LandingPage";
import ProgressPage from "./pages/ProgressPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import type { Route } from "@repo/validations";
import EditSection from "./features/admin/EditSection";
import AdminPage from "./pages/profile/AdminPage";
import SettingsPage from "./pages/profile/SettingsPage";
import ProfilePage from "./pages/profile/ProfilePage";

export const getRouteList = (isAdmin: boolean): Route[] => {
  const baseRoutes: Route[] = [
    { path: "/home", label: "Home", element: <HomePage />, inHeader: true },
    {
      path: "/",
      label: "Landing Page",
      element: <LandingPage />,
      inHeader: false,
    },
    {
      path: "/login",
      label: "Log In",
      element: <LogInPage />,
      inHeader: false,
    },
    {
      path: "/progress",
      label: "Progress",
      element: <ProgressPage />,
      inHeader: true,
    },
    {
      path: "/register",
      label: "Register",
      element: <RegisterPage />,
      inHeader: false,
    },
    {
      path: "/profile",
      label: "Profile",
      element: <ProfilePage />,
      inHeader: true,
    },
    {
      path: "/settings",
      label: "Settings",
      element: <SettingsPage />,
      inHeader: false,
    },
  ];

  if (isAdmin) {
    baseRoutes.push(
      {
        path: "/admin",
        label: "Admin",
        element: <AdminPage />,
        inHeader: false,
      },
      {
        path: "/admin/section/:sectionId",
        label: "Edit Section",
        element: <EditSection />,
        inHeader: false,
      }
    );
  }

  return baseRoutes;
};

export const getHeaderRoutes = (routes: Route[]) =>
  routes.filter((r) => r.inHeader === true && r.path !== "/profile");

export const getProfileMenuRoutes = (routes: Route[]) =>
  routes.filter((r) => r.path === "/settings" || r.path === "/admin");
