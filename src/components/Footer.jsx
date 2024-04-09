import Magnetic from "./Magnetic";
import gsap from "gsap/gsap-core";
import { useLayoutEffect, useRef } from "react";

export default function Footer() {
  const footerRef = useRef(null);
  const circRef = useRef(null);
  const buttonRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
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
    }, footerRef.current);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      className="min-h-screenn ssupports-[min-height:100svh]:min-h-[100svh] relative overflow-hidden bg-neutral-900 py-8 text-white sm:py-12 md:py-16 lg:py-20 xl:py-24"
      ref={footerRef}
    >
      <div
        className="absolute left-[-25%] top-0 z-10 aspect-square w-[150%] -translate-y-1/2 rounded-full bg-white shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]"
        ref={circRef}
      ></div>
      <div className="mx-auto w-4/5">
        <div className="relative mb-16 border-b-2 border-b-white/10 pb-[3em] text-white">
          <div className="text-2xl font-semibold sm:text-3xl md:text-4xl lg:text-5xl">
            <div className="aspect-square w-8 rounded-full"></div>
            <h2 className="max-w-[23ch]">
              Got an interesting project? I can help you.
            </h2>
          </div>

          <div
            className="absolute bottom-0 right-[20%] aspect-square w-fit translate-y-1/2 text-xs md:text-sm lg:text-base"
            ref={buttonRef}
          >
            <Magnetic className="grid h-full place-content-center rounded-full bg-indigo-600 p-[1em]">
              <span className="pointer-events-none">Get in touch</span>
            </Magnetic>
          </div>
        </div>

        <div className="my-8 flex gap-4 text-xs max-md:flex-wrap md:gap-6 md:text-sm lg:text-base">
          <Magnetic
            strength={0.2}
            className="rounded-full border-2 border-white/10 p-[1em_2em]"
          >
            <span className="pointer-events-none">karansethi123@test.com</span>
          </Magnetic>
          <Magnetic
            strength={0.2}
            className="rounded-full border-2 border-white/10 p-[1em_2em]"
          >
            <span className="pointer-events-none">9876543210</span>
          </Magnetic>
        </div>

        <div className="mt-12 max-md:space-y-6 md:mt-16 md:flex lg:mt-20">
          <div className="footer__item basis-80">
            <h3 className="footer__subtitle mb-1 text-white/40 max-md:text-sm md:mb-2">
              Connect with me
            </h3>
            <p>ln @imkaran</p>
          </div>
          <div className="footer__item flex-1 basis-80 md:text-right">
            <h3 className="footer__subtitle mb-1 text-white/40 max-md:text-sm md:mb-2">
              Follow me
            </h3>
            <ul className="flex items-center gap-6 md:justify-end" role="list">
              <li>
                <a href="javascript:void(0)">.github</a>
              </li>
              <li>
                <a href="javascript:void(0)">.github</a>
              </li>
              <li>
                <a href="javascript:void(0)">.github</a>
              </li>
            </ul>
          </div>
          <div className="footer__item basis-80 md:text-right">
            <h3 className="footer__subtitle mb-1 text-white/40 max-md:text-sm md:mb-2">
              Say hello
            </h3>
            <p>karan@test.com</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
