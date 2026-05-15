import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Palette, Check, X } from "lucide-react";
import { useTheme, themes, type ThemeName } from "@/contexts/ThemeContext";

const themeList: { key: ThemeName; emoji: string }[] = [
  { key: "navy", emoji: "🌊" },
  { key: "orange", emoji: "🔥" },
  { key: "brown", emoji: "🪵" },
  { key: "emerald", emoji: "🌿" },
  { key: "purple", emoji: "💜" },
  { key: "rose", emoji: "🌹" },
  { key: "teal", emoji: "🌊" },
];

export default function ThemeToggle() {
  const { theme, mode, setTheme, toggleMode } = useTheme();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative flex items-center gap-2">
      {/* Mode Toggle */}
      <button
        data-testid="btn-mode-toggle"
        onClick={toggleMode}
        title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
        className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0, opacity: 1 }}
            exit={{ rotate: 90, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {mode === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </motion.div>
        </AnimatePresence>
      </button>

      {/* Theme Picker Toggle */}
      <button
        data-testid="btn-theme-picker"
        onClick={() => setOpen(!open)}
        title="Change color theme"
        className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 relative"
      >
        <Palette size={18} />
        <span
          className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0D1B38]"
          style={{ background: themes[theme].accent }}
        />
      </button>

      {/* Theme Panel */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-12 right-0 z-50 w-72 rounded-xl shadow-2xl overflow-hidden"
              style={{ background: "var(--clr-card)", border: "1px solid var(--clr-border)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: "var(--clr-border)" }}>
                <div className="flex items-center gap-2">
                  <Palette size={15} style={{ color: "var(--clr-accent)" }} />
                  <span className="text-xs font-black uppercase tracking-widest" style={{ color: "var(--clr-text)" }}>Color Theme</span>
                </div>
                <button onClick={() => setOpen(false)} style={{ color: "var(--clr-text-muted)" }} className="hover:opacity-70 transition-opacity">
                  <X size={14} />
                </button>
              </div>

              {/* Mode toggle in panel */}
              <div className="px-4 pt-3 pb-2">
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--clr-text-muted)" }}>Appearance</p>
                <div className="grid grid-cols-2 gap-2">
                  {(["light", "dark"] as const).map((m) => (
                    <button
                      key={m}
                      data-testid={`mode-${m}`}
                      onClick={() => { toggleMode(); }}
                      className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all duration-200"
                      style={{
                        background: mode === m ? "var(--clr-accent)" : "var(--clr-bg-alt)",
                        color: mode === m ? "var(--clr-accent-text)" : "var(--clr-text-muted)",
                        border: `1px solid ${mode === m ? "var(--clr-accent)" : "var(--clr-border)"}`,
                      }}
                    >
                      {m === "light" ? <Sun size={14} /> : <Moon size={14} />}
                      {m === "light" ? "Light" : "Dark"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Theme swatches */}
              <div className="px-4 pb-4">
                <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: "var(--clr-text-muted)" }}>Brand Theme</p>
                <div className="grid grid-cols-1 gap-1.5">
                  {themeList.map(({ key, emoji }) => {
                    const t = themes[key];
                    const isActive = theme === key;
                    return (
                      <button
                        key={key}
                        data-testid={`theme-${key}`}
                        onClick={() => { setTheme(key); }}
                        className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-200"
                        style={{
                          background: isActive ? `${t.primary}20` : "transparent",
                          border: `1px solid ${isActive ? t.accent : "transparent"}`,
                        }}
                      >
                        {/* Gradient preview */}
                        <div
                          className="w-9 h-6 rounded-md flex-shrink-0 relative overflow-hidden"
                          style={{ background: t.gradient }}
                        >
                          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-tl-md" style={{ background: t.accent }} />
                        </div>
                        <div className="flex-1 text-left">
                          <span className="text-xs font-bold block" style={{ color: "var(--clr-text)" }}>{emoji} {t.label}</span>
                        </div>
                        {isActive && <Check size={14} style={{ color: t.accent }} />}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Footer note */}
              <div className="px-4 pb-3 border-t" style={{ borderColor: "var(--clr-border)", paddingTop: "8px" }}>
                <p className="text-xs" style={{ color: "var(--clr-text-light)" }}>Theme preference is saved automatically.</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
