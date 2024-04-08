import { useLayoutEffect, useRef } from "react";
import gsap from "gsap/gsap-core";

export default function Hero() {
  const heroRef = useRef(null);
  const marquee = useRef(null);
  const first = useRef(null);
  const second = useRef(null);

  useLayoutEffect(() => {
    let reqFrameId;
    let xPercent = 0;
    let speed = 0.2;
    let direction = -1;

    const animate = () => {
      if (xPercent <= -100) xPercent = 0;
      else if (xPercent > 0) xPercent = -100;
      gsap.set(first.current, { xPercent });
      gsap.set(second.current, { xPercent });
      xPercent += speed * direction;
      reqFrameId = requestAnimationFrame(animate);
    };

    animate();

    const ctx = gsap.context(() => {
      gsap.to(marquee.current, {
        scrollTrigger: {
          trigger: marquee.current,
          scrub: 0.25,
          start: "center 70%",
          end: "center 70%",
          onUpdate: () => (direction *= -1),
          // markers: true,
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
      cancelAnimationFrame(reqFrameId);
      ctx.revert();
    };
  }, []);

  return (
    <section
      // className="hero | absolute left-0 top-0 z-10 min-h-screen w-full bg-[#050505] bg-[image:var(--bg-hero)] bg-cover bg-center bg-no-repeat text-white"
      className="hero | relative z-10 min-h-screen w-full bg-[#050505] bg-[image:var(--bg-hero)] bg-cover bg-center bg-no-repeat text-white"
      ref={heroRef}
      // style={{ clipPath: "circle(100% at 50% 50%)" }}
    >
      <div className="container mx-auto">
        <div
          className="hero__marquee | absolute bottom-[5%] left-0 w-full whitespace-nowrap text-[length:var(--fs-hero-marquee)] font-medium mix-blend-difference"
          ref={marquee}
        >
          <p className="inline-block px-[0.15em]" ref={first}>
            Frontend developer -{" "}
          </p>
          <p className="inline-block px-[0.15em]" ref={second}>
            Frontend developer -{" "}
          </p>
        </div>
      </div>
    </section>
  );
}
