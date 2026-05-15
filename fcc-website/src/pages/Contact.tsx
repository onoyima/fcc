import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Phone, Mail, MapPin, Globe, MessageCircle, Send, Clock } from "lucide-react";
import { AnimatedBlobs, FloatingShapes } from "@/components/AnimatedBackground";
import brandImg from "@assets/ChatGPT_Image_May_14,_2026,_11_05_45_PM_1778796680819.png";
import { useLang } from "@/contexts/LanguageContext";

const offices = [
  { city: "Lagos (HQ)", address: "Victoria Island, Lagos, Nigeria", phone: "+234 806 851 5179" },
  { city: "Abuja", address: "Central Business District, Abuja, Nigeria", phone: "+234 800 100 0002" },
  { city: "Port Harcourt", address: "GRA Phase 2, Port Harcourt, Nigeria", phone: "+234 800 100 0003" },
];

const serviceOptions = [
  "Construction & Engineering",
  "Real Estate & Property",
  "Facility & Property Management",
  "Interior & Finishing",
  "Workforce & Equipment",
  "General Enquiry",
];

export default function Contact() {
  const { t } = useLang();
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", service: "", budget: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const submissions = JSON.parse(localStorage.getItem("fcc_contact_submissions") || "[]");
    submissions.push({ ...formData, timestamp: new Date().toISOString() });
    localStorage.setItem("fcc_contact_submissions", JSON.stringify(submissions));
    setSubmitted(true);
  };

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
            <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>{t.contact.heroBadge}</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
            {t.contact.heroTitle1}<br />
            <span style={{ color: "var(--clr-accent)" }}>{t.contact.heroTitle2}</span>
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            {t.contact.heroSubtitle}
          </p>
        </div>
      </section>

      {/* ── FORM & INFO ───────────────────────── */}
      <section className="py-24" style={{ background: "var(--clr-bg-alt)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <ScrollReveal>
                <div className="rounded-sm border overflow-hidden shadow-xl"
                  style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
                  <div className="px-8 py-5" style={{ background: "var(--clr-primary)" }}>
                    <h2 className="text-white font-black text-xl">{t.contact.sendMessage}</h2>
                  </div>

                  {submitted ? (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                        style={{ background: "var(--clr-bg-alt)" }}>
                        <Send size={28} style={{ color: "var(--clr-accent)" }} />
                      </div>
                      <h3 className="text-2xl font-black mb-3" style={{ color: "var(--clr-primary)" }}>{t.contact.messageSent}</h3>
                      <p className="text-base mb-6" style={{ color: "var(--clr-text-muted)" }}>
                        {t.contact.thankYou}
                      </p>
                      <button onClick={() => setSubmitted(false)}
                        className="px-8 py-3 font-black text-sm rounded tracking-wide transition-all hover:-translate-y-0.5"
                        style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                        {t.contact.sendAnother}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="p-8 space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[
                          { key: "name", label: t.contact.fullName, placeholder: "John Doe", type: "text" },
                          { key: "email", label: t.contact.emailAddress, placeholder: "john@example.com", type: "email" },
                        ].map((f) => (
                          <div key={f.key}>
                            <label className="block text-xs font-bold uppercase tracking-wide mb-2"
                              style={{ color: "var(--clr-text)" }}>{f.label}</label>
                            <input
                              type={f.type}
                              required
                              placeholder={f.placeholder}
                              value={formData[f.key as keyof typeof formData]}
                              onChange={(e) => setFormData({ ...formData, [f.key]: e.target.value })}
                              className="w-full px-4 py-3 border rounded text-sm outline-none transition-all"
                              style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)", color: "var(--clr-text)" }}
                            />
                          </div>
                        ))}
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wide mb-2"
                            style={{ color: "var(--clr-text)" }}>{t.contact.phoneNumber}</label>
                          <input type="tel" placeholder="+234..."
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 border rounded text-sm outline-none"
                            style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)", color: "var(--clr-text)" }} />
                        </div>
                        <div>
                          <label className="block text-xs font-bold uppercase tracking-wide mb-2"
                            style={{ color: "var(--clr-text)" }}>{t.contact.serviceRequired}</label>
                          <select
                            value={formData.service}
                            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                            className="w-full px-4 py-3 border rounded text-sm outline-none"
                            style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)", color: "var(--clr-text)" }}>
                            <option value="">Select a service</option>
                            {serviceOptions.map((s) => <option key={s}>{s}</option>)}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wide mb-2"
                          style={{ color: "var(--clr-text)" }}>{t.contact.estimatedBudget}</label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full px-4 py-3 border rounded text-sm outline-none"
                          style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)", color: "var(--clr-text)" }}>
                          <option value="">Select budget range</option>
                          {["Under ₦50M", "₦50M – ₦200M", "₦200M – ₦1B", "₦1B – ₦5B", "Above ₦5B", "N/A"].map((b) => <option key={b}>{b}</option>)}
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase tracking-wide mb-2"
                          style={{ color: "var(--clr-text)" }}>{t.contact.projectDescription}</label>
                        <textarea
                          required
                          rows={5}
                          placeholder={t.contact.projectDescPlaceholder}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 border rounded text-sm outline-none resize-none"
                          style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)", color: "var(--clr-text)" }}
                        />
                      </div>

                      <button
                        type="submit"
                        data-testid="btn-contact-submit"
                        className="w-full py-4 font-black text-sm rounded tracking-wide flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
                        style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                        <Send size={16} /> {t.common.sendMessage}
                      </button>
                    </form>
                  )}
                </div>
              </ScrollReveal>
            </div>

            {/* Info sidebar */}
            <div className="space-y-6">
              <ScrollReveal delay={0.15}>
                <div className="rounded-sm border overflow-hidden"
                  style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
                  <div className="px-6 py-4 border-b" style={{ background: "var(--clr-bg-alt)", borderColor: "var(--clr-border)" }}>
                    <h3 className="font-black text-sm" style={{ color: "var(--clr-primary)" }}>{t.contact.directContacts}</h3>
                  </div>
                  <div className="p-6 space-y-4">
                    {[
                      { Icon: Globe, text: "www.forecityconstruction.com" },
                      { Icon: Mail, text: "info@forecityconstruction.com" },
                      { Icon: Phone, text: "+234 806 851 5179" },
                    ].map(({ Icon, text }) => (
                      <div key={text} className="flex items-center gap-3">
                        <Icon size={16} style={{ color: "var(--clr-accent)" }} />
                        <span className="text-sm" style={{ color: "var(--clr-text-muted)" }}>{text}</span>
                      </div>
                    ))}
                    <a href="https://wa.me/2348068515179"
                      className="flex items-center gap-2 mt-4 py-3 px-4 rounded text-sm font-black transition-all hover:-translate-y-0.5"
                      style={{ background: "#25D366", color: "#fff" }}>
                      <MessageCircle size={16} /> Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.2}>
                <div className="rounded-sm border p-6" style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Clock size={16} style={{ color: "var(--clr-accent)" }} />
                    <h3 className="font-black text-sm" style={{ color: "var(--clr-primary)" }}>{t.contact.responseTime}</h3>
                  </div>
                  {[
                    { type: t.contact.generalEnquiries, time: "< 24 hours" },
                    { type: t.contact.projectQuotations, time: "< 48 hours" },
                    { type: t.contact.emergencySupport, time: "< 2 hours" },
                  ].map((r) => (
                    <div key={r.type} className="flex items-center justify-between py-2 border-b last:border-0 text-xs"
                      style={{ borderColor: "var(--clr-border)" }}>
                      <span style={{ color: "var(--clr-text-muted)" }}>{r.type}</span>
                      <span className="font-black" style={{ color: "var(--clr-accent)" }}>{r.time}</span>
                    </div>
                  ))}
                </div>
              </ScrollReveal>

              <ScrollReveal delay={0.25}>
                <div className="rounded-sm border p-6" style={{ background: "rgba(239,68,68,0.05)", borderColor: "rgba(239,68,68,0.2)" }}>
                  <h3 className="text-red-500 font-black text-sm mb-3">{t.contact.siteEmergency}</h3>
                  <p className="text-xs mb-4" style={{ color: "var(--clr-text-muted)" }}>{t.contact.siteEmergencyDesc}</p>
                  <a href="tel:+2348001000099"
                    className="flex items-center gap-2 font-black text-lg text-red-500 hover:text-red-600 transition-colors">
                    <Phone size={18} /> +234 806 851 5179
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── OFFICES ───────────────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--clr-primary)" }}>
        <AnimatedBlobs intensity={0.05} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
              <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>{t.contact.officesBadge}</span>
            </div>
            <h2 className="text-4xl font-black text-white mb-12">
              {t.contact.officesTitle1}<br /><span style={{ color: "var(--clr-accent)" }}>{t.contact.officesTitle2}</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {offices.map((office, i) => (
              <ScrollReveal key={office.city} delay={i * 0.1}>
                <div className="p-8 rounded-sm border transition-all duration-300 hover:-translate-y-1"
                  style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}>
                  <div className="w-10 h-10 rounded-sm flex items-center justify-center mb-6"
                    style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                    <MapPin size={18} />
                  </div>
                  <h3 className="font-black text-white text-lg mb-2">{office.city}</h3>
                  <p className="text-sm mb-4" style={{ color: "rgba(255,255,255,0.5)" }}>{office.address}</p>
                  <a href={`tel:${office.phone.replace(/\s/g, "")}`}
                    className="text-sm font-bold flex items-center gap-2 transition-colors hover:opacity-80"
                    style={{ color: "var(--clr-accent)" }}>
                    <Phone size={14} /> {office.phone}
                  </a>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="rounded-sm overflow-hidden border" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
              <iframe
                title="FCC Office Locations"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.70336357925!2d3.119362892713784!3d6.548376816725193!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae682c1c1%3A0x76e2ad6c7c9d60b4!2sVictoria%20Island%2C%20Lagos%2C%20Nigeria!5e0!3m2!1sen!2s!4v1!4m5!1m2!1s0x103b8b2ae682c1c1%3A0x76e2ad6c7c9d60b4!2sVictoria%20Island%2C%20Lagos!3e0"
                width="100%"
                height="400"
                style={{ border: 0, filter: "invert(90%) hue-rotate(180deg)" }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
