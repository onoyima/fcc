import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ImageSlider from "@/components/ImageSlider";
import ParticleBackground from "@/components/ParticleBackground";
import {
  Search, MapPin, Home, Building2, Filter, ArrowRight,
  Bed, Bath, Square, Heart, Phone, ChevronDown, X, SlidersHorizontal, CheckCircle
} from "lucide-react";
import { AnimatedBlobs, FloatingShapes } from "@/components/AnimatedBackground";
import brandImg from "@assets/ChatGPT_Image_May_14,_2026,_11_05_45_PM_1778796680819.png";
import { useLang } from "@/contexts/LanguageContext";
import { api } from "@/lib/api";

type ListingType = "All" | "For Sale" | "For Rent" | "Land" | "Commercial" | "Shortlet";

const propertyTypes: ListingType[] = ["All", "For Sale", "For Rent", "Land", "Commercial", "Shortlet"];
const locations = ["All Locations", "Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan", "Enugu", "Ogun"];

const propertyImg = (id: number, variety: number) =>
  `https://images.unsplash.com/photo-${1600585154340 + id + variety}?w=800&q=80`;

const propertyImages: Record<number, string[]> = {
  1: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  ],
  2: [
    "https://images.unsplash.com/photo-1600573472591-ee6c68e14fbe?w=800&q=80",
    "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18f6b5d26?w=800&q=80",
  ],
  3: [
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=800&q=80",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80",
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80",
  ],
  4: [
    "https://images.unsplash.com/photo-1600566753376-12c8ab7c8e7e?w=800&q=80",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80",
  ],
  5: [
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&q=80",
  ],
  6: [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18f6b5d26?w=800&q=80",
  ],
  7: [
    "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=800&q=80",
    "https://images.unsplash.com/photo-1618220179428-22790b461013?w=800&q=80",
    "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=800&q=80",
  ],
  8: [
    "https://images.unsplash.com/photo-1577495508048-b635b8374b9b?w=800&q=80",
    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
  ],
  9: [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "https://images.unsplash.com/photo-1600566753086-00f18f6b5d26?w=800&q=80",
  ],
};

const listings = [
  { id: 1, title: "Lekki Pearl Estate — 4 Bed Duplex", type: "For Sale" as ListingType, location: "Lekki, Lagos", price: "₦85,000,000", beds: 4, baths: 4, sqm: 320, featured: true, tag: "New Listing" },
  { id: 2, title: "Maitama Executive Apartment", type: "For Rent" as ListingType, location: "Maitama, Abuja", price: "₦8,500,000/yr", beds: 3, baths: 3, sqm: 180, featured: true, tag: "Premium" },
  { id: 3, title: "GRA Phase 2 — Commercial Plaza", type: "Commercial" as ListingType, location: "GRA, Port Harcourt", price: "₦320,000,000", beds: 0, baths: 8, sqm: 2200, featured: false, tag: "" },
  { id: 4, title: "Ikoyi Premium Shortlet", type: "Shortlet" as ListingType, location: "Ikoyi, Lagos", price: "₦150,000/night", beds: 2, baths: 2, sqm: 120, featured: false, tag: "Hot" },
  { id: 5, title: "Sangotedo — Dry Land (Full Plot)", type: "Land" as ListingType, location: "Sangotedo, Lagos", price: "₦22,000,000", beds: 0, baths: 0, sqm: 648, featured: false, tag: "Best Value" },
  { id: 6, title: "Gwarimpa — 5 Bed Smart Villa", type: "For Sale" as ListingType, location: "Gwarimpa, Abuja", price: "₦120,000,000", beds: 5, baths: 6, sqm: 500, featured: true, tag: "Smart Home" },
  { id: 7, title: "Ikeja GRA — 3 Bed Terrace", type: "For Rent" as ListingType, location: "Ikeja GRA, Lagos", price: "₦5,200,000/yr", beds: 3, baths: 3, sqm: 195, featured: false, tag: "" },
  { id: 8, title: "Ogun Free Trade Zone — Industrial Land", type: "Land" as ListingType, location: "Sagamu, Ogun", price: "₦45,000,000", beds: 0, baths: 0, sqm: 4050, featured: false, tag: "Investment" },
  { id: 9, title: "Banana Island — Penthouse", type: "For Sale" as ListingType, location: "Banana Island, Lagos", price: "₦950,000,000", beds: 6, baths: 7, sqm: 750, featured: true, tag: "Ultra Luxury" },
];

export default function Properties() {
  const { t } = useLang();
  const [apiProperties, setApiProperties] = useState<any[]>([]);
  const [activeType, setActiveType] = useState<ListingType>("All");
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [savedIds, setSavedIds] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [inspectOpen, setInspectOpen] = useState(false);
  const [selectedProp, setSelectedProp] = useState<string | null>(null);
  const [inspectData, setInspectData] = useState({ name: "", phone: "", date: "" });
  const [inspectSubmitted, setInspectSubmitted] = useState(false);

  useEffect(() => {
    api.get<any>("/properties")
      .then((data: any) => {
        if (data?.properties) setApiProperties(data.properties);
      })
      .catch(() => {});
  }, []);

  const activeListings = apiProperties.length > 0
    ? apiProperties.map((p: any) => ({
        id: p.id,
        title: p.title,
        type: (p.type === "for_sale" ? "For Sale" : p.type === "for_rent" ? "For Rent" : p.type === "land" ? "Land" : p.type === "commercial" ? "Commercial" : "Shortlet") as ListingType,
        location: p.location,
        price: p.priceLabel || `₦${Number(p.price).toLocaleString()}`,
        beds: p.bedrooms || 0,
        baths: p.bathrooms || 0,
        sqm: p.sqm || 0,
        featured: p.featured || false,
        tag: p.tag || "",
        images: p.images || [],
      }))
    : listings;

  const filtered = activeListings.filter((l) => {
    const typeMatch = activeType === "All" || l.type === activeType;
    const searchMatch = !search || l.title.toLowerCase().includes(search.toLowerCase()) || l.location.toLowerCase().includes(search.toLowerCase());
    const locMatch = location === "All Locations" || l.location.toLowerCase().includes(location.toLowerCase());
    return typeMatch && searchMatch && locMatch;
  });

  const toggleSave = (id: number) => {
    setSavedIds((prev) => prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]);
  };

  return (
    <div style={{ background: "var(--clr-bg)" }}>
      <Navbar />

      {/* ── HERO ─────────────────────────────────── */}
      <section className="relative pt-32 pb-20 overflow-hidden" style={{ background: "var(--clr-primary)" }}>
        <div className="absolute inset-0 opacity-8" style={{
          backgroundImage: `url(${brandImg})`, backgroundSize: "cover", backgroundPosition: "center",
        }} />
        <div className="absolute inset-0" style={{ background: "color-mix(in srgb, var(--clr-primary) 88%, transparent)" }} />
        <AnimatedBlobs intensity={0.05} />
        <FloatingShapes />

        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
            <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>{t.properties.heroBadge}</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-black text-white mb-6">
            {t.properties.heroTitle1}<br />
            <span style={{ color: "var(--clr-accent)" }}>{t.properties.heroTitle2}</span>
          </h1>
          <p className="text-lg max-w-xl leading-relaxed mb-10" style={{ color: "rgba(255,255,255,0.7)" }}>
            {t.properties.heroSubtitle}
          </p>

          <div className="flex flex-wrap gap-2 mb-6">
            {propertyTypes.map((tp) => (
              <button
                key={tp}
                data-testid={`type-tab-${tp.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActiveType(tp)}
                className="px-5 py-2.5 text-xs font-black rounded-sm tracking-wide uppercase transition-all duration-200 border"
                style={activeType === tp ? {
                  background: "var(--clr-accent)", color: "var(--clr-accent-text)", borderColor: "var(--clr-accent)"
                } : {
                  background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.7)", borderColor: "rgba(255,255,255,0.15)"
                }}
              >
                {tp}
              </button>
            ))}
          </div>

          <div className="rounded-sm overflow-hidden" style={{ background: "var(--clr-card)", boxShadow: "0 20px 60px rgba(0,0,0,0.4)" }}>
            <div className="flex flex-col sm:flex-row gap-0">
              <div className="flex-1 flex items-center gap-3 px-5 py-4 border-b sm:border-b-0 sm:border-r"
                style={{ borderColor: "var(--clr-border)" }}>
                <Search size={16} style={{ color: "var(--clr-text-muted)" }} />
                <input
                  data-testid="search-property-input"
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={t.properties.searchPlaceholder}
                  className="flex-1 text-sm outline-none bg-transparent"
                  style={{ color: "var(--clr-text)" }}
                />
              </div>
              <div className="flex items-center gap-2 px-5 py-4 border-b sm:border-b-0 sm:border-r min-w-[180px]"
                style={{ borderColor: "var(--clr-border)" }}>
                <MapPin size={16} style={{ color: "var(--clr-text-muted)" }} />
                <select
                  data-testid="search-location-select"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="flex-1 text-sm outline-none bg-transparent cursor-pointer"
                  style={{ color: "var(--clr-text)" }}
                >
                  {locations.map((l) => <option key={l}>{l}</option>)}
                </select>
                <ChevronDown size={14} style={{ color: "var(--clr-text-muted)" }} />
              </div>
              <button
                data-testid="btn-filters-toggle"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-5 py-4 border-b sm:border-b-0 sm:border-r text-sm font-bold transition-colors"
                style={{ borderColor: "var(--clr-border)", color: "var(--clr-text-muted)" }}>
                <SlidersHorizontal size={16} /> {t.common.filters}
              </button>
              <button
                data-testid="btn-search-properties"
                className="px-8 py-4 font-black text-sm tracking-wide transition-all duration-300"
                style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                {t.common.search}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── LISTINGS ──────────────────────────── */}
      <section className="py-16" style={{ background: "var(--clr-bg)" }}>
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-xl font-black" style={{ color: "var(--clr-primary)" }}>
                {filtered.length} {activeType !== "All" ? activeType : ""} {t.properties.listingsAvailable}
              </h2>
              {savedIds.length > 0 && (
                <p className="text-xs mt-1" style={{ color: "var(--clr-text-muted)" }}>
                  {savedIds.length} {t.properties.saved}
                </p>
              )}
            </div>
            <select className="text-sm border rounded px-3 py-2 outline-none"
              style={{ borderColor: "var(--clr-border)", background: "var(--clr-card)", color: "var(--clr-text)" }}>
              <option>{t.properties.sortNewest}</option>
              <option>{t.properties.sortLowHigh}</option>
              <option>{t.properties.sortHighLow}</option>
            </select>
          </div>

          <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((listing) => (
                <motion.div
                  key={listing.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="group rounded-sm border overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}
                    data-testid={`listing-card-${listing.id}`}>
                    <ImageSlider
                      images={listing.images || propertyImages[listing.id] || [brandImg]}
                      className="h-52 w-full"
                      overlay={
                        <>
                          <div className="absolute inset-0 transition-opacity duration-300 group-hover:opacity-60 pointer-events-none"
                            style={{ background: "color-mix(in srgb, var(--clr-primary) 60%, transparent)" }} />
                          {listing.tag && (
                            <div className="absolute top-4 left-4 px-2 py-1 text-xs font-black rounded uppercase z-10"
                              style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                              {listing.tag}
                            </div>
                          )}
                          <button
                            data-testid={`btn-save-${listing.id}`}
                            onClick={(e) => { e.stopPropagation(); toggleSave(listing.id); }}
                            className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 z-10"
                            style={{ background: savedIds.includes(listing.id) ? "var(--clr-accent)" : "rgba(255,255,255,0.2)" }}>
                            <Heart size={14} fill={savedIds.includes(listing.id) ? "currentColor" : "none"}
                              style={{ color: savedIds.includes(listing.id) ? "var(--clr-accent-text)" : "white" }} />
                          </button>
                          <div className="absolute bottom-4 left-4 text-2xl font-black text-white z-10">{listing.price}</div>
                        </>
                      }
                    />

                    <div className="p-5">
                      <div className="px-2 py-0.5 text-xs font-black rounded inline-block mb-3"
                        style={{ background: "var(--clr-bg-alt)", color: "var(--clr-accent)" }}>
                        {listing.type}
                      </div>
                      <h3 className="font-black text-base mb-2 leading-tight" style={{ color: "var(--clr-primary)" }}>{listing.title}</h3>
                      <p className="flex items-center gap-1 text-xs mb-4" style={{ color: "var(--clr-text-muted)" }}>
                        <MapPin size={11} /> {listing.location}
                      </p>

                      {listing.beds > 0 && (
                        <div className="flex gap-4 text-xs mb-4" style={{ color: "var(--clr-text-muted)" }}>
                          <span className="flex items-center gap-1"><Bed size={12} /> {listing.beds} {t.properties.beds}{listing.beds !== 1 ? "s" : ""}</span>
                          <span className="flex items-center gap-1"><Bath size={12} /> {listing.baths} {t.properties.baths}</span>
                          <span className="flex items-center gap-1"><Square size={12} /> {listing.sqm} sqm</span>
                        </div>
                      )}
                      {listing.beds === 0 && (
                        <div className="flex gap-4 text-xs mb-4" style={{ color: "var(--clr-text-muted)" }}>
                          <span className="flex items-center gap-1"><Square size={12} /> {listing.sqm} sqm</span>
                        </div>
                      )}

                      <div className="flex gap-2">
                        <button
                          data-testid={`btn-inspect-${listing.id}`}
                          onClick={() => { setSelectedProp(listing.title); setInspectOpen(true); }}
                          className="flex-1 py-2.5 text-xs font-black rounded border transition-all duration-200"
                          style={{ borderColor: "var(--clr-primary)", color: "var(--clr-primary)" }}>
                          {t.properties.bookInspection}
                        </button>
                        <a href="tel:+2348068515179"
                          className="flex items-center justify-center w-10 h-10 rounded border transition-all duration-200 hover:-translate-y-0.5"
                          style={{ borderColor: "var(--clr-border)", color: "var(--clr-text-muted)" }}>
                          <Phone size={14} />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <Home size={48} className="mx-auto mb-4 opacity-20" style={{ color: "var(--clr-primary)" }} />
              <p className="text-lg font-bold mb-2" style={{ color: "var(--clr-primary)" }}>No properties found</p>
              <p className="text-sm" style={{ color: "var(--clr-text-muted)" }}>Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* ── INSPECTION MODAL ──────────────────── */}
      <AnimatePresence>
        {inspectOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            style={{ background: "rgba(0,0,0,0.7)" }}
            onClick={() => setInspectOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="w-full max-w-lg rounded-sm overflow-hidden shadow-2xl"
              style={{ background: "var(--clr-card)" }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-8 py-5 flex items-center justify-between"
                style={{ background: "var(--clr-primary)" }}>
                <h3 className="text-white font-black text-lg">{t.properties.confirmBooking}</h3>
                <button onClick={() => setInspectOpen(false)} className="text-white/60 hover:text-white">
                  <X size={20} />
                </button>
              </div>
              <div className="p-8">
                {inspectSubmitted ? (
                  <div className="text-center py-8">
                    <CheckCircle size={48} className="mx-auto mb-4" style={{ color: "var(--clr-accent)" }} />
                    <h3 className="text-lg font-black mb-2" style={{ color: "var(--clr-primary)" }}>Inspection Booked!</h3>
                    <p className="text-sm" style={{ color: "var(--clr-text-muted)" }}>We'll contact you to confirm the appointment time.</p>
                  </div>
                ) : (
                <><div className="space-y-4">
                  {selectedProp && (
                    <div className="p-4 rounded-sm" style={{ background: "var(--clr-bg-alt)" }}>
                      <p className="text-xs font-bold uppercase tracking-wide mb-1" style={{ color: "var(--clr-accent)" }}>Selected Property</p>
                      <p className="font-black text-sm" style={{ color: "var(--clr-primary)" }}>{selectedProp}</p>
                    </div>
                  )}
                  {[
                    { key: "name", label: t.contact.fullName, placeholder: "Your full name", type: "text" },
                    { key: "phone", label: t.contact.phoneNumber, placeholder: "+234 ...", type: "tel" },
                    { key: "date", label: "Preferred Date", placeholder: "", type: "date" },
                  ].map((f) => (
                    <div key={f.key}>
                      <label className="block text-xs font-bold uppercase tracking-wide mb-2"
                        style={{ color: "var(--clr-text)" }}>{f.label}</label>
                      <input type={f.type} placeholder={f.placeholder}
                        value={inspectData[f.key as keyof typeof inspectData]}
                        onChange={(e) => setInspectData({ ...inspectData, [f.key]: e.target.value })}
                        className="w-full px-4 py-3 border rounded text-sm outline-none"
                        style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)", color: "var(--clr-text)" }} />
                    </div>
                  ))}
                  <button
                    onClick={() => {
                      const inspections = JSON.parse(localStorage.getItem("fcc_inspections") || "[]");
                      inspections.push({ ...inspectData, property: selectedProp, timestamp: new Date().toISOString() });
                      localStorage.setItem("fcc_inspections", JSON.stringify(inspections));
                      setInspectSubmitted(true);
                    }}
                    data-testid="btn-confirm-inspection"
                    className="w-full py-3.5 font-black text-sm rounded tracking-wide transition-all duration-300 hover:-translate-y-0.5"
                    style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                    {t.properties.bookInspection}
                  </button>
                </div></>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── WHY FCC PROPERTIES ────────────────── */}
      <section className="py-24 relative overflow-hidden" style={{ background: "var(--clr-primary)" }}>
        <AnimatedBlobs intensity={0.06} />
        <div className="relative max-w-7xl mx-auto px-6 lg:px-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-3">
                <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
                <span className="text-xs font-black tracking-widest uppercase" style={{ color: "var(--clr-accent)" }}>{t.properties.whyBadge}</span>
                <div className="h-px w-10" style={{ background: "var(--clr-accent)" }} />
              </div>
              <h2 className="text-4xl font-black text-white">
                {t.properties.whyTitle1}<br /><span style={{ color: "var(--clr-accent)" }}>{t.properties.whyTitle2}</span>
              </h2>
            </div>
          </ScrollReveal>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { title: "Verified Titles", desc: "All listings have been legally verified and documented." },
              { title: "Trusted Agents", desc: "Certified real estate professionals with local expertise." },
              { title: "Easy Transactions", desc: "Mortgage support, installment plans, and escrow available." },
              { title: "After-Sale Support", desc: "Management, renovation, and rental income support." },
            ].map((item, i) => (
              <ScrollReveal key={item.title} delay={i * 0.1}>
                <div className="p-6 rounded-sm border text-center"
                  style={{ background: "rgba(255,255,255,0.04)", borderColor: "rgba(255,255,255,0.1)" }}>
                  <div className="text-3xl font-black mb-2" style={{ color: "var(--clr-accent)" }}>0{i + 1}</div>
                  <h4 className="font-black text-white text-sm mb-2">{item.title}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
