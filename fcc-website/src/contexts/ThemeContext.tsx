import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeName = "navy" | "orange" | "brown" | "emerald" | "purple" | "rose" | "teal";
export type ThemeMode = "light" | "dark";
export type FontFamily = "modern" | "classic" | "corporate" | "bold" | "editorial" | "minimal";
export type FontSize = "compact" | "regular" | "comfortable" | "large";

export interface ThemeColors {
  primary: string;
  primaryLight: string;
  primaryDark: string;
  accent: string;
  accentHover: string;
  accentText: string;
  bgAlt: string;
  bgDark: string;
  bgFooter: string;
  gradient: string;
  gradientAccent: string;
  label: string;
  swatch: string;
}

export interface FontConfig {
  label: string;
  heading: string;
  body: string;
  preview: string;
  description: string;
  googleParam: string;
}

export interface FontSizeConfig {
  label: string;
  description: string;
  base: string;
  headingScale: string;
}

export const themes: Record<ThemeName, ThemeColors> = {
  navy: {
    label: "Navy Blue", swatch: "#0D1B38",
    primary: "#0D1B38", primaryLight: "#162040", primaryDark: "#060D1A",
    accent: "#C9A84C", accentHover: "#B8943D", accentText: "#0D1B38",
    bgAlt: "#F5F7FA", bgDark: "#0A1628", bgFooter: "#070F1F",
    gradient: "linear-gradient(135deg, #0D1B38 0%, #1a3060 50%, #0D1B38 100%)",
    gradientAccent: "linear-gradient(135deg, #C9A84C 0%, #E8C870 50%, #C9A84C 100%)",
  },
  orange: {
    label: "Burnt Orange", swatch: "#C2410C",
    primary: "#7C2D12", primaryLight: "#9A3412", primaryDark: "#431407",
    accent: "#F97316", accentHover: "#EA6A0A", accentText: "#ffffff",
    bgAlt: "#FFF7ED", bgDark: "#431407", bgFooter: "#270B00",
    gradient: "linear-gradient(135deg, #7C2D12 0%, #C2410C 50%, #7C2D12 100%)",
    gradientAccent: "linear-gradient(135deg, #F97316 0%, #FDBA74 50%, #F97316 100%)",
  },
  brown: {
    label: "Walnut Brown", swatch: "#92400E",
    primary: "#3E1F00", primaryLight: "#5C2E00", primaryDark: "#200F00",
    accent: "#D97706", accentHover: "#B45309", accentText: "#ffffff",
    bgAlt: "#FFFBEB", bgDark: "#292100", bgFooter: "#150F00",
    gradient: "linear-gradient(135deg, #3E1F00 0%, #78350F 50%, #3E1F00 100%)",
    gradientAccent: "linear-gradient(135deg, #D97706 0%, #FCD34D 50%, #D97706 100%)",
  },
  emerald: {
    label: "Emerald Green", swatch: "#065F46",
    primary: "#064E3B", primaryLight: "#065F46", primaryDark: "#022C22",
    accent: "#10B981", accentHover: "#059669", accentText: "#022C22",
    bgAlt: "#F0FDF4", bgDark: "#022C22", bgFooter: "#01170F",
    gradient: "linear-gradient(135deg, #064E3B 0%, #0D9488 50%, #064E3B 100%)",
    gradientAccent: "linear-gradient(135deg, #10B981 0%, #6EE7B7 50%, #10B981 100%)",
  },
  purple: {
    label: "Royal Purple", swatch: "#4C1D95",
    primary: "#2D1B69", primaryLight: "#3B2580", primaryDark: "#1A0F3D",
    accent: "#8B5CF6", accentHover: "#7C3AED", accentText: "#ffffff",
    bgAlt: "#F5F3FF", bgDark: "#1A0F3D", bgFooter: "#0D0820",
    gradient: "linear-gradient(135deg, #2D1B69 0%, #5B21B6 50%, #2D1B69 100%)",
    gradientAccent: "linear-gradient(135deg, #8B5CF6 0%, #C4B5FD 50%, #8B5CF6 100%)",
  },
  rose: {
    label: "Crimson Rose", swatch: "#9F1239",
    primary: "#7F1D1D", primaryLight: "#991B1B", primaryDark: "#450A0A",
    accent: "#F43F5E", accentHover: "#E11D48", accentText: "#ffffff",
    bgAlt: "#FFF1F2", bgDark: "#450A0A", bgFooter: "#270004",
    gradient: "linear-gradient(135deg, #7F1D1D 0%, #BE123C 50%, #7F1D1D 100%)",
    gradientAccent: "linear-gradient(135deg, #F43F5E 0%, #FDA4AF 50%, #F43F5E 100%)",
  },
  teal: {
    label: "Ocean Teal", swatch: "#0E7490",
    primary: "#0F4C5C", primaryLight: "#155E75", primaryDark: "#082F49",
    accent: "#06B6D4", accentHover: "#0891B2", accentText: "#082F49",
    bgAlt: "#ECFEFF", bgDark: "#082F49", bgFooter: "#041F2D",
    gradient: "linear-gradient(135deg, #0F4C5C 0%, #0E7490 50%, #0F4C5C 100%)",
    gradientAccent: "linear-gradient(135deg, #06B6D4 0%, #67E8F9 50%, #06B6D4 100%)",
  },
};

export const fontFamilies: Record<FontFamily, FontConfig> = {
  modern: {
    label: "Modern Sans",
    heading: "'Plus Jakarta Sans', sans-serif",
    body: "'Plus Jakarta Sans', sans-serif",
    preview: "Aa",
    description: "Clean geometric — default",
    googleParam: "Plus+Jakarta+Sans:wght@400;500;600;700;800",
  },
  classic: {
    label: "Classic Serif",
    heading: "'Playfair Display', serif",
    body: "'Lato', sans-serif",
    preview: "Aa",
    description: "Elegant & traditional",
    googleParam: "Playfair+Display:wght@400;700;900&family=Lato:wght@300;400;700",
  },
  corporate: {
    label: "Corporate",
    heading: "'Inter', sans-serif",
    body: "'Inter', sans-serif",
    preview: "Aa",
    description: "Sharp & professional",
    googleParam: "Inter:wght@300;400;500;600;700;800;900",
  },
  bold: {
    label: "Bold Impact",
    heading: "'Space Grotesk', sans-serif",
    body: "'Inter', sans-serif",
    preview: "Aa",
    description: "Strong & expressive",
    googleParam: "Space+Grotesk:wght@400;500;600;700",
  },
  editorial: {
    label: "Editorial",
    heading: "'DM Serif Display', serif",
    body: "'DM Sans', sans-serif",
    preview: "Aa",
    description: "Magazine & editorial",
    googleParam: "DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;700",
  },
  minimal: {
    label: "Minimal",
    heading: "'Outfit', sans-serif",
    body: "'Outfit', sans-serif",
    preview: "Aa",
    description: "Clean & contemporary",
    googleParam: "Outfit:wght@300;400;500;600;700;800;900",
  },
};

export const fontSizes: Record<FontSize, FontSizeConfig> = {
  compact:     { label: "Compact",     description: "Dense & efficient",  base: "14px",   headingScale: "0.88" },
  regular:     { label: "Regular",     description: "Balanced (default)", base: "16px",   headingScale: "1" },
  comfortable: { label: "Comfortable", description: "Easy reading",       base: "17.5px", headingScale: "1.06" },
  large:       { label: "Large",       description: "Accessible & bold",  base: "19px",   headingScale: "1.15" },
};

interface ThemeContextType {
  theme: ThemeName;
  mode: ThemeMode;
  fontFamily: FontFamily;
  fontSize: FontSize;
  colors: ThemeColors;
  setTheme: (t: ThemeName) => void;
  setMode: (m: ThemeMode) => void;
  setFontFamily: (f: FontFamily) => void;
  setFontSize: (s: FontSize) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function applyThemeToDOM(theme: ThemeName, mode: ThemeMode) {
  const colors = themes[theme];
  const root = document.documentElement;
  const isLight = mode === "light";

  root.setAttribute("data-theme", theme);
  root.setAttribute("data-mode", mode);

  root.style.setProperty("--clr-primary", colors.primary);
  root.style.setProperty("--clr-primary-light", colors.primaryLight);
  root.style.setProperty("--clr-primary-dark", colors.primaryDark);
  root.style.setProperty("--clr-accent", colors.accent);
  root.style.setProperty("--clr-accent-hover", colors.accentHover);
  root.style.setProperty("--clr-accent-text", colors.accentText);
  root.style.setProperty("--clr-gradient", colors.gradient);
  root.style.setProperty("--clr-gradient-accent", colors.gradientAccent);

  if (isLight) {
    root.style.setProperty("--clr-bg", "#ffffff");
    root.style.setProperty("--clr-bg-alt", colors.bgAlt);
    root.style.setProperty("--clr-bg-dark", colors.bgDark);
    root.style.setProperty("--clr-bg-footer", colors.bgFooter);
    root.style.setProperty("--clr-text", "#111827");
    root.style.setProperty("--clr-text-muted", "#6B7280");
    root.style.setProperty("--clr-text-light", "#9CA3AF");
    root.style.setProperty("--clr-border", "#E5E7EB");
    root.style.setProperty("--clr-card", "#ffffff");
    root.style.setProperty("--clr-card-border", "#F3F4F6");
    root.style.setProperty("--clr-hero-overlay", `${colors.primary}F0`);
  } else {
    root.style.setProperty("--clr-bg", colors.primaryDark);
    root.style.setProperty("--clr-bg-alt", colors.primary);
    root.style.setProperty("--clr-bg-dark", colors.primaryDark);
    root.style.setProperty("--clr-bg-footer", colors.bgFooter);
    root.style.setProperty("--clr-text", "#F9FAFB");
    root.style.setProperty("--clr-text-muted", "#D1D5DB");
    root.style.setProperty("--clr-text-light", "#9CA3AF");
    root.style.setProperty("--clr-border", "rgba(255,255,255,0.12)");
    root.style.setProperty("--clr-card", colors.primaryLight);
    root.style.setProperty("--clr-card-border", "rgba(255,255,255,0.08)");
    root.style.setProperty("--clr-hero-overlay", `${colors.primaryDark}F0`);
  }
}

function applyFontToDOM(family: FontFamily, size: FontSize) {
  const fc = fontFamilies[family];
  const fs = fontSizes[size];
  const root = document.documentElement;

  root.style.setProperty("--fnt-heading", fc.heading);
  root.style.setProperty("--fnt-body", fc.body);
  root.style.setProperty("--fnt-base", fs.base);
  root.style.setProperty("--fnt-scale", fs.headingScale);
  root.style.fontSize = fs.base;

  // Dynamically load the Google Font if not already loaded
  const linkId = `gfont-${family}`;
  if (!document.getElementById(linkId)) {
    const link = document.createElement("link");
    link.id = linkId;
    link.rel = "stylesheet";
    link.href = `https://fonts.googleapis.com/css2?family=${fc.googleParam}&display=swap`;
    document.head.appendChild(link);
  }
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(
    () => (localStorage.getItem("fcc-theme") as ThemeName) || "navy"
  );
  const [mode, setModeState] = useState<ThemeMode>(
    () => (localStorage.getItem("fcc-mode") as ThemeMode) || "light"
  );
  const [fontFamily, setFontFamilyState] = useState<FontFamily>(
    () => (localStorage.getItem("fcc-font") as FontFamily) || "modern"
  );
  const [fontSize, setFontSizeState] = useState<FontSize>(
    () => (localStorage.getItem("fcc-font-size") as FontSize) || "regular"
  );

  const setTheme = (t: ThemeName) => {
    setThemeState(t);
    localStorage.setItem("fcc-theme", t);
    applyThemeToDOM(t, mode);
  };

  const setMode = (m: ThemeMode) => {
    setModeState(m);
    localStorage.setItem("fcc-mode", m);
    applyThemeToDOM(theme, m);
  };

  const setFontFamily = (f: FontFamily) => {
    setFontFamilyState(f);
    localStorage.setItem("fcc-font", f);
    applyFontToDOM(f, fontSize);
  };

  const setFontSize = (s: FontSize) => {
    setFontSizeState(s);
    localStorage.setItem("fcc-font-size", s);
    applyFontToDOM(fontFamily, s);
  };

  const toggleMode = () => setMode(mode === "light" ? "dark" : "light");

  useEffect(() => {
    applyThemeToDOM(theme, mode);
    applyFontToDOM(fontFamily, fontSize);
  }, []);

  return (
    <ThemeContext.Provider value={{
      theme, mode, fontFamily, fontSize,
      colors: themes[theme],
      setTheme, setMode, setFontFamily, setFontSize, toggleMode,
    }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
