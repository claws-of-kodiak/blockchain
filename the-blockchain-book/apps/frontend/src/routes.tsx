import LandingPage from "./pages/LandingPage";
import ProgressPage from "./pages/ProgressPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import LogInPage from "./pages/LogInPage";

export const routeList = [
  { path: "/", label: "Home", element: <LandingPage /> },
  { path: "/login", label: "Log In", element: <LogInPage /> },
  { path: "/progress", label: "Progress", element: <ProgressPage /> },
  { path: "/register", label: "Register", element: <RegisterPage /> },
  { path: "/home", label: "Home", element: <HomePage /> },
];
