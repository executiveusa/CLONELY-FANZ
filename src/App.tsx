import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/error-boundary";

// Public marketing build has no import path into legacy/private studio modules.
// They remain in the repository but are not shipped or exposed by the public app.
const LandingPage = lazy(() => import("./components/landing/LandingPage"));

export default function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div role="status" className="min-h-screen grid place-items-center bg-[#100d10] text-[#eee5dc]">Loading…</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing" element={<LandingPage />} />
          <Route path="*" element={<main className="min-h-screen grid place-items-center bg-[#100d10] text-[#eee5dc]"><a href="/" className="underline">Page not found · Return home</a></main>} />
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}
