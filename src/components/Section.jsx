// src/components/Section.jsx
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Section({ id, children, className = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { amount: 0.6, margin: "-10% 0px -10% 0px" });

  return (
    <section
      id={id}
      ref={ref}
      className={`snap-start min-h-dvh grid place-items-center px-6 ${className}`}
      aria-label={id}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.25, y: 16 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-5xl w-full"
      >
        {children}
      </motion.div>
    </section>
  );
}
