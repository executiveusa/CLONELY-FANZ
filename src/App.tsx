import { Suspense, lazy } from "react";
import { useRoutes, Routes, Route } from "react-router-dom";
import routes from "tempo-routes";
import { SplashCursor } from "@/components/ui/splash-cursor";
import { ErrorBoundary } from "@/components/error-boundary";
import { ThemeProvider } from "@/components/theme-provider";
import { MainLayout } from "./components/layout/MainLayout";

const LandingPage = lazy(() => import("./components/landing/LandingPage"));
const Dashboard = lazy(() => import("./components/dashboard/Dashboard"));
const ClonelyFanz = lazy(() => import("./components/clonely/ClonelyFanz"));
const BrandIconsGrid = lazy(
  () => import("./components/marketing/BrandIconsGrid"),
);
const PricingSection = lazy(
  () => import("./components/pricing/PricingSection"),
);
const Home = lazy(() => import("./components/home"));

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Suspense
          fallback={
            <div className="flex items-center justify-center min-h-screen">
              Loading...
            </div>
          }
        >
          <div className="min-h-screen bg-background">
            <SplashCursor />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/landing" element={<LandingPage />} />
              <Route
                path="/dashboard/*"
                element={
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                }
              />
              <Route path="/clonely" element={<ClonelyFanz />} />
              <Route path="/brands" element={<BrandIconsGrid />} />
              <Route path="/pricing" element={<PricingSection />} />
              {import.meta.env.VITE_TEMPO === "true" && (
                <Route path="/tempobook/*" element={null} />
              )}
            </Routes>
            {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
          </div>
        </Suspense>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
