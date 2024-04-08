import { useLayoutEffect, Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Layout from "@components/Layout";
const Home = lazy(() => import("@pages/Home"));
import gsap from "gsap/gsap-core";
import ScrollTrigger from "gsap/ScrollTrigger";
import { AnimatePresence } from "framer-motion";
import "./App.css";

gsap.config({ nullTargetWarn: false });

export default function App() {
  const location = useLocation();

  useLayoutEffect(() => {
    function init() {
      ScrollTrigger.refresh();
    }

    window.addEventListener("resize", init);

    return () => window.removeEventListener("resize", init);
  }, []);

  return (
    <Suspense
      fallback={
        <h1 className="grid min-h-screen place-items-center text-2xl font-medium">
          Loading...
        </h1>
      }
    >
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route
              path="*"
              element={
                <div className="min-h-screen bg-gradient-to-b from-neutral-600 from-40% to-white to-40% text-white">
                  <h1 className="absolute left-0 top-[20%] w-full -translate-y-1/2 text-center text-4xl font-medium">
                    Coming Soon...
                  </h1>
                </div>
              }
            />
          </Route>
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}
