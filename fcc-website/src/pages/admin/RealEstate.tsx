import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus, Search, Building2, MapPin, Home, DollarSign,
  CheckCircle, Clock, XCircle, Eye, Edit3, Trash2,
} from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

interface Property {
  id: string;
  title: string;
  type: "buy" | "rent" | "land" | "commercial";
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  status: "approved" | "pending" | "rejected";
  agent: string;
  listedDate: string;
  views: number;
  image: string;
}

const defaultProperties: Property[] = [
  { id: "P-001", title: "4-Bedroom Luxury Duplex", type: "buy", price: "₦250,000,000", location: "Banana Island, Lagos", bedrooms: 4, bathrooms: 5, area: "650 sqm", status: "approved", agent: "Chioma Eze", listedDate: "2025-01-15", views: 284, image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800" },
  { id: "P-002", title: "3-Bedroom Apartment", type: "rent", price: "₦4,500,000/yr", location: "Victoria Island, Lagos", bedrooms: 3, bathrooms: 3, area: "200 sqm", status: "approved", agent: "Tunde Bakare", listedDate: "2025-02-01", views: 156, image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800" },
  { id: "P-003", title: "Commercial Plot — Lekki Phase 1", type: "land", price: "₦85,000,000", location: "Lekki Phase 1, Lagos", bedrooms: 0, bathrooms: 0, area: "1,200 sqm", status: "pending", agent: "Chioma Eze", listedDate: "2025-03-10", views: 92, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800" },
  { id: "P-004", title: "Office Space — Ikoyi", type: "commercial", price: "₦12,000,000/yr", location: "Ikoyi, Lagos", bedrooms: 0, bathrooms: 2, area: "450 sqm", status: "approved", agent: "Funmi Adeyemi", listedDate: "2024-12-20", views: 203, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800" },
  { id: "P-005", title: "5-Bedroom Mansion", type: "buy", price: "₦480,000,000", location: "Parkview Estate, Ikoyi", bedrooms: 5, bathrooms: 6, area: "890 sqm", status: "rejected", agent: "Tunde Bakare", listedDate: "2025-01-05", views: 67, image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800" },
  { id: "P-006", title: "2-Bedroom Apartment", type: "rent", price: "₦2,800,000/yr", location: "GRA, Ikeja", bedrooms: 2, bathrooms: 2, area: "120 sqm", status: "pending", agent: "Funmi Adeyemi", listedDate: "2025-03-15", views: 45, image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800" },
  { id: "P-007", title: "Residential Land — Ajah", type: "land", price: "₦35,000,000", location: "Ajah, Lagos", bedrooms: 0, bathrooms: 0, area: "600 sqm", status: "approved", agent: "Chioma Eze", listedDate: "2025-02-20", views: 118, image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800" },
  { id: "P-008", title: "Retail Space — The Palms", type: "commercial", price: "₦8,500,000/yr", location: "Lekki, Lagos", bedrooms: 0, bathrooms: 1, area: "200 sqm", status: "pending", agent: "Tunde Bakare", listedDate: "2025-03-01", views: 78, image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800" },
];

const PROPERTIES_KEY = "fcc_admin_properties";

function getProperties(): Property[] {
  try {
    const data = localStorage.getItem(PROPERTIES_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  localStorage.setItem(PROPERTIES_KEY, JSON.stringify(defaultProperties));
  return defaultProperties;
}

export default function RealEstateManagement() {
  const { hasRole } = useAdminAuth();
  const [properties, setProperties] = useState<Property[]>(getProperties);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Property | null>(null);

  const canEdit = hasRole("super_admin", "property_manager", "estate_agent");

  const filtered = properties.filter((p) => {
    const matchSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.location.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filter === "all" || p.status === filter;
    const matchType = typeFilter === "all" || p.type === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const statusBadge = (status: string) => {
    const map: Record<string, { color: string; label: string }> = {
      approved: { color: "#10B981", label: "Approved" },
      pending: { color: "#F59E0B", label: "Pending" },
      rejected: { color: "#EF4444", label: "Rejected" },
    };
    const s = map[status] || { color: "#6B7280", label: status };
    return (
      <span
        className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
        style={{ background: `${s.color}15`, color: s.color }}
      >
        {s.label}
      </span>
    );
  };

  const typeLabel = (type: string) => {
    const map: Record<string, string> = { buy: "For Sale", rent: "For Rent", land: "Land", commercial: "Commercial" };
    return map[type] || type;
  };

  const updateStatus = (id: string, status: "approved" | "rejected") => {
    setProperties((prev) => {
      const updated = prev.map((p) => (p.id === id ? { ...p, status } : p));
      localStorage.setItem(PROPERTIES_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "var(--clr-text)" }}>Real Estate Management</h1>
          <p className="text-sm mt-1" style={{ color: "var(--clr-text-muted)" }}>Manage property listings, approvals, and analytics</p>
        </div>
        {canEdit && (
          <button
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all"
            style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}
          >
            <Plus size={16} />
            Add Property
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--clr-text-muted)" }} />
          <input
            type="text"
            placeholder="Search properties..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border outline-none"
            style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)", color: "var(--clr-text)" }}
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="px-3 py-2.5 rounded-xl text-sm border outline-none"
          style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)", color: "var(--clr-text)" }}
        >
          <option value="all">All Types</option>
          <option value="buy">For Sale</option>
          <option value="rent">For Rent</option>
          <option value="land">Land</option>
          <option value="commercial">Commercial</option>
        </select>
        <div className="flex gap-2">
          {["all", "pending", "approved", "rejected"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className="px-3 py-2 rounded-lg text-xs font-semibold transition-all capitalize"
              style={{
                background: filter === s ? "var(--clr-accent)" : "var(--clr-card)",
                color: filter === s ? "var(--clr-accent-text)" : "var(--clr-text-muted)",
                border: filter === s ? "none" : `1px solid var(--clr-border)`,
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border overflow-hidden" style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b text-xs uppercase tracking-wider font-bold" style={{ borderColor: "var(--clr-border)", color: "var(--clr-text-muted)" }}>
                <th className="text-left px-4 py-3">Property</th>
                <th className="text-left px-4 py-3">Type</th>
                <th className="text-left px-4 py-3">Price</th>
                <th className="text-left px-4 py-3">Location</th>
                <th className="text-left px-4 py-3">Agent</th>
                <th className="text-left px-4 py-3">Status</th>
                <th className="text-right px-4 py-3">Views</th>
                {canEdit && <th className="text-right px-4 py-3">Actions</th>}
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: "var(--clr-border)" }}>
              {filtered.map((property, i) => (
                <motion.tr
                  key={property.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="transition-colors cursor-pointer"
                  style={{ color: "var(--clr-text)" }}
                  onClick={() => setSelected(property)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img
                        src={property.image}
                        alt={property.title}
                        className="w-10 h-10 rounded-lg object-cover"
                      />
                      <div>
                        <p className="text-sm font-semibold">{property.title}</p>
                        <p className="text-[10px] font-mono" style={{ color: "var(--clr-accent)" }}>{property.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-medium">{typeLabel(property.type)}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs font-bold">{property.price}</span>
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--clr-text-muted)" }}>
                    {property.location}
                  </td>
                  <td className="px-4 py-3 text-xs" style={{ color: "var(--clr-text-muted)" }}>
                    {property.agent}
                  </td>
                  <td className="px-4 py-3">{statusBadge(property.status)}</td>
                  <td className="px-4 py-3 text-xs text-right" style={{ color: "var(--clr-text-muted)" }}>
                    {property.views}
                  </td>
                  {canEdit && (
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        {property.status === "pending" && (
                          <>
                            <button
                              onClick={(e) => { e.stopPropagation(); updateStatus(property.id, "approved"); }}
                              className="p-1.5 rounded-lg transition-colors hover:bg-emerald-500/10"
                              style={{ color: "#10B981" }}
                              title="Approve"
                            >
                              <CheckCircle size={14} />
                            </button>
                            <button
                              onClick={(e) => { e.stopPropagation(); updateStatus(property.id, "rejected"); }}
                              className="p-1.5 rounded-lg transition-colors hover:bg-red-500/10"
                              style={{ color: "#EF4444" }}
                              title="Reject"
                            >
                              <XCircle size={14} />
                            </button>
                          </>
                        )}
                        <button className="p-1.5 rounded-lg transition-colors" style={{ color: "var(--clr-text-muted)" }} title="Edit">
                          <Edit3 size={14} />
                        </button>
                        <button className="p-1.5 rounded-lg transition-colors hover:bg-red-500/10" style={{ color: "#EF4444" }} title="Delete">
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </td>
                  )}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Building2 size={40} className="mx-auto mb-3 opacity-30" style={{ color: "var(--clr-text-muted)" }} />
          <p className="text-sm font-medium" style={{ color: "var(--clr-text-muted)" }}>No properties found</p>
        </div>
      )}

      {/* Property Detail Modal */}
      {selected && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          style={{ background: "rgba(0,0,0,0.5)" }}
          onClick={() => setSelected(null)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="w-full max-w-lg rounded-xl overflow-hidden"
            style={{ background: "var(--clr-card)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img src={selected.image} alt={selected.title} className="w-full h-48 object-cover" />
            <div className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-lg font-bold" style={{ color: "var(--clr-text)" }}>{selected.title}</h3>
                  <p className="text-xs font-mono mt-0.5" style={{ color: "var(--clr-accent)" }}>{selected.id}</p>
                </div>
                {statusBadge(selected.status)}
              </div>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-xs" style={{ color: "var(--clr-text-muted)" }}>Price</span>
                  <p className="font-bold" style={{ color: "var(--clr-text)" }}>{selected.price}</p>
                </div>
                <div>
                  <span className="text-xs" style={{ color: "var(--clr-text-muted)" }}>Type</span>
                  <p className="font-medium" style={{ color: "var(--clr-text)" }}>{typeLabel(selected.type)}</p>
                </div>
                <div>
                  <span className="text-xs" style={{ color: "var(--clr-text-muted)" }}>Location</span>
                  <p className="font-medium" style={{ color: "var(--clr-text)" }}>{selected.location}</p>
                </div>
                <div>
                  <span className="text-xs" style={{ color: "var(--clr-text-muted)" }}>Area</span>
                  <p className="font-medium" style={{ color: "var(--clr-text)" }}>{selected.area}</p>
                </div>
                <div>
                  <span className="text-xs" style={{ color: "var(--clr-text-muted)" }}>Bedrooms</span>
                  <p className="font-medium" style={{ color: "var(--clr-text)" }}>{selected.bedrooms}</p>
                </div>
                <div>
                  <span className="text-xs" style={{ color: "var(--clr-text-muted)" }}>Bathrooms</span>
                  <p className="font-medium" style={{ color: "var(--clr-text)" }}>{selected.bathrooms}</p>
                </div>
                <div>
                  <span className="text-xs" style={{ color: "var(--clr-text-muted)" }}>Agent</span>
                  <p className="font-medium" style={{ color: "var(--clr-text)" }}>{selected.agent}</p>
                </div>
                <div>
                  <span className="text-xs" style={{ color: "var(--clr-text-muted)" }}>Views</span>
                  <p className="font-medium" style={{ color: "var(--clr-text)" }}>{selected.views}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
