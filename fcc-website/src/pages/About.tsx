import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, Award, Users, HardHat, Shield, Zap, Target, Heart } from "lucide-react";
import { AnimatedBlobs, FloatingShapes, AnimatedGrid } from "@/components/AnimatedBackground";
import logoImg from "@assets/ChatGPT_Image_May_14,_2026,_11_06_22_PM_1778796680824.png";
import brandImg from "@assets/ChatGPT_Image_May_14,_2026,_11_05_45_PM_1778796680819.png";
import { useLang } from "@/contexts/LanguageContext";

const values = [
  { icon: <Shield size={22} />, title: "Integrity", desc: "Transparent operations and ethical business practices in every engagement." },
  { icon: <Target size={22} />, title: "Safety", desc: "Industry-leading safety standards protecting workforce, clients, and communities." },
  { icon: <Award size={22} />, title: "Excellence", desc: "World-class quality enforced from materials procurement to final delivery." },
  { icon: <Zap size={22} />, title: "Innovation", desc: "Smart technology integration at every stage of construction and management." },
  { icon: <Heart size={22} />, title: "Customer Focus", desc: "Dedicated support, real-time tracking, and a client-first approach." },
  { icon: <CheckCircle size={22} />, title: "Accountability", desc: "We own every timeline, commitment, and outcome — no exceptions." },
];

const leadership = [
  { name: "Afolabi Adeyemi", role: "Group Managing Director", initials: "AA" },
  { name: "Engr. Chukwuemeka Obi", role: "Director of Engineering", initials: "CO" },
  { name: "Mrs. Ngozi Adeleke", role: "Director of Real Estate", initials: "NA" },
  { name: "Arc. Ibrahim Musa", role: "Chief Architect", initials: "IM" },
  { name: "Barr. Tunde Fashola", role: "Legal & Compliance Director", initials: "TF" },
  { name: "Mrs. Amara Eze", role: "Head of Operations", initials: "AE" },
];

const certifications = [
  { code: "COREN", name: "Council for the Regulation of Engineering in Nigeria", year: "2008" },
  { code: "CORBON", name: "Council of Registered Builders of Nigeria", year: "2009" },
  { code: "ISO 9001", name: "Quality Management System Certification", year: "2015" },
  { code: "NIQS", name: "Nigerian Institute of Quantity Surveyors", year: "2010" },
  { code: "ARCON", name: "Architects Registration Council of Nigeria", year: "2011" },
  { code: "NESREA", name: "National Environmental Standards & Regulations", year: "2016" },
];

const timeline = [
  { year: "2009", event: "FCC founded in Lagos — first residential project delivered in Surulere." },
  { year: "2012", event: "Expanded to Abuja and Port Harcourt. Workforce reached 200+ professionals." },
  { year: "2015", event: "ISO 9001 certification achieved. Launched Real Estate division." },
  { year: "2018", event: "Completed first government infrastructure contract — Lekki access road." },
  { year: "2021", event: "Property Marketplace launched. 5,000+ properties sold to date." },
  { year: "2024", event: "1,000+ workforce. 500+ completed projects. Expanding to East & West Africa." },
];

const workforce = [
  { count: "200+", label: "Civil & Structural Engineers" },
  { count: "150+", label: "Licensed Architects" },
  { count: "500+", label: "Certified Artisans" },
  { count: "80+", label: "Project Managers" },
  { count: "120+", label: "Real Estate Agents" },
  { count: "50+", label: "Safety Officers" },
];

export default function About() {
  const { t } = useLang();

  return (
    <div style={{ background: "var(--clr-bg)" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative pt-32 pb-24 overflow-hidden" style={{ background: "var(--clr-primary)" }}>
        <div className="absolute inset-0 opacity-8" style={{
          backgroundImage: `url(${brandImg})`, backgroundSize: "cover", backgroundPosition: "center",
        }} />
        <div className="absolute inset-0" style={{ background: "color-mix(in srgb, var(--clr-primary) 92%, transparent)" }} />
        <AnimatedBlobs intensity={0.05} />
        <FloatingShapes />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
            <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>{t.about.heroBadge}</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 max-w-3xl">
            {t.about.heroTitle1}<br />
            <span style={{ color: "var(--clr-accent)" }}>{t.about.heroTitle2}</span>
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            {t.about.heroSubtitle}
          </p>
        </div>
      </section>

      {/* ── MISSION & VISION ──────────────────── */}
      <section className="py-24" style={{ background: "var(--clr-bg-alt)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {[
              { label: t.about.missionLabel, icon: <Target size={24} />, text: "To deliver world-class construction and real estate solutions that transform communities, empower clients, and build sustainable urban environments across Africa." },
              { label: t.about.visionLabel, icon: <Zap size={24} />, text: "To be Africa's most trusted, innovative, and impactful integrated property and construction company — building cities that last for generations." },
            ].map((item, i) => (
              <ScrollReveal key={item.label} delay={i * 0.15}>
                <div className="p-10 rounded-sm border h-full relative overflow-hidden transition-all duration-300 hover:shadow-xl"
                  style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
                  <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-6"
                    style={{ background: "var(--clr-primary)", color: "var(--clr-accent)" }}>
                    {item.icon}
                  </div>
                  <h3 className="text-2xl font-black mb-4" style={{ color: "var(--clr-primary)" }}>{item.label}</h3>
                  <p className="text-base leading-relaxed" style={{ color: "var(--clr-text-muted)" }}>{item.text}</p>
                  <div className="absolute bottom-0 left-0 h-1 w-full" style={{ background: "var(--clr-gradient-accent)" }} />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CORE VALUES ───────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--clr-bg)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
              <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>{t.about.valuesBadge}</span>
            </div>
            <h2 className="text-4xl font-black mb-16" style={{ color: "var(--clr-primary)" }}>
              {t.about.valuesTitle1}<br /><span style={{ color: "var(--clr-accent)" }}>{t.about.valuesTitle2}</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="p-8 rounded-sm border group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
                  <div className="w-12 h-12 rounded-sm flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
                    style={{ background: "var(--clr-bg-alt)", color: "var(--clr-accent)" }}>
                    {v.icon}
                  </div>
                  <h4 className="font-black text-lg mb-2" style={{ color: "var(--clr-primary)" }}>{v.title}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--clr-text-muted)" }}>{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CERTIFICATIONS ────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--clr-primary)" }}>
        <AnimatedBlobs intensity={0.05} />
        <AnimatedGrid opacity={0.03} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
              <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>{t.about.certBadge}</span>
            </div>
            <h2 className="text-4xl font-black text-white mb-4">
              {t.about.certTitle1}<br /><span style={{ color: "var(--clr-accent)" }}>{t.about.certTitle2}</span>
            </h2>
            <p className="text-base mb-16 max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>
              {t.about.certSubtitle}
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {certifications.map((c, i) => (
              <ScrollReveal key={c.code} delay={i * 0.08}>
                <div className="p-6 rounded-sm border flex items-start gap-4 transition-all duration-300 hover:border-opacity-50"
                  style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}>
                  <div className="w-14 h-14 rounded-sm flex-shrink-0 flex items-center justify-center text-xs font-black text-center leading-tight"
                    style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                    {c.code}
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm mb-1">{c.name}</div>
                    <div className="text-xs" style={{ color: "rgba(255,255,255,0.4)" }}>Since {c.year}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── WORKFORCE SHOWCASE ────────────────── */}
      <section className="py-24" style={{ background: "var(--clr-bg-alt)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
              <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>{t.about.workforceBadge}</span>
            </div>
            <h2 className="text-4xl font-black mb-16" style={{ color: "var(--clr-primary)" }}>
              {t.about.workforceTitle1}<br /><span style={{ color: "var(--clr-accent)" }}>{t.about.workforceTitle2}</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {workforce.map((w, i) => (
              <ScrollReveal key={w.label} delay={i * 0.08}>
                <div className="text-center p-6 rounded-sm border transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
                  <div className="text-3xl font-black mb-1" style={{ color: "var(--clr-accent)" }}>{w.count}</div>
                  <div className="text-xs leading-tight" style={{ color: "var(--clr-text-muted)" }}>{w.label}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TIMELINE ──────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--clr-bg)" }}>
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
              <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>{t.about.timelineBadge}</span>
            </div>
            <h2 className="text-4xl font-black mb-16" style={{ color: "var(--clr-primary)" }}>
              {t.about.timelineTitle1}<br /><span style={{ color: "var(--clr-accent)" }}>{t.about.timelineTitle2}</span>
            </h2>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-[72px] top-0 bottom-0 w-px" style={{ background: "var(--clr-border)" }} />
            <div className="space-y-10">
              {timeline.map((tl, i) => (
                <ScrollReveal key={tl.year} delay={i * 0.1}>
                  <div className="flex items-start gap-8">
                    <div className="flex-shrink-0 w-[72px] text-right">
                      <span className="text-sm font-black" style={{ color: "var(--clr-accent)" }}>{tl.year}</span>
                    </div>
                    <div className="relative flex-shrink-0 w-3 h-3 rounded-full mt-1 border-2"
                      style={{ background: "var(--clr-accent)", borderColor: "var(--clr-accent)" }} />
                    <p className="text-sm leading-relaxed pt-0.5" style={{ color: "var(--clr-text-muted)" }}>{tl.event}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── LEADERSHIP ────────────────────────── */}
      <section className="py-24" style={{ background: "var(--clr-bg-alt)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
              <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>{t.about.leadershipBadge}</span>
            </div>
            <h2 className="text-4xl font-black mb-16" style={{ color: "var(--clr-primary)" }}>
              {t.about.leadershipTitle}
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {leadership.map((l, i) => (
              <ScrollReveal key={l.name} delay={i * 0.08}>
                <div className="text-center group">
                  <div className="w-20 h-20 rounded-full flex items-center justify-center text-2xl font-black text-white mx-auto mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ background: "var(--clr-gradient)" }}>
                    {l.initials}
                  </div>
                  <div className="font-black text-sm" style={{ color: "var(--clr-primary)" }}>{l.name}</div>
                  <div className="text-xs mt-1" style={{ color: "var(--clr-text-muted)" }}>{l.role}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--clr-gradient)" }} />
        <AnimatedBlobs intensity={0.07} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-black text-white mb-4">
              {t.about.ctaTitle1}<br /><span style={{ color: "var(--clr-accent)" }}>{t.about.ctaTitle2}</span>
            </h2>
            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
              {t.about.ctaSubtitle}
            </p>
            <Link href="/contact" data-testid="btn-about-cta"
              className="inline-flex items-center gap-2 px-10 py-4 font-black rounded text-sm tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
              {t.common.contactUs} <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
