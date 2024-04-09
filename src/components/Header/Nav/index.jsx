import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import pages from "@constants/pages";
import { nav, navCurve } from "@utils/animations";
import Magnetic from "@components/Magnetic";

export default function Nav() {
  return (
    <motion.div
      className="fixed right-0 top-0 z-40 grid h-full w-full max-w-[30rem] items-center bg-neutral-900 sm:w-3/5"
      variants={nav}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <motion.div
        className="absolute -top-[25%] left-0 -z-10 aspect-square h-[150%] origin-center -translate-x-1/2 rounded-full bg-neutral-900"
        variants={navCurve}
        initial="initial"
        animate="animate"
        exit="exit"
      ></motion.div>
      <div className="mx-auto w-3/5">
        <div className="border-b pb-8 text-xs uppercase tracking-wider">
          Navigation
        </div>

        <div>
          <div className="grid gap-4 py-8 text-5xl">
            {pages.map((page, i) => (
              <motion.div
                className="cursor-pointer"
                key={i}
                initial={{ x: 100 }}
                animate={{ x: 0 }}
                exit={{ x: 100 }}
                transition={{
                  delay: 0.075 * i,
                  duration: 0.8,
                  ease: [0.76, 0, 0.24, 1],
                }}
              >
                <Magnetic
                  className="relative w-fit before:pointer-events-none before:absolute before:-left-8 before:top-1/2 before:aspect-square before:w-2.5 before:-translate-y-1/2 before:scale-0 before:rounded-full before:bg-white before:transition-transform before:content-[''] hover:before:scale-100"
                  strength={0.2}
                >
                  <Link to={page.href}>{page.title}</Link>
                </Magnetic>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
