import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import { Link } from "wouter";
import {
  Search, MapPin, Home, Building2, Landmark, Filter, ArrowRight,
  Bed, Bath, Square, Heart, Phone, ChevronDown, X, SlidersHorizontal
} from "lucide-react";

type ListingType = "For Sale" | "For Rent" | "Land" | "Commercial" | "Shortlet";

const propertyTypes: ListingType[] = ["For Sale", "For Rent", "Land", "Commercial", "Shortlet"];

const locations = ["Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan", "Enugu", "Ogun", "Benin City"];

const listings = [
  {
    id: 1,
    title: "Luxury 5-Bedroom Detached Duplex",
    type: "For Sale" as ListingType,
    location: "Lekki Phase 1, Lagos",
    price: "₦280,000,000",
    priceNote: "Negotiable",
    beds: 5, baths: 6, sqm: 650,
    category: "Residential",
    tag: "Premium",
    featured: true,
    desc: "Tastefully finished luxury duplex in a serene estate with 24/7 security, BQ, swimming pool, and smart home systems.",
  },
  {
    id: 2,
    title: "Modern 3-Bedroom Apartment",
    type: "For Rent" as ListingType,
    location: "Wuse 2, Abuja",
    price: "₦4,500,000",
    priceNote: "Per Annum",
    beds: 3, baths: 3, sqm: 210,
    category: "Residential",
    tag: "Available",
    featured: false,
    desc: "Fully serviced 3-bedroom apartment in the heart of Abuja with 24hr power supply, fitted kitchen, and secure parking.",
  },
  {
    id: 3,
    title: "1,200sqm Commercial Land",
    type: "Land" as ListingType,
    location: "Victoria Island, Lagos",
    price: "₦450,000,000",
    priceNote: "Outright",
    beds: 0, baths: 0, sqm: 1200,
    category: "Land",
    tag: "Hot Deal",
    featured: true,
    desc: "Dry, survey-ready commercial land on the Island. C of O title. Suitable for high-rise commercial or hospitality development.",
  },
  {
    id: 4,
    title: "Executive Office Suite",
    type: "Commercial" as ListingType,
    location: "Central Business District, Abuja",
    price: "₦6,000,000",
    priceNote: "Per Annum",
    beds: 0, baths: 2, sqm: 185,
    category: "Commercial",
    tag: "Available",
    featured: false,
    desc: "Fully fitted open-plan office with boardroom, server room, reception, and dedicated parking on the 5th floor of a Grade-A building.",
  },
  {
    id: 5,
    title: "Luxury Shortlet Apartment",
    type: "Shortlet" as ListingType,
    location: "Ikoyi, Lagos",
    price: "₦120,000",
    priceNote: "Per Night",
    beds: 2, baths: 2, sqm: 140,
    category: "Residential",
    tag: "Instant Booking",
    featured: false,
    desc: "Elegantly furnished 2-bedroom shortlet in Ikoyi. Pool access, gym, concierge service, and fibre internet included.",
  },
  {
    id: 6,
    title: "4-Bedroom Semi-Detached House",
    type: "For Sale" as ListingType,
    location: "Maitama, Abuja",
    price: "₦95,000,000",
    priceNote: "Negotiable",
    beds: 4, baths: 4, sqm: 380,
    category: "Residential",
    tag: "New Listing",
    featured: false,
    desc: "Newly built semi-detached house in Maitama with German tiles, POP ceilings, inverter system, and BQ.",
  },
  {
    id: 7,
    title: "5,000sqm Warehouse / Industrial Space",
    type: "Commercial" as ListingType,
    location: "Apapa, Lagos",
    price: "₦12,000,000",
    priceNote: "Per Annum",
    beds: 0, baths: 4, sqm: 5000,
    category: "Industrial",
    tag: "Available",
    featured: false,
    desc: "Heavy-duty warehouse facility with truck access, loading bays, office section, and 24hr security. Ideal for manufacturing or logistics.",
  },
  {
    id: 8,
    title: "600sqm Residential Land",
    type: "Land" as ListingType,
    location: "Asokoro, Abuja",
    price: "₦65,000,000",
    priceNote: "Outright",
    beds: 0, baths: 0, sqm: 600,
    category: "Land",
    tag: "C of O",
    featured: true,
    desc: "Prime residential land in Asokoro with Certificate of Occupancy. Fully registered and ready for immediate development.",
  },
  {
    id: 9,
    title: "3-Bedroom Terraced Bungalow",
    type: "For Rent" as ListingType,
    location: "GRA, Port Harcourt",
    price: "₦2,800,000",
    priceNote: "Per Annum",
    beds: 3, baths: 3, sqm: 180,
    category: "Residential",
    tag: "Available",
    featured: false,
    desc: "Clean terraced bungalow in a quiet GRA estate with borehole, parking, and proximity to schools and shopping.",
  },
];

const tagColors: Record<string, string> = {
  "Premium": "bg-[#C9A84C]/10 text-[#C9A84C] border border-[#C9A84C]/30",
  "Hot Deal": "bg-red-50 text-red-600 border border-red-200",
  "Available": "bg-green-50 text-green-700 border border-green-200",
  "New Listing": "bg-blue-50 text-blue-700 border border-blue-200",
  "Instant Booking": "bg-purple-50 text-purple-700 border border-purple-200",
  "C of O": "bg-emerald-50 text-emerald-700 border border-emerald-200",
};

export default function Properties() {
  const [activeType, setActiveType] = useState<ListingType | "All">("All");
  const [activeLocation, setActiveLocation] = useState("All Locations");
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [savedListings, setSavedListings] = useState<Set<number>>(new Set());
  const [minPrice, setMinPrice] = useState("");
  const [minBeds, setMinBeds] = useState("");

  const toggleSave = (id: number) => {
    setSavedListings((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = listings.filter((l) => {
    const matchType = activeType === "All" || l.type === activeType;
    const matchLocation = activeLocation === "All Locations" || l.location.includes(activeLocation);
    const matchSearch = !searchQuery || l.title.toLowerCase().includes(searchQuery.toLowerCase()) || l.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchBeds = !minBeds || l.beds >= parseInt(minBeds);
    return matchType && matchLocation && matchSearch && matchBeds;
  });

  const featured = listings.filter((l) => l.featured);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Navbar />

      {/* Hero with Search */}
      <section className="bg-[#0D1B38] pt-32 pb-0 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(255,255,255,0.5) 30px, rgba(255,255,255,0.5) 31px)`
        }} />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-48 bg-[#C9A84C]" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 pb-20">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-12 bg-[#C9A84C]" />
            <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Property Marketplace</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-white leading-tight max-w-3xl mb-4">
            Find Your<br /><span className="text-[#C9A84C]">Perfect Property</span>
          </h1>
          <p className="text-white/60 text-lg max-w-xl mb-12">
            Buy, rent, or invest in premium properties across Nigeria's fastest-growing cities — verified listings, trusted agents, seamless transactions.
          </p>

          {/* Type Tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {(["All", ...propertyTypes] as const).map((type) => (
              <button
                key={type}
                data-testid={`tab-type-${type.toLowerCase().replace(/\s+/g, "-")}`}
                onClick={() => setActiveType(type as ListingType | "All")}
                className={`px-5 py-2.5 text-sm font-bold rounded-t-sm transition-all duration-200 ${
                  activeType === type
                    ? "bg-[#C9A84C] text-[#0D1B38]"
                    : "bg-white/10 text-white/70 hover:bg-white/20"
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="bg-white rounded-sm shadow-2xl p-4 flex flex-col md:flex-row gap-3">
            <div className="flex-1 flex items-center gap-3 border border-gray-200 rounded px-4 py-3">
              <Search size={18} className="text-gray-400 flex-shrink-0" />
              <input
                data-testid="input-property-search"
                type="text"
                placeholder="Search by property name, location, or type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 text-sm text-[#0D1B38] placeholder:text-gray-400 outline-none"
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery("")} className="text-gray-400 hover:text-gray-600">
                  <X size={16} />
                </button>
              )}
            </div>

            <div className="flex items-center gap-3 border border-gray-200 rounded px-4 py-3 min-w-[180px]">
              <MapPin size={18} className="text-gray-400 flex-shrink-0" />
              <select
                data-testid="select-location"
                value={activeLocation}
                onChange={(e) => setActiveLocation(e.target.value)}
                className="flex-1 text-sm text-[#0D1B38] outline-none bg-transparent cursor-pointer"
              >
                <option>All Locations</option>
                {locations.map((l) => <option key={l}>{l}</option>)}
              </select>
              <ChevronDown size={16} className="text-gray-400" />
            </div>

            <button
              data-testid="btn-toggle-filters"
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-3 border border-gray-200 rounded text-sm font-semibold text-[#0D1B38] hover:border-[#C9A84C] transition-colors"
            >
              <SlidersHorizontal size={16} />
              Filters
            </button>

            <button
              data-testid="btn-search-properties"
              className="px-8 py-3 bg-[#0D1B38] text-white font-bold rounded text-sm tracking-wide hover:bg-[#C9A84C] hover:text-[#0D1B38] transition-all duration-300"
            >
              Search
            </button>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-sm mt-3 p-6 grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2 block">Min Bedrooms</label>
                    <select
                      data-testid="filter-min-beds"
                      value={minBeds}
                      onChange={(e) => setMinBeds(e.target.value)}
                      className="w-full bg-white/10 text-white text-sm rounded px-3 py-2 border border-white/20 outline-none"
                    >
                      <option value="">Any</option>
                      {[1,2,3,4,5].map((n) => <option key={n} value={n}>{n}+ Bedrooms</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2 block">Property Type</label>
                    <select
                      data-testid="filter-category"
                      className="w-full bg-white/10 text-white text-sm rounded px-3 py-2 border border-white/20 outline-none"
                    >
                      <option>All Types</option>
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Industrial</option>
                      <option>Land</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2 block">Min Price (₦)</label>
                    <input
                      data-testid="filter-min-price"
                      type="text"
                      placeholder="e.g. 5,000,000"
                      value={minPrice}
                      onChange={(e) => setMinPrice(e.target.value)}
                      className="w-full bg-white/10 text-white text-sm rounded px-3 py-2 border border-white/20 outline-none placeholder:text-white/30"
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs font-bold uppercase tracking-widest mb-2 block">Max Price (₦)</label>
                    <input
                      data-testid="filter-max-price"
                      type="text"
                      placeholder="e.g. 500,000,000"
                      className="w-full bg-white/10 text-white text-sm rounded px-3 py-2 border border-white/20 outline-none placeholder:text-white/30"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-[#C9A84C] py-5">
        <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-wrap items-center justify-between gap-4">
          {[
            { icon: <Home size={16} />, label: `${filtered.length} Properties Found` },
            { icon: <MapPin size={16} />, label: "10+ Locations" },
            { icon: <Building2 size={16} />, label: "Verified Listings" },
            { icon: <Landmark size={16} />, label: "C of O Available" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2 text-[#0D1B38]">
              {s.icon}
              <span className="text-xs font-bold">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Properties */}
      {activeType === "All" && (
        <section className="py-20 bg-[#F5F7FA]">
          <div className="max-w-7xl mx-auto px-6 lg:px-10">
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-10">
                <span className="h-px w-12 bg-[#C9A84C]" />
                <h2 className="text-2xl font-black text-[#0D1B38]">Featured Properties</h2>
              </div>
            </ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featured.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.1}>
                  <div
                    data-testid={`card-featured-${p.id}`}
                    className="group bg-white rounded-sm border border-[#C9A84C]/30 overflow-hidden hover:shadow-[0_20px_60px_rgba(13,27,56,0.15)] transition-all duration-400 hover:-translate-y-1"
                  >
                    <div className="h-52 bg-gradient-to-br from-[#0D1B38] to-[#162040] relative overflow-hidden">
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNDOUE4NEMiIGZpbGwtb3BhY2l0eT0iMC4wNCI+PHBhdGggZD0iTTM2IDM0djZoNnYtNmgtNnptNiA2djZoNnYtNmgtNnptLTEyIDBoNnY2aC02di02em0xMiAwaDZ2Nmg2di02aC0xMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30" />
                      <div className="absolute top-4 left-4 flex gap-2">
                        <span className="bg-[#C9A84C] text-[#0D1B38] px-3 py-1 text-xs font-black rounded">FEATURED</span>
                        <span className={`px-2 py-1 text-xs font-bold rounded ${tagColors[p.tag] || ""}`}>{p.tag}</span>
                      </div>
                      <div className="absolute bottom-4 left-4">
                        <span className="text-white/70 text-xs">{p.type}</span>
                      </div>
                      <button
                        data-testid={`btn-save-${p.id}`}
                        onClick={() => toggleSave(p.id)}
                        className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-all"
                      >
                        <Heart size={14} className={savedListings.has(p.id) ? "fill-red-500 text-red-500" : "text-white"} />
                      </button>
                    </div>
                    <div className="p-6">
                      <h3 className="font-black text-[#0D1B38] text-lg mb-1 group-hover:text-[#C9A84C] transition-colors">{p.title}</h3>
                      <div className="flex items-center gap-1 text-gray-400 text-xs mb-4">
                        <MapPin size={12} className="text-[#C9A84C]" />
                        {p.location}
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                      <div className="flex flex-wrap gap-4 mb-4 text-xs text-gray-400">
                        {p.beds > 0 && <span className="flex items-center gap-1"><Bed size={13} className="text-[#C9A84C]" />{p.beds} Beds</span>}
                        {p.baths > 0 && <span className="flex items-center gap-1"><Bath size={13} className="text-[#C9A84C]" />{p.baths} Baths</span>}
                        <span className="flex items-center gap-1"><Square size={13} className="text-[#C9A84C]" />{p.sqm.toLocaleString()} sqm</span>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div>
                          <div className="text-xl font-black text-[#0D1B38]">{p.price}</div>
                          <div className="text-xs text-[#C9A84C] font-semibold">{p.priceNote}</div>
                        </div>
                        <Link href="/contact" data-testid={`btn-enquire-${p.id}`} className="flex items-center gap-1 px-4 py-2 bg-[#0D1B38] text-white text-xs font-bold rounded hover:bg-[#C9A84C] hover:text-[#0D1B38] transition-all">
                          Enquire <ArrowRight size={12} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* All Listings */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-black text-[#0D1B38]">
              {activeType === "All" ? "All Listings" : activeType} <span className="text-gray-400 font-normal text-lg">({filtered.length})</span>
            </h2>
            <select className="text-sm border border-gray-200 rounded px-3 py-2 text-[#0D1B38] outline-none" data-testid="select-sort">
              <option>Sort: Newest First</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeType + activeLocation + searchQuery + minBeds}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((p, i) => (
                <motion.div
                  key={p.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  data-testid={`card-listing-${p.id}`}
                  className="group bg-white rounded-sm border border-gray-100 overflow-hidden hover:shadow-[0_16px_48px_rgba(13,27,56,0.1)] transition-all duration-300 hover:-translate-y-0.5"
                >
                  <div className="h-44 bg-gradient-to-br from-[#0D1B38] to-[#1a2d5a] relative overflow-hidden">
                    <div className="absolute inset-0 opacity-20 group-hover:opacity-30 transition-opacity" style={{
                      background: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(201,168,76,0.15) 20px, rgba(201,168,76,0.15) 21px)"
                    }} />
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className="bg-[#0D1B38] border border-[#C9A84C]/30 text-[#C9A84C] px-2 py-1 text-xs font-bold rounded">{p.type}</span>
                      <span className={`px-2 py-1 text-xs font-bold rounded ${tagColors[p.tag] || "bg-gray-100 text-gray-600"}`}>{p.tag}</span>
                    </div>
                    <button
                      data-testid={`btn-save-listing-${p.id}`}
                      onClick={() => toggleSave(p.id)}
                      className="absolute top-3 right-3 w-7 h-7 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center hover:bg-white/40 transition-all"
                    >
                      <Heart size={12} className={savedListings.has(p.id) ? "fill-red-500 text-red-500" : "text-white"} />
                    </button>
                    <div className="absolute bottom-3 left-3 text-white/40 text-xs">{p.category}</div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-black text-[#0D1B38] mb-1 text-base group-hover:text-[#C9A84C] transition-colors leading-snug">{p.title}</h3>
                    <div className="flex items-center gap-1 text-gray-400 text-xs mb-3">
                      <MapPin size={11} className="text-[#C9A84C]" />
                      {p.location}
                    </div>
                    <div className="flex flex-wrap gap-3 mb-4 text-xs text-gray-400">
                      {p.beds > 0 && <span className="flex items-center gap-1"><Bed size={12} className="text-[#C9A84C]" />{p.beds} Beds</span>}
                      {p.baths > 0 && <span className="flex items-center gap-1"><Bath size={12} className="text-[#C9A84C]" />{p.baths} Baths</span>}
                      <span className="flex items-center gap-1"><Square size={12} className="text-[#C9A84C]" />{p.sqm.toLocaleString()} sqm</span>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <div>
                        <div className="font-black text-[#0D1B38] text-base">{p.price}</div>
                        <div className="text-xs text-[#C9A84C] font-semibold">{p.priceNote}</div>
                      </div>
                      <div className="flex gap-2">
                        <a href="tel:+2348001000001" data-testid={`btn-call-${p.id}`} className="w-8 h-8 rounded bg-[#F5F7FA] flex items-center justify-center text-[#0D1B38] hover:bg-[#C9A84C] hover:text-[#0D1B38] transition-all">
                          <Phone size={14} />
                        </a>
                        <Link href="/contact" data-testid={`btn-listing-enquire-${p.id}`} className="flex items-center gap-1 px-3 py-1.5 bg-[#0D1B38] text-white text-xs font-bold rounded hover:bg-[#C9A84C] hover:text-[#0D1B38] transition-all">
                          Enquire
                        </Link>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="text-center py-24">
              <Search size={40} className="text-gray-200 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-400 mb-2">No properties found</h3>
              <p className="text-gray-400 text-sm">Try adjusting your search or filters</p>
              <button onClick={() => { setActiveType("All"); setSearchQuery(""); setActiveLocation("All Locations"); }} className="mt-6 px-6 py-2 border border-gray-200 rounded text-sm text-[#0D1B38] hover:border-[#C9A84C] hover:text-[#C9A84C] transition-colors">
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Inspection Booking CTA */}
      <section className="py-20 bg-[#0D1B38] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px), repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.5) 60px, rgba(255,255,255,0.5) 61px)`
        }} />
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="h-px w-12 bg-[#C9A84C]" />
                <span className="text-[#C9A84C] text-xs font-bold tracking-[0.25em] uppercase">Online Inspection</span>
              </div>
              <h2 className="text-4xl font-black text-white mb-4">Book a Property Inspection</h2>
              <p className="text-white/60 leading-relaxed mb-8">
                Our licensed agents will walk you through any property at your convenience — in-person or via virtual tour. No pressure, just professional guidance.
              </p>
              <ul className="space-y-3">
                {["Verified agent assigned within 24 hours", "In-person or virtual tour options", "Complete property documentation review", "Investment & valuation advisory included"].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-white/70 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right">
            <div className="bg-white/5 border border-white/10 rounded-sm p-8">
              <h3 className="text-white font-black text-lg mb-6">Schedule an Inspection</h3>
              <div className="space-y-4">
                <input data-testid="inspection-name" type="text" placeholder="Your Full Name" className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white text-sm placeholder:text-white/30 outline-none focus:border-[#C9A84C] transition-colors" />
                <input data-testid="inspection-phone" type="tel" placeholder="Phone Number" className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white text-sm placeholder:text-white/30 outline-none focus:border-[#C9A84C] transition-colors" />
                <input data-testid="inspection-property" type="text" placeholder="Property of Interest" className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white text-sm placeholder:text-white/30 outline-none focus:border-[#C9A84C] transition-colors" />
                <input data-testid="inspection-date" type="date" className="w-full bg-white/10 border border-white/20 rounded px-4 py-3 text-white/70 text-sm outline-none focus:border-[#C9A84C] transition-colors" />
                <button data-testid="btn-book-inspection" className="w-full py-3.5 bg-[#C9A84C] text-[#0D1B38] font-black rounded text-sm tracking-wide hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,168,76,0.4)] transition-all duration-300">
                  Book Inspection
                </button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}
