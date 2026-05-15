import { Link } from "wouter";
import { motion } from "framer-motion";
import {
  ArrowRight, Building2, HardHat, Home as HomeIcon, Wrench, Users, ChevronRight,
  Star, Quote, TrendingUp, Shield, Award, CheckCircle, MapPin, Bed, Bath, Square
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import StatCounter from "@/components/StatCounter";
import ScrollReveal from "@/components/ScrollReveal";
import PropertySearch from "@/components/PropertySearch";
import ConstructionCalculator from "@/components/ConstructionCalculator";
import HeroSlider from "@/components/HeroSlider";
import ParticleBackground from "@/components/ParticleBackground";
import { AnimatedBlobs, AnimatedGrid, FloatingShapes } from "@/components/AnimatedBackground";
import brandImg from "@assets/ChatGPT_Image_May_14,_2026,_11_05_45_PM_1778796680819.png";
import logoVariant from "@assets/ChatGPT_Image_May_14,_2026,_11_06_22_PM_1778796680824.png";
import { useLang } from "@/contexts/LanguageContext";

const testimonials = [
  { name: "Engr. Adewale Okafor", role: "CEO, Lagos Estates Ltd", text: "FCC delivered our 48-unit apartment complex 2 months ahead of schedule. Exceptional quality and professionalism.", rating: 5 },
  { name: "Mrs. Chiamaka Obi", role: "Property Investor", text: "I've bought 3 properties through FCC. The process is seamless, transparent, and the after-sales service is outstanding.", rating: 5 },
  { name: "Arc. Bello Muhammed", role: "Abuja Ministry of Works", text: "FCC's infrastructure projects consistently meet international standards. Our go-to contractor for critical projects.", rating: 5 },
];

const clients = ["NNPC", "Access Bank", "Dangote Group", "Julius Berger", "Emaar", "LASG", "FG Works", "Shell Nigeria"];

const featuredProperties = [
  { id: 1, title: "Lekki Pearl Estate — 4 Bed Duplex", type: "For Sale", location: "Lekki, Lagos", price: "₦85,000,000", beds: 4, baths: 4, sqm: 320, tag: "New Listing" },
  { id: 6, title: "Gwarimpa — 5 Bed Smart Villa", type: "For Sale", location: "Gwarimpa, Abuja", price: "₦120,000,000", beds: 5, baths: 6, sqm: 500, tag: "Smart Home" },
  { id: 9, title: "Banana Island — Penthouse", type: "For Sale", location: "Banana Island, Lagos", price: "₦950,000,000", beds: 6, baths: 7, sqm: 750, tag: "Ultra Luxury" },
  { id: 2, title: "Maitama Executive Apartment", type: "For Rent", location: "Maitama, Abuja", price: "₦8,500,000/yr", beds: 3, baths: 3, sqm: 180, tag: "Premium" },
];

export default function Home() {
  const { t } = useLang();

  const services = [
    { icon: <Building2 size={28} />, title: "Construction & Engineering", desc: "Residential, commercial, and infrastructure projects built to the highest international standards.", href: "/services" },
    { icon: <HomeIcon size={28} />, title: "Real Estate & Properties", desc: "Premium property development and sales across Nigeria's fastest-growing urban centres.", href: "/properties" },
    { icon: <Wrench size={28} />, title: "Facility Management", desc: "End-to-end facility operations, maintenance, and asset management for commercial clients.", href: "/services" },
    { icon: <HardHat size={28} />, title: "Interior & Finishing", desc: "Bespoke interior design, joinery, and luxury finishing for residential and commercial spaces.", href: "/services" },
    { icon: <Users size={28} />, title: "Workforce Solutions", desc: "Certified engineers, skilled artisans, and heavy equipment deployed to your project.", href: "/careers" },
    { icon: <TrendingUp size={28} />, title: "Property Investment", desc: "ROI-driven real estate investment opportunities with full legal backing and management support.", href: "/properties" },
  ];

  const stats = [
    { value: 500, label: t.home.statProjects, suffix: "+", icon: <Building2 size={22} /> },
    { value: 1000, label: t.home.statWorkforce, suffix: "+", icon: <HardHat size={22} /> },
    { value: 2000, label: t.home.statClients, suffix: "+", icon: <Users size={22} /> },
    { value: 5000, label: t.home.statProperties, suffix: "+", icon: <HomeIcon size={22} /> },
  ];

  const whyUs = [
    { icon: <Shield size={20} />, title: "15+ Years Legacy", desc: "Built on trust, delivered with excellence across Nigeria." },
    { icon: <Award size={20} />, title: "COREN & ISO Certified", desc: "Internationally accredited engineers and quality management systems." },
    { icon: <CheckCircle size={20} />, title: "Zero Defect Policy", desc: "Rigorous QA at every construction stage — no shortcuts." },
    { icon: <TrendingUp size={20} />, title: "On-Time Delivery", desc: "Industry-leading project management with 94% on-time delivery rate." },
  ];

  return (
    <div style={{ background: "var(--clr-bg)" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <HeroSlider />
        <FloatingShapes />
        <ParticleBackground particleCount={40} />

        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-48 rounded-r-full z-10"
          style={{ background: "var(--clr-accent)" }} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10 pt-32 pb-20 w-full z-10">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center gap-3 mb-8">
              <div className="h-px w-12" style={{ background: "var(--clr-accent)" }} />
              <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>{t.home.heroBadge}</span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.4 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-none mb-6">
              {t.home.heroH1a}<br />
              <span style={{ color: "var(--clr-accent)" }}>{t.home.heroH1b}</span><br />
              {t.home.heroH1c}
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.55 }}
              className="text-lg leading-relaxed mb-10 max-w-xl" style={{ color: "rgba(255,255,255,0.75)" }}>
              {t.home.heroSubtitle}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.65 }}
              className="flex flex-wrap gap-4">
              <Link href="/projects" data-testid="btn-hero-projects"
                className="inline-flex items-center gap-2 px-8 py-4 font-black rounded text-sm tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                {t.common.viewProjects} <ArrowRight size={16} />
              </Link>
              <Link href="/contact" data-testid="btn-hero-contact"
                className="inline-flex items-center gap-2 px-8 py-4 font-black rounded text-sm tracking-wide border transition-all duration-300 hover:-translate-y-1 text-white"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}>
                {t.common.getQuote} <ChevronRight size={16} />
              </Link>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-16 max-w-4xl">
            <p className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: "rgba(255,255,255,0.5)" }}>{t.home.heroFindProperty}</p>
            <PropertySearch />
          </motion.div>
        </div>

        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40 z-10">
          <div className="w-px h-12 bg-white" />
          <span className="text-xs text-white uppercase tracking-widest">Scroll</span>
        </motion.div>
      </section>

      {/* ── STATS BAND ─────────────────────────── */}
      <section className="relative py-20 overflow-hidden" style={{ background: "var(--clr-primary)" }}>
        <AnimatedBlobs intensity={0.05} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10">
            {stats.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 0.1}>
                <StatCounter value={s.value} label={s.label} suffix={s.suffix} icon={s.icon} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ───────────────────────────── */}
      <section className="py-24 relative" style={{ background: "var(--clr-bg-alt)" }}>
        <ParticleBackground particleCount={25} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
              <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>{t.home.servicesBadge}</span>
            </div>
            <h2 className="text-4xl font-black mb-4" style={{ color: "var(--clr-primary)" }}>
              {t.home.servicesTitle1}<br />
              <span style={{ color: "var(--clr-accent)" }}>{t.home.servicesTitle2}</span>
            </h2>
            <p className="text-base max-w-xl mb-16" style={{ color: "var(--clr-text-muted)" }}>
              {t.home.servicesSubtitle}
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((svc, i) => (
              <ScrollReveal key={svc.title} delay={i * 0.1}>
                <Link href={svc.href} data-testid={`service-card-${i}`}
                  className="group block p-8 rounded-sm border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl relative overflow-hidden"
                  style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
                  <div className="w-14 h-14 rounded-sm flex items-center justify-center mb-6 transition-all duration-300 group-hover:scale-110"
                    style={{ background: "var(--clr-bg-alt)", color: "var(--clr-accent)" }}>
                    {svc.icon}
                  </div>
                  <h3 className="font-black text-lg mb-3" style={{ color: "var(--clr-primary)" }}>{svc.title}</h3>
                  <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--clr-text-muted)" }}>{svc.desc}</p>
                  <span className="text-xs font-black tracking-wide uppercase flex items-center gap-1 group-hover:gap-2 transition-all"
                    style={{ color: "var(--clr-accent)" }}>
                    {t.common.learnMore} <ArrowRight size={12} />
                  </span>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 group-hover:w-full transition-all duration-500"
                    style={{ background: "var(--clr-accent)" }} />
                </Link>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="mt-12 text-center">
              <Link href="/services" data-testid="btn-all-services"
                className="inline-flex items-center gap-2 px-8 py-4 font-black rounded text-sm tracking-wide border transition-all duration-300 hover:-translate-y-1"
                style={{ borderColor: "var(--clr-primary)", color: "var(--clr-primary)" }}>
                {t.common.viewAll} <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── FEATURED PROPERTIES ────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--clr-bg)" }}>
        <ParticleBackground particleCount={20} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-16">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
                  <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>Featured Properties</span>
                </div>
                <h2 className="text-4xl font-black" style={{ color: "var(--clr-primary)" }}>
                  Premium <span style={{ color: "var(--clr-accent)" }}>Listings</span>
                </h2>
              </div>
              <Link href="/properties" className="hidden sm:flex items-center gap-2 text-sm font-black transition-colors"
                style={{ color: "var(--clr-accent)" }}>View All <ArrowRight size={14} /></Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {featuredProperties.map((p, i) => (
              <ScrollReveal key={p.id} delay={i * 0.1}>
                <Link href="/properties" className="group block rounded-sm border overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl h-full"
                  style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
                  <div className="relative h-48 overflow-hidden" style={{
                    backgroundImage: `url(${brandImg})`, backgroundSize: "cover", backgroundPosition: "center",
                  }}>
                    <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-60"
                      style={{ background: "color-mix(in srgb, var(--clr-primary) 60%, transparent)" }} />
                    {p.tag && (
                      <div className="absolute top-3 left-3 px-2 py-1 text-[10px] font-black rounded uppercase"
                        style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                        {p.tag}
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 text-xl font-black text-white">{p.price}</div>
                  </div>
                  <div className="p-4">
                    <div className="px-2 py-0.5 text-[10px] font-black rounded inline-block mb-2"
                      style={{ background: "var(--clr-bg-alt)", color: "var(--clr-accent)" }}>
                      {p.type}
                    </div>
                    <h3 className="font-black text-sm mb-2 leading-tight" style={{ color: "var(--clr-primary)" }}>{p.title}</h3>
                    <p className="flex items-center gap-1 text-xs mb-3" style={{ color: "var(--clr-text-muted)" }}>
                      <MapPin size={10} /> {p.location}
                    </p>
                    <div className="flex gap-3 text-xs" style={{ color: "var(--clr-text-muted)" }}>
                      <span className="flex items-center gap-1"><Bed size={11} /> {p.beds}</span>
                      <span className="flex items-center gap-1"><Bath size={11} /> {p.baths}</span>
                      <span className="flex items-center gap-1"><Square size={11} /> {p.sqm} sqm</span>
                    </div>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY FCC ────────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--clr-primary)" }}>
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url(${logoVariant})`,
          backgroundSize: "cover", backgroundPosition: "center",
        }} />
        <AnimatedBlobs intensity={0.06} />
        <ParticleBackground particleCount={30} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
                  <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>{t.home.whyBadge}</span>
                </div>
                <h2 className="text-4xl font-black text-white mb-6">
                  {t.home.whyTitle1}<br />
                  <span style={{ color: "var(--clr-accent)" }}>{t.home.whyTitle2}</span>
                </h2>
                <p className="text-base leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.6)" }}>
                  {t.home.whyBody}
                </p>
              </ScrollReveal>
              <div className="grid grid-cols-2 gap-4">
                {whyUs.map((w, i) => (
                  <ScrollReveal key={w.title} delay={i * 0.1}>
                    <div className="p-5 rounded-sm border"
                      style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.08)" }}>
                      <div className="mb-3" style={{ color: "var(--clr-accent)" }}>{w.icon}</div>
                      <h4 className="font-black text-white text-sm mb-1">{w.title}</h4>
                      <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{w.desc}</p>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
            <ScrollReveal delay={0.2}><ConstructionCalculator /></ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── FEATURED PROJECTS ──────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--clr-bg)" }}>
        <ParticleBackground particleCount={20} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <ScrollReveal>
            <div className="flex items-center justify-between mb-16">
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
                  <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>{t.home.portfolioBadge}</span>
                </div>
                <h2 className="text-4xl font-black" style={{ color: "var(--clr-primary)" }}>{t.home.portfolioTitle}</h2>
              </div>
              <Link href="/projects" className="hidden sm:flex items-center gap-2 text-sm font-black transition-colors"
                style={{ color: "var(--clr-accent)" }}>{t.home.featuredProjects} <ArrowRight size={14} /></Link>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Lekki Phase II Towers", cat: "Commercial", sqm: "12,400 sqm", status: "Completed", year: "2024",
                imgs: [
                  "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
                  "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
                  "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80",
                ] },
              { title: "Abuja Waterfront Estate", cat: "Residential", sqm: "80 Units", status: "Ongoing", year: "2025",
                imgs: [
                  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
                  "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
                  "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
                ] },
              { title: "Port Harcourt Ring Road", cat: "Infrastructure", sqm: "14.5 km", status: "Completed", year: "2023",
                imgs: [
                  "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
                  "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
                  "https://images.unsplash.com/photo-1577495508048-b635b8374b9b?w=800&q=80",
                ] },
            ].map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.1}>
                <div className="group rounded-sm overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
                  <div className="relative overflow-hidden h-52">
                    <img
                      src={p.imgs[0]}
                      alt={p.title}
                      className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0" style={{ background: "color-mix(in srgb, var(--clr-primary) 50%, transparent)" }} />
                    <div className="absolute top-4 left-4 px-2 py-1 text-xs font-black rounded uppercase"
                      style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>{p.cat}</div>
                    <div className="absolute bottom-4 right-4 px-2 py-1 text-xs font-bold rounded border text-white"
                      style={{ borderColor: "rgba(255,255,255,0.3)", background: "rgba(0,0,0,0.4)" }}>{p.status}</div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-black text-lg mb-2" style={{ color: "var(--clr-primary)" }}>{p.title}</h3>
                    <div className="flex gap-4 text-xs mb-4" style={{ color: "var(--clr-text-muted)" }}>
                      <span>{p.sqm}</span><span>•</span><span>{p.year}</span>
                    </div>
                    <Link href="/projects" className="flex items-center gap-1 text-xs font-black group-hover:gap-2 transition-all"
                      style={{ color: "var(--clr-accent)" }}>{t.common.viewAll} <ArrowRight size={12} /></Link>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ───────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--clr-bg-alt)" }}>
        <ParticleBackground particleCount={20} />
        <div className="max-w-7xl mx-auto px-6 lg:px-10 relative">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
                <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>{t.home.testimonialsBadge}</span>
                <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
              </div>
              <h2 className="text-4xl font-black" style={{ color: "var(--clr-primary)" }}>{t.home.testimonialsTitle}</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((tm, i) => (
              <ScrollReveal key={tm.name} delay={i * 0.1}>
                <div className="p-8 rounded-sm border relative transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
                  <div className="absolute top-0 left-0 w-1 h-full rounded-l-sm" style={{ background: "var(--clr-accent)" }} />
                  <Quote size={28} className="mb-4 opacity-30" style={{ color: "var(--clr-accent)" }} />
                  <div className="flex gap-1 mb-4">{[...Array(tm.rating)].map((_, j) => (
                    <Star key={j} size={13} fill="currentColor" style={{ color: "var(--clr-accent)" }} />
                  ))}</div>
                  <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--clr-text-muted)" }}>"{tm.text}"</p>
                  <div className="font-black text-sm" style={{ color: "var(--clr-primary)" }}>{tm.name}</div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--clr-text-muted)" }}>{tm.role}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLIENTS TICKER ─────────────────────── */}
      <section className="py-12 border-y overflow-hidden" style={{ background: "var(--clr-bg)", borderColor: "var(--clr-border)" }}>
        <div className="text-center mb-8">
          <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-text-muted)" }}>{t.home.trustedBy}</span>
        </div>
        <div className="flex overflow-hidden">
          <div className="flex gap-16 whitespace-nowrap animate-fcc-marquee">
            {[...clients, ...clients].map((c, i) => (
              <span key={i} className="text-xl font-black opacity-20 flex-shrink-0" style={{ color: "var(--clr-primary)" }}>{c}</span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--clr-gradient)" }} />
        <AnimatedBlobs intensity={0.08} />
        <ParticleBackground particleCount={30} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
              {t.home.ctaTitle1}<br />
              <span style={{ color: "var(--clr-accent)" }}>{t.home.ctaTitle2}</span>
            </h2>
            <p className="text-lg mb-10" style={{ color: "rgba(255,255,255,0.65)" }}>
              {t.home.ctaSubtitle}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link href="/contact" data-testid="btn-cta-quote"
                className="inline-flex items-center gap-2 px-10 py-4 font-black rounded text-sm tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
                style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                {t.common.startProject} <ArrowRight size={16} />
              </Link>
              <Link href="/about" data-testid="btn-cta-about"
                className="inline-flex items-center gap-2 px-10 py-4 font-black rounded text-sm tracking-wide border transition-all duration-300 hover:-translate-y-1 text-white"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}>
                {t.home.ctaAbout}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
