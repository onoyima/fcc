import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import logoImg from "@assets/ChatGPT_Image_May_14,_2026,_11_06_01_PM_1778796680823.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location]);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[#0D1B38]/95 backdrop-blur-md shadow-[0_4px_32px_rgba(0,0,0,0.4)]"
            : "bg-transparent"
        }`}
      >
        <nav className="max-w-7xl mx-auto px-6 lg:px-10 flex items-center justify-between h-20">
          <Link href="/" data-testid="link-logo">
            <img src={logoImg} alt="FCC Fore-City Construction" className="h-12 w-auto object-contain" />
          </Link>

          <ul className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const active = location === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    data-testid={`nav-${link.label.toLowerCase()}`}
                    className={`relative text-sm font-semibold tracking-wide transition-colors duration-300 group ${
                      active ? "text-[#C9A84C]" : "text-white/90 hover:text-[#C9A84C]"
                    }`}
                  >
                    {link.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-0.5 bg-[#C9A84C] transition-all duration-300 ${
                        active ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <Link
            href="/contact"
            data-testid="btn-get-quote"
            className="hidden lg:inline-flex items-center px-6 py-2.5 bg-[#C9A84C] text-[#0D1B38] text-sm font-bold rounded tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,168,76,0.4)]"
          >
            Get a Quote
          </Link>

          <button
            data-testid="btn-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-white p-2"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-[#0D1B38]/98 backdrop-blur-lg flex flex-col pt-24 px-8"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Link
                    href={link.href}
                    data-testid={`mobile-nav-${link.label.toLowerCase()}`}
                    className="block text-2xl font-bold text-white/90 hover:text-[#C9A84C] py-4 border-b border-white/10 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <Link
              href="/contact"
              data-testid="mobile-btn-get-quote"
              className="mt-8 inline-flex items-center justify-center px-8 py-4 bg-[#C9A84C] text-[#0D1B38] text-base font-bold rounded tracking-wide"
            >
              Get a Quote
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
