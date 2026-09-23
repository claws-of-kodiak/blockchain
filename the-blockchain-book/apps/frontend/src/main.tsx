import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../../../styles/index.css";

import App from "./App";
import AppProviderWrapper from "./AppProviders";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AppProviderWrapper>
      <App />
    </AppProviderWrapper>
  </StrictMode>
);
