import { useLayoutEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "@components/Layout";
import Home from "@pages/Home";
import gsap from "gsap/gsap-core";
import ScrollTrigger from "gsap/ScrollTrigger";
import "./App.css";

gsap.config({ nullTargetWarn: false });

export default function App() {
  useLayoutEffect(() => {
    function init() {
      ScrollTrigger.refresh();
    }

    window.addEventListener("resize", init);

    return () => window.removeEventListener("resize", init);
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
