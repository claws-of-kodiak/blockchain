import LandingPage from "./pages/LandingPage";
import ProgressPage from "./pages/ProgressPage";
import RegisterPage from "./pages/RegisterPage";

export const routeList = [
  { path: "/", label: "Home", element: <LandingPage /> },
  { path: "/progress", label: "Progress", element: <ProgressPage /> },
  { path: "/register", label: "Register", element: <RegisterPage /> },
];
