import React from "react";
import gsap from "gsap/gsap-core";
import { useLayoutEffect, useRef } from "react";

export default function Magnetic({ className, strength = 1, children }) {
  const outer = useRef(null);
  const inner = useRef(null);

  useLayoutEffect(() => {
    const $outer = outer.current;
    const $inner = inner.current;
    const outerXTo = gsap.quickTo($outer, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const outerYTo = gsap.quickTo($outer, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const innerXTo = gsap.quickTo($inner, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const innerYTo = gsap.quickTo($inner, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    function onMouseMove(event) {
      const { width, height, left, top } = $outer.getBoundingClientRect();
      const x = event.clientX - (left + width / 2);
      const y = event.clientY - (top + height / 2);

      outerXTo(x * strength);
      outerYTo(y * strength);
      innerXTo(x * (strength * 0.5));
      innerYTo(y * (strength * 0.5));
    }
    function onMouseLeave() {
      outerXTo(0);
      outerYTo(0);
      innerXTo(0);
      innerYTo(0);
    }

    $outer.addEventListener("mousemove", onMouseMove);
    $outer.addEventListener("mouseleave", onMouseLeave);

    return () => {
      $outer.removeEventListener("mousemove", onMouseMove);
      $outer.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <div className={className} ref={outer}>
      {React.cloneElement(children, { ref: inner })}
    </div>
  );
}
