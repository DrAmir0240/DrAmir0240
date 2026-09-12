"use client";

import React, { useRef, useState } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  glow?: boolean;
  tilt?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className = "",
  glow = false,
  tilt = true,
  ...props
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={tilt ? { y: -4, scale: 1.008 } : undefined}
      transition={{ type: "spring", stiffness: 350, damping: 25 }}
      style={{
        background: "rgba(16, 17, 24, 0.72)",
        backdropFilter: "blur(28px) saturate(180%)",
        WebkitBackdropFilter: "blur(28px) saturate(180%)",
        border: "1px solid rgba(255, 255, 255, 0.12)",
        boxShadow: glow
          ? "0 25px 50px -12px rgba(0, 0, 0, 0.9), 0 0 25px rgba(255, 255, 255, 0.12), inset 0 1px 1px rgba(255, 255, 255, 0.2)"
          : "0 20px 40px -12px rgba(0, 0, 0, 0.85), inset 0 1px 1px rgba(255, 255, 255, 0.1)",
      }}
      className={`relative overflow-hidden rounded-3xl p-6 sm:p-8 transition-all duration-300 group ${
        glow ? "ring-1 ring-white/30 shadow-white/10" : ""
      } ${className}`}
      {...props}
    >
      {/* Dynamic Specular Light Follow with Crisp White Glow */}
      {isHovered && (
        <div
          className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-100 rounded-3xl"
          style={{
            background: `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255, 255, 255, 0.1), transparent 80%)`,
          }}
        />
      )}

      {/* Hairline specular white edge */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

      {children}
    </motion.div>
  );
};

export default GlassCard;
