import { AnimatePresence } from "framer-motion";
import ScrollTrigger from "gsap/ScrollTrigger";
import gsap from "gsap/gsap-core";
import { useLayoutEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import colors from "tailwindcss/colors";
import pages from "@constants/pages";
import Nav from "@components/Header/Nav";
import Overlay from "@components/Header/Overlay";
import Magnetic from "@components/Magnetic";

export default function Header() {
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
            <span className="absolute left-0 top-0 sm:group-hover:-translate-x-full">
              Code by Karan
            </span>
            <span className="absolute left-0 top-0 translate-x-[130%] sm:group-hover:translate-x-0">
              Karan Sethi
            </span>
          </div>
        </Magnetic>

        {hidden && (
          <nav>
            <ul className="flex list-none items-center gap-[5vw]">
              {pages.map((page, i) => (
                <li key={i}>
                  <Magnetic className="relative before:pointer-events-none before:absolute before:-bottom-4 before:left-1/2 before:aspect-square before:w-1.5 before:-translate-x-1/2 before:scale-0 before:rounded-full before:bg-white before:transition-transform before:content-[''] hover:before:scale-100">
                    <Link to={page.href}>{page.title}</Link>
                  </Magnetic>
                </li>
              ))}
            </ul>
          </nav>
        )}

        <button
          className="fixed right-8 top-8 z-50 aspect-square w-16 origin-center scale-[--scale] transition-transform duration-300"
          style={{
            "--scale": !showMenu && hidden ? 0 : 1,
            "--bg": !showMenu ? colors.neutral[700] : colors.indigo[600],
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
          {showMenu && (
            <>
              <Overlay />
              <Nav />
            </>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
