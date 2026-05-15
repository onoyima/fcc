import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageSliderProps {
  images: string[];
  aspectRatio?: string;
  overlay?: React.ReactNode;
  className?: string;
}

export default function ImageSlider({ images, aspectRatio = "aspect-[4/3]", overlay, className = "" }: ImageSliderProps) {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (images.length <= 1 || paused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(next, 4000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [images.length, paused, next]);

  if (images.length === 0) return null;

  return (
    <div
      className={`relative overflow-hidden group ${aspectRatio} ${className}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={current}
          src={images[current]}
          alt=""
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
        />
      </AnimatePresence>

      {overlay}

      {images.length > 1 && (
        <>
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="w-7 h-7 rounded-full flex items-center justify-center bg-black/40 text-white hover:bg-black/60 transition-all"
              aria-label="Previous"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="w-7 h-7 rounded-full flex items-center justify-center bg-black/40 text-white hover:bg-black/60 transition-all"
              aria-label="Next"
            >
              <ChevronRight size={14} />
            </button>
          </div>

          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); setCurrent(i); }}
                className="transition-all duration-300 rounded-full"
                style={{
                  width: i === current ? 18 : 5,
                  height: 5,
                  background: i === current ? "var(--clr-accent)" : "rgba(255,255,255,0.4)",
                }}
                aria-label={`Image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
