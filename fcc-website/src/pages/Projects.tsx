import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "wouter";
import { ArrowRight, MapPin, Calendar, Building2 } from "lucide-react";
import { AnimatedBlobs, FloatingShapes } from "@/components/AnimatedBackground";
import brandImg from "@assets/ChatGPT_Image_May_14,_2026,_11_05_45_PM_1778796680819.png";
import { useLang } from "@/contexts/LanguageContext";

const categories = ["All", "Residential", "Commercial", "Infrastructure", "Industrial", "Mixed Use"];

const projects = [
  { title: "Marina Heights Tower", category: "Commercial", status: "Completed", location: "Lagos, Nigeria", year: "2024", area: "12,000 sqm", budget: "₦4.2B", desc: "A landmark 18-storey commercial tower featuring Class-A office spaces, retail podium, and rooftop amenities in Victoria Island." },
  { title: "Abuja Waterfront Estate", category: "Residential", status: "Ongoing", location: "Abuja, Nigeria", year: "2025", area: "80 units", budget: "₦2.8B", desc: "A premium gated community of 80 luxury townhouses and apartments overlooking Jabi Lake, with world-class amenities." },
  { title: "Port Harcourt Ring Road Phase 2", category: "Infrastructure", status: "Completed", location: "Port Harcourt, Nigeria", year: "2023", area: "14.5 km", budget: "₦6.5B", desc: "A critical urban arterial road connecting major industrial zones to the port, including 4 bridges and drainage infrastructure." },
  { title: "Kano Industrial Park", category: "Industrial", status: "Completed", location: "Kano, Nigeria", year: "2023", area: "22,000 sqm", budget: "₦3.1B", desc: "A 22-hectare integrated industrial estate housing 40+ manufacturing units with shared utilities and logistics infrastructure." },
  { title: "Lekki Smart City Phase 1", category: "Mixed Use", status: "Ongoing", location: "Lagos, Nigeria", year: "2025", area: "150,000 sqm", budget: "₦18B", desc: "A groundbreaking smart city development integrating residential, commercial, hospitality, and tech campus zones with solar power." },
  { title: "Enugu Government Secretariat", category: "Commercial", status: "Completed", location: "Enugu, Nigeria", year: "2022", area: "8,400 sqm", budget: "₦1.9B", desc: "A modern government administrative complex with 6 connected blocks, auditorium, and green space, designed for energy efficiency." },
  { title: "Ibadan University Teaching Hospital", category: "Commercial", status: "Completed", location: "Ibadan, Nigeria", year: "2022", area: "15,000 sqm", budget: "₦5.6B", desc: "Expansion of UCH's surgical and emergency wing including two new theatres, 240 additional beds, and diagnostic centre." },
  { title: "Lagos Island Luxury Terrace", category: "Residential", status: "Completed", location: "Lagos, Nigeria", year: "2023", area: "32 units", budget: "₦1.4B", desc: "Exclusive terrace homes in Ikoyi featuring bespoke interior finishes, private pools, and smart home automation systems." },
  { title: "Bonny Island Jetty & Marine Works", category: "Infrastructure", status: "Completed", location: "Rivers State, Nigeria", year: "2021", area: "2.3 km waterfront", budget: "₦4.8B", desc: "Marine infrastructure including jetty construction, breakwater, boat terminals, and shore protection systems." },
];

export default function Projects() {
  const { t } = useLang();
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered = activeFilter === "All" ? projects : projects.filter((p) => p.category === activeFilter);

  const statsDisplay = [
    { val: "500+", label: t.projects.statContract },
    { val: "₦200B+", label: t.projects.statValue },
    { val: "10+", label: t.projects.statStates },
    { val: "94%", label: t.projects.statDelivery },
  ];

  return (
    <div style={{ background: "var(--clr-bg)" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden" style={{ background: "var(--clr-primary)" }}>
        <div className="absolute inset-0 opacity-8" style={{
          backgroundImage: `url(${brandImg})`, backgroundSize: "cover", backgroundPosition: "center",
        }} />
        <div className="absolute inset-0" style={{ background: "color-mix(in srgb, var(--clr-primary) 90%, transparent)" }} />
        <AnimatedBlobs intensity={0.05} />
        <FloatingShapes />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
            <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>{t.projects.heroBadge}</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 max-w-3xl">
            {t.projects.heroTitle1}<br />
            <span style={{ color: "var(--clr-accent)" }}>{t.projects.heroTitle2}</span>
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            {t.projects.heroSubtitle}
          </p>
          <div className="flex flex-wrap gap-12 mt-12">
            {statsDisplay.map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black" style={{ color: "var(--clr-accent)" }}>{s.val}</div>
                <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FILTER & GRID ─────────────────────── */}
      <section className="py-16" style={{ background: "var(--clr-bg)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                data-testid={`filter-${cat.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActiveFilter(cat)}
                className="px-5 py-2.5 text-xs font-black rounded-sm tracking-wide uppercase transition-all duration-200 border"
                style={activeFilter === cat ? {
                  background: "var(--clr-primary)", color: "#fff", borderColor: "var(--clr-primary)"
                } : {
                  background: "transparent", color: "var(--clr-text-muted)", borderColor: "var(--clr-border)"
                }}
              >
                {cat === "All" ? t.projects.filterAll : cat}
              </button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((p) => (
                <motion.div
                  key={p.title}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="group rounded-sm border overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full"
                    style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
                    <div className="relative h-52 overflow-hidden" style={{
                      backgroundImage: `url(${brandImg})`, backgroundSize: "cover", backgroundPosition: "center",
                    }}>
                      <div className="absolute inset-0 group-hover:opacity-70 transition-opacity duration-300"
                        style={{ background: "color-mix(in srgb, var(--clr-primary) 70%, transparent)" }} />
                      <div className="absolute top-4 left-4 px-2 py-1 text-xs font-black rounded uppercase"
                        style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                        {p.category}
                      </div>
                      <div className="absolute top-4 right-4 px-2 py-1 text-xs font-bold rounded border text-white"
                        style={{
                          background: p.status === "Completed" ? "rgba(16,185,129,0.3)" : "rgba(245,158,11,0.3)",
                          borderColor: p.status === "Completed" ? "rgba(16,185,129,0.5)" : "rgba(245,158,11,0.5)",
                        }}>
                        {p.status}
                      </div>
                      <div className="absolute bottom-4 right-4 text-xl font-black text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{ color: "var(--clr-accent)" }}>
                        {p.budget}
                      </div>
                    </div>

                    <div className="p-6 flex flex-col h-[calc(100%-208px)]">
                      <h3 className="font-black text-lg mb-2" style={{ color: "var(--clr-primary)" }}>{p.title}</h3>
                      <div className="flex flex-wrap gap-4 mb-3 text-xs" style={{ color: "var(--clr-text-muted)" }}>
                        <span className="flex items-center gap-1"><MapPin size={11} /> {p.location}</span>
                        <span className="flex items-center gap-1"><Calendar size={11} /> {p.year}</span>
                        <span className="flex items-center gap-1"><Building2 size={11} /> {p.area}</span>
                      </div>
                      <p className="text-sm leading-relaxed mb-4 flex-1" style={{ color: "var(--clr-text-muted)" }}>{p.desc}</p>
                      <Link href="/contact" className="inline-flex items-center gap-1 text-xs font-black group-hover:gap-2 transition-all"
                        style={{ color: "var(--clr-accent)" }}>
                        {t.projects.enquire} <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-16" style={{ color: "var(--clr-text-muted)" }}>No projects found in this category.</div>
          )}
        </div>
      </section>

      {/* ── CTA ───────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--clr-gradient)" }} />
        <AnimatedBlobs intensity={0.07} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-black text-white mb-4">
              {t.projects.ctaTitle1}<br /><span style={{ color: "var(--clr-accent)" }}>{t.projects.ctaTitle2}</span>
            </h2>
            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
              {t.projects.ctaSubtitle}
            </p>
            <Link href="/contact" data-testid="btn-projects-cta"
              className="inline-flex items-center gap-2 px-10 py-4 font-black rounded text-sm tracking-wide transition-all duration-300 hover:-translate-y-1"
              style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
              {t.projects.startProject} <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
