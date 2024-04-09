import gsap from "gsap/gsap-core";
import PropTypes from "prop-types";
import { useLayoutEffect, useRef } from "react";

export default function TextUnveiler({
  as: Component = "p",
  className = "",
  children,
}) {
  const textRef = useRef(null);

  useLayoutEffect(() => {
    const chars = Array.from(textRef.current.querySelectorAll(".chars"));

    const tl = gsap.timeline({
      defaults: {
        duration: 1,
        ease: "power1.inOut",
      },
      scrollTrigger: {
        trigger: textRef.current,
        start: "top 50%",
        end: "bottom 50%",
        scrub: 1,
      },
    });

    tl.fromTo(chars, { opacity: 0.2 }, { opacity: 1, stagger: 0.05 });

    // Add fade-out animation when scrolling in reverse
    tl.eventCallback("reverse", () => {
      tl.to(chars, { opacity: 0, stagger: -0.05 });
    });

    return () => tl.kill();
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

TextUnveiler.propTypes = {
  as: PropTypes.elementType,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};
