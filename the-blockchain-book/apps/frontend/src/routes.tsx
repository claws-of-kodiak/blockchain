import LandingPage from "./pages/LandingPage";
import ProgressPage from "./pages/ProgressPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";
import AdminPage from "./pages/AdminPage";

export const routeList = [
  { path: "/home", label: "Home", element: <HomePage />, inHeader: true },

  {
    path: "/",
    label: "Landing Page",
    element: <LandingPage />,
    inHeader: false,
  },
  { path: "/login", label: "Log In", element: <LogInPage />, inHeader: false },
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
    path: "/admin",
    label: "Admin",
    element: <AdminPage />,
    inHeader: true,
  },
];

export const headerRouteList = routeList.filter((r) => r.inHeader === true);
