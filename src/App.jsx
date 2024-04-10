import "./App.css";
import { AnimatePresence } from "framer-motion";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap/gsap-core";
import { Suspense, lazy, useLayoutEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import Layout from "@components/Layout";

const Home = lazy(() => import("@pages/Home"));
const About = lazy(() => import("@pages/About"));
const Works = lazy(() => import("@pages/Works"));
const NotFound = lazy(() => import("@pages/NotFound"));

gsap.config({ nullTargetWarn: false });

export default function App() {
  const location = useLocation();

  useLayoutEffect(() => {
    const init = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener("resize", init);

    return () => window.removeEventListener("resize", init);
  }, []);

  return (
    <Suspense
      fallback={
        <h1 className="grid min-h-screen place-items-center text-2xl font-medium supports-[min-height:100svh]:min-h-[100svh]">
          Loading...
        </h1>
      }
    >
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="works" element={<Works />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
    </Suspense>
  );
}
