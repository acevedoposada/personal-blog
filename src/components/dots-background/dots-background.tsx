import { useScroll, motion } from "motion/react";
import { useRef } from "react";
import clsx from "clsx";

import { useParallax } from "@/utils/parallax";

import styles from "./dots-background.module.css";

interface DotsBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  speed?: {
    left?: number;
    right?: number;
  };
  hiddenDots?: "left" | "right";
}

export default function DotsBackground({
  className,
  speed = { left: 150, right: 500 },
  hiddenDots,
  ...props
}: DotsBackgroundProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll();
  const y1 = useParallax(scrollYProgress, speed.left ?? 150);
  const y2 = useParallax(scrollYProgress, speed.right ?? 500);

  return (
    <div ref={ref} className={clsx("pointer-events-none h-full w-screen select-none overflow-hidden", className)} {...props}>
      {(hiddenDots !== "left" || hiddenDots === undefined) && (
        <motion.div
          className={clsx(
            "pointer-events-none absolute top-[20%] select-none blur-[10rem] left-[-20%] h-[40%] w-[30%]",
            styles["bg__dots1"]
          )}
          style={{ y: y1 }}
        />
      )}
      {(hiddenDots !== "right" || hiddenDots === undefined) && (
        <motion.div
          className={clsx(
            "pointer-events-none absolute top-[20%] select-none blur-[10rem] -right-1/2 h-[20%] w-[60%]",
            styles["bg__dots2"]
          )}
          style={{ y: y2 }}
        />
      )}
    </div>
  );
}
