// import gsap from "gsap/gsap-core";
import { useRef } from "react";
import TextUnveiler from "@components/TextUnveiler";

// import Magnetic from "@components/Magnetic";

export default function About() {
  const aboutRef = useRef(null);
  // const circRef = useRef(null);
  // const buttonRef = useRef(null);

  // useLayoutEffect(() => {
  //   const ctx = gsap.context(() => {
  //     gsap.timeline().to(
  //       circRef.current,
  //       {
  //         scaleY: 0,
  //         scrollTrigger: {
  //           trigger: aboutRef.current,
  //           start: "top 90%",
  //           end: "50% 90%",
  //           scrub: 1,
  //         },
  //       },
  //       0,
  //     );
  //   }, aboutRef.current);

  //   return () => ctx.revert();
  // }, []);

  return (
    <section
      className="about relative grid min-h-screen items-center overflow-hidden py-12 supports-[min-height:100svh]:min-h-[100svh] sm:py-16 md:py-20 lg:py-24"
      ref={aboutRef}
    >
      {/* <div
        className="absolute left-[-25%] top-0 z-10 aspect-square w-[150%] -translate-y-1/2 rounded-full bg-[#050505] shadow-[rgba(0,_0,_0,_0.25)_0px_25px_50px_-12px]"
        ref={circRef}
      ></div> */}
      <div className="mx-auto flex w-4/5 items-center justify-between gap-8 max-md:flex-col-reverse">
        <div className="max-w-[60ch] space-y-6">
          <h2 className="text-4xl font-semibold md:grid md:text-5xl xl:text-6xl 2xl:text-7xl md:[&>span:last-child]:pl-[0.75em]">
            <TextUnveiler as="span">Karan</TextUnveiler>{" "}
            <TextUnveiler as="span">Sethi</TextUnveiler>
          </h2>
          <TextUnveiler className="md:pl-[6em]" as="p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem dolorum
            unde, nulla ipsum totam commodi doloribus et minima voluptatem
            debitis fuga suscipit cum enim veniam corporis soluta culpa, nisi
            reiciendis!
          </TextUnveiler>
          <TextUnveiler className="md:pl-[6em]" as="p">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem dolorum
            unde, nulla ipsum totam commodi doloribus et minima voluptatem
            debitis fuga suscipit cum enim veniam corporis soluta culpa, nisi
            reiciendis!
          </TextUnveiler>
        </div>
        <div className="w-full md:max-w-[20rem]">
          <img
            src="https://images.unsplash.com/photo-1591848608103-286c1b74a1ec?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8V2RDaHFsc0pOOWN8fGVufDB8fHx8fA%3D%3D"
            alt=""
            className="object-cover max-md:max-h-[20rem] max-md:w-full"
          />
        </div>
      </div>
    </section>
  );
}
