import { motion } from "framer-motion";

const overlay = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.8,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function Overlay() {
  return (
    <motion.div
      variants={overlay}
      initial="initial"
      animate="animate"
      exit="exit"
      className="fixed left-0 top-0 h-full w-full bg-black/10"
    ></motion.div>
  );
}
