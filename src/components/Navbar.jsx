import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap/gsap-core";
import ScrollTrigger from "gsap/ScrollTrigger";
import { motion, AnimatePresence } from "framer-motion";
import Magnetic from "@components/Magnetic";
import colors from "tailwindcss/colors";

export default function Navbar() {
  const hamburgerRef = useRef(null);
  const headerRef = useRef(null);

  const [hidden, setHidden] = useState(true);
  const [showMenu, setShowMenu] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: document.documentElement,
        // markers: true,
        start: "200 top",
        end: "200 top",
        onLeave: () => setHidden(false),
        onEnterBack: () => setHidden(true),
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      className="absolute left-0 top-0 z-50 w-full py-8 text-white"
      ref={headerRef}
    >
      <div className="relative mx-auto flex w-11/12 items-center justify-between md:w-4/5">
        <Magnetic>
          <div className="group relative h-[3ch] w-[12ch] cursor-pointer overflow-hidden duration-300 [&>span]:transition-transform">
            <span className="absolute left-0 top-0 group-hover:-translate-x-full">
              Code by Karan
            </span>
            <span className="absolute left-0 top-0 translate-x-[130%] group-hover:translate-x-0">
              Karan Sethi
            </span>
          </div>
        </Magnetic>

        {hidden && (
          <nav>
            <ul className="flex list-none items-center gap-[5vw]">
              <li>
                <Magnetic>
                  <Link to={""}>Home</Link>
                </Magnetic>
              </li>
              <li>
                <Magnetic>
                  <Link to={""}>About</Link>
                </Magnetic>
              </li>
              <li>
                <Magnetic>
                  <Link to={""}>Works</Link>
                </Magnetic>
              </li>
            </ul>
          </nav>
        )}

        <button
          className="fixed right-8 top-8 z-50 aspect-square w-16 scale-[--scale] transition-transform duration-300"
          style={{
            "--scale": hidden ? 0 : 1,
            "--bg": !showMenu ? colors.neutral[600] : colors.indigo[600],
            transitionTimingFunction: "cubic-bezier(0.76, 0, 0.24, 1)",
          }}
          ref={hamburgerRef}
          onClick={() => setShowMenu(!showMenu)}
        >
          <Magnetic className="relative grid h-full w-full place-content-center overflow-hidden rounded-full bg-[--bg]">
            <span className="grid h-full w-full place-items-center gap-2">
              <span
                className="inline-block h-0.5 w-8 bg-white"
                style={
                  showMenu
                    ? {
                        transform: "rotate(-45deg)",
                        position: "absolute",
                        transition:
                          "transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)",
                      }
                    : {}
                }
              ></span>
              <span
                className="inline-block h-0.5 w-8 bg-white"
                style={
                  showMenu
                    ? {
                        transform: "rotate(45deg)",
                        position: "absolute",
                        transition:
                          "transform 0.4s cubic-bezier(0.76, 0, 0.24, 1)",
                      }
                    : {}
                }
              ></span>
            </span>
          </Magnetic>
        </button>

        <AnimatePresence mode="wait">
          {!hidden && showMenu && (
            <motion.div
              className="fixed right-0 top-0 z-40 grid h-full w-3/5 max-w-[30rem] items-center bg-neutral-900"
              initial={{ x: "250%" }}
              animate={{ x: 0 }}
              exit={{ x: "250%" }}
              transition={{
                duration: 0.8,
                ease: [0.76, 0, 0.24, 1],
              }}
            >
              <motion.div
                className="absolute -top-[25%] left-0 -z-10 aspect-square h-[150%] origin-center -translate-x-1/2 rounded-full bg-neutral-900"
                initial={{ scaleX: 0.5, x: "-50%" }}
                animate={{ scaleX: 0, x: "-50%" }}
                exit={{ scaleX: 0.5, x: "-50%", duration: 1 }}
                transition={{
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                }}
              ></motion.div>
              <div className="mx-auto w-3/5">
                <div className="border-b pb-8 text-xs uppercase tracking-wider">
                  Navigation
                </div>

                <div>
                  <div className="grid gap-4 py-8 text-5xl">
                    {["Home", "About", "Works"].map((item, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: 100 }}
                        animate={{ x: 0 }}
                        exit={{ x: 100 }}
                        transition={{
                          delay: 0.075 * i,
                          duration: 0.8,
                          ease: [0.76, 0, 0.24, 1],
                        }}
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
