import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";

// Development tooling must not initialize in a public build.
if (import.meta.env.DEV && import.meta.env.VITE_TEMPO === "true") {
  void import("tempo-devtools").then(({ TempoDevtools }) => TempoDevtools.init());
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
