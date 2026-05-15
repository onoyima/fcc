import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Linkedin, Twitter, Mail, Phone, MapPin, Award, GraduationCap, Briefcase, ChevronRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { AnimatedBlobs, FloatingShapes, AnimatedGrid } from "@/components/AnimatedBackground";
import brandImg from "@assets/ChatGPT_Image_May_14,_2026,_11_05_45_PM_1778796680819.png";
import { useLang } from "@/contexts/LanguageContext";
import { Link } from "wouter";

interface TeamMember {
  id: number;
  name: string;
  role: string;
  department: string;
  image: string;
  shortBio: string;
  fullBio: string;
  education: string;
  experience: string;
  certifications: string[];
  location: string;
  linkedin?: string;
  twitter?: string;
  email?: string;
  phone?: string;
}

const team: TeamMember[] = [
  {
    id: 1,
    name: "Arch. Michael Ike",
    role: "Founder & Group CEO",
    department: "Executive",
    image: "https://www.facebook.com/photo.php?fbid=2891769704347565&type=3&mibextid=wwXIfr&rdid=tNSEitzqqcaXijsg&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1BY3sfUrxf%2F%3Fmibextid%3DwwXIfr#",
    shortBio: "Visionary leader with 25+ years in construction and real estate across Africa.",
    fullBio: "Engr. Kola Ademola founded FCC Fore-City Construction with a vision to transform Africa's built environment. With over 25 years of experience spanning construction, real estate development, and infrastructure projects across Nigeria, Ghana, and Kenya, he has led the company from a small contracting firm to one of Nigeria's most integrated construction and property technology companies. His leadership philosophy centers on integrity, innovation, and delivering exceptional value to clients and communities.",
    education: "B.Eng Civil Engineering, University of Lagos\nMBA, Lagos Business School\nCOREN Registered Engineer",
    experience: "25+ years in construction & real estate\nFounded FCC in 2008\nLed 200+ major projects\nOversaw ₦200B+ in project value",
    certifications: ["COREN Registered Engineer", "NSE Fellow", "PMP Certified", "ISO 9001:2015 Lead Auditor"],
    location: "Lagos, Nigeria",
    linkedin: "#",
    email: "kola.ademola@forecityconstruction.com",
  },
  {
    id: 2,
    name: "Arc. Funmi Adebayo",
    role: "Chief Operations Officer",
    department: "Executive",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80",
    shortBio: "Operations expert driving excellence across all FCC divisions and projects.",
    fullBio: "Arc. Funmi Adebayo brings 18 years of architectural and operational leadership to FCC. She oversees the day-to-day operations of all five business divisions, ensuring seamless coordination between construction, real estate, facility management, interior design, and workforce teams. Her background in sustainable architecture and project management has been instrumental in establishing FCC's reputation for quality and on-time delivery.",
    education: "B.Arch, University of Lagos\nM.Sc Construction Management, University of Reading, UK\nNIA Member",
    experience: "18 years in architecture & operations\nManaged 80+ major projects\nLed operational expansion to 10+ states",
    certifications: ["NIA Registered Architect", "LEED Green Associate", "NEBOSH Certified", "Six Sigma Green Belt"],
    location: "Lagos, Nigeria",
    linkedin: "#",
    email: "funmi.adebayo@forecityconstruction.com",
  },
  {
    id: 3,
    name: "Dr. Tunde Bakare",
    role: "Chief Financial Officer",
    department: "Executive",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    shortBio: "Strategic financial leader managing FCC's multi-billion naira portfolio.",
    fullBio: "Dr. Tunde Bakare is a seasoned finance executive with over 20 years experience in corporate finance, project financing, and investment management. He joined FCC from a leading investment bank where he structured over ₦50 billion in infrastructure financing. At FCC, he oversees financial strategy, treasury operations, project financing, and investor relations. His expertise in capital structuring has enabled FCC to undertake landmark projects valued at over ₦200 billion.",
    education: "B.Sc Accounting, University of Ibadan\nMBA Finance, Harvard Business School\nPhD Economics, University of Lagos",
    experience: "20+ years in finance & investments\nStructured ₦50B+ in project financing\nManaged ₦200B+ portfolio",
    certifications: ["Fellow, Institute of Chartered Accountants (FCA)", "CFA Charterholder", "CIMA Fellow"],
    location: "Lagos, Nigeria",
    linkedin: "#",
    email: "tunde.bakare@forecityconstruction.com",
  },
  {
    id: 4,
    name: "Engr. Sarah Ogunlesi",
    role: "Director, Construction & Engineering",
    department: "Construction",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&q=80",
    shortBio: "Award-winning civil engineer leading FCC's construction and engineering division.",
    fullBio: "Engr. Sarah Ogunlesi leads FCC's flagship Construction & Engineering division with 15 years of experience in civil and structural engineering. She has overseen the delivery of over 120 projects including high-rise commercial towers, residential estates, road infrastructure, and industrial facilities. Her commitment to quality and innovation has earned FCC multiple industry awards and a 94% on-time delivery rate.",
    education: "B.Eng Civil Engineering, Obafemi Awolowo University\nM.Sc Structural Engineering, University of Lagos",
    experience: "15 years in construction engineering\nDelivered 120+ projects\nSpecializes in high-rise & infrastructure",
    certifications: ["COREN Registered Engineer", "NSE Corporate Member", "OSHA Safety Certified", "BIM Specialist"],
    location: "Lagos, Nigeria",
    linkedin: "#",
    email: "sarah.ogunlesi@forecityconstruction.com",
  },
  {
    id: 5,
    name: "Mr. Chidi Okonkwo",
    role: "Director, Real Estate & Properties",
    department: "Real Estate",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    shortBio: "Real estate visionary connecting investors to premium opportunities nationwide.",
    fullBio: "Mr. Chidi Okonkwo heads FCC's Real Estate & Property Division, bringing 16 years of experience in property development, sales, and investment advisory. Under his leadership, the division has facilitated over ₦80 billion in property transactions and developed 6 landmark estate projects. His deep understanding of Nigeria's property markets and commitment to transparent transactions has made FCC a trusted name in real estate.",
    education: "B.Sc Estate Management, University of Nigeria, Nsukka\nMBA Real Estate, University of Lagos",
    experience: "16 years in real estate\nFacilitated ₦80B+ in transactions\nDeveloped 6 major estates",
    certifications: ["NIESV Registered", "ESVARBON Licensed", "RICS Affiliate", "Certified Property Manager"],
    location: "Abuja, Nigeria",
    linkedin: "#",
    email: "chidi.okonkwo@forecityconstruction.com",
  },
  {
    id: 6,
    name: "Arc. Bisi Ogunbiyi",
    role: "Director, Interior Design & Finishing",
    department: "Interior Design",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    shortBio: "Award-winning interior architect transforming spaces across Africa.",
    fullBio: "Arc. Bisi Ogunbiyi brings 14 years of interior architecture and design expertise to FCC. She has led the interior design and finishing for over 200 luxury residential, commercial, and hospitality projects across Nigeria and West Africa. Her portfolio includes the interior design of a 5-star hotel in Abuja and multiple luxury penthouse developments in Lagos. Her work has been featured in Architectural Digest Africa and Design Week Lagos.",
    education: "B.Arch, University of Lagos\nM.Sc Interior Architecture, Parsons School of Design, New York",
    experience: "14 years in interior design\n200+ projects completed\nAward-winning designer",
    certifications: ["NIA Registered", "IIDA Professional Member", "LEED AP Interior Design"],
    location: "Lagos, Nigeria",
    linkedin: "#",
    email: "bisi.ogunbiyi@forecityconstruction.com",
  },
  {
    id: 7,
    name: "Engr. Mohammed Hassan",
    role: "Director, Infrastructure Projects",
    department: "Construction",
    image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&q=80",
    shortBio: "Infrastructure specialist behind Nigeria's critical road and bridge projects.",
    fullBio: "Engr. Mohammed Hassan leads FCC's Infrastructure division, specializing in roads, bridges, and civil engineering works. With 19 years of experience, he has delivered over 200 kilometers of roadway, 12 major bridges, and multiple drainage and water management systems across Northern and Southern Nigeria. His expertise in large-scale infrastructure project management has been crucial to FCC's success in government contracts.",
    education: "B.Eng Civil Engineering, Ahmadu Bello University, Zaria\nM.Sc Highway Engineering, University of Leeds, UK",
    experience: "19 years in infrastructure\n200+ km of roadway delivered\n12 major bridges constructed",
    certifications: ["COREN Registered Engineer", "NSE Fellow", "PMI-RMP Certified", "NIMechE Member"],
    location: "Abuja, Nigeria",
    linkedin: "#",
    email: "mohammed.hassan@forecityconstruction.com",
  },
  {
    id: 8,
    name: "Mrs. Chioma Eze",
    role: "Director, Facility & Property Management",
    department: "Property Management",
    image: "https://images.unsplash.com/photo-1489424731084-a5d8b219a5bb?w=400&q=80",
    shortBio: "Property management expert ensuring FCC-managed assets deliver maximum value.",
    fullBio: "Mrs. Chioma Eze leads FCC's Facility & Property Management Division with 13 years of experience in estate and facility management. She oversees the management of over 50 commercial and residential properties, including 3 major shopping malls, 15 office complexes, and multiple residential estates. Her innovative approach to property management has consistently delivered above-market occupancy rates and tenant satisfaction scores.",
    education: "B.Sc Estate Management, University of Port Harcourt\nM.Sc Facility Management, Manchester Metropolitan University",
    experience: "13 years in property management\nManages 50+ commercial properties\n97% tenant satisfaction rate",
    certifications: ["NIESV Registered", "IFMA Certified Facility Manager", "ISO 55001 Asset Management"],
    location: "Port Harcourt, Nigeria",
    linkedin: "#",
    email: "chioma.eze@forecityconstruction.com",
  },
  {
    id: 9,
    name: "Mr. Adekunle Johnson",
    role: "Director, Workforce & Equipment",
    department: "Human Resources",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    shortBio: "Building Africa's largest construction workforce and equipment database.",
    fullBio: "Mr. Adekunle Johnson heads FCC's Workforce & Equipment Solutions Division. With 12 years of experience in human capital management and heavy equipment operations, he has built Africa's most comprehensive database of certified construction professionals. His division supplies skilled workforce and heavy equipment to over 200 construction sites annually. He is passionate about skills development and has placed over 5,000 artisans in gainful employment.",
    education: "B.Sc Human Resources Management, University of Ibadan\nMBA Operations Management, Lagos Business School",
    experience: "12 years in workforce management\nBuilt database of 10,000+ professionals\nPlaced 5,000+ artisans",
    certifications: ["CIPM Member", "NIM Chartered", "ISO 45001 Lead Auditor"],
    location: "Lagos, Nigeria",
    linkedin: "#",
    email: "adekunle.johnson@forecityconstruction.com",
  },
  {
    id: 10,
    name: "Dr. Ngozi Okafor",
    role: "Head, Smart Technology & Digital Services",
    department: "Technology",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
    shortBio: "Tech innovator driving FCC's smart city and digital transformation initiatives.",
    fullBio: "Dr. Ngozi Okafor leads FCC's Smart Technology & Digital Services division, driving the company's digital transformation and smart city initiatives. She holds a PhD in Computer Science with specialization in IoT and Smart Systems from the University of Cape Town. She has led the development of FCC's AI-powered property recommendation engine, smart estate access systems, and the company's digital contract management platform.",
    education: "B.Sc Computer Science, University of Lagos\nM.Sc Artificial Intelligence, Imperial College London\nPhD Computer Science (IoT), University of Cape Town",
    experience: "10 years in tech & innovation\nLed FCC's digital transformation\nDeveloped AI-powered property engine",
    certifications: ["NCS Fellow", "AWS Certified Solutions Architect", "Google Professional Data Engineer"],
    location: "Lagos, Nigeria",
    linkedin: "#",
    email: "ngozi.okafor@forecityconstruction.com",
  },
  {
    id: 11,
    name: "Mr. Ibrahim Musa",
    role: "Head, Legal & Compliance",
    department: "Legal",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&q=80",
    shortBio: "Legal expert ensuring FCC operates with integrity and full regulatory compliance.",
    fullBio: "Mr. Ibrahim Musa heads FCC's Legal & Compliance department, bringing 15 years of experience in corporate law, construction contracts, and regulatory compliance. He has structured over ₦100 billion in construction contracts and ensures all FCC projects meet Nigerian legal requirements and international best practices. He is a specialist in PPP (Public-Private Partnership) frameworks and land title verification.",
    education: "LL.B, University of Maiduguri\nB.L, Nigerian Law School\nLL.M International Business Law, University of London",
    experience: "15 years in corporate & construction law\nStructured ₦100B+ in contracts\nPPP framework specialist",
    certifications: ["Nigerian Bar Association", "Chartered Institute of Arbitrators (Associate)", "ICCA Member"],
    location: "Abuja, Nigeria",
    linkedin: "#",
    email: "ibrahim.musa@forecityconstruction.com",
  },
  {
    id: 12,
    name: "Ms. Temitope Ogunlesi",
    role: "Head, Human Resources",
    department: "Human Resources",
    image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&q=80",
    shortBio: "People champion building FCC's culture of excellence and professional growth.",
    fullBio: "Ms. Temitope Ogunlesi leads FCC's Human Resources division with 11 years of experience in talent management, organizational development, and HR strategy. She has built FCC's renowned training and development programs that have upskilled over 3,000 employees and artisans. Her innovative approach to talent acquisition and retention has helped FCC maintain a 94% employee satisfaction rate and attract top industry talent.",
    education: "B.Sc Industrial Relations, Covenant University\nM.Sc Human Resource Management, University of Lagos",
    experience: "11 years in HR management\nTrained 3,000+ employees\n94% employee satisfaction rate",
    certifications: ["CIPM Chartered Member", "SHRM Certified Professional", "ISO 9001 Internal Auditor"],
    location: "Lagos, Nigeria",
    linkedin: "#",
    email: "temitope.ogunlesi@forecityconstruction.com",
  },
];

const departments = ["All", "Executive", "Construction", "Real Estate", "Property Management", "Interior Design", "Technology", "Legal", "Human Resources"];

export default function Team() {
  const { t } = useLang();
  const [activeDept, setActiveDept] = useState("All");
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const filtered = activeDept === "All" ? team : team.filter((m) => m.department === activeDept);

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
            <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>Our People</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 max-w-3xl">
            Meet the <span style={{ color: "var(--clr-accent)" }}>Leadership</span> Team
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            The driving force behind FCC Fore-City Construction — a diverse team of industry leaders
            committed to building Africa's future with integrity, innovation, and excellence.
          </p>
        </div>
      </section>

      {/* ── DEPT FILTER ───────────────────────── */}
      <section className="py-12" style={{ background: "var(--clr-bg-alt)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex flex-wrap gap-2 justify-center">
            {departments.map((d) => (
              <button
                key={d}
                onClick={() => setActiveDept(d)}
                className="px-5 py-2.5 text-xs font-black rounded-sm tracking-wide uppercase transition-all duration-200 border"
                style={activeDept === d ? {
                  background: "var(--clr-primary)", color: "#fff", borderColor: "var(--clr-primary)"
                } : {
                  background: "transparent", color: "var(--clr-text-muted)", borderColor: "var(--clr-border)"
                }}
              >
                {d}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM GRID ─────────────────────────── */}
      <section className="py-20" style={{ background: "var(--clr-bg)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((member) => (
                <motion.div
                  key={member.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <button
                    onClick={() => setSelectedMember(member)}
                    className="group w-full text-left rounded-sm border overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}
                  >
                    <div className="relative overflow-hidden aspect-[4/5]">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end"
                        style={{ background: "linear-gradient(to top, rgba(13,27,56,0.9), transparent)" }}>
                        <div className="p-4 w-full">
                          <div className="flex gap-2 mb-2">
                            {member.linkedin && (
                              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/30 transition-colors"
                                style={{ color: "var(--clr-accent)" }}>
                                <Linkedin size={14} />
                              </div>
                            )}
                            {member.email && (
                              <div className="w-8 h-8 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/30 transition-colors"
                                style={{ color: "var(--clr-accent)" }}>
                                <Mail size={14} />
                              </div>
                            )}
                          </div>
                          <span className="text-xs font-bold text-white flex items-center gap-1">
                            View Profile <ChevronRight size={12} />
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-black text-sm mb-1" style={{ color: "var(--clr-primary)" }}>{member.name}</h3>
                      <p className="text-xs font-bold" style={{ color: "var(--clr-accent)" }}>{member.role}</p>
                      <p className="text-xs mt-2 leading-relaxed" style={{ color: "var(--clr-text-muted)" }}>
                        {member.shortBio}
                      </p>
                    </div>
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg font-bold" style={{ color: "var(--clr-primary)" }}>No team members in this department</p>
            </div>
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
              Want to Join the <span style={{ color: "var(--clr-accent)" }}>Team?</span>
            </h2>
            <p className="text-lg mb-8" style={{ color: "rgba(255,255,255,0.65)" }}>
              We're always looking for exceptional talent. Explore current opportunities and build your career with FCC.
            </p>
            <Link href="/careers" data-testid="btn-team-cta"
              className="inline-flex items-center gap-2 px-10 py-4 font-black rounded text-sm tracking-wide transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl"
              style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
              View Open Positions <ChevronRight size={16} />
            </Link>
          </ScrollReveal>
        </div>
      </section>

      <Footer />

      {/* ── PROFILE MODAL ───────────────────────── */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            style={{ background: "rgba(0,0,0,0.7)" }}
            onClick={() => setSelectedMember(null)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 30, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="w-full max-w-3xl rounded-sm overflow-hidden shadow-2xl my-8"
              style={{ background: "var(--clr-card)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative">
                <div className="h-32" style={{ background: "var(--clr-primary)" }}>
                  <AnimatedBlobs intensity={0.05} />
                </div>
                <button
                  onClick={() => setSelectedMember(null)}
                  className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all text-white z-10"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="px-8 pb-8 -mt-16 relative z-10">
                <div className="flex flex-col sm:flex-row gap-6 items-start">
                  <div className="w-32 h-32 rounded-sm overflow-hidden border-4 flex-shrink-0"
                    style={{ borderColor: "var(--clr-card)" }}>
                    <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 pt-4">
                    <h2 className="text-2xl font-black mb-1" style={{ color: "var(--clr-primary)" }}>{selectedMember.name}</h2>
                    <p className="text-sm font-bold mb-3" style={{ color: "var(--clr-accent)" }}>{selectedMember.role}</p>
                    <p className="text-sm leading-relaxed" style={{ color: "var(--clr-text-muted)" }}>
                      {selectedMember.fullBio}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                  <div className="md:col-span-2 space-y-6">
                    <div className="p-5 rounded-sm border" style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <GraduationCap size={16} style={{ color: "var(--clr-accent)" }} />
                        <h3 className="font-black text-sm" style={{ color: "var(--clr-primary)" }}>Education</h3>
                      </div>
                      {selectedMember.education.split("\n").map((line, i) => (
                        <p key={i} className="text-xs mb-1 leading-relaxed" style={{ color: "var(--clr-text-muted)" }}>• {line}</p>
                      ))}
                    </div>

                    <div className="p-5 rounded-sm border" style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <Briefcase size={16} style={{ color: "var(--clr-accent)" }} />
                        <h3 className="font-black text-sm" style={{ color: "var(--clr-primary)" }}>Experience</h3>
                      </div>
                      {selectedMember.experience.split("\n").map((line, i) => (
                        <p key={i} className="text-xs mb-1 leading-relaxed" style={{ color: "var(--clr-text-muted)" }}>• {line}</p>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="p-5 rounded-sm border" style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <Award size={16} style={{ color: "var(--clr-accent)" }} />
                        <h3 className="font-black text-sm" style={{ color: "var(--clr-primary)" }}>Certifications</h3>
                      </div>
                      {selectedMember.certifications.map((cert, i) => (
                        <p key={i} className="text-xs mb-1 leading-relaxed" style={{ color: "var(--clr-text-muted)" }}>• {cert}</p>
                      ))}
                    </div>

                    <div className="p-5 rounded-sm border" style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)" }}>
                      <div className="flex items-center gap-2 mb-3">
                        <MapPin size={16} style={{ color: "var(--clr-accent)" }} />
                        <h3 className="font-black text-sm" style={{ color: "var(--clr-primary)" }}>Location</h3>
                      </div>
                      <p className="text-xs" style={{ color: "var(--clr-text-muted)" }}>{selectedMember.location}</p>
                    </div>

                    {selectedMember.email && (
                      <a href={`mailto:${selectedMember.email}`}
                        className="flex items-center gap-2 px-4 py-3 rounded text-xs font-black transition-all duration-300 hover:-translate-y-0.5 w-full"
                        style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                        <Mail size={14} /> Send Email
                      </a>
                    )}
                    {selectedMember.phone && (
                      <a href={`tel:${selectedMember.phone}`}
                        className="flex items-center gap-2 px-4 py-3 rounded text-xs font-black border transition-all duration-300 hover:-translate-y-0.5 w-full"
                        style={{ borderColor: "var(--clr-primary)", color: "var(--clr-primary)" }}>
                        <Phone size={14} /> Call
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
