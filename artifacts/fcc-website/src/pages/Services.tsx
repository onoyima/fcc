import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "wouter";
import { Building2, Home, Shield, Wrench, Users, ArrowRight, CheckCircle } from "lucide-react";
import { AnimatedBlobs, FloatingShapes, AnimatedGrid } from "@/components/AnimatedBackground";
import brandImg from "@assets/ChatGPT_Image_May_14,_2026,_11_05_45_PM_1778796680819.png";

const divisions = [
  {
    icon: <Building2 size={40} />,
    title: "Construction & Engineering",
    subtitle: "From Foundation to Skyline",
    description: "We deliver comprehensive construction and engineering services across residential, commercial, industrial, and government sectors. Our team of seasoned engineers, architects, and project managers ensures every project is built to the highest international standards.",
    services: [
      "Residential building construction",
      "Commercial complex construction",
      "Estate development",
      "Road & bridge construction",
      "Industrial projects",
      "School & hospital construction",
      "Warehouse development",
      "Foundation & structural engineering",
    ],
  },
  {
    icon: <Home size={40} />,
    title: "Real Estate & Property",
    subtitle: "Invest. Own. Prosper.",
    description: "From premium land sales to luxury apartments, our real estate division connects buyers, investors, and developers to the best opportunities in Nigeria's fastest-growing cities. We handle everything from listing to legal title transfer.",
    services: [
      "Land sales & acquisition",
      "Residential property sales",
      "Commercial property leasing",
      "Estate & housing development",
      "Property investment advisory",
      "Title documentation & transfer",
      "Property valuation",
      "Off-plan property sales",
    ],
  },
  {
    icon: <Shield size={40} />,
    title: "Facility & Property Management",
    subtitle: "We Manage. You Profit.",
    description: "Professional management of estates, commercial buildings, and mixed-use developments. We handle tenant relations, maintenance schedules, service charge collection, security, and full-facility operations so you don't have to.",
    services: [
      "Estate & facility management",
      "Tenant onboarding & relations",
      "Lease management & renewals",
      "Maintenance & repairs",
      "Security & access management",
      "Utility management",
      "Service charge administration",
      "Property inspection & reporting",
    ],
  },
  {
    icon: <Wrench size={40} />,
    title: "Interior & Finishing",
    subtitle: "Spaces That Inspire",
    description: "From concept to completion, our interior design and finishing division transforms raw spaces into stunning, functional environments. We work across residential, commercial, and hospitality sectors with meticulous attention to detail.",
    services: [
      "Interior design & space planning",
      "Joinery & fitted furniture",
      "Suspended ceilings & POP",
      "Tiling & flooring",
      "Painting & wallcoverings",
      "Electrical & MEP fit-out",
      "Kitchen & bathroom fitting",
      "Landscaping & outdoor design",
    ],
  },
  {
    icon: <Users size={40} />,
    title: "Workforce & Equipment Solutions",
    subtitle: "Nigeria's Construction Talent Hub",
    description: "We maintain Africa's most comprehensive database of certified construction professionals — from civil engineers to masons, electricians to welders. We supply workforce on contract, project, or permanent basis, with full background verification.",
    services: [
      "Skilled artisan supply",
      "Civil & structural engineers",
      "Architect & surveyor placement",
      "Heavy equipment hire",
      "Site safety officers",
      "Construction supervisors",
      "Fleet & transport management",
      "Training & skill certification",
    ],
  },
];

export default function Services() {
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
            <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>Our Services</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 max-w-3xl">
            Five Divisions.<br />
            <span style={{ color: "var(--clr-accent)" }}>Unlimited Possibilities.</span>
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            From breaking ground to property management, FCC covers every stage of the built-environment cycle under one integrated, expert-led brand.
          </p>
        </div>
      </section>

      {/* ── DIVISIONS ─────────────────────────── */}
      <section className="py-8" style={{ background: "var(--clr-bg)" }}>
        {divisions.map((div, i) => (
          <ScrollReveal key={div.title}>
            <div className={`py-20 border-b ${i % 2 === 1 ? "" : ""}`}
              style={{
                background: i % 2 === 0 ? "var(--clr-bg)" : "var(--clr-bg-alt)",
                borderColor: "var(--clr-border)",
              }}>
              <div className="max-w-7xl mx-auto px-6 lg:px-10">
                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                  <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-px w-8" style={{ background: "var(--clr-accent)" }} />
                      <span className="text-xs font-bold tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>Division {String(i + 1).padStart(2, "0")}</span>
                    </div>
                    <div className="w-16 h-16 rounded-sm flex items-center justify-center mb-6"
                      style={{ background: "var(--clr-primary)", color: "var(--clr-accent)" }}>
                      {div.icon}
                    </div>
                    <h2 className="text-3xl font-black mb-2" style={{ color: "var(--clr-primary)" }}>{div.title}</h2>
                    <p className="text-sm font-bold tracking-wide mb-4" style={{ color: "var(--clr-accent)" }}>{div.subtitle}</p>
                    <p className="text-base leading-relaxed mb-8" style={{ color: "var(--clr-text-muted)" }}>{div.description}</p>
                    <Link href="/contact" data-testid={`btn-service-quote-${i}`}
                      className="inline-flex items-center gap-2 px-6 py-3 font-black rounded text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5"
                      style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                      Get a Quote <ArrowRight size={14} />
                    </Link>
                  </div>

                  <div className={i % 2 === 1 ? "lg:order-1" : ""}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {div.services.map((svc) => (
                        <div key={svc} className="flex items-center gap-3 p-4 rounded-sm border transition-all duration-200 hover:border-opacity-70"
                          style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
                          <CheckCircle size={16} className="flex-shrink-0" style={{ color: "var(--clr-accent)" }} />
                          <span className="text-sm font-medium" style={{ color: "var(--clr-text)" }}>{svc}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </section>

      {/* ── CTA ───────────────────────────────── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0" style={{ background: "var(--clr-gradient)" }} />
        <AnimatedBlobs intensity={0.07} />
        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <ScrollReveal>
            <h2 className="text-4xl font-black text-white mb-4">
              Need a Custom<br /><span style={{ color: "var(--clr-accent)" }}>Service Package?</span>
            </h2>
            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
              We tailor our services to your specific project requirements and budget. Talk to our team today.
            </p>
            <Link href="/contact" data-testid="btn-services-cta"
              className="inline-flex items-center gap-2 px-10 py-4 font-black rounded text-sm tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
              Talk to Our Team <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
