import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import {
  Briefcase, MapPin, Clock, ChevronDown, ChevronUp, ArrowRight,
  HardHat, Users, Building2, Wrench, Upload, CheckCircle, Send
} from "lucide-react";
import { AnimatedBlobs, FloatingShapes } from "@/components/AnimatedBackground";
import brandImg from "@assets/ChatGPT_Image_May_14,_2026,_11_05_45_PM_1778796680819.png";

type FormTab = "job" | "labor" | "contractor";

const departments = ["All Departments", "Engineering", "Construction", "Real Estate", "Management", "Technology", "Finance", "HR"];

const jobs = [
  { id: 1, title: "Senior Structural Engineer", dept: "Engineering", location: "Lagos", type: "Full-time", salary: "₦800K – ₦1.2M/month", desc: "Lead structural design and analysis for high-rise commercial and residential projects. Min. 8 years experience, COREN registered." },
  { id: 2, title: "Project Manager — Residential", dept: "Construction", location: "Abuja", type: "Full-time", salary: "₦600K – ₦900K/month", desc: "Oversee end-to-end delivery of residential estate projects from planning to handover. PMP or PRINCE2 certified preferred." },
  { id: 3, title: "Real Estate Sales Executive", dept: "Real Estate", location: "Lagos", type: "Full-time", salary: "Base + 5% Commission", desc: "Drive property sales for new developments. Minimum 3 years real estate sales experience. Strong client network preferred." },
  { id: 4, title: "BIM Technologist", dept: "Technology", location: "Lagos", type: "Full-time", salary: "₦350K – ₦550K/month", desc: "Develop and manage BIM models using Revit and AutoCAD. Support design coordination and clash detection across project teams." },
  { id: 5, title: "Interior Design Consultant", dept: "Construction", location: "Multiple Cities", type: "Contract", salary: "Project-based", desc: "Develop concept and detailed interior design proposals for high-end residential and commercial clients." },
  { id: 6, title: "Finance & Treasury Manager", dept: "Finance", location: "Lagos HQ", type: "Full-time", salary: "₦700K – ₦1.0M/month", desc: "Manage cash flow, treasury operations, project financing, and financial reporting for a fast-growing construction group." },
];

const artisanCategories = [
  { icon: <Wrench size={20} />, name: "Plumbing & Pipefitting" },
  { icon: <HardHat size={20} />, name: "Masonry & Bricklaying" },
  { icon: <Building2 size={20} />, name: "Steel Fixing & Formwork" },
  { icon: <Users size={20} />, name: "Electrical Installations" },
  { icon: <Wrench size={20} />, name: "Tiling & Screeding" },
  { icon: <HardHat size={20} />, name: "Painting & Decorating" },
  { icon: <Building2 size={20} />, name: "Carpentry & Joinery" },
  { icon: <Users size={20} />, name: "Welding & Fabrication" },
];

export default function Careers() {
  const [activeDept, setActiveDept] = useState("All Departments");
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [formTab, setFormTab] = useState<FormTab>("job");

  const filtered = activeDept === "All Departments" ? jobs : jobs.filter((j) => j.dept === activeDept);

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
            <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>Join Our Team</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
            Build Your Career.<br />
            <span style={{ color: "var(--clr-accent)" }}>Build Africa's Future.</span>
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.7)" }}>
            Join a team of 1,000+ professionals shaping Africa's built environment.
            FCC offers career growth, competitive compensation, and the opportunity to work on landmark projects.
          </p>

          <div className="flex flex-wrap gap-8">
            {[
              { val: "1,000+", label: "Team Members" },
              { val: "10+", label: "Offices" },
              { val: "100%", label: "Growth Culture" },
              { val: "15+", label: "Years Legacy" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black" style={{ color: "var(--clr-accent)" }}>{s.val}</div>
                <div className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OPEN POSITIONS ───────────────────── */}
      <section className="py-20" style={{ background: "var(--clr-bg)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
              <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>Open Roles</span>
            </div>
            <h2 className="text-4xl font-black mb-10" style={{ color: "var(--clr-primary)" }}>
              Current <span style={{ color: "var(--clr-accent)" }}>Opportunities</span>
            </h2>
          </ScrollReveal>

          {/* Dept filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {departments.map((d) => (
              <button key={d}
                data-testid={`filter-dept-${d.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActiveDept(d)}
                className="px-4 py-2 text-xs font-black rounded-sm tracking-wide uppercase border transition-all"
                style={activeDept === d ? {
                  background: "var(--clr-primary)", color: "#fff", borderColor: "var(--clr-primary)"
                } : {
                  background: "transparent", color: "var(--clr-text-muted)", borderColor: "var(--clr-border)"
                }}>
                {d}
              </button>
            ))}
          </div>

          {/* Jobs */}
          <div className="space-y-4">
            {filtered.map((job) => (
              <ScrollReveal key={job.id}>
                <div className="rounded-sm border overflow-hidden transition-all duration-200"
                  style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
                  <button
                    data-testid={`job-toggle-${job.id}`}
                    onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                    className="w-full px-8 py-6 flex items-center gap-4 text-left hover:opacity-90 transition-opacity"
                  >
                    <div className="w-12 h-12 rounded-sm flex items-center justify-center flex-shrink-0"
                      style={{ background: "var(--clr-bg-alt)", color: "var(--clr-accent)" }}>
                      <Briefcase size={20} />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-black text-base mb-1" style={{ color: "var(--clr-primary)" }}>{job.title}</h3>
                      <div className="flex flex-wrap gap-4 text-xs" style={{ color: "var(--clr-text-muted)" }}>
                        <span className="flex items-center gap-1"><MapPin size={11} />{job.location}</span>
                        <span className="flex items-center gap-1"><Clock size={11} />{job.type}</span>
                        <span className="font-bold" style={{ color: "var(--clr-accent)" }}>{job.salary}</span>
                      </div>
                    </div>
                    <div style={{ color: "var(--clr-text-muted)" }}>
                      {expandedJob === job.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedJob === job.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-8 pb-8 border-t" style={{ borderColor: "var(--clr-border)" }}>
                          <p className="text-sm leading-relaxed mt-6 mb-6" style={{ color: "var(--clr-text-muted)" }}>{job.desc}</p>
                          <button
                            onClick={() => setFormTab("job")}
                            className="inline-flex items-center gap-2 px-6 py-3 font-black rounded text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5"
                            style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                            Apply Now <ArrowRight size={14} />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ARTISAN DATABASE ──────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--clr-primary)" }}>
        <AnimatedBlobs intensity={0.05} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
              <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>Artisan Database</span>
            </div>
            <h2 className="text-4xl font-black text-white mb-4">
              Are You a Skilled<br /><span style={{ color: "var(--clr-accent)" }}>Trade Professional?</span>
            </h2>
            <p className="text-base mb-12 max-w-xl" style={{ color: "rgba(255,255,255,0.6)" }}>
              Join Nigeria's premier construction workforce database. Get matched with projects, earn more, and build your career.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {artisanCategories.map((cat, i) => (
              <ScrollReveal key={cat.name} delay={i * 0.08}>
                <div className="p-5 rounded-sm border text-center transition-all duration-300 hover:-translate-y-1 cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}>
                  <div className="flex justify-center mb-3" style={{ color: "var(--clr-accent)" }}>{cat.icon}</div>
                  <span className="text-sm font-bold text-white">{cat.name}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ──────────────────── */}
      <section className="py-24" style={{ background: "var(--clr-bg-alt)" }}>
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
              <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>Apply Now</span>
            </div>
            <h2 className="text-4xl font-black mb-8" style={{ color: "var(--clr-primary)" }}>Submit Your Application</h2>
          </ScrollReveal>

          {/* Tabs */}
          <div className="flex rounded-sm overflow-hidden border mb-8"
            style={{ borderColor: "var(--clr-border)" }}>
            {([
              { key: "job" as FormTab, label: "Job Application" },
              { key: "labor" as FormTab, label: "Labor Registration" },
              { key: "contractor" as FormTab, label: "Contractor Signup" },
            ]).map(({ key, label }) => (
              <button
                key={key}
                data-testid={`form-tab-${key}`}
                onClick={() => setFormTab(key)}
                className="flex-1 py-3 text-xs font-black tracking-wide transition-all duration-200"
                style={formTab === key ? {
                  background: "var(--clr-primary)", color: "#fff"
                } : {
                  background: "var(--clr-card)", color: "var(--clr-text-muted)"
                }}>
                {label}
              </button>
            ))}
          </div>

          <div className="rounded-sm border overflow-hidden shadow-xl"
            style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
            <div className="px-8 py-5" style={{ background: "var(--clr-primary)" }}>
              <h3 className="text-white font-black text-lg">
                {formTab === "job" ? "Job Application Form" : formTab === "labor" ? "Labor / Artisan Registration" : "Contractor Registration"}
              </h3>
            </div>
            <div className="p-8 space-y-5">
              {formTab === "job" && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    {[{ l: "First Name", p: "John" }, { l: "Last Name", p: "Doe" }].map((f) => (
                      <div key={f.l}>
                        <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "var(--clr-text)" }}>{f.l}</label>
                        <input type="text" placeholder={f.p} className="w-full px-4 py-3 border rounded text-sm outline-none"
                          style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)", color: "var(--clr-text)" }} />
                      </div>
                    ))}
                  </div>
                  {[
                    { l: "Email Address", p: "john@example.com", t: "email" },
                    { l: "Phone Number", p: "+234...", t: "tel" },
                  ].map((f) => (
                    <div key={f.l}>
                      <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "var(--clr-text)" }}>{f.l}</label>
                      <input type={f.t} placeholder={f.p} className="w-full px-4 py-3 border rounded text-sm outline-none"
                        style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)", color: "var(--clr-text)" }} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "var(--clr-text)" }}>Position Applied For</label>
                    <select className="w-full px-4 py-3 border rounded text-sm outline-none"
                      style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)", color: "var(--clr-text)" }}>
                      {jobs.map((j) => <option key={j.id}>{j.title}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "var(--clr-text)" }}>Cover Letter</label>
                    <textarea rows={4} placeholder="Why do you want to join FCC?" className="w-full px-4 py-3 border rounded text-sm outline-none resize-none"
                      style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)", color: "var(--clr-text)" }} />
                  </div>
                  <div className="border-2 border-dashed rounded-sm p-8 text-center cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ borderColor: "var(--clr-border)" }}>
                    <Upload size={24} className="mx-auto mb-2" style={{ color: "var(--clr-text-muted)" }} />
                    <p className="text-sm font-bold" style={{ color: "var(--clr-text)" }}>Upload CV / Resume</p>
                    <p className="text-xs mt-1" style={{ color: "var(--clr-text-muted)" }}>PDF, DOC up to 5MB</p>
                  </div>
                </>
              )}

              {formTab === "labor" && (
                <>
                  {[
                    { l: "Full Name", p: "Your name", t: "text" },
                    { l: "Phone Number", p: "+234...", t: "tel" },
                  ].map((f) => (
                    <div key={f.l}>
                      <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "var(--clr-text)" }}>{f.l}</label>
                      <input type={f.t} placeholder={f.p} className="w-full px-4 py-3 border rounded text-sm outline-none"
                        style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)", color: "var(--clr-text)" }} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "var(--clr-text)" }}>Primary Skill</label>
                    <select className="w-full px-4 py-3 border rounded text-sm outline-none"
                      style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)", color: "var(--clr-text)" }}>
                      {artisanCategories.map((c) => <option key={c.name}>{c.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "var(--clr-text)" }}>Years of Experience</label>
                    <select className="w-full px-4 py-3 border rounded text-sm outline-none"
                      style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)", color: "var(--clr-text)" }}>
                      {["0–1 years", "1–3 years", "3–5 years", "5–10 years", "10+ years"].map((y) => <option key={y}>{y}</option>)}
                    </select>
                  </div>
                </>
              )}

              {formTab === "contractor" && (
                <>
                  {[
                    { l: "Company Name", p: "Your company", t: "text" },
                    { l: "Contact Person", p: "Your name", t: "text" },
                    { l: "Email", p: "company@email.com", t: "email" },
                    { l: "Phone", p: "+234...", t: "tel" },
                  ].map((f) => (
                    <div key={f.l}>
                      <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "var(--clr-text)" }}>{f.l}</label>
                      <input type={f.t} placeholder={f.p} className="w-full px-4 py-3 border rounded text-sm outline-none"
                        style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)", color: "var(--clr-text)" }} />
                    </div>
                  ))}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wide mb-2" style={{ color: "var(--clr-text)" }}>Area of Specialisation</label>
                    <textarea rows={3} placeholder="Describe your core services..." className="w-full px-4 py-3 border rounded text-sm outline-none resize-none"
                      style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)", color: "var(--clr-text)" }} />
                  </div>
                </>
              )}

              <button
                data-testid="btn-submit-application"
                className="w-full py-4 font-black text-sm rounded tracking-wide flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5"
                style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                <Send size={16} /> Submit Application
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
