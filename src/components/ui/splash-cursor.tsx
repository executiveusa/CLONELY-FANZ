"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashCursorProps {
  color?: string;
  size?: number;
  duration?: number;
}

export function SplashCursor({
  color = "hsl(var(--primary))",
  size = 100,
  duration = 0.4,
}: SplashCursorProps) {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleClick = () => {
      setClicked(true);
      setTimeout(() => setClicked(false), duration * 1000);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
    };
  }, [duration]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
      <motion.div
        className="absolute rounded-full"
        style={{
          left: position.x - size / 2,
          top: position.y - size / 2,
          width: size,
          height: size,
          backgroundColor: color,
        }}
        animate={{
          scale: clicked ? 1 : 0,
          opacity: clicked ? 0 : 0.15,
        }}
        transition={{ duration }}
      />
      <AnimatePresence>
        {clicked && (
          <motion.div
            initial={{ scale: 0, opacity: 0.3 }}
            animate={{ scale: 1, opacity: 0 }}
            exit={{ opacity: 0 }}
            className="absolute rounded-full"
            style={{
              left: position.x - size / 2,
              top: position.y - size / 2,
              width: size,
              height: size,
              backgroundColor: color,
            }}
            transition={{ duration }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
