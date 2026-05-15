import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Palette, Check, X, Type, ALargeSmall, Languages } from "lucide-react";
import {
  useTheme, themes, fontFamilies, fontSizes,
  type ThemeName, type FontFamily, type FontSize,
} from "@/contexts/ThemeContext";
import { useLang } from "@/contexts/LanguageContext";
import { languages, type LangCode } from "@/i18n/translations";

const themeList: { key: ThemeName; emoji: string }[] = [
  { key: "navy",    emoji: "🌊" },
  { key: "orange",  emoji: "🔥" },
  { key: "brown",   emoji: "🪵" },
  { key: "emerald", emoji: "🌿" },
  { key: "purple",  emoji: "💜" },
  { key: "rose",    emoji: "🌹" },
  { key: "teal",    emoji: "🩵" },
];

const fontList: FontFamily[] = ["modern", "classic", "corporate", "bold", "editorial", "minimal"];
const sizeList: FontSize[]   = ["compact", "regular", "comfortable", "large"];

const fontPreviewStyles: Record<FontFamily, string> = {
  modern:    "'Plus Jakarta Sans', sans-serif",
  classic:   "'Playfair Display', serif",
  corporate: "'Inter', sans-serif",
  bold:      "'Space Grotesk', sans-serif",
  editorial: "'DM Serif Display', serif",
  minimal:   "'Outfit', sans-serif",
};

type Panel = "color" | "font" | "lang";

export default function ThemeToggle() {
  const { theme, mode, fontFamily, fontSize, setTheme, toggleMode, setFontFamily, setFontSize } = useTheme();
  const { lang, setLang } = useLang();
  const [open, setOpen] = useState(false);
  const [panel, setPanel] = useState<Panel>("color");

  return (
    <div className="relative flex items-center gap-1">
      {/* Dark/Light toggle */}
      <button
        data-testid="btn-mode-toggle"
        onClick={toggleMode}
        title={`Switch to ${mode === "light" ? "dark" : "light"} mode`}
        className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200"
      >
        <AnimatePresence mode="wait">
          <motion.div key={mode}
            initial={{ rotate: -90, opacity: 0 }}
            animate={{ rotate: 0,   opacity: 1 }}
            exit={{ rotate: 90,   opacity: 0 }}
            transition={{ duration: 0.2 }}>
            {mode === "light" ? <Moon size={17} /> : <Sun size={17} />}
          </motion.div>
        </AnimatePresence>
      </button>

      {/* Palette / Font / Lang toggle */}
      <button
        data-testid="btn-theme-picker"
        onClick={() => setOpen(!open)}
        title="Customize theme, typography & language"
        className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-all duration-200 relative"
      >
        <Palette size={17} />
        <span
          className="absolute bottom-0.5 right-0.5 w-2.5 h-2.5 rounded-full border-2"
          style={{ background: themes[theme].accent, borderColor: themes[theme].primary }}
        />
      </button>

      {/* ── Panel ─────────────────────────────── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div className="fixed inset-0 z-40"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setOpen(false)} />

            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.96 }}
              transition={{ duration: 0.18 }}
              className="absolute top-12 right-0 z-50 w-80 rounded-xl shadow-2xl overflow-hidden"
              style={{ background: "var(--clr-card)", border: "1px solid var(--clr-border)" }}
            >
              {/* Header */}
              <div className="flex items-center justify-between px-3 py-3 border-b"
                style={{ borderColor: "var(--clr-border)" }}>
                <div className="flex gap-1">
                  {(["color", "font", "lang"] as Panel[]).map((p) => (
                    <button key={p} onClick={() => setPanel(p)}
                      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-black uppercase tracking-wide transition-all"
                      style={{
                        background: panel === p ? "var(--clr-accent)" : "transparent",
                        color: panel === p ? "var(--clr-accent-text)" : "var(--clr-text-muted)",
                      }}>
                      {p === "color" ? <Palette size={12} /> : p === "font" ? <Type size={12} /> : <Languages size={12} />}
                      {p === "color" ? "Colors" : p === "font" ? "Fonts" : "Lang"}
                    </button>
                  ))}
                </div>
                <button onClick={() => setOpen(false)} className="hover:opacity-60 transition-opacity"
                  style={{ color: "var(--clr-text-muted)" }}>
                  <X size={14} />
                </button>
              </div>

              {/* ─── COLOR PANEL ─────────────────── */}
              <AnimatePresence mode="wait">
                {panel === "color" && (
                  <motion.div key="color"
                    initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -8 }} transition={{ duration: 0.15 }}>

                    {/* Appearance */}
                    <div className="px-4 pt-3 pb-2">
                      <p className="text-xs font-black uppercase tracking-widest mb-2"
                        style={{ color: "var(--clr-text-muted)" }}>Appearance</p>
                      <div className="grid grid-cols-2 gap-2">
                        {(["light", "dark"] as const).map((m) => (
                          <button key={m}
                            data-testid={`mode-${m}`}
                            onClick={toggleMode}
                            className="flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-bold transition-all duration-200"
                            style={{
                              background: mode === m ? "var(--clr-accent)" : "var(--clr-bg-alt)",
                              color: mode === m ? "var(--clr-accent-text)" : "var(--clr-text-muted)",
                              border: `1px solid ${mode === m ? "var(--clr-accent)" : "var(--clr-border)"}`,
                            }}>
                            {m === "light" ? <Sun size={13} /> : <Moon size={13} />}
                            {m === "light" ? "Light" : "Dark"}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Color Themes */}
                    <div className="px-4 pb-4">
                      <p className="text-xs font-black uppercase tracking-widest mb-2"
                        style={{ color: "var(--clr-text-muted)" }}>Color Theme</p>
                      <div className="grid grid-cols-1 gap-1">
                        {themeList.map(({ key, emoji }) => {
                          const th = themes[key];
                          const active = theme === key;
                          return (
                            <button key={key}
                              data-testid={`theme-${key}`}
                              onClick={() => setTheme(key)}
                              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all duration-150"
                              style={{
                                background: active ? `${th.primary}18` : "transparent",
                                border: `1px solid ${active ? th.accent : "transparent"}`,
                              }}>
                              <div className="w-9 h-6 rounded-md flex-shrink-0 relative overflow-hidden"
                                style={{ background: th.gradient }}>
                                <div className="absolute bottom-0 right-0 w-3 h-3 rounded-tl-md"
                                  style={{ background: th.accent }} />
                              </div>
                              <span className="flex-1 text-left text-xs font-bold"
                                style={{ color: "var(--clr-text)" }}>
                                {emoji} {th.label}
                              </span>
                              {active && <Check size={13} style={{ color: th.accent }} />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* ─── FONT PANEL ──────────────────── */}
                {panel === "font" && (
                  <motion.div key="font"
                    initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.15 }}>

                    <div className="px-4 pt-3 pb-2">
                      <p className="text-xs font-black uppercase tracking-widest mb-2"
                        style={{ color: "var(--clr-text-muted)" }}>Font Style</p>
                      <div className="grid grid-cols-1 gap-1.5">
                        {fontList.map((key) => {
                          const fc = fontFamilies[key];
                          const active = fontFamily === key;
                          return (
                            <button key={key}
                              data-testid={`font-${key}`}
                              onClick={() => setFontFamily(key)}
                              className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg transition-all duration-150"
                              style={{
                                background: active ? "color-mix(in srgb, var(--clr-accent) 12%, transparent)" : "transparent",
                                border: `1px solid ${active ? "var(--clr-accent)" : "var(--clr-border)"}`,
                              }}>
                              <div className="w-10 h-8 rounded-md flex-shrink-0 flex items-center justify-center text-sm font-bold border"
                                style={{
                                  fontFamily: fontPreviewStyles[key],
                                  background: "var(--clr-bg-alt)",
                                  borderColor: "var(--clr-border)",
                                  color: "var(--clr-primary)",
                                  fontWeight: key === "bold" ? 700 : key === "classic" || key === "editorial" ? 400 : 600,
                                  fontStyle: key === "editorial" ? "italic" : "normal",
                                }}>
                                Aa
                              </div>
                              <div className="flex-1 text-left">
                                <span className="text-xs font-black block leading-tight"
                                  style={{ color: "var(--clr-text)", fontFamily: fontPreviewStyles[key] }}>
                                  {fc.label}
                                </span>
                                <span className="text-xs leading-tight" style={{ color: "var(--clr-text-muted)" }}>
                                  {fc.description}
                                </span>
                              </div>
                              {active && <Check size={13} style={{ color: "var(--clr-accent)" }} />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="px-4 pb-4 border-t" style={{ borderColor: "var(--clr-border)", paddingTop: "12px" }}>
                      <div className="flex items-center gap-2 mb-2">
                        <ALargeSmall size={13} style={{ color: "var(--clr-accent)" }} />
                        <p className="text-xs font-black uppercase tracking-widest"
                          style={{ color: "var(--clr-text-muted)" }}>Text Size</p>
                      </div>
                      <div className="grid grid-cols-4 gap-1.5">
                        {sizeList.map((key) => {
                          const fs = fontSizes[key];
                          const active = fontSize === key;
                          const sizeDemo = { compact: "text-xs", regular: "text-sm", comfortable: "text-base", large: "text-lg" }[key];
                          return (
                            <button key={key}
                              data-testid={`size-${key}`}
                              onClick={() => setFontSize(key)}
                              title={fs.description}
                              className={`flex flex-col items-center gap-1 py-2.5 rounded-lg border transition-all duration-150 ${sizeDemo}`}
                              style={{
                                background: active ? "var(--clr-accent)" : "var(--clr-bg-alt)",
                                borderColor: active ? "var(--clr-accent)" : "var(--clr-border)",
                                color: active ? "var(--clr-accent-text)" : "var(--clr-text-muted)",
                              }}>
                              <span className="font-black leading-none" style={{ fontSize: { compact: "11px", regular: "13px", comfortable: "15px", large: "18px" }[key] }}>Aa</span>
                              <span className="text-xs font-bold leading-none" style={{ fontSize: "9px" }}>{fs.label}</span>
                            </button>
                          );
                        })}
                      </div>
                      <p className="text-xs mt-2" style={{ color: "var(--clr-text-light)" }}>
                        {fontSizes[fontSize].description}
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* ─── LANGUAGE PANEL ──────────────── */}
                {panel === "lang" && (
                  <motion.div key="lang"
                    initial={{ opacity: 0, x: 8 }} animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 8 }} transition={{ duration: 0.15 }}>

                    <div className="px-4 pt-3 pb-2">
                      <p className="text-xs font-black uppercase tracking-widest mb-2"
                        style={{ color: "var(--clr-text-muted)" }}>Select Language</p>

                      {/* Nigerian languages group */}
                      <p className="text-xs mb-1.5 font-bold" style={{ color: "var(--clr-accent)", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase" }}>🇳🇬 Nigerian Languages</p>
                      <div className="grid grid-cols-1 gap-1 mb-3">
                        {languages.filter(l => ["en", "ig", "ha", "yo"].includes(l.code)).map((l) => {
                          const active = lang === l.code;
                          return (
                            <button key={l.code}
                              data-testid={`lang-${l.code}`}
                              onClick={() => setLang(l.code as LangCode)}
                              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all duration-150"
                              style={{
                                background: active ? "color-mix(in srgb, var(--clr-accent) 15%, transparent)" : "transparent",
                                border: `1px solid ${active ? "var(--clr-accent)" : "var(--clr-border)"}`,
                              }}>
                              <span className="text-lg leading-none">{l.flag}</span>
                              <div className="flex-1 text-left">
                                <span className="text-xs font-black block" style={{ color: "var(--clr-text)" }}>{l.native}</span>
                                {l.native !== l.label && (
                                  <span className="text-xs" style={{ color: "var(--clr-text-muted)", fontSize: "10px" }}>{l.label}</span>
                                )}
                              </div>
                              {active && <Check size={13} style={{ color: "var(--clr-accent)" }} />}
                            </button>
                          );
                        })}
                      </div>

                      {/* International languages group */}
                      <p className="text-xs mb-1.5 font-bold" style={{ color: "var(--clr-accent)", fontSize: "9px", letterSpacing: "0.08em", textTransform: "uppercase" }}>🌍 International</p>
                      <div className="grid grid-cols-1 gap-1">
                        {languages.filter(l => !["en", "ig", "ha", "yo"].includes(l.code)).map((l) => {
                          const active = lang === l.code;
                          return (
                            <button key={l.code}
                              data-testid={`lang-${l.code}`}
                              onClick={() => setLang(l.code as LangCode)}
                              className="flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-all duration-150"
                              style={{
                                background: active ? "color-mix(in srgb, var(--clr-accent) 15%, transparent)" : "transparent",
                                border: `1px solid ${active ? "var(--clr-accent)" : "var(--clr-border)"}`,
                              }}>
                              <span className="text-lg leading-none">{l.flag}</span>
                              <div className="flex-1 text-left">
                                <span className="text-xs font-black block" style={{ color: "var(--clr-text)" }}>{l.native}</span>
                                {l.native !== l.label && (
                                  <span className="text-xs" style={{ color: "var(--clr-text-muted)", fontSize: "10px" }}>{l.label}</span>
                                )}
                              </div>
                              {active && <Check size={13} style={{ color: "var(--clr-accent)" }} />}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Footer */}
              <div className="px-4 py-2 border-t" style={{ borderColor: "var(--clr-border)" }}>
                <p className="text-xs" style={{ color: "var(--clr-text-light)" }}>
                  Preferences saved automatically.
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
