import { useLayoutEffect } from "react";
import { useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const marquee = useRef(null);
  const first = useRef(null);
  const second = useRef(null);

  useLayoutEffect(() => {
    let reqFrameId;
    let xPercent = 0;
    let speed = 0.2;
    let direction = -1;

    function animate() {
      if (xPercent <= -100) xPercent = 0;
      else if (xPercent > 0) xPercent = -100;
      gsap.set(first.current, { xPercent });
      gsap.set(second.current, { xPercent });
      xPercent += speed * direction;
      reqFrameId = requestAnimationFrame(animate);
    }
    animate();

    const tl = gsap.to(marquee.current, {
      scrollTrigger: {
        trigger: marquee.current,
        scrub: 0.25,
        start: "center center",
        end: "center center",
        onUpdate: () => (direction *= -1),
      },
    });

    return () => {
      cancelAnimationFrame(reqFrameId);
      tl.revert();
    };
  }, []);

  return (
    <section className="relative min-h-screen bg-[#050505] bg-[image:var(--bg-hero)] bg-contain bg-center bg-no-repeat text-white">
      <div className="container mx-auto">
        <div
          className="absolute bottom-[5%] left-0 w-full whitespace-nowrap text-[length:var(--fs-hero-marquee)] font-semibold mix-blend-difference"
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
