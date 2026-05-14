import { useRef, useEffect, useState } from "react";

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  icon: React.ReactNode;
}

export default function StatCounter({ value, suffix = "+", label, icon }: StatCounterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const duration = 2000;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [started, value]);

  return (
    <div ref={ref} className="text-center" data-testid={`stat-${label.toLowerCase().replace(/\s+/g, "-")}`}>
      <div className="flex justify-center mb-3 text-[#C9A84C]">{icon}</div>
      <div className="text-4xl lg:text-5xl font-black text-white mb-2 tabular-nums">
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-white/60 font-medium tracking-wide">{label}</div>
    </div>
  );
}
