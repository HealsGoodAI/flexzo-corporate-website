import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type AnimationType = "fade-up" | "fade-down" | "fade-left" | "fade-right" | "scale" | "blur" | "split";

const variants: Record<AnimationType, Variants> = {
  "fade-up": {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-down": {
    hidden: { opacity: 0, y: -40 },
    visible: { opacity: 1, y: 0 },
  },
  "fade-left": {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0 },
  },
  "fade-right": {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.85 },
    visible: { opacity: 1, scale: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  split: {
    hidden: { opacity: 0, y: 30, letterSpacing: "0.15em" },
    visible: { opacity: 1, y: 0, letterSpacing: "0em" },
  },
};

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "span" | "h1" | "h2" | "h3" | "h4" | "p" | "section";
  once?: boolean;
  stagger?: number;
}

const ScrollReveal = ({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 0.7,
  className = "",
  as = "div",
  once = true,
}: ScrollRevealProps) => {
  const Component = motion[as] as typeof motion.div;

  return (
    <Component
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15 }}
      variants={variants[animation]}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </Component>
  );
};

export default ScrollReveal;
