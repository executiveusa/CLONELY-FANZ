import { Suspense, lazy, type ReactNode } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
import { ErrorBoundary } from "@/components/error-boundary";
import { ThemeProvider } from "@/components/theme-provider";
import { MainLayout } from "./components/layout/MainLayout";
import { useAuth } from "@/lib/auth-context";

const LandingPage = lazy(() => import("./components/landing/LandingPage"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const ClonelyFanz = lazy(() => import("./components/clonely/ClonelyFanz"));
const BrandIconsGrid = lazy(() => import("./components/marketing/BrandIconsGrid"));
const PricingSection = lazy(() => import("./components/pricing/PricingSection"));
const Home = lazy(() => import("./components/home"));

/**
 * Frontend private-route protection is defense in depth only.
 * All data access requires independent server/RLS owner authorization before release.
 */
function OwnerOnly({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  if (loading) return <div role="status" className="min-h-screen grid place-items-center bg-[#100d10] text-[#eee5dc]">Checking studio access…</div>;
  if (!user) return <div className="min-h-screen grid place-items-center bg-[#100d10] text-[#eee5dc] p-6">Studio access requires an authorized account.</div>;
  return <>{children}</>;
}
const showPrivateRoutes = import.meta.env.DEV && import.meta.env.VITE_ENABLE_PRIVATE_STUDIO_ROUTES === "true";
function TempoPreviewRoutes() { return useRoutes(routes); }

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Suspense fallback={<div className="min-h-screen grid place-items-center" role="status">Loading…</div>}>
          <div className="min-h-screen bg-background">
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/landing" element={<LandingPage />} />
              {showPrivateRoutes && (
                <>
                  <Route path="/legacy" element={<OwnerOnly><Home /></OwnerOnly>} />
                  <Route path="/dashboard/*" element={<OwnerOnly><MainLayout><Dashboard /></MainLayout></OwnerOnly>} />
                  <Route path="/clonely" element={<OwnerOnly><ClonelyFanz /></OwnerOnly>} />
                  <Route path="/brands" element={<OwnerOnly><BrandIconsGrid /></OwnerOnly>} />
                  <Route path="/pricing" element={<OwnerOnly><PricingSection /></OwnerOnly>} />
                </>
              )}
              {import.meta.env.DEV && import.meta.env.VITE_TEMPO === "true" && (
                <Route path="/tempobook/*" element={null} />
              )}
              <Route path="*" element={<div className="min-h-screen grid place-items-center bg-[#100d10] text-[#eee5dc]"><a href="/" className="underline">Page not found · Return home</a></div>} />
            </Routes>
            {import.meta.env.DEV && import.meta.env.VITE_TEMPO === "true" && <TempoPreviewRoutes />}
          </div>
        </Suspense>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
export default App;
