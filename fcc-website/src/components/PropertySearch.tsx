import { useState } from "react";
import { useLocation } from "wouter";
import { Search, MapPin, Home, ChevronDown } from "lucide-react";

const propertyTypes = ["For Sale", "For Rent", "Land", "Commercial", "Shortlet"];
const locations = ["Lagos", "Abuja", "Port Harcourt", "Kano", "Ibadan", "Enugu", "All Locations"];

export default function PropertySearch() {
  const [activeType, setActiveType] = useState("For Sale");
  const [location, setLocation] = useState("All Locations");
  const [, navigate] = useLocation();

  const handleSearch = () => navigate("/properties");

  return (
    <div className="rounded-sm shadow-2xl overflow-hidden border"
      style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
      {/* Type Tabs */}
      <div className="flex border-b" style={{ background: "var(--clr-bg-alt)", borderColor: "var(--clr-border)" }}>
        {propertyTypes.map((type) => (
          <button
            key={type}
            data-testid={`search-tab-${type.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() => setActiveType(type)}
            className="flex-1 py-3.5 text-xs font-bold transition-all duration-200 border-b-2"
            style={{
              borderBottomColor: activeType === type ? "var(--clr-accent)" : "transparent",
              color: activeType === type ? "var(--clr-primary)" : "var(--clr-text-muted)",
              background: activeType === type ? "var(--clr-card)" : "transparent",
            }}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Search Inputs */}
      <div className="p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-3 border rounded px-4 py-3"
          style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)" }}>
          <Search size={16} style={{ color: "var(--clr-text-muted)" }} className="flex-shrink-0" />
          <input
            data-testid="search-property-keyword"
            type="text"
            placeholder="Search location, estate, or property type..."
            className="flex-1 text-sm placeholder:opacity-50 outline-none bg-transparent"
            style={{ color: "var(--clr-text)" }}
          />
        </div>

        <div className="flex items-center gap-2 border rounded px-4 py-3 min-w-[160px]"
          style={{ borderColor: "var(--clr-border)", background: "var(--clr-bg-alt)" }}>
          <MapPin size={16} style={{ color: "var(--clr-text-muted)" }} className="flex-shrink-0" />
          <select
            data-testid="search-location"
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
          data-testid="btn-property-search"
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 px-6 py-3 font-black rounded text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5"
          style={{
            background: "var(--clr-accent)",
            color: "var(--clr-accent-text)",
            boxShadow: "0 8px 24px rgba(0,0,0,0.2)",
          }}
        >
          <Home size={16} /> Search
        </button>
      </div>

      <div className="px-4 pb-3 flex flex-wrap gap-3">
        <span className="text-xs" style={{ color: "var(--clr-text-muted)" }}>Popular:</span>
        {["Lekki Duplex", "Abuja Land", "Shortlet Ikoyi", "Commercial Abuja", "3-Bed Apartment"].map((s) => (
          <button
            key={s}
            onClick={handleSearch}
            className="text-xs transition-colors duration-200 hover:underline"
            style={{ color: "var(--clr-text-muted)" }}
            onMouseEnter={(e) => (e.currentTarget as HTMLElement).style.color = "var(--clr-accent)"}
            onMouseLeave={(e) => (e.currentTarget as HTMLElement).style.color = "var(--clr-text-muted)"}
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
