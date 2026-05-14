import { motion } from "framer-motion";
import { Link } from "wouter";
import { Building2, Home as HomeIcon, Shield, Wrench, Users, ChevronRight, ArrowRight, Star, Quote } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import StatCounter from "@/components/StatCounter";
import PropertySearch from "@/components/PropertySearch";
import ConstructionCalculator from "@/components/ConstructionCalculator";
import brandImg from "@assets/ChatGPT_Image_May_14,_2026,_11_05_45_PM_1778796680819.png";

const services = [
  { icon: <Building2 size={28} />, title: "Construction & Engineering", desc: "Residential, commercial, industrial, and government infrastructure built to world-class standards." },
  { icon: <HomeIcon size={28} />, title: "Real Estate & Property", desc: "Premium land sales, property listings, luxury estates, and investment consulting." },
  { icon: <Shield size={28} />, title: "Facility & Property Management", desc: "End-to-end estate management, tenant onboarding, lease agreements, and maintenance." },
  { icon: <Wrench size={28} />, title: "Interior & Finishing", desc: "High-end interior design, fit-out, POP installation, and finishing services." },
  { icon: <Users size={28} />, title: "Workforce & Equipment", desc: "Skilled artisan database, equipment tracking, fleet management, and project staffing." },
];

const projects = [
  { title: "Marina Heights Tower", category: "Commercial", status: "Completed", location: "Lagos, Nigeria", budget: "₦2.4B", year: "2024" },
  { title: "Greenfield Estate Phase 1", category: "Residential", status: "Completed", location: "Abuja, Nigeria", budget: "₦5.1B", year: "2023" },
  { title: "Central Business Hub", category: "Infrastructure", status: "Ongoing", location: "Port Harcourt", budget: "₦1.8B", year: "2025" },
  { title: "Heritage Plaza", category: "Mixed Use", status: "Completed", location: "Kano, Nigeria", budget: "₦950M", year: "2023" },
  { title: "Skyline Apartments", category: "Residential", status: "Ongoing", location: "Ibadan, Nigeria", budget: "₦720M", year: "2025" },
  { title: "Metro Road Network", category: "Civil", status: "Completed", location: "Benin City", budget: "₦3.2B", year: "2022" },
];

const testimonials = [
  { name: "Engr. Samuel Okafor", role: "Director, Federal Housing Authority", text: "FCC delivered our government housing project on time and within budget. Their professionalism and quality of work is unmatched in the industry." },
  { name: "Mrs. Adaeze Nwosu", role: "CEO, Prime Properties Ltd", text: "Working with Fore-City Construction has transformed how we approach real estate development. Their integrated platform is a game-changer." },
  { name: "Alhaji Ibrahim Tanko", role: "Managing Director, Tanko Group", text: "From foundation to finishing, FCC handled our corporate headquarters with exceptional attention to detail. Truly one company with endless possibilities." },
];

const beforeAfter = [
  { title: "Greenfield Estate", phase: "Before: Bare land / After: Luxury estate", year: "2023" },
  { title: "Marina Heights", phase: "Before: Foundation / After: 18-storey tower", year: "2024" },
  { title: "Heritage Plaza", phase: "Before: Shell / After: Fully fitted complex", year: "2023" },
];

const clientLogos = [
  "Federal Housing Authority",
  "FMBN",
  "Julius Berger",
  "Dangote Group",
  "Access Bank",
  "LASG Works",
  "Tanko Group",
  "Prime Properties",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0D1B38]">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.2 }} className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B38] via-[#0D1B38]/95 to-[#162040]" />
          <div className="absolute top-0 right-0 w-2/3 h-full opacity-20"
            style={{ backgroundImage: `url(${brandImg})`, backgroundSize: "cover", backgroundPosition: "center right" }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0D1B38] via-[#0D1B38]/80 to-transparent" />
        </motion.div>

        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-48 bg-[#C9A84C]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pt-24 pb-16 w-full">
          <div className="max-w-3xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="flex items-center gap-3 mb-8">
              <span className="h-px w-12 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-bold tracking-[0.3em] uppercase">Building Cities. Creating Futures.</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.05] tracking-tight mb-8"
            >
              Africa's Premier<br /><span className="text-[#C9A84C]">Construction</span><br />Powerhouse
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.7 }}
              className="text-lg text-white/70 leading-relaxed mb-10 max-w-xl"
            >
              FCC Fore-City Construction delivers world-class construction, real estate, and integrated property solutions — from foundation to finish, across Africa's fastest-growing cities.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.85 }} className="flex flex-wrap gap-4">
              <Link href="/projects" data-testid="btn-hero-projects"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#C9A84C] text-[#0D1B38] font-bold rounded text-sm tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(201,168,76,0.45)]"
              >
                View Our Projects <ArrowRight size={16} />
              </Link>
              <Link href="/contact" data-testid="btn-hero-contact"
                className="inline-flex items-center gap-2 px-8 py-4 border border-white/30 text-white font-semibold rounded text-sm tracking-wide transition-all duration-300 hover:border-[#C9A84C] hover:text-[#C9A84C] hover:-translate-y-1"
              >
                Get a Quote <ChevronRight size={16} />
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1, duration: 0.8 }} className="mt-16 flex flex-wrap gap-3">
              {["INNOVATE", "BUILD", "MANAGE", "GROW"].map((tag) => (
                <span key={tag} className="px-4 py-1.5 border border-[#C9A84C]/30 text-[#C9A84C]/70 text-xs font-bold tracking-[0.25em] rounded-full">{tag}</span>
              ))}
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-white/30 text-xs tracking-widest">SCROLL</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-px h-12 bg-gradient-to-b from-[#C9A84C]/60 to-transparent" />
        </motion.div>
      </section>

      {/* Property Search */}
      <section className="bg-[#0D1B38] py-16 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-12 bg-[#C9A84C]" />
              <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Property Marketplace</span>
            </div>
            <h2 className="text-3xl font-black text-white mb-8">Find Your Perfect Property</h2>
            <PropertySearch />
            <div className="mt-4 text-center">
              <Link href="/properties" className="text-white/40 text-xs hover:text-[#C9A84C] transition-colors">
                Browse all {9}+ listings →
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-[#0A1628] border-t border-white/10 py-20">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">
            <StatCounter value={500} label="Projects Completed" icon={<Building2 size={28} />} />
            <StatCounter value={1000} label="Skilled Workforce" icon={<Users size={28} />} />
            <StatCounter value={2000} label="Properties Managed" icon={<HomeIcon size={28} />} />
            <StatCounter value={5000} label="Happy Clients" icon={<Star size={28} />} />
            <StatCounter value={10} label="Cities & Growing" icon={<Shield size={28} />} />
            <StatCounter value={15} suffix="+" label="Years Experience" icon={<Wrench size={28} />} />
          </div>
        </div>
      </section>

      {/* About Intro */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div className="relative">
              <div className="absolute -top-6 -left-6 w-24 h-24 border-t-4 border-l-4 border-[#C9A84C]" />
              <div className="absolute -bottom-6 -right-6 w-24 h-24 border-b-4 border-r-4 border-[#C9A84C]" />
              <img src={brandImg} alt="FCC Blueprint" className="rounded-sm shadow-2xl w-full object-cover" />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">About FCC</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0D1B38] leading-tight mb-6">One Company.<br />Endless Possibilities.</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                FCC Fore-City Construction is a full-scale construction, engineering, infrastructure, real estate, and property technology company. We combine construction expertise with smart technology to deliver integrated solutions across residential, commercial, industrial, and government sectors.
              </p>
              <p className="text-gray-600 leading-relaxed mb-10">
                Operating across 10+ cities and growing, we are positioned to become one of Africa's leading smart construction and real estate enterprises — trusted for professionalism, transparency, and innovation.
              </p>
              <Link href="/about" data-testid="btn-learn-more"
                className="inline-flex items-center gap-2 text-[#0D1B38] font-bold text-sm border-b-2 border-[#C9A84C] pb-1 hover:text-[#C9A84C] transition-colors duration-300"
              >
                Learn Our Story <ArrowRight size={15} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-28 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">What We Do</span>
                <span className="h-px w-12 bg-[#C9A84C]" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0D1B38]">Our Core Divisions</h2>
              <p className="mt-4 text-gray-500 max-w-xl mx-auto">Five integrated business divisions, one unified platform — delivering excellence at every stage of construction and property management.</p>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((s, i) => (
              <ScrollReveal key={s.title} delay={i * 0.1}>
                <div data-testid={`card-service-${i}`}
                  className="group bg-white rounded-sm border border-gray-100 p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(13,27,56,0.12)] hover:border-[#C9A84C]/30 cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-sm bg-[#0D1B38] flex items-center justify-center text-[#C9A84C] mb-6 transition-all duration-300 group-hover:bg-[#C9A84C] group-hover:text-[#0D1B38]">
                    {s.icon}
                  </div>
                  <h3 className="text-lg font-bold text-[#0D1B38] mb-3">{s.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
                  <div className="mt-6 flex items-center gap-1 text-[#C9A84C] text-xs font-bold tracking-wide opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn More <ChevronRight size={14} />
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal>
            <div className="text-center mt-12">
              <Link href="/services" data-testid="btn-all-services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#0D1B38] text-white font-bold rounded text-sm tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_32px_rgba(13,27,56,0.25)] hover:bg-[#C9A84C] hover:text-[#0D1B38]"
              >
                Explore All Services <ArrowRight size={16} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-16 gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="h-px w-12 bg-[#C9A84C]" />
                  <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Portfolio</span>
                </div>
                <h2 className="text-4xl lg:text-5xl font-black text-[#0D1B38]">Featured Projects</h2>
              </div>
              <Link href="/projects" data-testid="btn-view-all-projects"
                className="flex-shrink-0 inline-flex items-center gap-2 text-[#0D1B38] font-bold text-sm border-b-2 border-[#C9A84C] pb-1 hover:text-[#C9A84C] transition-colors duration-300"
              >
                View All Projects <ArrowRight size={15} />
              </Link>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((p, i) => (
              <ScrollReveal key={p.title} delay={i * 0.08}>
                <div data-testid={`card-project-${i}`}
                  className="group relative overflow-hidden rounded-sm bg-[#0D1B38] aspect-[4/3] cursor-pointer"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#0D1B38] to-[#162040] transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0D1B38] via-transparent to-transparent opacity-80" />
                  <div className="absolute top-4 right-4">
                    <span className={`px-3 py-1 text-xs font-bold rounded-full ${p.status === "Completed" ? "bg-green-500/20 text-green-400 border border-green-500/30" : "bg-[#C9A84C]/20 text-[#C9A84C] border border-[#C9A84C]/30"}`}>
                      {p.status}
                    </span>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <span className="text-[#C9A84C] text-xs font-bold tracking-widest uppercase mb-2 block">{p.category}</span>
                    <h3 className="text-white font-black text-xl mb-1">{p.title}</h3>
                    <div className="flex items-center justify-between">
                      <p className="text-white/50 text-sm">{p.location}</p>
                      <span className="text-[#C9A84C] text-xs font-bold">{p.budget}</span>
                    </div>
                  </div>
                  <div className="absolute inset-0 border-2 border-[#C9A84C]/0 group-hover:border-[#C9A84C]/30 transition-all duration-300 rounded-sm" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Before & After Gallery */}
      <section className="py-28 bg-[#F5F7FA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Transformations</span>
                <span className="h-px w-12 bg-[#C9A84C]" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0D1B38]">Before & After</h2>
              <p className="mt-4 text-gray-500 max-w-xl mx-auto">See how FCC transforms sites from raw land and bare concrete into landmark developments.</p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {beforeAfter.map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.12}>
                <div className="rounded-sm overflow-hidden border border-gray-100 bg-white group hover:shadow-[0_20px_60px_rgba(13,27,56,0.12)] hover:-translate-y-1 transition-all duration-300">
                  {/* Split visualization */}
                  <div className="relative h-56 overflow-hidden">
                    <div className="absolute inset-0 flex">
                      {/* Before side */}
                      <div className="flex-1 bg-gradient-to-br from-gray-400 to-gray-600 flex flex-col items-center justify-center relative">
                        <span className="absolute top-3 left-3 text-xs font-black text-white bg-black/40 px-2 py-1 rounded uppercase tracking-wider">Before</span>
                        <div className="text-white/20 font-black text-5xl select-none">B</div>
                        <div className="absolute inset-0 opacity-10" style={{
                          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 5px, rgba(255,255,255,0.3) 5px, rgba(255,255,255,0.3) 6px)`
                        }} />
                      </div>
                      {/* Divider */}
                      <div className="w-1 bg-white z-10 relative">
                        <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center z-20">
                          <div className="flex gap-0.5">
                            <div className="w-0.5 h-4 bg-[#0D1B38]" />
                            <div className="w-0.5 h-4 bg-[#0D1B38]" />
                          </div>
                        </div>
                      </div>
                      {/* After side */}
                      <div className="flex-1 bg-gradient-to-br from-[#0D1B38] to-[#1a2d5a] flex flex-col items-center justify-center relative">
                        <span className="absolute top-3 right-3 text-xs font-black text-[#C9A84C] bg-[#C9A84C]/10 border border-[#C9A84C]/30 px-2 py-1 rounded uppercase tracking-wider">After</span>
                        <div className="text-[#C9A84C]/20 font-black text-5xl select-none">A</div>
                        <div className="absolute inset-0 opacity-5" style={{
                          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 20px, rgba(201,168,76,0.5) 20px, rgba(201,168,76,0.5) 21px)`
                        }} />
                      </div>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-black text-[#0D1B38] mb-1">{item.title}</h3>
                    <p className="text-gray-500 text-xs">{item.phase}</p>
                    <span className="text-[#C9A84C] text-xs font-bold">Delivered {item.year}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div className="text-center mt-10">
              <Link href="/projects" className="inline-flex items-center gap-2 text-[#0D1B38] font-bold text-sm border-b-2 border-[#C9A84C] pb-1 hover:text-[#C9A84C] transition-colors">
                See All Projects <ArrowRight size={14} />
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Construction Calculator */}
      <section className="py-28 bg-[#0D1B38] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px)`
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Budget Tool</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                Estimate Your Construction Cost
              </h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Use our instant construction cost calculator to get a ballpark estimate for your project — whether it's a 3-bedroom bungalow or a 20-storey commercial tower. Select your building type, size, finish level, and location to get started.
              </p>
              <ul className="space-y-3 mb-8">
                {["Based on current Nigerian market rates", "Accounts for location premiums", "Adjustable finish levels", "Instant result with cost range"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/60 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#0D1B38] font-black rounded text-sm tracking-wide hover:-translate-y-0.5 hover:shadow-lg transition-all duration-300">
                Get Detailed Quote <ArrowRight size={15} />
              </Link>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.15}>
            <ConstructionCalculator />
          </ScrollReveal>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-20 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Trusted By</span>
                <span className="h-px w-12 bg-[#C9A84C]" />
              </div>
              <h2 className="text-3xl font-black text-[#0D1B38]">Clients Who Trust FCC</h2>
            </div>
          </ScrollReveal>
          <ScrollReveal>
            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
              {clientLogos.map((name, i) => (
                <div
                  key={name}
                  data-testid={`logo-client-${i}`}
                  className="flex items-center justify-center h-20 bg-[#F5F7FA] rounded-sm border border-gray-100 hover:border-[#C9A84C]/30 hover:bg-white hover:shadow-sm transition-all duration-300 px-3 group cursor-default"
                >
                  <span className="text-[#0D1B38]/40 text-xs font-black text-center leading-tight group-hover:text-[#0D1B38]/70 transition-colors duration-300">{name}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-28 bg-[#0D1B38] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px)`
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Why FCC</span>
                <span className="h-px w-12 bg-[#C9A84C]" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-white">Built on Trust.<br />Driven by Excellence.</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "Integrity", desc: "We operate with complete transparency and ethical standards in every engagement, from quotation to delivery." },
              { title: "Safety First", desc: "Industry-leading safety protocols on every site — protecting our workforce, clients, and communities." },
              { title: "Innovation", desc: "Smart construction technology and digital platforms that put us decades ahead of the competition." },
              { title: "Excellence", desc: "World-class quality standards enforced at every milestone — from materials to final finishes." },
              { title: "Customer Focus", desc: "Dedicated account management and real-time project tracking so you're always in control." },
              { title: "Accountability", desc: "We own every commitment, every timeline, and every result — no excuses, just delivery." },
            ].map((v, i) => (
              <ScrollReveal key={v.title} delay={i * 0.1}>
                <div className="border border-white/10 rounded-sm p-8 hover:border-[#C9A84C]/40 transition-all duration-300 group">
                  <div className="w-10 h-0.5 bg-[#C9A84C] mb-6 transition-all duration-300 group-hover:w-16" />
                  <h3 className="text-white font-black text-xl mb-3">{v.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-4">
                <span className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Testimonials</span>
                <span className="h-px w-12 bg-[#C9A84C]" />
              </div>
              <h2 className="text-4xl lg:text-5xl font-black text-[#0D1B38]">What Our Clients Say</h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 0.12}>
                <div className="bg-[#F5F7FA] rounded-sm p-8 relative group hover:bg-[#0D1B38] transition-all duration-500">
                  <Quote size={32} className="text-[#C9A84C] mb-6 opacity-60" />
                  <p className="text-gray-600 group-hover:text-white/70 leading-relaxed mb-8 transition-colors duration-300 text-sm">{t.text}</p>
                  <div className="border-t border-gray-200 group-hover:border-white/10 pt-6 transition-colors duration-300">
                    <div className="font-black text-[#0D1B38] group-hover:text-white transition-colors duration-300">{t.name}</div>
                    <div className="text-xs text-[#C9A84C] mt-1">{t.role}</div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-24 bg-[#C9A84C] relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(13,27,56,0.5) 30px, rgba(13,27,56,0.5) 31px)`
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 text-center">
          <ScrollReveal>
            <h2 className="text-4xl lg:text-6xl font-black text-[#0D1B38] mb-6 leading-tight">Ready to Build<br />Something Extraordinary?</h2>
            <p className="text-[#0D1B38]/70 text-lg mb-10 max-w-xl mx-auto">Partner with Africa's most innovative construction and real estate company. Let's bring your vision to life.</p>
            <Link href="/contact" data-testid="btn-cta-contact"
              className="inline-flex items-center gap-2 px-10 py-5 bg-[#0D1B38] text-white font-black rounded text-sm tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(13,27,56,0.4)]"
            >
              Start Your Project <ArrowRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
