import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type ThemeName = "navy" | "orange" | "brown" | "emerald" | "purple" | "rose" | "teal";
export type ThemeMode = "light" | "dark";

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

export const themes: Record<ThemeName, ThemeColors> = {
  navy: {
    label: "Navy Blue",
    swatch: "#0D1B38",
    primary: "#0D1B38",
    primaryLight: "#162040",
    primaryDark: "#060D1A",
    accent: "#C9A84C",
    accentHover: "#B8943D",
    accentText: "#0D1B38",
    bgAlt: "#F5F7FA",
    bgDark: "#0A1628",
    bgFooter: "#070F1F",
    gradient: "linear-gradient(135deg, #0D1B38 0%, #1a3060 50%, #0D1B38 100%)",
    gradientAccent: "linear-gradient(135deg, #C9A84C 0%, #E8C870 50%, #C9A84C 100%)",
  },
  orange: {
    label: "Burnt Orange",
    swatch: "#C2410C",
    primary: "#7C2D12",
    primaryLight: "#9A3412",
    primaryDark: "#431407",
    accent: "#F97316",
    accentHover: "#EA6A0A",
    accentText: "#ffffff",
    bgAlt: "#FFF7ED",
    bgDark: "#431407",
    bgFooter: "#270B00",
    gradient: "linear-gradient(135deg, #7C2D12 0%, #C2410C 50%, #7C2D12 100%)",
    gradientAccent: "linear-gradient(135deg, #F97316 0%, #FDBA74 50%, #F97316 100%)",
  },
  brown: {
    label: "Walnut Brown",
    swatch: "#92400E",
    primary: "#3E1F00",
    primaryLight: "#5C2E00",
    primaryDark: "#200F00",
    accent: "#D97706",
    accentHover: "#B45309",
    accentText: "#ffffff",
    bgAlt: "#FFFBEB",
    bgDark: "#292100",
    bgFooter: "#150F00",
    gradient: "linear-gradient(135deg, #3E1F00 0%, #78350F 50%, #3E1F00 100%)",
    gradientAccent: "linear-gradient(135deg, #D97706 0%, #FCD34D 50%, #D97706 100%)",
  },
  emerald: {
    label: "Emerald Green",
    swatch: "#065F46",
    primary: "#064E3B",
    primaryLight: "#065F46",
    primaryDark: "#022C22",
    accent: "#10B981",
    accentHover: "#059669",
    accentText: "#022C22",
    bgAlt: "#F0FDF4",
    bgDark: "#022C22",
    bgFooter: "#01170F",
    gradient: "linear-gradient(135deg, #064E3B 0%, #0D9488 50%, #064E3B 100%)",
    gradientAccent: "linear-gradient(135deg, #10B981 0%, #6EE7B7 50%, #10B981 100%)",
  },
  purple: {
    label: "Royal Purple",
    swatch: "#4C1D95",
    primary: "#2D1B69",
    primaryLight: "#3B2580",
    primaryDark: "#1A0F3D",
    accent: "#8B5CF6",
    accentHover: "#7C3AED",
    accentText: "#ffffff",
    bgAlt: "#F5F3FF",
    bgDark: "#1A0F3D",
    bgFooter: "#0D0820",
    gradient: "linear-gradient(135deg, #2D1B69 0%, #5B21B6 50%, #2D1B69 100%)",
    gradientAccent: "linear-gradient(135deg, #8B5CF6 0%, #C4B5FD 50%, #8B5CF6 100%)",
  },
  rose: {
    label: "Crimson Rose",
    swatch: "#9F1239",
    primary: "#7F1D1D",
    primaryLight: "#991B1B",
    primaryDark: "#450A0A",
    accent: "#F43F5E",
    accentHover: "#E11D48",
    accentText: "#ffffff",
    bgAlt: "#FFF1F2",
    bgDark: "#450A0A",
    bgFooter: "#270004",
    gradient: "linear-gradient(135deg, #7F1D1D 0%, #BE123C 50%, #7F1D1D 100%)",
    gradientAccent: "linear-gradient(135deg, #F43F5E 0%, #FDA4AF 50%, #F43F5E 100%)",
  },
  teal: {
    label: "Ocean Teal",
    swatch: "#0E7490",
    primary: "#0F4C5C",
    primaryLight: "#155E75",
    primaryDark: "#082F49",
    accent: "#06B6D4",
    accentHover: "#0891B2",
    accentText: "#082F49",
    bgAlt: "#ECFEFF",
    bgDark: "#082F49",
    bgFooter: "#041F2D",
    gradient: "linear-gradient(135deg, #0F4C5C 0%, #0E7490 50%, #0F4C5C 100%)",
    gradientAccent: "linear-gradient(135deg, #06B6D4 0%, #67E8F9 50%, #06B6D4 100%)",
  },
};

interface ThemeContextType {
  theme: ThemeName;
  mode: ThemeMode;
  colors: ThemeColors;
  setTheme: (theme: ThemeName) => void;
  setMode: (mode: ThemeMode) => void;
  toggleMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

function applyThemeToDOM(theme: ThemeName, mode: ThemeMode) {
  const colors = themes[theme];
  const root = document.documentElement;
  const isLight = mode === "light";

  root.setAttribute("data-theme", theme);
  root.setAttribute("data-mode", mode);

  // Brand colors
  root.style.setProperty("--clr-primary", colors.primary);
  root.style.setProperty("--clr-primary-light", colors.primaryLight);
  root.style.setProperty("--clr-primary-dark", colors.primaryDark);
  root.style.setProperty("--clr-accent", colors.accent);
  root.style.setProperty("--clr-accent-hover", colors.accentHover);
  root.style.setProperty("--clr-accent-text", colors.accentText);
  root.style.setProperty("--clr-gradient", colors.gradient);
  root.style.setProperty("--clr-gradient-accent", colors.gradientAccent);

  // Adaptive colors (change with mode)
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

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeName>(() => {
    return (localStorage.getItem("fcc-theme") as ThemeName) || "navy";
  });
  const [mode, setModeState] = useState<ThemeMode>(() => {
    return (localStorage.getItem("fcc-mode") as ThemeMode) || "light";
  });

  const setTheme = (newTheme: ThemeName) => {
    setThemeState(newTheme);
    localStorage.setItem("fcc-theme", newTheme);
    applyThemeToDOM(newTheme, mode);
  };

  const setMode = (newMode: ThemeMode) => {
    setModeState(newMode);
    localStorage.setItem("fcc-mode", newMode);
    applyThemeToDOM(theme, newMode);
  };

  const toggleMode = () => setMode(mode === "light" ? "dark" : "light");

  useEffect(() => {
    applyThemeToDOM(theme, mode);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, mode, colors: themes[theme], setTheme, setMode, toggleMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
