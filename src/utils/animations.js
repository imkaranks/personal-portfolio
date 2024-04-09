const pageTransition = {
  initial: { y: "0%", "--scale": 0.3 },
  animate: {
    y: "min(-175vh, -175vw)",
    "--scale": 0,
    transition: { delay: 0.35, duration: 0.75, ease: [0.76, 0, 0.24, 1] },
    transitionEnd: { y: "max(175vh, 175vw)", "--scale": 0.3 },
  },
  exit: {
    y: "0%",
    "--scale": 0,
    transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
  },
};

const nav = {
  initial: {
    x: "250%",
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    x: "250%",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const navCurve = {
  initial: { scaleX: 0.5, x: "-50%" },
  animate: {
    scaleX: 0,
    x: "-50%",
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    scaleX: 0.5,
    x: "-50%",
    duration: 1,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

const scaleModal = {
  initial: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    origin: "center",
  },
  animate: {
    scale: 1,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
  },
  exit: {
    scale: 0,
    x: "-50%",
    y: "-50%",
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
  },
};

export { pageTransition, nav, navCurve, scaleModal };
