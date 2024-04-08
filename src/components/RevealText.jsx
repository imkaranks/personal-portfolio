import { useLayoutEffect, useRef } from "react";
import gsap from "gsap/gsap-core";

export default function RevealText({
  as: Component = "p",
  className = "",
  children,
}) {
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline()
        .set(".chars", {
          opacity: 0.2,
        })
        .to(".chars", {
          duration: 1,
          opacity: 1,
          stagger: 0.05,
          ease: "power1.inOut",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 50%",
            end: "bottom 50%",
            scrub: 1,
            // markers: true,
          },
        });
    }, textRef.current);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <Component className={className} ref={textRef}>
      {`${children}`
        .trim()
        .split("")
        .map((c, i) => (
          <span className="chars" key={i}>
            {c}
          </span>
        ))}
    </Component>
  );
}
