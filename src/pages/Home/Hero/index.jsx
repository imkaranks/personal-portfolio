import gsap from "gsap/gsap-core";
import { useLayoutEffect, useRef } from "react";

export default function Hero() {
  const heroRef = useRef(null);
  const marqueeRef = useRef(null);
  const firstTextRef = useRef(null);
  const secondTextRef = useRef(null);

  useLayoutEffect(() => {
    const speed = 0.2;
    let reqAnimFrameId;
    let xPercent = 0;
    let direction = -1;

    const animate = () => {
      if (xPercent <= -100) xPercent = 0;
      else if (xPercent > 0) xPercent = -100;
      gsap.set(firstTextRef.current, { xPercent });
      gsap.set(secondTextRef.current, { xPercent });
      xPercent += speed * direction;
      reqAnimFrameId = requestAnimationFrame(animate);
    };

    animate();

    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        scrollTrigger: {
          trigger: marqueeRef.current,
          scrub: 0.25,
          start: "center 70%",
          end: "center 70%",
          onUpdate: () => (direction *= -1),
        },
      });
      // gsap.to(heroRef.current, {
      //   clipPath: "circle(0% at 50% 50%)",
      //   scrollTrigger: {
      //     trigger: heroRef.current,
      //     start: "top top",
      //     end: "bottom top",
      //     scrub: 1,
      //   },
      // });
    });

    return () => {
      cancelAnimationFrame(reqAnimFrameId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      // className="hero | absolute left-0 top-0 z-10 min-h-screen supports-[min-height:100svh]:min-h-[100svh] w-full bg-[#050505] bg-[image:var(--bg-hero)] bg-cover bg-center bg-no-repeat text-white"
      className="hero | relative z-10 min-h-screen w-full overflow-x-hidden bg-[#050505] bg-[image:var(--bg-hero)] bg-cover bg-center bg-no-repeat text-white supports-[min-height:100svh]:min-h-[100svh]"
      ref={heroRef}
      // style={{ clipPath: "circle(100% at 50% 50%)" }}
    >
      <div className="container mx-auto">
        <div
          className="hero__marquee | absolute bottom-[5%] left-0 w-full whitespace-nowrap text-[length:var(--fs-hero-marquee)] font-medium mix-blend-difference"
          ref={marqueeRef}
        >
          <p className="inline-block px-[0.15em]" ref={firstTextRef}>
            Frontend developer -{" "}
          </p>
          <p className="inline-block px-[0.15em]" ref={secondTextRef}>
            Frontend developer -{" "}
          </p>
        </div>
      </div>
    </section>
  );
}
