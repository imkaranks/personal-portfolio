import gsap from "gsap/gsap-core";
import { useState } from "react";
import { useRef } from "react";
import { useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { scaleModal } from "@utils/animations";

const projects = [
  {
    title: "Two Good Co",
    desc: "Frontend development",
    image:
      "https://images.unsplash.com/photo-1712007426396-08068359b6c7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwyfHx8ZW58MHx8fHx8",
  },
  {
    title: "Canvas",
    desc: "Frontend development",
    image:
      "https://images.unsplash.com/photo-1712415406482-e75e0afa2b02?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHx8",
  },
  {
    title: "Chat App",
    desc: "Frontend development",
    image:
      "https://images.unsplash.com/photo-1712313127701-dd6fde97f5d3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4fHx8ZW58MHx8fHx8",
  },
];

export default function Works() {
  const projectsRef = useRef(null);
  const modalRef = useRef(null);
  const circRef = useRef(null);
  const textRef = useRef(null);

  const [showModal, setShowModal] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const mouse = useRef({
    x: 0,
    y: 0,
  });

  useLayoutEffect(() => {
    const $projects = projectsRef.current;
    let tl;

    function onMouseMove(event) {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;

      tl = gsap
        .timeline()
        .to(
          modalRef.current,
          {
            top: mouse.current.y,
            left: mouse.current.x,
            duration: 0.65,
          },
          0,
        )
        .to(
          circRef.current,
          {
            top: mouse.current.y,
            left: mouse.current.x,
            duration: 0.4,
          },
          0,
        )
        .to(
          textRef.current,
          {
            top: mouse.current.y,
            left: mouse.current.x,
            duration: 0.35,
          },
          0,
        );
    }

    $projects.addEventListener("mousemove", onMouseMove);

    return () => {
      $projects.removeEventListener("mousemove", onMouseMove);
      tl?.revert();
    };
  }, []);

  return (
    <section className="relative min-h-screen py-24">
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
              className="group py-[1em] text-4xl md:text-5xl"
              onMouseEnter={() => setCurrentSlide(i)}
            >
              <div className="mx-auto flex w-11/12 items-center justify-between">
                <p className="text-4xl font-medium uppercase transition-transform duration-300 ease-in-out group-hover:-translate-x-4 group-hover:text-black/40 md:text-5xl">
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
          {showModal && (
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
                ref={circRef}
                style={{ top: mouse.current.y, left: mouse.current.x }}
              ></motion.div>
              <motion.span
                variants={scaleModal}
                initial="initial"
                animate="animate"
                exit="exit"
                className="pointer-events-none fixed z-40 -translate-x-1/2 -translate-y-1/2 text-sm uppercase text-white"
                ref={textRef}
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
