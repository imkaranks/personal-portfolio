import gsap from "gsap/gsap-core";
import PropTypes from "prop-types";
import React from "react";
import { useLayoutEffect, useRef } from "react";
import isTouchDevice from "@utils/isTouchDevice";

export default function Magnetic({
  className,
  strength = 1,
  as: Component = "div",
  children,
}) {
  const magneticOuterRef = useRef(null);
  const magneticInnerRef = useRef(null);

  useLayoutEffect(() => {
    if (isTouchDevice()) return;

    const $magneticOuter = magneticOuterRef.current;
    const $magneticInner = magneticInnerRef.current;

    const magnetOutXTo = gsap.quickTo($magneticOuter, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const magnetOutYTo = gsap.quickTo($magneticOuter, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const magnetInXTo = gsap.quickTo($magneticInner, "x", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });
    const magnetInYTo = gsap.quickTo($magneticInner, "y", {
      duration: 1,
      ease: "elastic.out(1, 0.3)",
    });

    const onMouseMove = (event) => {
      const { width, height, left, top } =
        $magneticOuter.getBoundingClientRect();
      const x = event.clientX - (left + width / 2);
      const y = event.clientY - (top + height / 2);

      magnetOutXTo(x * strength);
      magnetOutYTo(y * strength);
      magnetInXTo(x * (strength * 0.5));
      magnetInYTo(y * (strength * 0.5));
    };

    const onMouseLeave = () => {
      magnetOutXTo(0);
      magnetOutYTo(0);
      magnetInXTo(0);
      magnetInYTo(0);
    };

    $magneticOuter.addEventListener("mousemove", onMouseMove);
    $magneticOuter.addEventListener("mouseleave", onMouseLeave);

    return () => {
      $magneticOuter.removeEventListener("mousemove", onMouseMove);
      $magneticOuter.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [strength]);

  return (
    <Component className={className} ref={magneticOuterRef}>
      {React.cloneElement(children, { ref: magneticInnerRef })}
    </Component>
  );
}

Magnetic.propTypes = {
  className: PropTypes.string,
  strength: PropTypes.number,
  as: PropTypes.elementType,
  children: PropTypes.node.isRequired,
};
