"use client";

import { motion, useAnimation } from 'framer-motion';
import { useEffect } from 'react';

const Reveal = ({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) => {
  const controls = useAnimation();

  useEffect(() => {
    const animateReveal = async () => {
      await controls.start({ width: "0%" });
    };
    animateReveal();
  }, [controls]);

  return (
    <div className="relative inline-block">
      <motion.div
        className="w-full h-full absolute z-20 inset-0 bg-gradient-to-r from-[#4131FF] to-[#8E5BF9]"
        initial={{ width: "100%" }}
        animate={controls}
        transition={{ duration: 1, delay: delay, ease: "easeInOut" }}
      ></motion.div>
      <div className="relative z-10">{children}</div>
    </div>
  );
};

export default Reveal;
