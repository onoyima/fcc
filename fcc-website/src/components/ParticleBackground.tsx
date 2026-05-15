import { useEffect, useRef, useCallback, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  life: number;
  maxLife: number;
}

interface ParticleBackgroundProps {
  particleCount?: number;
  accentColor?: string;
  primaryColor?: string;
  connectDistance?: number;
  mouseRadius?: number;
  className?: string;
}

export default function ParticleBackground({
  particleCount = 60,
  accentColor = "#C9A84C",
  primaryColor = "#0D1B38",
  connectDistance = 120,
  mouseRadius = 120,
  className = "",
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const [mounted, setMounted] = useState(false);

  const initParticles = useCallback((w: number, h: number) => {
    const particles: Particle[] = [];
    for (let i = 0; i < particleCount; i++) {
      const maxLife = 300 + Math.random() * 400;
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: 1 + Math.random() * 2.5,
        alpha: 0.15 + Math.random() * 0.35,
        life: Math.random() * maxLife,
        maxLife,
      });
    }
    particlesRef.current = particles;
  }, [particleCount]);

  useEffect(() => {
    setMounted(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      if (particlesRef.current.length === 0) {
        initParticles(canvas.offsetWidth, canvas.offsetHeight);
      }
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    window.addEventListener("mousemove", handleMouse);
    const handleLeave = () => { mouseRef.current = { x: -1000, y: -1000 }; };
    window.addEventListener("mouseleave", handleLeave);

    const animate = () => {
      const w = canvas!.offsetWidth;
      const h = canvas!.offsetHeight;
      ctx!.clearRect(0, 0, w, h);

      const particles = particlesRef.current;
      const mouse = mouseRef.current;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.life += 1;
        if (p.life >= p.maxLife) {
          p.life = 0;
          p.x = Math.random() * w;
          p.y = Math.random() * h;
          p.vx = (Math.random() - 0.5) * 0.5;
          p.vy = (Math.random() - 0.5) * 0.5;
        }

        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseRadius) {
          const force = (mouseRadius - dist) / mouseRadius;
          p.vx -= (dx / dist) * force * 0.05;
          p.vy -= (dy / dist) * force * 0.05;
          p.vx = Math.max(-1, Math.min(1, p.vx));
          p.vy = Math.max(-1, Math.min(1, p.vy));
        }

        const lifeRatio = p.life / p.maxLife;
        const fadeAlpha = p.alpha * (1 - Math.abs(lifeRatio - 0.5) * 1.5);

        ctx!.beginPath();
        ctx!.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(201, 168, 76, ${fadeAlpha})`;
        ctx!.fill();
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectDistance) {
            const alpha = (1 - dist / connectDistance) * 0.12;
            ctx!.beginPath();
            ctx!.moveTo(particles[i].x, particles[i].y);
            ctx!.lineTo(particles[j].x, particles[j].y);
            ctx!.strokeStyle = `rgba(201, 168, 76, ${alpha})`;
            ctx!.lineWidth = 0.5;
            ctx!.stroke();
          }
        }
      }

      rafRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("mouseleave", handleLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [initParticles]);

  if (!mounted) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{ width: "100%", height: "100%" }}
    />
  );
}
