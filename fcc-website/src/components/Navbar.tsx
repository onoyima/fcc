import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shield } from "lucide-react";
import yeloowLogo from "@assets/yeloow_logo.png";
import blueYellowLogo from "@assets/blue_yellow.png";
import blueYelllowWhiteLogo from "@assets/blue_yelllow_white.png";
import ThemeToggle from "@/components/ThemeToggle";
import { useLang } from "@/contexts/LanguageContext";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useTheme } from "@/contexts/ThemeContext";

const logoMap: Record<string, string> = {
  navy: blueYellowLogo,
  orange: yeloowLogo,
  brown: yeloowLogo,
  emerald: yeloowLogo,
  purple: blueYelllowWhiteLogo,
  rose: yeloowLogo,
  teal: blueYelllowWhiteLogo,
};

export default function Navbar() {
  const { t } = useLang();
  const { isAuthenticated } = useAdminAuth();
  const { theme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();
  const logoSrc = logoMap[theme] || blueYellowLogo;

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/services", label: t.nav.services },
    { href: "/projects", label: t.nav.projects },
    { href: "/properties", label: t.nav.properties },
    { href: "/gallery", label: "Gallery" },
    { href: "/team", label: t.nav.team },
    { href: "/careers", label: t.nav.careers },
    { href: "/contact", label: t.nav.contact },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => { setMenuOpen(false); }, [location]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled
            ? `color-mix(in srgb, var(--clr-primary) 97%, transparent)`
            : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          boxShadow: scrolled ? "0 4px 32px rgba(0,0,0,0.4)" : "none",
        }}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          <Link href="/" data-testid="link-logo" className="flex items-center gap-3">
            <img src={logoSrc} alt="FCC Fore-City Construction" className="h-11 w-auto object-contain" />
            <span className="text-lg font-black tracking-tight text-white max-sm:hidden">
              Fore-City<span className="text-[var(--clr-accent)]"> Construction</span>
            </span>
          </Link>

          <ul className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => {
              const active = location === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-testid={`nav-${link.href.replace("/", "") || "home"}`}
                    className="relative text-xs font-bold tracking-wide transition-colors duration-300 group uppercase"
                    style={{ color: active ? "var(--clr-accent)" : "rgba(255,255,255,0.85)" }}
                  >
                    {link.label}
                    <span
                      className="absolute -bottom-1 left-0 h-0.5 transition-all duration-300"
                      style={{
                        background: "var(--clr-accent)",
                        width: active ? "100%" : "0%",
                      }}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="hidden lg:flex items-center gap-3">
            {isAuthenticated && (
              <Link
                href="/admin"
                className="flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all"
                style={{ background: "rgba(255,255,255,0.08)", color: "var(--clr-accent)" }}
              >
                <Shield size={12} />
                Admin
              </Link>
            )}
            <ThemeToggle />
            <Link
              href="/contact"
              data-testid="btn-get-quote"
              className="inline-flex items-center px-5 py-2.5 text-xs font-black rounded tracking-wider uppercase transition-all duration-300 hover:-translate-y-0.5"
              style={{
                background: "var(--clr-accent)",
                color: "var(--clr-accent-text)",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
              }}
            >
              {t.nav.getQuote}
            </Link>
          </div>

          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              data-testid="btn-menu-toggle"
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-white p-2"
              aria-label="Toggle menu"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed inset-0 z-40 flex flex-col pt-24 px-8 overflow-y-auto"
            style={{ background: "var(--clr-primary)" }}
          >
            <ul className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <Link
                    href={link.href}
                    data-testid={`mobile-nav-${link.href.replace("/", "") || "home"}`}
                    className="block text-2xl font-black py-4 border-b transition-colors duration-200"
                    style={{
                      borderColor: "rgba(255,255,255,0.1)",
                      color: location === link.href ? "var(--clr-accent)" : "rgba(255,255,255,0.9)",
                    }}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Link
              href="/contact"
              data-testid="mobile-btn-get-quote"
              className="mt-8 inline-flex items-center justify-center px-8 py-4 text-base font-black rounded tracking-wide"
              style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}
            >
              {t.nav.getQuote}
            </Link>
            <div className="mt-8 text-xs tracking-widest uppercase" style={{ color: "rgba(201,168,76,0.4)" }}>
              {t.common.buildingCities}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
