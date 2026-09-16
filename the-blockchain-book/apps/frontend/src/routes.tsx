import LandingPage from "./pages/LandingPage";
import ProgressPage from "./pages/ProgressPage";

export const routeList = [
  { path: "/", label: "Home", element: <LandingPage /> },
  { path: "/progress", label: "Progress", element: <ProgressPage /> },
];
