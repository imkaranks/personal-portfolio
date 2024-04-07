import gsap from "gsap/gsap-core";
import { useLayoutEffect, useRef } from "react";
import Magnetic from "./Magnetic";

export default function Footer() {
  const footerRef = useRef(null);
  const circRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    const tl = gsap
      .timeline()
      .to(
        circRef.current,
        {
          scaleY: 0,
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 90%",
            end: "50% 90%",
            scrub: 1,
          },
        },
        0,
      )
      .to(
        buttonRef.current,
        {
          right: "10%",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 60%",
            end: "50% 60%",
            scrub: 1,
          },
        },
        0,
      );
    return () => tl?.revert();
  }, []);

  return (
    <footer
      className="relative min-h-screen overflow-hidden bg-neutral-900 py-24 text-white"
      ref={footerRef}
    >
      <div
        className="absolute left-[-25%] top-0 aspect-square w-[150%] -translate-y-1/2 rounded-full bg-white"
        ref={circRef}
      ></div>
      <div className="mx-auto w-4/5">
        <div className="relative mb-16 border-b-2 border-b-white/10 pb-[3em] text-white">
          <div className="text-5xl font-semibold">
            <div className="aspect-square w-8 rounded-full"></div>
            <h2>Let&apos;s work together</h2>
          </div>

          <div
            className="absolute bottom-0 right-[20%] aspect-square w-fit translate-y-1/2"
            ref={buttonRef}
          >
            <Magnetic className="grid h-full place-content-center rounded-full bg-indigo-600 p-[1em]">
              <span className="pointer-events-none">Get in touch</span>
            </Magnetic>
          </div>
        </div>

        <div className="my-8 flex gap-6">
          <Magnetic
            strength={0.2}
            className="rounded-full border-2 border-white/10 p-[1em_2em]"
          >
            <span className="pointer-events-none">
              Lorem ipsum dolor sit amet.
            </span>
          </Magnetic>
          <Magnetic
            strength={0.2}
            className="rounded-full border-2 border-white/10 p-[1em_2em]"
          >
            <span className="pointer-events-none">Lorem, ipsum.</span>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
