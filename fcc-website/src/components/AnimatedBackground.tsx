import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  variant?: "blobs" | "grid" | "particles" | "waves" | "hexagons";
  intensity?: number;
}

export function AnimatedBlobs({ intensity = 0.06 }: { intensity?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0], scale: [1, 1.1, 1] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-32 -left-32 w-96 h-96 rounded-full"
        style={{ background: `var(--clr-accent)`, opacity: intensity, filter: "blur(80px)" }}
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 60, 0], scale: [1, 0.9, 1] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute -bottom-32 -right-32 w-80 h-80 rounded-full"
        style={{ background: `var(--clr-accent)`, opacity: intensity, filter: "blur(70px)" }}
      />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, 40, 0], scale: [1, 1.15, 1] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 6 }}
        className="absolute top-1/2 left-1/3 w-64 h-64 rounded-full"
        style={{ background: `var(--clr-primary-light)`, opacity: intensity * 1.5, filter: "blur(60px)" }}
      />
    </div>
  );
}

export function AnimatedGrid({ opacity = 0.04 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,${opacity * 10}) 60px, rgba(255,255,255,${opacity * 10}) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,${opacity * 10}) 60px, rgba(255,255,255,${opacity * 10}) 61px)`,
        opacity,
      }}
    />
  );
}

export function AnimatedDots() {
  const dots = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 10 + 8,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {dots.map((dot) => (
        <motion.div
          key={dot.id}
          className="absolute rounded-full"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: dot.size,
            height: dot.size,
            background: "var(--clr-accent)",
            opacity: 0.4,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: dot.duration,
            repeat: Infinity,
            delay: dot.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export function AnimatedWaves() {
  return (
    <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden leading-none">
      <motion.svg
        viewBox="0 0 1440 120"
        className="w-full"
        preserveAspectRatio="none"
        animate={{ x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <path
          d="M0,60 C240,120 480,0 720,60 C960,120 1200,0 1440,60 L1440,120 L0,120 Z"
          style={{ fill: "var(--clr-bg)" }}
          opacity="0.1"
        />
        <path
          d="M0,80 C360,20 720,100 1080,40 C1260,10 1380,80 1440,80 L1440,120 L0,120 Z"
          style={{ fill: "var(--clr-accent)" }}
          opacity="0.05"
        />
      </motion.svg>
    </div>
  );
}

export function FloatingShapes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute border opacity-10"
          style={{
            borderColor: "var(--clr-accent)",
            width: 40 + i * 20,
            height: 40 + i * 20,
            left: `${(i * 17 + 5) % 90}%`,
            top: `${(i * 23 + 10) % 80}%`,
            borderRadius: i % 2 === 0 ? "50%" : "4px",
            transform: "rotate(45deg)",
          }}
          animate={{
            rotate: i % 2 === 0 ? [45, 405] : [-45, 315],
            y: [0, i % 2 === 0 ? -15 : 15, 0],
          }}
          transition={{
            rotate: { duration: 15 + i * 3, repeat: Infinity, ease: "linear" },
            y: { duration: 4 + i * 1.5, repeat: Infinity, ease: "easeInOut" },
          }}
        />
      ))}
    </div>
  );
}

export function DiagonalStripes({ opacity = 0.03 }: { opacity?: number }) {
  return (
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,1) 30px, rgba(255,255,255,1) 31px)`,
        opacity,
      }}
    />
  );
}

export function GlowAccent({ position = "top-right" }: { position?: string }) {
  const posClasses: Record<string, string> = {
    "top-right": "-top-20 -right-20",
    "bottom-left": "-bottom-20 -left-20",
    "center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  };
  return (
    <motion.div
      className={`absolute w-80 h-80 rounded-full pointer-events-none ${posClasses[position] || posClasses["top-right"]}`}
      style={{ background: "var(--clr-accent)", opacity: 0.08, filter: "blur(80px)" }}
      animate={{ scale: [1, 1.2, 1] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
    />
  );
}

export default function AnimatedBackground({ variant = "blobs" }: AnimatedBackgroundProps) {
  if (variant === "blobs") return <AnimatedBlobs />;
  if (variant === "grid") return <AnimatedGrid />;
  if (variant === "particles") return <AnimatedDots />;
  if (variant === "waves") return <AnimatedWaves />;
  return null;
}
