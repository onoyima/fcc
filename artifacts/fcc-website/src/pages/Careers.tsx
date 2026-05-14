import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "wouter";
import {
  Briefcase, MapPin, Clock, ChevronDown, ChevronUp, ArrowRight,
  HardHat, Users, Building2, Wrench, Upload, CheckCircle, Send
} from "lucide-react";

type FormTab = "job" | "labor" | "contractor";

const departments = ["All Departments", "Engineering", "Construction", "Real Estate", "Management", "Technology", "Finance", "HR"];

const jobs = [
  {
    id: 1,
    title: "Senior Structural Engineer",
    dept: "Engineering",
    location: "Lagos, Nigeria",
    type: "Full-Time",
    level: "Senior",
    desc: "Lead structural design and analysis for large-scale commercial and residential projects. Oversee a team of junior engineers and liaise with project managers.",
    requirements: [
      "B.Sc/M.Sc in Civil/Structural Engineering",
      "Minimum 7 years experience in structural design",
      "Proficiency in AutoCAD, SAP2000, STAAD Pro",
      "COREN registered",
      "Strong leadership and communication skills",
    ],
  },
  {
    id: 2,
    title: "Real Estate Sales Executive",
    dept: "Real Estate",
    location: "Abuja, Nigeria",
    type: "Full-Time",
    level: "Mid-Level",
    desc: "Drive property sales and rental targets across FCT. Manage client relationships, conduct property tours, and close transactions professionally.",
    requirements: [
      "B.Sc in Estate Management or related field",
      "3-5 years in real estate sales",
      "Proven track record of meeting sales targets",
      "Strong negotiation and interpersonal skills",
      "Valid driver's license",
    ],
  },
  {
    id: 3,
    title: "Project Manager – Construction",
    dept: "Construction",
    location: "Lagos / Port Harcourt",
    type: "Full-Time",
    level: "Senior",
    desc: "Oversee construction projects from inception to commissioning. Manage timelines, budgets, subcontractors, and client deliverables across multiple sites.",
    requirements: [
      "B.Sc in Civil Engineering, Architecture, or related field",
      "PMP or Prince2 certification preferred",
      "Minimum 8 years construction project management experience",
      "Experience managing projects above ₦500M",
      "Proficiency in MS Project, Primavera",
    ],
  },
  {
    id: 4,
    title: "Software Developer – Full Stack",
    dept: "Technology",
    location: "Lagos, Nigeria (Hybrid)",
    type: "Full-Time",
    level: "Mid-Level",
    desc: "Build and maintain FCC's digital platforms including the property management portal, client project dashboards, and mobile applications.",
    requirements: [
      "B.Sc in Computer Science or related field",
      "3+ years full-stack development experience",
      "Proficiency in React, Node.js, PostgreSQL",
      "Experience with mobile development (React Native) is a plus",
      "Strong problem-solving skills",
    ],
  },
  {
    id: 5,
    title: "Quantity Surveyor",
    dept: "Engineering",
    location: "Kano, Nigeria",
    type: "Full-Time",
    level: "Mid-Level",
    desc: "Prepare bills of quantities, cost plans, and tender documents. Monitor project costs and prepare monthly valuations and final accounts.",
    requirements: [
      "B.Sc/HND in Quantity Surveying",
      "Minimum 4 years post-NYSC experience",
      "NIQS membership preferred",
      "Proficiency in CostX, MS Excel",
      "Attention to detail and analytical mindset",
    ],
  },
  {
    id: 6,
    title: "Estate Manager",
    dept: "Management",
    location: "Abuja, Nigeria",
    type: "Full-Time",
    level: "Senior",
    desc: "Manage day-to-day operations of residential and commercial estates. Handle tenant relations, maintenance coordination, and estate compliance.",
    requirements: [
      "B.Sc in Estate Management or Facilities Management",
      "5+ years estate management experience",
      "Experience managing estates with 100+ units",
      "Strong organizational and people management skills",
      "Proficiency in property management software",
    ],
  },
];

const workerCategories = [
  { icon: <HardHat size={20} />, role: "Mason / Block Layer" },
  { icon: <Wrench size={20} />, role: "Carpenter / Joiner" },
  { icon: <Wrench size={20} />, role: "Welder / Fabricator" },
  { icon: <Wrench size={20} />, role: "Tiler" },
  { icon: <Wrench size={20} />, role: "Painter / Decorator" },
  { icon: <Wrench size={20} />, role: "Electrician" },
  { icon: <HardHat size={20} />, role: "Plumber" },
  { icon: <HardHat size={20} />, role: "POP Installer" },
  { icon: <Building2 size={20} />, role: "Interior Designer" },
  { icon: <Users size={20} />, role: "Site Supervisor" },
  { icon: <Building2 size={20} />, role: "Quantity Surveyor" },
  { icon: <HardHat size={20} />, role: "Heavy Equipment Operator" },
];

export default function Careers() {
  const [activeDept, setActiveDept] = useState("All Departments");
  const [expandedJob, setExpandedJob] = useState<number | null>(null);
  const [activeForm, setActiveForm] = useState<FormTab>("job");
  const [submitted, setSubmitted] = useState(false);

  const filtered = jobs.filter((j) =>
    activeDept === "All Departments" ? true : j.dept === activeDept
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="bg-[#0D1B38] pt-40 pb-24 relative overflow-hidden">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-48 bg-[#C9A84C]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.5) 30px, rgba(255,255,255,0.5) 31px)`
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Join Our Team</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight max-w-3xl mb-6">
            Build Your Career.<br /><span className="text-[#C9A84C]">Build Africa's</span><br />Future.
          </h1>
          <p className="text-white/60 text-lg max-w-xl leading-relaxed mb-12">
            Join a team of 1,000+ professionals shaping Africa's built environment. FCC offers career growth, competitive compensation, and the opportunity to work on landmark projects.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
            {[
              { value: "1,000+", label: "Team Members" },
              { value: "10+", label: "Offices" },
              { value: "100%", label: "Growth Culture" },
              { value: "15+", label: "Years Legacy" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black text-[#C9A84C]">{s.value}</div>
                <div className="text-white/50 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Why FCC</span>
                <span className="h-px w-12 bg-[#C9A84C]" />
              </div>
              <h2 className="text-4xl font-black text-[#0D1B38]">Why Build Your Career with Us</h2>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Career Growth", desc: "Structured career paths, mentorship programs, and leadership development across all levels." },
              { title: "Competitive Pay", desc: "Market-leading salaries, performance bonuses, and annual reviews tied to contribution." },
              { title: "Landmark Projects", desc: "Work on Nigeria's most ambitious construction and real estate developments." },
              { title: "Innovation Culture", desc: "Smart tools, digital platforms, and a forward-thinking team pushing construction into the future." },
              { title: "Health & Welfare", desc: "HMO coverage for staff and dependents, life insurance, and employee assistance programs." },
              { title: "Training", desc: "Continuous upskilling through in-house workshops, certifications, and sponsored professional courses." },
              { title: "Work-Life Balance", desc: "Flexible arrangements, leave allowances, and a culture that values personal wellbeing." },
              { title: "Staff Housing", desc: "Priority access to FCC properties and estate developments for long-serving staff members." },
            ].map((b, i) => (
              <ScrollReveal key={b.title} delay={i * 0.07}>
                <div className="bg-white p-6 rounded-sm border border-gray-100 hover:border-[#C9A84C]/30 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300">
                  <CheckCircle size={20} className="text-[#C9A84C] mb-4" />
                  <h3 className="font-black text-[#0D1B38] mb-2">{b.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Job Listings */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-10">
              <span className="h-px w-12 bg-[#C9A84C]" />
              <h2 className="text-3xl font-black text-[#0D1B38]">Open Positions</h2>
            </div>
          </ScrollReveal>

          {/* Dept Filter */}
          <div className="flex flex-wrap gap-2 mb-8">
            {departments.map((d) => (
              <button
                key={d}
                data-testid={`filter-dept-${d.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActiveDept(d)}
                className={`px-4 py-2 text-xs font-bold rounded transition-all duration-200 ${
                  activeDept === d
                    ? "bg-[#0D1B38] text-white"
                    : "bg-[#F5F7FA] text-[#0D1B38] hover:bg-[#0D1B38]/10"
                }`}
              >
                {d}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <AnimatePresence>
              {filtered.map((job, i) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  data-testid={`card-job-${job.id}`}
                  className="border border-gray-100 rounded-sm overflow-hidden hover:border-[#C9A84C]/30 transition-all duration-300"
                >
                  <button
                    className="w-full text-left p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                    onClick={() => setExpandedJob(expandedJob === job.id ? null : job.id)}
                    data-testid={`btn-expand-job-${job.id}`}
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-sm bg-[#0D1B38] flex items-center justify-center text-[#C9A84C] flex-shrink-0">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <h3 className="font-black text-[#0D1B38] text-lg">{job.title}</h3>
                        <div className="flex flex-wrap gap-3 mt-1">
                          <span className="flex items-center gap-1 text-xs text-gray-400"><MapPin size={11} className="text-[#C9A84C]" />{job.location}</span>
                          <span className="flex items-center gap-1 text-xs text-gray-400"><Clock size={11} className="text-[#C9A84C]" />{job.type}</span>
                          <span className="px-2 py-0.5 text-xs font-bold bg-[#C9A84C]/10 text-[#C9A84C] rounded">{job.dept}</span>
                          <span className="px-2 py-0.5 text-xs font-bold bg-[#0D1B38]/5 text-[#0D1B38] rounded">{job.level}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex-shrink-0 text-gray-400">
                      {expandedJob === job.id ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {expandedJob === job.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 border-t border-gray-100">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                            <div>
                              <h4 className="font-black text-[#0D1B38] mb-3">About the Role</h4>
                              <p className="text-gray-500 text-sm leading-relaxed">{job.desc}</p>
                            </div>
                            <div>
                              <h4 className="font-black text-[#0D1B38] mb-3">Requirements</h4>
                              <ul className="space-y-2">
                                {job.requirements.map((r) => (
                                  <li key={r} className="flex items-start gap-2 text-sm text-gray-500">
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] mt-1.5 flex-shrink-0" />
                                    {r}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                          <div className="mt-6 pt-4 border-t border-gray-100">
                            <button
                              data-testid={`btn-apply-job-${job.id}`}
                              onClick={() => { setActiveForm("job"); document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" }); }}
                              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0D1B38] text-white font-bold rounded text-sm hover:bg-[#C9A84C] hover:text-[#0D1B38] transition-all duration-300"
                            >
                              Apply for this Position <ArrowRight size={15} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </AnimatePresence>

            {filtered.length === 0 && (
              <div className="text-center py-16 text-gray-400">
                <Briefcase size={40} className="mx-auto mb-4 opacity-30" />
                <p>No positions in this department at the moment. Check back soon.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Labor / Artisan Registration */}
      <section className="py-20 bg-[#0D1B38]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Skilled Workers</span>
                <span className="h-px w-12 bg-[#C9A84C]" />
              </div>
              <h2 className="text-4xl font-black text-white mb-4">Join Our Artisan Database</h2>
              <p className="text-white/60 max-w-xl mx-auto text-sm leading-relaxed">
                FCC maintains Nigeria's most comprehensive database of skilled construction artisans. Register once and get matched to projects that need your skills.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-12">
            {workerCategories.map((w, i) => (
              <ScrollReveal key={w.role} delay={i * 0.05}>
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-sm px-4 py-3 hover:border-[#C9A84C]/40 hover:bg-white/10 transition-all duration-200">
                  <span className="text-[#C9A84C]">{w.icon}</span>
                  <span className="text-white/70 text-sm font-medium">{w.role}</span>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="apply-form" className="py-20 bg-[#F5F7FA]">
        <div className="max-w-4xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-10">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Apply Now</span>
                <span className="h-px w-12 bg-[#C9A84C]" />
              </div>
              <h2 className="text-3xl font-black text-[#0D1B38]">Submit Your Application</h2>
            </div>
          </ScrollReveal>

          {/* Form Tabs */}
          <div className="flex gap-1 bg-white border border-gray-200 rounded-sm p-1 mb-8">
            {([
              { key: "job", label: "Job Application", icon: <Briefcase size={15} /> },
              { key: "labor", label: "Labor Registration", icon: <HardHat size={15} /> },
              { key: "contractor", label: "Contractor Application", icon: <Building2 size={15} /> },
            ] as const).map((tab) => (
              <button
                key={tab.key}
                data-testid={`tab-form-${tab.key}`}
                onClick={() => setActiveForm(tab.key)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 text-xs font-bold rounded transition-all duration-200 ${
                  activeForm === tab.key
                    ? "bg-[#0D1B38] text-white"
                    : "text-[#0D1B38]/50 hover:text-[#0D1B38]"
                }`}
              >
                {tab.icon} {tab.label}
              </button>
            ))}
          </div>

          {submitted ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white border border-green-100 rounded-sm p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-[#C9A84C]/10 flex items-center justify-center mx-auto mb-6">
                <Send size={28} className="text-[#C9A84C]" />
              </div>
              <h3 className="text-2xl font-black text-[#0D1B38] mb-3">Application Received!</h3>
              <p className="text-gray-500 max-w-sm mx-auto text-sm">Our HR team will review your application and reach out within 5 business days.</p>
            </motion.div>
          ) : (
            <div className="bg-white border border-gray-100 rounded-sm p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#0D1B38] uppercase tracking-wide mb-2">Full Name *</label>
                    <input data-testid="apply-name" required type="text" placeholder="Your full name" className="w-full px-4 py-3 border border-gray-200 rounded text-sm text-[#0D1B38] placeholder:text-gray-400 outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0D1B38] uppercase tracking-wide mb-2">Email Address *</label>
                    <input data-testid="apply-email" required type="email" placeholder="your@email.com" className="w-full px-4 py-3 border border-gray-200 rounded text-sm text-[#0D1B38] placeholder:text-gray-400 outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#0D1B38] uppercase tracking-wide mb-2">Phone Number *</label>
                    <input data-testid="apply-phone" required type="tel" placeholder="+234 800 000 0000" className="w-full px-4 py-3 border border-gray-200 rounded text-sm text-[#0D1B38] placeholder:text-gray-400 outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-[#0D1B38] uppercase tracking-wide mb-2">
                      {activeForm === "job" ? "Position Applied For" : activeForm === "labor" ? "Skill / Trade" : "Company Name"}
                    </label>
                    {activeForm === "labor" ? (
                      <select data-testid="apply-role" className="w-full px-4 py-3 border border-gray-200 rounded text-sm text-[#0D1B38] outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all">
                        <option value="">Select your trade...</option>
                        {workerCategories.map((w) => <option key={w.role}>{w.role}</option>)}
                      </select>
                    ) : (
                      <input data-testid="apply-position" type="text" placeholder={activeForm === "job" ? "e.g. Senior Engineer" : "Your company name"} className="w-full px-4 py-3 border border-gray-200 rounded text-sm text-[#0D1B38] placeholder:text-gray-400 outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all" />
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0D1B38] uppercase tracking-wide mb-2">Years of Experience</label>
                  <select data-testid="apply-experience" className="w-full px-4 py-3 border border-gray-200 rounded text-sm text-[#0D1B38] outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all">
                    <option>Less than 1 year</option>
                    <option>1 - 3 years</option>
                    <option>3 - 5 years</option>
                    <option>5 - 10 years</option>
                    <option>10+ years</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0D1B38] uppercase tracking-wide mb-2">Cover Letter / Message</label>
                  <textarea data-testid="apply-message" rows={4} placeholder="Tell us about yourself, your experience, and why you want to work with FCC..." className="w-full px-4 py-3 border border-gray-200 rounded text-sm text-[#0D1B38] placeholder:text-gray-400 outline-none focus:border-[#C9A84C] focus:ring-1 focus:ring-[#C9A84C] transition-all resize-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#0D1B38] uppercase tracking-wide mb-2">
                    {activeForm === "labor" ? "ID / Certification" : "CV / Resume"} (PDF or Word)
                  </label>
                  <div data-testid="upload-cv" className="border-2 border-dashed border-gray-200 rounded px-6 py-8 text-center hover:border-[#C9A84C] transition-colors cursor-pointer group">
                    <Upload size={24} className="mx-auto mb-2 text-gray-300 group-hover:text-[#C9A84C] transition-colors" />
                    <p className="text-sm text-gray-400 group-hover:text-[#C9A84C] transition-colors">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-300 mt-1">PDF, DOC, DOCX up to 5MB</p>
                    <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                  </div>
                </div>
                <button type="submit" data-testid="btn-submit-application" className="w-full py-4 bg-[#0D1B38] text-white font-black rounded text-sm tracking-wide hover:bg-[#C9A84C] hover:text-[#0D1B38] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2">
                  Submit Application <Send size={16} />
                </button>
              </form>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
