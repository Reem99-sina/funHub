import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { RatingProvider } from "./context/RatingContext.tsx";
import { SitesProvider } from "./context/SitesContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <RatingProvider>
        <SitesProvider>
        <App />
        </SitesProvider>
      </RatingProvider>
    </BrowserRouter>
  </StrictMode>
);
