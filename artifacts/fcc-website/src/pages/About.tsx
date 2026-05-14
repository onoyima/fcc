import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "wouter";
import { ArrowRight, CheckCircle, ShieldCheck, Award, Users, HardHat } from "lucide-react";
import logoImg from "@assets/ChatGPT_Image_May_14,_2026,_11_06_22_PM_1778796680824.png";

const values = [
  { title: "Integrity", desc: "Transparent operations and ethical business practices in every engagement." },
  { title: "Safety", desc: "Industry-leading safety standards protecting workforce, clients, and communities." },
  { title: "Excellence", desc: "World-class quality enforced from materials procurement to final delivery." },
  { title: "Innovation", desc: "Smart technology integration at every stage of construction and management." },
  { title: "Customer Satisfaction", desc: "Dedicated support, real-time tracking, and a client-first approach." },
  { title: "Accountability", desc: "We own every timeline, commitment, and outcome — no exceptions." },
];

const leadership = [
  { name: "Afolabi Adeyemi", role: "Group Managing Director", initials: "AA" },
  { name: "Engr. Chukwuemeka Obi", role: "Director of Engineering", initials: "CO" },
  { name: "Mrs. Ngozi Adeleke", role: "Director of Real Estate", initials: "NA" },
  { name: "Alhaji Musa Garba", role: "Director of Operations", initials: "MG" },
];

const milestones = [
  { year: "2008", event: "FCC Founded in Lagos, Nigeria" },
  { year: "2012", event: "Expanded into real estate and property management" },
  { year: "2016", event: "Launched estate development division" },
  { year: "2019", event: "Introduced smart construction technology platform" },
  { year: "2022", event: "Expanded to 10+ cities across Nigeria" },
  { year: "2025", event: "Launched integrated digital property management ecosystem" },
];

const certifications = [
  { title: "COREN Registered", body: "Council for the Regulation of Engineering in Nigeria" },
  { title: "CORBON Member", body: "Quantity Surveyors Registration Board of Nigeria" },
  { title: "ISO 9001:2015", body: "Quality Management Systems Certified" },
  { title: "NIQS Member", body: "Nigerian Institution of Quantity Surveyors" },
  { title: "ARCON Registered", body: "Architects Registration Council of Nigeria" },
  { title: "NESREA Compliant", body: "Environmental Impact Assessment Certified" },
];

const safetyStandards = [
  "Mandatory Personal Protective Equipment (PPE) on all sites",
  "Daily toolbox meetings and safety briefings before work begins",
  "Weekly site safety inspections by dedicated HSE officers",
  "Zero-tolerance policy for safety violations",
  "Fire safety and emergency evacuation plans on every site",
  "First aid kits and trained personnel on all active sites",
  "Regular equipment inspection and maintenance schedules",
  "ISO-compliant incident reporting and investigation procedures",
];

const workforce = [
  { role: "Engineers & Architects", count: "200+", icon: <HardHat size={24} /> },
  { role: "Skilled Artisans", count: "500+", icon: <Users size={24} /> },
  { role: "Project Managers", count: "50+", icon: <Award size={24} /> },
  { role: "Site Supervisors", count: "100+", icon: <ShieldCheck size={24} /> },
];

export default function About() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0D1B38] pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px)`
        }} />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-48 bg-[#C9A84C]" />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">About Us</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight max-w-3xl">
            We Build More Than<br /><span className="text-[#C9A84C]">Structures</span>
          </h1>
          <p className="mt-6 text-white/60 text-lg max-w-xl leading-relaxed">
            FCC Fore-City Construction is an integrated construction, real estate, and property technology company — building Africa's cities, one project at a time.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Our Purpose</span>
              </div>
              <h2 className="text-4xl font-black text-[#0D1B38] mb-8">Mission & Vision</h2>

              <div className="mb-8 p-8 border-l-4 border-[#C9A84C] bg-[#F5F7FA] rounded-r-sm">
                <h3 className="font-black text-[#0D1B38] mb-3 text-lg">Our Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become one of Africa's leading smart construction and real estate companies — transforming cities, communities, and the built environment through innovation and excellence.
                </p>
              </div>

              <div className="p-8 border-l-4 border-[#0D1B38] bg-[#F5F7FA] rounded-r-sm">
                <h3 className="font-black text-[#0D1B38] mb-3 text-lg">Our Mission</h3>
                <p className="text-gray-600 leading-relaxed">
                  To deliver innovative construction, infrastructure, real estate, and property management solutions with professionalism, transparency, and technology — creating lasting value for clients, communities, and stakeholders.
                </p>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="relative">
              <div className="absolute -top-4 -right-4 w-full h-full border-2 border-[#C9A84C]/20 rounded-sm" />
              <img src={logoImg} alt="FCC Logo Variations" className="relative z-10 rounded-sm w-full object-cover bg-gray-50 p-8" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-28 bg-[#0D1B38] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.5) 30px, rgba(255,255,255,0.5) 31px)`
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">What Drives Us</span>
                <span className="h-px w-12 bg-[#C9A84C]" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-white">Core Values</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="group p-8 border border-white/10 rounded-sm hover:border-[#C9A84C]/40 hover:bg-white/5 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <CheckCircle size={20} className="text-[#C9A84C]" />
                    <h3 className="font-black text-white text-lg">{v.title}</h3>
                  </div>
                  <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Credentials</span>
                <span className="h-px w-12 bg-[#C9A84C]" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0D1B38]">Certifications & Accreditations</h2>
              <p className="mt-4 text-gray-500 max-w-xl mx-auto">FCC operates to the highest professional and regulatory standards, with full compliance across all business divisions.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <ScrollReveal key={cert.title} delay={i * 0.09}>
                <div data-testid={`cert-${i}`} className="flex items-start gap-5 p-6 bg-[#F5F7FA] rounded-sm border border-gray-100 hover:border-[#C9A84C]/30 hover:shadow-sm transition-all duration-300">
                  <div className="w-12 h-12 rounded-sm bg-[#0D1B38] flex items-center justify-center flex-shrink-0">
                    <Award size={22} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <h3 className="font-black text-[#0D1B38] mb-1">{cert.title}</h3>
                    <p className="text-gray-500 text-xs leading-relaxed">{cert.body}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Standards */}
      <section className="py-28 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Health & Safety</span>
              </div>
              <h2 className="text-4xl font-black text-[#0D1B38] mb-6">Our Safety Standards</h2>
              <p className="text-gray-600 leading-relaxed mb-8">
                At FCC, safety is not a department — it's a culture. We operate a Zero Harm philosophy across all our sites, enforced by dedicated HSE (Health, Safety & Environment) officers and supported by continuous training programs.
              </p>
              <div className="space-y-3">
                {safetyStandards.map((s, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <ShieldCheck size={16} className="text-[#C9A84C] mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600 text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={0.15}>
            <div className="grid grid-cols-2 gap-5">
              {[
                { label: "Zero Harm", sub: "Our safety philosophy", color: "bg-[#0D1B38]" },
                { label: "100%", sub: "PPE compliance on sites", color: "bg-[#C9A84C]" },
                { label: "HSE Trained", sub: "All site supervisors", color: "bg-[#C9A84C]" },
                { label: "ISO Compliant", sub: "Safety management systems", color: "bg-[#0D1B38]" },
              ].map((s, i) => (
                <div key={i} className={`${s.color} rounded-sm p-8 flex flex-col justify-between aspect-square`}>
                  <ShieldCheck size={28} className={s.color === "bg-[#0D1B38]" ? "text-[#C9A84C]" : "text-[#0D1B38]"} />
                  <div>
                    <div className={`text-2xl font-black ${s.color === "bg-[#0D1B38]" ? "text-white" : "text-[#0D1B38]"}`}>{s.label}</div>
                    <div className={`text-xs mt-1 ${s.color === "bg-[#0D1B38]" ? "text-white/50" : "text-[#0D1B38]/60"}`}>{s.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Workforce Showcase */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Our People</span>
                <span className="h-px w-12 bg-[#C9A84C]" />
              </div>
              <h2 className="text-4xl font-black text-[#0D1B38]">Workforce Showcase</h2>
              <p className="mt-4 text-gray-500 max-w-xl mx-auto">Our team of 1,000+ professionals is our greatest asset — skilled, safety-trained, and committed to excellence.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {workforce.map((w, i) => (
              <ScrollReveal key={w.role} delay={i * 0.1}>
                <div className="text-center p-8 bg-[#F5F7FA] rounded-sm border border-gray-100 hover:border-[#C9A84C]/30 hover:-translate-y-1 hover:shadow-md transition-all duration-300 group">
                  <div className="w-16 h-16 rounded-full bg-[#0D1B38] flex items-center justify-center mx-auto mb-5 text-[#C9A84C] group-hover:bg-[#C9A84C] group-hover:text-[#0D1B38] transition-all duration-300">
                    {w.icon}
                  </div>
                  <div className="text-3xl font-black text-[#0D1B38] mb-1">{w.count}</div>
                  <div className="text-gray-500 text-sm font-semibold">{w.role}</div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-28 bg-[#F5F7FA]">
        <div className="max-w-5xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Our Journey</span>
                <span className="h-px w-12 bg-[#C9A84C]" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0D1B38]">Company History</h2>
            </div>
          </ScrollReveal>
          <div className="relative">
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-[#C9A84C]/30" />
            {milestones.map((m, i) => (
              <ScrollReveal key={m.year} delay={i * 0.1}>
                <div className={`relative flex items-center gap-8 mb-12 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                  <div className={`flex-1 ${i % 2 === 0 ? "text-right" : "text-left"}`}>
                    <div className="inline-block bg-white rounded-sm border border-gray-100 shadow-sm p-6">
                      <div className="text-[#C9A84C] text-2xl font-black mb-2">{m.year}</div>
                      <div className="text-[#0D1B38] font-semibold text-sm">{m.event}</div>
                    </div>
                  </div>
                  <div className="flex-shrink-0 w-5 h-5 rounded-full bg-[#C9A84C] border-4 border-white shadow z-10" />
                  <div className="flex-1" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Leadership</span>
                <span className="h-px w-12 bg-[#C9A84C]" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0D1B38]">Meet Our Team</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadership.map((l, i) => (
              <ScrollReveal key={l.name} delay={i * 0.1}>
                <div data-testid={`card-leader-${i}`} className="text-center group">
                  <div className="w-28 h-28 rounded-full bg-[#0D1B38] flex items-center justify-center mx-auto mb-6 text-3xl font-black text-[#C9A84C] transition-all duration-300 group-hover:bg-[#C9A84C] group-hover:text-[#0D1B38]">
                    {l.initials}
                  </div>
                  <h3 className="font-black text-[#0D1B38] text-lg">{l.name}</h3>
                  <p className="text-[#C9A84C] text-xs font-semibold mt-1 tracking-wide">{l.role}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#0D1B38]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-8">
          <ScrollReveal direction="left">
            <h2 className="text-3xl lg:text-4xl font-black text-white">Ready to partner with us?</h2>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <Link href="/contact" data-testid="btn-about-cta"
              className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-[#0D1B38] font-bold rounded text-sm tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(201,168,76,0.4)]"
            >
              Get in Touch <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
