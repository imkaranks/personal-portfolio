import { useLayoutEffect, useRef } from "react";
import Hero from "@pages/Home/Hero";
import Works from "@pages/Home/Works";
import About from "@pages/Home/About";
import gsap from "gsap/gsap-core";
// import ScrollTrigger from "gsap/ScrollTrigger";

export default function Home() {
  const bannerRef = useRef(null);

  // useLayoutEffect(() => {
  //   const ctx = gsap.context(() => {
  //     ScrollTrigger.create({
  //       trigger: bannerRef.current,
  //       start: "top top",
  //       end: "120% top",
  //       scrub: 1,
  //       pin: true,
  //     });

  //     // #########################################################################

  //     gsap
  //       .timeline({
  //         scrollTrigger: {
  //           trigger: ".hero",
  //           start: "top top",
  //           end: "bottom top",
  //           scrub: 1,
  //           pin: true,
  //           pinSpacer: false,
  //           pinSpacing: false,
  //           pinnedContainer: bannerRef.current,
  //         },
  //       })
  //       .set(".about", { opacity: 0, scale: 3 })
  //       .to(
  //         ".hero",
  //         {
  //           clipPath: "circle(0% at 50% 50%)",
  //         },
  //         0,
  //       )
  //       .to(
  //         ".about",
  //         {
  //           opacity: 1,
  //           scale: 1,
  //           ease: "power1.inOut",
  //         },
  //         0,
  //       )
  //       .to(
  //         ".about",
  //         {
  //           opacity: 1,
  //           scale: 1,
  //           ease: "power1.inOut",
  //           scrollTrigger: {
  //             trigger: ".about",
  //             start: "top top",
  //             end: "bottom top",
  //             scrub: 1,
  //             pin: true,
  //             pinnedContainer: bannerRef.current,
  //           },
  //         },
  //         0,
  //       );
  //   }, bannerRef.current);

  //   return () => {
  //     ctx.revert();
  //   };
  // }, []);

  return (
    <>
      <div ref={bannerRef}>
        <Hero />
        <About />
      </div>
      <Works />
    </>
  );
}
