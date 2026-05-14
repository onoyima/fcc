import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "wouter";
import { ArrowRight, MapPin, Calendar, Building2 } from "lucide-react";

const categories = ["All", "Residential", "Commercial", "Infrastructure", "Industrial", "Mixed Use"];

const projects = [
  {
    title: "Marina Heights Tower",
    category: "Commercial",
    status: "Completed",
    location: "Lagos, Nigeria",
    year: "2024",
    area: "12,000 sqm",
    desc: "A landmark 18-storey commercial tower featuring Class-A office spaces, retail podium, and rooftop amenities in Victoria Island.",
  },
  {
    title: "Greenfield Estate Phase 1",
    category: "Residential",
    status: "Completed",
    location: "Abuja, Nigeria",
    year: "2023",
    area: "45 hectares",
    desc: "A premium gated estate with 200 luxury residential units, club house, sports facilities, and smart home integration.",
  },
  {
    title: "Central Business Hub",
    category: "Commercial",
    status: "Ongoing",
    location: "Port Harcourt, Nigeria",
    year: "2025",
    area: "8,500 sqm",
    desc: "A mixed-use commercial complex with state-of-the-art offices, conference facilities, and ground-floor retail.",
  },
  {
    title: "Heritage Plaza",
    category: "Mixed Use",
    status: "Completed",
    location: "Kano, Nigeria",
    year: "2023",
    area: "6,200 sqm",
    desc: "A contemporary mixed-use development blending retail, residential, and hospitality spaces in the heart of Kano.",
  },
  {
    title: "Skyline Apartments",
    category: "Residential",
    status: "Ongoing",
    location: "Ibadan, Nigeria",
    year: "2025",
    area: "3,800 sqm",
    desc: "A 120-unit modern apartment complex with shared amenities, underground parking, and energy-efficient systems.",
  },
  {
    title: "Metro Road Network",
    category: "Infrastructure",
    status: "Completed",
    location: "Benin City, Nigeria",
    year: "2022",
    area: "22 km",
    desc: "A comprehensive urban road network project including drainage systems, street lighting, and pedestrian walkways.",
  },
  {
    title: "Apex Industrial Park",
    category: "Industrial",
    status: "Completed",
    location: "Ogun State, Nigeria",
    year: "2022",
    area: "28 hectares",
    desc: "A fully serviced industrial estate with 50 warehouse units, power supply infrastructure, and road access.",
  },
  {
    title: "University Teaching Hospital",
    category: "Infrastructure",
    status: "Completed",
    location: "Enugu, Nigeria",
    year: "2021",
    area: "18,000 sqm",
    desc: "A 400-bed specialist hospital complex with modern operating theatres, ICU, radiology, and administrative blocks.",
  },
  {
    title: "Pearl Gardens Estate",
    category: "Residential",
    status: "Ongoing",
    location: "Lekki, Lagos",
    year: "2025",
    area: "60 hectares",
    desc: "A smart estate development featuring 500 homes with solar integration, smart gate access, and community management platforms.",
  },
];

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = projects.filter((p) =>
    activeCategory === "All" ? true : p.category === activeCategory
  );

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
            <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Our Portfolio</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight max-w-3xl">
            Projects That<br /><span className="text-[#C9A84C]">Define Cities</span>
          </h1>
          <p className="mt-6 text-white/60 text-lg max-w-xl leading-relaxed">
            500+ completed projects across residential, commercial, industrial, and infrastructure sectors — each one a testament to FCC's commitment to excellence.
          </p>

          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-2xl">
            {[
              { value: "500+", label: "Projects" },
              { value: "10+", label: "Cities" },
              { value: "15+", label: "Years" },
              { value: "100%", label: "Commitment" },
            ].map((s) => (
              <div key={s.label}>
                <div className="text-3xl font-black text-[#C9A84C]">{s.value}</div>
                <div className="text-white/50 text-sm mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Filter */}
      <section className="py-12 bg-[#F5F7FA] border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                data-testid={`filter-${cat.toLowerCase().replace(" ", "-")}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 text-sm font-bold rounded transition-all duration-300 ${
                  activeCategory === cat
                    ? "bg-[#0D1B38] text-white"
                    : "bg-white text-[#0D1B38] border border-gray-200 hover:border-[#C9A84C] hover:text-[#C9A84C]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((p, i) => (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                  data-testid={`card-project-${i}`}
                  className="group bg-white rounded-sm border border-gray-100 overflow-hidden hover:shadow-[0_20px_60px_rgba(13,27,56,0.12)] transition-all duration-400 hover:-translate-y-1"
                >
                  {/* Color header */}
                  <div className="h-3 bg-[#0D1B38] group-hover:bg-[#C9A84C] transition-colors duration-500" />

                  <div className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-[#C9A84C] text-xs font-bold tracking-widest uppercase">{p.category}</span>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${
                        p.status === "Completed"
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "bg-amber-50 text-amber-700 border border-amber-200"
                      }`}>
                        {p.status}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-[#0D1B38] mb-3 group-hover:text-[#C9A84C] transition-colors duration-300">{p.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6">{p.desc}</p>

                    <div className="grid grid-cols-2 gap-4 pt-6 border-t border-gray-100">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <MapPin size={13} className="text-[#C9A84C]" />
                        {p.location}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <Calendar size={13} className="text-[#C9A84C]" />
                        {p.year}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-400 col-span-2">
                        <Building2 size={13} className="text-[#C9A84C]" />
                        {p.area}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400">
              <p className="text-lg font-semibold">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-[#0D1B38]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
              Your Project Could Be<br />Our Next Success Story
            </h2>
            <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
              From a single unit to a full city district — FCC has the experience, capacity, and technology to deliver.
            </p>
            <Link
              href="/contact"
              data-testid="btn-projects-cta"
              className="inline-flex items-center gap-2 px-10 py-5 bg-[#C9A84C] text-[#0D1B38] font-black rounded text-sm tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(201,168,76,0.4)]"
            >
              Start a Project <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
