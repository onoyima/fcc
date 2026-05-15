import { useState } from "react";
import { motion } from "framer-motion";
import {
  Plus, Search, Users, Home, Phone, Mail, Calendar,
  DollarSign, Wrench, AlertTriangle, CheckCircle, Clock,
} from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  property: string;
  unit: string;
  leaseStart: string;
  leaseEnd: string;
  rent: string;
  status: "active" | "overdue" | "expiring" | "past";
  balance: string;
  tickets: number;
}

const defaultTenants: Tenant[] = [
  { id: "T-001", name: "Adebayo Ogunlesi", email: "adebayo.o@email.com", phone: "+234 802 345 6789", property: "Banana Island Luxury Villa", unit: "Villa 4", leaseStart: "2025-01-01", leaseEnd: "2026-12-31", rent: "₦4,500,000/mo", status: "active", balance: "₦0", tickets: 0 },
  { id: "T-002", name: "Chioma Nwosu", email: "chioma.n@email.com", phone: "+234 803 456 7890", property: "Victoria Island Apartment", unit: "Block B, Flat 3", leaseStart: "2024-06-01", leaseEnd: "2025-05-31", rent: "₦375,000/mo", status: "expiring", balance: "₦0", tickets: 1 },
  { id: "T-003", name: "Emeka Okonkwo", email: "emeka.o@email.com", phone: "+234 805 678 9012", property: "Lekki Phase 2 Duplex", unit: "Unit 8", leaseStart: "2025-02-01", leaseEnd: "2026-01-31", rent: "₦850,000/mo", status: "overdue", balance: "₦1,700,000", tickets: 2 },
  { id: "T-004", name: "Folake Adeniyi", email: "folake.a@email.com", phone: "+234 806 789 0123", property: "Ikeja GRA Apartment", unit: "Block C, Flat 7", leaseStart: "2025-03-15", leaseEnd: "2026-03-14", rent: "₦280,000/mo", status: "active", balance: "₦0", tickets: 0 },
  { id: "T-005", name: "Godwin Obasi", email: "godwin.o@email.com", phone: "+234 808 901 2345", property: "Ajah Terrace Duplex", unit: "Unit 12", leaseStart: "2024-09-01", leaseEnd: "2025-08-31", rent: "₦520,000/mo", status: "active", balance: "₦0", tickets: 3 },
  { id: "T-006", name: "Halima Bello", email: "halima.b@email.com", phone: "+234 809 012 3456", property: "Victoria Garden City", unit: "Block A, Flat 10", leaseStart: "2025-01-01", leaseEnd: "2025-12-31", rent: "₦320,000/mo", status: "overdue", balance: "₦960,000", tickets: 1 },
];

const TENANTS_KEY = "fcc_admin_tenants";

function getTenants(): Tenant[] {
  try {
    const data = localStorage.getItem(TENANTS_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  localStorage.setItem(TENANTS_KEY, JSON.stringify(defaultTenants));
  return defaultTenants;
}

export default function TenantManagement() {
  const { hasRole } = useAdminAuth();
  const [tenants, setTenants] = useState<Tenant[]>(getTenants);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Tenant | null>(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const [ticketTenant, setTicketTenant] = useState<Tenant | null>(null);

  const filtered = tenants.filter((t) => {
    const matchSearch = t.name.toLowerCase().includes(search.toLowerCase()) || t.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filter === "all" || t.status === filter;
    return matchSearch && matchStatus;
  });

  const statusBadge = (status: string) => {
    const map: Record<string, { color: string; label: string }> = {
      active: { color: "#10B981", label: "Active" },
      overdue: { color: "#EF4444", label: "Overdue" },
      expiring: { color: "#F59E0B", label: "Expiring Soon" },
      past: { color: "#6B7280", label: "Past Tenant" },
    };
    const s = map[status] || { color: "#6B7280", label: status };
    return (
      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full" style={{ background: `${s.color}15`, color: s.color }}>
        {s.label}
      </span>
    );
  };

  const sendReminder = (id: string) => {
    alert(`Rent reminder sent to tenant ${id}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "var(--clr-text)" }}>Tenant Management</h1>
          <p className="text-sm mt-1" style={{ color: "var(--clr-text-muted)" }}>Manage leases, rent collection, and maintenance requests</p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--clr-text-muted)" }} />
          <input
            type="text"
            placeholder="Search tenants..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border outline-none"
            style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)", color: "var(--clr-text)" }}
          />
        </div>
        <div className="flex gap-2">
          {["all", "active", "overdue", "expiring", "past"].map((s) => (
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
              {s.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Tenant Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((tenant, i) => (
          <motion.div
            key={tenant.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            className="rounded-xl border p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer"
            style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}
            onClick={() => setSelected(tenant)}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                  style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}
                >
                  {tenant.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-bold" style={{ color: "var(--clr-text)" }}>{tenant.name}</p>
                  <p className="text-[10px] font-mono" style={{ color: "var(--clr-accent)" }}>{tenant.id}</p>
                </div>
              </div>
              {statusBadge(tenant.status)}
            </div>

            <div className="space-y-1.5 text-xs mb-3" style={{ color: "var(--clr-text-muted)" }}>
              <div className="flex items-center gap-2">
                <Home size={12} />
                {tenant.property} — {tenant.unit}
              </div>
              <div className="flex items-center gap-2">
                <DollarSign size={12} />
                {tenant.rent}
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={12} />
                {tenant.leaseStart} → {tenant.leaseEnd}
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t" style={{ borderColor: "var(--clr-border)" }}>
              <div className="text-xs">
                <span style={{ color: "var(--clr-text-muted)" }}>Balance: </span>
                <span className={`font-bold ${tenant.balance !== "₦0" ? "text-red-500" : ""}`}>
                  {tenant.balance}
                </span>
              </div>
              <div className="flex items-center gap-1 text-xs" style={{ color: "var(--clr-text-muted)" }}>
                <Wrench size={12} />
                {tenant.tickets} tickets
              </div>
            </div>

            {tenant.status === "overdue" && (
              <button
                onClick={(e) => { e.stopPropagation(); sendReminder(tenant.id); }}
                className="w-full mt-3 py-2 rounded-lg text-xs font-bold transition-all"
                style={{ background: `${tenant.balance !== "₦0" ? "#EF4444" : "var(--clr-accent)"}15`, color: "#EF4444" }}
              >
                Send Rent Reminder
              </button>
            )}
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <Users size={40} className="mx-auto mb-3 opacity-30" style={{ color: "var(--clr-text-muted)" }} />
          <p className="text-sm font-medium" style={{ color: "var(--clr-text-muted)" }}>No tenants found</p>
        </div>
      )}

      {/* Tenant Detail Modal */}
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
            className="w-full max-w-lg rounded-xl p-6"
            style={{ background: "var(--clr-card)" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold"
                  style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}
                >
                  {selected.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: "var(--clr-text)" }}>{selected.name}</h3>
                  <p className="text-xs font-mono" style={{ color: "var(--clr-accent)" }}>{selected.id}</p>
                </div>
              </div>
              {statusBadge(selected.status)}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm mb-5">
              <div>
                <span className="text-xs" style={{ color: "var(--clr-text-muted)" }}>Email</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Mail size={12} style={{ color: "var(--clr-text-muted)" }} />
                  <span style={{ color: "var(--clr-text)" }}>{selected.email}</span>
                </div>
              </div>
              <div>
                <span className="text-xs" style={{ color: "var(--clr-text-muted)" }}>Phone</span>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Phone size={12} style={{ color: "var(--clr-text-muted)" }} />
                  <span style={{ color: "var(--clr-text)" }}>{selected.phone}</span>
                </div>
              </div>
              <div>
                <span className="text-xs" style={{ color: "var(--clr-text-muted)" }}>Property</span>
                <p className="font-medium mt-0.5" style={{ color: "var(--clr-text)" }}>{selected.property}</p>
              </div>
              <div>
                <span className="text-xs" style={{ color: "var(--clr-text-muted)" }}>Unit</span>
                <p className="font-medium mt-0.5" style={{ color: "var(--clr-text)" }}>{selected.unit}</p>
              </div>
              <div>
                <span className="text-xs" style={{ color: "var(--clr-text-muted)" }}>Lease Period</span>
                <p className="font-medium mt-0.5" style={{ color: "var(--clr-text)" }}>{selected.leaseStart} → {selected.leaseEnd}</p>
              </div>
              <div>
                <span className="text-xs" style={{ color: "var(--clr-text-muted)" }}>Rent</span>
                <p className="font-bold mt-0.5" style={{ color: "var(--clr-text)" }}>{selected.rent}</p>
              </div>
              <div>
                <span className="text-xs" style={{ color: "var(--clr-text-muted)" }}>Balance</span>
                <p className={`font-bold mt-0.5 ${selected.balance !== "₦0" ? "text-red-500" : ""}`}>
                  {selected.balance}
                </p>
              </div>
              <div>
                <span className="text-xs" style={{ color: "var(--clr-text-muted)" }}>Maintenance Tickets</span>
                <p className="font-medium mt-0.5" style={{ color: "var(--clr-text)" }}>{selected.tickets}</p>
              </div>
            </div>

            <div className="flex gap-2">
              {selected.status === "overdue" && (
                <button
                  onClick={() => sendReminder(selected.id)}
                  className="flex-1 py-2.5 rounded-lg text-xs font-bold"
                  style={{ background: "#EF4444", color: "white" }}
                >
                  Send Rent Reminder
                </button>
              )}
              <button
                onClick={() => setSelected(null)}
                className="flex-1 py-2.5 rounded-lg text-xs font-semibold border"
                style={{ borderColor: "var(--clr-border)", color: "var(--clr-text-muted)" }}
              >
                Close
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
