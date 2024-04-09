import { useLayoutEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "@components/Header";
import Footer from "@components/Footer";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion } from "framer-motion";
import { pageTransition } from "@utils/animations";
import isTouchDevice from "@utils/isTouchDevice";

const isTouchEnabled = isTouchDevice();

gsap.registerPlugin(ScrollTrigger);

export default function Layout() {
  const { pathname } = useLocation();
  const cursorRef = useRef(null);

  useLayoutEffect(() => {
    if (isTouchEnabled) return;

    const cursorElement = cursorRef.current;
    const cursorXTo = gsap.quickTo(cursorElement, "left", { ease: "power4" });
    const cursorYTo = gsap.quickTo(cursorElement, "top", { ease: "power4" });
    let reqAnimFrameId;

    const mouse = { x: 0, y: 0 };
    const previousMouse = { x: 0, y: 0 };
    const circle = { x: 0, y: 0 };

    let currentScale = 0;
    let currentAngle = 0;

    function onMouseMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }

    window.addEventListener("mousemove", onMouseMove);

    const speed = 0.5;

    const tick = () => {
      circle.x += (mouse.x - circle.x) * speed;
      circle.y += (mouse.y - circle.y) * speed;
      const translateTransform = `translate(-50%, -50%)`;

      const deltaMouseX = mouse.x - previousMouse.x;
      const deltaMouseY = mouse.y - previousMouse.y;

      previousMouse.x = mouse.x;
      previousMouse.y = mouse.y;

      const mouseVelocity = Math.min(
        Math.sqrt(deltaMouseX ** 2 + deltaMouseY ** 2) * 4,
        150,
      );

      const scaleValue = (mouseVelocity / 150) * 0.5;
      currentScale += (scaleValue - currentScale) * speed;
      const scaleTransform = `scale(${1 + currentScale}, ${1 - currentScale})`;

      const angle = (Math.atan2(deltaMouseY, deltaMouseX) * 180) / Math.PI;

      if (mouseVelocity > 20) {
        currentAngle = angle;
      }

      const rotateTransform = `rotate(${currentAngle}deg)`;

      cursorElement.style.transform = `${translateTransform} ${rotateTransform} ${scaleTransform}`;

      cursorXTo(mouse.x);
      cursorYTo(mouse.y);

      reqAnimFrameId = window.requestAnimationFrame(tick);
    };

    tick();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(reqAnimFrameId);
    };
  }, []);

  return (
    <>
      <motion.div
        className="fixed inset-0 z-[999] grid place-items-center bg-neutral-800 text-white before:absolute before:top-0 before:h-[150vw] before:w-[150vw] before:-translate-y-1/2 before:scale-y-[--scale] before:rounded-full before:bg-neutral-800 before:content-[''] after:absolute after:bottom-0 after:h-[150vw] after:w-[150vw] after:translate-y-1/2 after:scale-y-[--scale] after:rounded-full after:bg-neutral-800 after:content-['']"
        variants={pageTransition}
        initial="initial"
        animate="animate"
        exit="exit"
      >
        <p className="capitalize">
          {pathname.split("/")[pathname.split("/").length - 1] || "home"}
        </p>
      </motion.div>

      <Header />
      <Outlet />
      <Footer />

      {!isTouchEnabled && (
        <div
          className="pointer-events-none fixed z-20 aspect-square w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gray-600 mix-blend-difference"
          ref={cursorRef}
        ></div>
      )}
    </>
  );
}
