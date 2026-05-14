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
    <div className="bg-white rounded-sm shadow-2xl overflow-hidden">
      {/* Type Tabs */}
      <div className="flex bg-[#F5F7FA] border-b border-gray-100">
        {propertyTypes.map((type) => (
          <button
            key={type}
            data-testid={`search-tab-${type.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={() => setActiveType(type)}
            className={`flex-1 py-3.5 text-xs font-bold transition-all duration-200 border-b-2 ${
              activeType === type
                ? "border-[#C9A84C] text-[#0D1B38] bg-white"
                : "border-transparent text-gray-400 hover:text-[#0D1B38]"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Search Inputs */}
      <div className="p-4 flex flex-col sm:flex-row gap-3">
        <div className="flex-1 flex items-center gap-3 border border-gray-200 rounded px-4 py-3">
          <Search size={16} className="text-gray-400 flex-shrink-0" />
          <input
            data-testid="search-property-keyword"
            type="text"
            placeholder="Search location, estate, or property type..."
            className="flex-1 text-sm text-[#0D1B38] placeholder:text-gray-400 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 border border-gray-200 rounded px-4 py-3 min-w-[160px]">
          <MapPin size={16} className="text-gray-400 flex-shrink-0" />
          <select
            data-testid="search-location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="flex-1 text-sm text-[#0D1B38] outline-none bg-transparent cursor-pointer"
          >
            {locations.map((l) => <option key={l}>{l}</option>)}
          </select>
          <ChevronDown size={14} className="text-gray-400" />
        </div>

        <button
          data-testid="btn-property-search"
          onClick={handleSearch}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#C9A84C] text-[#0D1B38] font-black rounded text-sm tracking-wide transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(201,168,76,0.4)]"
        >
          <Home size={16} /> Search
        </button>
      </div>

      <div className="px-4 pb-3 flex flex-wrap gap-2">
        {["Lekki Duplex", "Abuja Land", "Shortlet Ikoyi", "Commercial Abuja", "3-Bed Apartment"].map((s) => (
          <button
            key={s}
            onClick={handleSearch}
            className="text-xs text-gray-400 hover:text-[#C9A84C] transition-colors"
          >
            {s}
          </button>
        ))}
      </div>
    </div>
  );
}
