import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";

interface Slide {
  src: string;
  type: "image" | "video";
  alt?: string;
}

const slides: Slide[] = [
  {
    src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=85",
    type: "image",
    alt: "Modern skyscraper construction",
  },
  {
    src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=85",
    type: "image",
    alt: "Architectural city skyline",
  },
  {
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=85",
    type: "image",
    alt: "Construction site with crane",
  },
  {
    src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1600&q=85",
    type: "image",
    alt: "Blueprint and hard hat",
  },
  {
    src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=85",
    type: "image",
    alt: "Engineer inspecting structure",
  },
];

interface HeroSliderProps {
  overlay?: React.ReactNode;
}

export default function HeroSlider({ overlay }: HeroSliderProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5500);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
        >
          {slides[current].type === "video" ? (
            <video
              autoPlay muted loop playsInline
              className="w-full h-full object-cover"
              poster={slides[current].src}
            >
              <source src={slides[current].src} type="video/mp4" />
            </video>
          ) : (
            <img
              src={slides[current].src}
              alt={slides[current].alt}
              className="w-full h-full object-cover"
              loading={current === 0 ? "eager" : "lazy"}
            />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0"
        style={{
          background: "linear-gradient(105deg, var(--clr-primary) 0%, color-mix(in srgb, var(--clr-primary) 75%, transparent) 50%, color-mix(in srgb, var(--clr-primary) 30%, transparent) 100%)"
        }}
      />

      {overlay}

      <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className="transition-all duration-500 rounded-full"
            style={{
              width: i === current ? 32 : 8,
              height: 8,
              background: i === current ? "var(--clr-accent)" : "rgba(255,255,255,0.35)",
            }}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      <div className="absolute right-6 bottom-32 flex items-center gap-2 z-10">
        <button
          onClick={() => setPaused(!paused)}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border"
          style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.5)" }}
          aria-label={paused ? "Play" : "Pause"}
        >
          {paused ? <Play size={12} /> : <Pause size={12} />}
        </button>
        <button
          onClick={prev}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border hover:bg-white/10"
          style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.5)" }}
          aria-label="Previous slide"
        >
          <ChevronLeft size={14} />
        </button>
        <button
          onClick={next}
          className="w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 border hover:bg-white/10"
          style={{ borderColor: "rgba(255,255,255,0.25)", color: "rgba(255,255,255,0.5)" }}
          aria-label="Next slide"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
