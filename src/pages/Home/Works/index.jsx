import { AnimatePresence, motion } from "framer-motion";
import gsap from "gsap";
import { useLayoutEffect, useRef, useState } from "react";
import projects from "@constants/projects";
import { scaleModal } from "@utils/animations";
import isTouchDevice from "@utils/isTouchDevice";

const isTouchEnabled = isTouchDevice();

export default function Works() {
  const projectsRef = useRef(null);
  const modalRef = useRef(null);
  const cursorRef = useRef(null);
  const cursorLabelRef = useRef(null);
  const mouse = useRef({
    x: innerWidth * 0.5,
    y: innerHeight * 0.5,
  });

  const [showModal, setShowModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useLayoutEffect(() => {
    if (isTouchEnabled) return;

    const $projects = projectsRef.current;
    let tl;

    const onMouseMove = ({ clientX, clientY }) => {
      const x = (mouse.current.x = clientX);
      const y = (mouse.current.y = clientY);

      tl = gsap
        .timeline({ ease: "power3" })
        .to(modalRef.current, { top: y, left: x, duration: 0.65 }, 0)
        .to(cursorRef.current, { top: y, left: x, duration: 0.4 }, 0)
        .to(cursorLabelRef.current, { top: y, left: x, duration: 0.35 }, 0);
    };

    $projects.addEventListener("mousemove", onMouseMove);

    return () => {
      $projects.removeEventListener("mousemove", onMouseMove);
      tl?.revert();
    };
  }, []);

  return (
    <section className="relative min-h-screen py-12 supports-[min-height:100svh]:min-h-[100svh] sm:py-16 md:py-20 lg:py-24">
      <div className="mx-auto w-11/12 md:w-10/12">
        <header className="border-b pb-8 text-sm uppercase text-black/50">
          <h2 className="mx-auto w-11/12">Recent Works</h2>
        </header>

        <div
          className="divide-y-[1px]"
          ref={projectsRef}
          onMouseEnter={() => setShowModal(true)}
          onMouseLeave={() => setShowModal(false)}
        >
          {projects.map((project, i) => (
            <div
              key={i}
              className="group py-[1em] text-2xl sm:text-3xl md:text-4xl lg:text-5xl"
              onMouseEnter={() => setCurrentSlide(i)}
            >
              <div className="mx-auto flex w-11/12 items-center justify-between">
                <p className="text-2xl font-medium uppercase transition-transform duration-300 ease-in-out group-hover:-translate-x-4 group-hover:text-black/40 sm:text-3xl md:text-4xl lg:text-5xl">
                  {project.title}
                </p>
                <p className="text-sm capitalize transition-transform duration-300 ease-in-out group-hover:translate-x-4 group-hover:text-black/40 md:text-base">
                  {project.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <AnimatePresence>
          {!isTouchEnabled && showModal && (
            <>
              <motion.div
                className="pointer-events-none fixed z-40 aspect-square w-[20rem] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
                ref={modalRef}
                variants={scaleModal}
                initial="initial"
                animate="animate"
                exit="exit"
                style={{ top: mouse.current.y, left: mouse.current.x }}
              >
                <div
                  className="[transition-timing-function: 'cubic-bezier(0.76, 0, 0.24, 1)'] transition-transform duration-300"
                  style={{
                    transform: `translateY(${currentSlide * -(100 / projects.length)}%)`,
                  }}
                >
                  {projects.map((project, i) => (
                    <div
                      key={i}
                      className="aspect-square w-[20rem] bg-neutral-300"
                    >
                      <img
                        className="h-full w-full object-cover"
                        src={project.image}
                        alt={project.title}
                      />
                    </div>
                  ))}
                </div>
              </motion.div>
              <motion.div
                className="pointer-events-none fixed left-1/2 top-1/2 z-40 aspect-square w-20 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600"
                variants={scaleModal}
                initial="initial"
                animate="animate"
                exit="exit"
                ref={cursorRef}
                style={{ top: mouse.current.y, left: mouse.current.x }}
              ></motion.div>
              <motion.span
                variants={scaleModal}
                initial="initial"
                animate="animate"
                exit="exit"
                className="pointer-events-none fixed z-40 -translate-x-1/2 -translate-y-1/2 text-sm text-white"
                ref={cursorLabelRef}
                style={{ top: mouse.current.y, left: mouse.current.x }}
              >
                View
              </motion.span>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
