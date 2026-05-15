import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import Lightbox from "@/components/Lightbox";
import { AnimatedBlobs, FloatingShapes, AnimatedGrid } from "@/components/AnimatedBackground";
import ParticleBackground from "@/components/ParticleBackground";
import { useLang } from "@/contexts/LanguageContext";
import { Filter, Grid3X3, Building2, Image, Video, Eye, Play, ExternalLink } from "lucide-react";

type Category = "All" | "Architectural" | "3D Renders" | "Completed" | "Drone" | "Interior";

const categories: Category[] = ["All", "Architectural", "3D Renders", "Completed", "Drone", "Interior"];

interface GalleryItem {
  src: string;
  thumb?: string;
  alt: string;
  category: Category;
  title: string;
  location?: string;
  year?: string;
}

const galleryItems: GalleryItem[] = [
  { src: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=1600&q=85", alt: "Modern glass tower", category: "Architectural", title: "Lekki Glass Tower", location: "Lagos", year: "2024" },
  { src: "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1600&q=85", alt: "Urban skyline", category: "Architectural", title: "Victoria Island Skyline", location: "Lagos", year: "2024" },
  { src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1600&q=85", alt: "Construction crane", category: "Drone", title: "Aerial Site Overview", location: "Abuja", year: "2025" },
  { src: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1600&q=85", alt: "Blueprint design", category: "Architectural", title: "Tower Blueprint Study", location: "Lagos HQ", year: "2024" },
  { src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1600&q=85", alt: "Engineer inspection", category: "Completed", title: "Structural Completion", location: "Port Harcourt", year: "2023" },
  { src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=85", alt: "Modern luxury home", category: "3D Renders", title: "Smart Villa Concept", location: "Ikoyi", year: "2025" },
  { src: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1600&q=85", alt: "Contemporary architecture", category: "Architectural", title: "Marina Heights", location: "Lagos", year: "2024" },
  { src: "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=1600&q=85", alt: "Building construction", category: "Completed", title: "GRA Phase 2 Completion", location: "Port Harcourt", year: "2023" },
  { src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1600&q=85", alt: "Luxury interior", category: "Interior", title: "Penthouse Living Room", location: "Banana Island", year: "2024" },
  { src: "https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&q=85", alt: "Interior design", category: "Interior", title: "Executive Office Suite", location: "Abuja", year: "2024" },
  { src: "https://images.unsplash.com/photo-1600566753086-00f18f6b5d26?w=1600&q=85", alt: "Modern facade", category: "3D Renders", title: "Commercial Complex Render", location: "Lekki", year: "2025" },
  { src: "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1600&q=85", alt: "House exterior", category: "3D Renders", title: "Estate Master Plan", location: "Abuja", year: "2025" },
  { src: "https://images.unsplash.com/photo-1577495508048-b635b8374b9b?w=1600&q=85", alt: "Aerial city view", category: "Drone", title: "City Infrastructure Overview", location: "Lagos", year: "2024" },
  { src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1600&q=85", alt: "3D building render", category: "3D Renders", title: "Mixed-Use Development", location: "Ibadan", year: "2025" },
  { src: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=85", alt: "Interior decor", category: "Interior", title: "Luxury Apartment Interior", location: "Lagos", year: "2024" },
  { src: "https://images.unsplash.com/photo-1600573472591-ee6c68e14fbe?w=1600&q=85", alt: "Construction site wide", category: "Drone", title: "Wide-Angle Site Survey", location: "Kano", year: "2024" },
  { src: "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=1600&q=85", alt: "Architecture detail", category: "Architectural", title: "Facade Detail Study", location: "Lagos", year: "2024" },
  { src: "https://images.unsplash.com/photo-1600566753376-12c8ab7c8e7e?w=1600&q=85", alt: "Completed building", category: "Completed", title: "Apartment Complex Handover", location: "Enugu", year: "2023" },
];

const categoryIcons: Record<Category, React.ReactNode> = {
  All: <Grid3X3 size={16} />,
  Architectural: <Building2 size={16} />,
  "3D Renders": <Eye size={16} />,
  Completed: <Image size={16} />,
  Drone: <Video size={16} />,
  Interior: <Building2 size={16} />,
};

export default function Gallery() {
  const { t } = useLang();
  const [activeCat, setActiveCat] = useState<Category>("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered = activeCat === "All" ? galleryItems : galleryItems.filter((item) => item.category === activeCat);

  const lbImages = filtered.map((item) => ({ src: item.src, alt: item.alt }));

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div style={{ background: "var(--clr-bg)" }}>
      <Navbar />

      <section className="relative pt-32 pb-24 overflow-hidden" style={{ background: "var(--clr-primary)" }}>
        <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(ellipse_at_top,_var(--clr-accent)_0%,_transparent_60%)]" />
        <div className="absolute inset-0" style={{ background: "color-mix(in srgb, var(--clr-primary) 92%, transparent)" }} />
        <AnimatedBlobs intensity={0.05} />
        <FloatingShapes />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
            <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>Gallery</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6 max-w-3xl">
            Our <span style={{ color: "var(--clr-accent)" }}>Portfolio</span> in Focus
          </h1>
          <p className="text-lg max-w-2xl leading-relaxed" style={{ color: "rgba(255,255,255,0.7)" }}>
            Explore our complete collection of architectural designs, 3D renders, completed projects, drone footage, and interior masterpieces.
          </p>

          <div className="flex flex-wrap gap-3 mt-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCat(cat)}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-black rounded-sm tracking-wide uppercase transition-all duration-200 border"
                style={activeCat === cat ? {
                  background: "var(--clr-accent)", color: "var(--clr-accent-text)", borderColor: "var(--clr-accent)"
                } : {
                  background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.15)"
                }}
              >
                {categoryIcons[cat]} {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden" style={{ background: "var(--clr-bg)" }}>
        <ParticleBackground particleCount={35} />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm" style={{ color: "var(--clr-text-muted)" }}>
              <Filter size={14} className="inline mr-1" />
              {filtered.length} {activeCat === "All" ? "projects" : activeCat} {filtered.length === 1 ? "item" : "items"}
            </p>
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <AnimatePresence mode="popLayout">
              {filtered.map((item, i) => (
                <motion.div
                  key={item.src}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.35, delay: (i % 9) * 0.05 }}
                >
                  <ScrollReveal delay={(i % 9) * 0.05}>
                    <button
                      onClick={() => openLightbox(i)}
                      className="group w-full text-left rounded-sm overflow-hidden border transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                      style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}
                    >
                      <div className="relative overflow-hidden aspect-[4/3]">
                        <img
                          src={item.src}
                          alt={item.alt}
                          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
                          style={{ background: "rgba(13,27,56,0.5)" }}>
                          <div className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-white/60 text-white/80"
                            style={{ backdropFilter: "blur(4px)" }}>
                            <Eye size={18} />
                          </div>
                        </div>
                        <div className="absolute top-3 left-3 px-2 py-1 text-[10px] font-black rounded uppercase"
                          style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                          {item.category}
                        </div>
                      </div>
                      <div className="p-4">
                        <h3 className="font-black text-sm mb-1" style={{ color: "var(--clr-primary)" }}>{item.title}</h3>
                        <p className="text-xs" style={{ color: "var(--clr-text-muted)" }}>
                          {item.location}{item.year ? ` · ${item.year}` : ""}
                        </p>
                      </div>
                    </button>
                  </ScrollReveal>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-lg font-bold" style={{ color: "var(--clr-primary)" }}>No items in this category yet</p>
              <p className="text-sm" style={{ color: "var(--clr-text-muted)" }}>Check back soon for new additions</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-24 relative overflow-hidden" style={{ background: "var(--clr-bg-alt)" }}>
        <AnimatedGrid />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
              <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>Drone Aerial View</span>
            </div>
            <h2 className="text-4xl font-black mb-4" style={{ color: "var(--clr-primary)" }}>
              See Our Projects From <span style={{ color: "var(--clr-accent)" }}>Above</span>
            </h2>
            <p className="text-base max-w-2xl mb-12" style={{ color: "var(--clr-text-muted)" }}>
              Explore aerial drone footage showcasing our projects from unique perspectives.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Lekki Smart City Flyover", location: "Lagos, Nigeria", duration: "2:34" },
              { title: "Abuja Waterfront Estate Aerial", location: "Abuja, Nigeria", duration: "1:52" },
              { title: "Port Harcourt Ring Road Survey", location: "Port Harcourt, Nigeria", duration: "3:10" },
            ].map((drone, i) => (
              <ScrollReveal key={drone.title} delay={i * 0.1}>
                <div className="group rounded-sm border overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                  style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
                  <div className="relative aspect-video flex items-center justify-center"
                    style={{ background: "var(--clr-primary)" }}>
                    <div className="absolute inset-0 opacity-20" style={{
                      backgroundImage: `url(https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80)`,
                      backgroundSize: "cover", backgroundPosition: "center",
                    }} />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                        <Play size={28} fill="currentColor" />
                      </div>
                    </div>
                    <span className="absolute bottom-3 right-3 px-2 py-1 text-xs font-black rounded"
                      style={{ background: "rgba(0,0,0,0.6)", color: "white" }}>
                      {drone.duration}
                    </span>
                    <span className="absolute top-3 left-3 px-2 py-1 text-[10px] font-black rounded uppercase flex items-center gap-1"
                      style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                      <Video size={10} /> Drone
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-black text-sm mb-1" style={{ color: "var(--clr-primary)" }}>{drone.title}</h3>
                    <p className="text-xs" style={{ color: "var(--clr-text-muted)" }}>{drone.location}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal delay={0.3}>
            <div className="mt-10 text-center">
              <div className="inline-flex items-center gap-2 px-6 py-3 font-black text-sm rounded tracking-wide transition-all duration-300 hover:-translate-y-0.5 cursor-pointer"
                style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                <ExternalLink size={14} /> View Full Drone Library
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── UPLOAD SECTION ─────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--clr-bg)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
                <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>Upload Your Designs</span>
                <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
              </div>
              <h2 className="text-4xl font-black mb-4" style={{ color: "var(--clr-primary)" }}>
                Showcase Your <span style={{ color: "var(--clr-accent)" }}>Architectural Vision</span>
              </h2>
              <p className="text-base max-w-2xl mx-auto mb-10" style={{ color: "var(--clr-text-muted)" }}>
                Submit your 3D renders, architectural designs, and project visuals for review and display on our platform.
              </p>
              <div className="max-w-lg mx-auto border-2 border-dashed rounded-sm p-12 text-center cursor-pointer hover:opacity-80 transition-opacity"
                style={{ borderColor: "var(--clr-border)" }}>
                <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "var(--clr-primary)", color: "var(--clr-accent)" }}>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                  </svg>
                </div>
                <p className="text-sm font-bold mb-1" style={{ color: "var(--clr-text)" }}>Upload 3D Renders & Designs</p>
                <p className="text-xs" style={{ color: "var(--clr-text-muted)" }}>PNG, JPG, WebP up to 10MB · 3D Renders, Blueprints, Drone Shots</p>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Lightbox
        images={lbImages}
        currentIndex={lightboxIndex}
        open={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />

      <Footer />
    </div>
  );
}
