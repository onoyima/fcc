import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search, MessageSquare, Phone, Mail, User, Tag,
  CheckCircle, Clock, ArrowRight, Send, Plus,
} from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  type: "inquiry" | "viewing" | "quote" | "complaint";
  message: string;
  property?: string;
  date: string;
  status: "new" | "contacted" | "qualified" | "closed";
  assignedTo?: string;
}

const defaultLeads: Lead[] = [
  { id: "LD-001", name: "Chidi Eze", email: "chidi.e@email.com", phone: "+234 802 111 2233", type: "inquiry", message: "Interested in 4-bedroom duplex in Ikoyi. Please send details.", property: "Parkview Estate", date: "2025-04-14", status: "new", assignedTo: "Funmi Adeyemi" },
  { id: "LD-002", name: "Zainab Abdullah", email: "zainab.a@email.com", phone: "+234 803 222 3344", type: "viewing", message: "Would like to schedule a viewing for Victoria Island apartments.", property: "Victoria Island Apartment", date: "2025-04-13", status: "contacted", assignedTo: "Tunde Bakare" },
  { id: "LD-003", name: "Kayode Martins", email: "kayode.m@email.com", phone: "+234 805 333 4455", type: "quote", message: "Need a construction quote for a 3-bedroom bungalow in Lekki.", date: "2025-04-12", status: "qualified", assignedTo: "Chioma Eze" },
  { id: "LD-004", name: "Ngozi Okpara", email: "ngozi.o@email.com", phone: "+234 806 444 5566", type: "complaint", message: "Plumbing issue in my rented apartment — no response from maintenance.", property: "Ikeja GRA Apartment", date: "2025-04-11", status: "new" },
  { id: "LD-005", name: "Tobi Adekunle", email: "tobi.a@email.com", phone: "+234 808 555 6677", type: "inquiry", message: "Looking for commercial space for a restaurant in Victoria Island.", property: "Victoria Island Commercial", date: "2025-04-10", status: "contacted", assignedTo: "Funmi Adeyemi" },
  { id: "LD-006", name: "Fatima Usman", email: "fatima.u@email.com", phone: "+234 809 666 7788", type: "viewing", message: "Schedule visit for Banana Island luxury villa.", property: "Banana Island Luxury Villa", date: "2025-04-09", status: "new" },
];

const LEADS_KEY = "fcc_admin_leads";

function getLeads(): Lead[] {
  try {
    const data = localStorage.getItem(LEADS_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  localStorage.setItem(LEADS_KEY, JSON.stringify(defaultLeads));
  return defaultLeads;
}

const typeIcon = (type: string) => {
  switch (type) {
    case "inquiry": return <Search size={14} />;
    case "viewing": return <Clock size={14} />;
    case "quote": return <Tag size={14} />;
    case "complaint": return <MessageSquare size={14} />;
    default: return <MessageSquare size={14} />;
  }
};

export default function CRMModule() {
  const { hasRole } = useAdminAuth();
  const [leads, setLeads] = useState<Lead[]>(getLeads);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<string>("all");
  const [selected, setSelected] = useState<Lead | null>(null);
  const [note, setNote] = useState("");

  const canEdit = hasRole("super_admin", "customer_support", "estate_agent");

  const filtered = leads.filter((l) => {
    const matchSearch = l.name.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filter === "all" || l.status === filter;
    return matchSearch && matchStatus;
  });

  const statusBadge = (status: string) => {
    const map: Record<string, { color: string; label: string }> = {
      new: { color: "#3B82F6", label: "New" },
      contacted: { color: "#F59E0B", label: "Contacted" },
      qualified: { color: "#10B981", label: "Qualified" },
      closed: { color: "#6B7280", label: "Closed" },
    };
    const s = map[status] || { color: "#6B7280", label: status };
    return (
      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full" style={{ background: `${s.color}15`, color: s.color }}>
        {s.label}
      </span>
    );
  };

  const updateStatus = (id: string, status: Lead["status"]) => {
    setLeads((prev) => {
      const updated = prev.map((l) => (l.id === id ? { ...l, status } : l));
      localStorage.setItem(LEADS_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  const typeLabel = (type: string) => {
    const map: Record<string, string> = {
      inquiry: "Property Inquiry",
      viewing: "Schedule Viewing",
      quote: "Request Quote",
      complaint: "Complaint",
    };
    return map[type] || type;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "var(--clr-text)" }}>CRM</h1>
          <p className="text-sm mt-1" style={{ color: "var(--clr-text-muted)" }}>Lead management, customer communication, and follow-ups</p>
        </div>
      </div>

      {/* Summary bar */}
      <div className="flex gap-4 text-xs">
        {[
          { label: "New", count: leads.filter((l) => l.status === "new").length, color: "#3B82F6" },
          { label: "Contacted", count: leads.filter((l) => l.status === "contacted").length, color: "#F59E0B" },
          { label: "Qualified", count: leads.filter((l) => l.status === "qualified").length, color: "#10B981" },
          { label: "Total", count: leads.length, color: "var(--clr-text-muted)" },
        ].map((s) => (
          <div key={s.label} className="flex items-center gap-2 px-3 py-2 rounded-lg border" style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
            <span className="font-medium" style={{ color: "var(--clr-text-muted)" }}>{s.label}</span>
            <span className="font-bold" style={{ color: s.color }}>{s.count}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--clr-text-muted)" }} />
          <input
            type="text"
            placeholder="Search leads..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border outline-none"
            style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)", color: "var(--clr-text)" }}
          />
        </div>
        <div className="flex gap-2">
          {["all", "new", "contacted", "qualified", "closed"].map((s) => (
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

      {/* Lead cards */}
      <div className="space-y-3">
        {filtered.map((lead, i) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="rounded-xl border p-4 transition-all duration-200 cursor-pointer hover:-translate-y-0.5 hover:shadow-md"
            style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}
            onClick={() => setSelected(lead)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1 min-w-0">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                  style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}
                >
                  {lead.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-bold" style={{ color: "var(--clr-text)" }}>{lead.name}</p>
                    {statusBadge(lead.status)}
                  </div>
                  <p className="text-xs mt-1 line-clamp-1" style={{ color: "var(--clr-text-muted)" }}>
                    {lead.message}
                  </p>
                  <div className="flex items-center gap-3 mt-1.5">
                    <div className="flex items-center gap-1 text-[10px]" style={{ color: "var(--clr-accent)" }}>
                      {typeIcon(lead.type)}
                      {typeLabel(lead.type)}
                    </div>
                    <span className="text-[10px]" style={{ color: "var(--clr-text-muted)" }}>{lead.date}</span>
                    {lead.property && (
                      <span className="text-[10px] truncate" style={{ color: "var(--clr-text-muted)" }}>
                        {lead.property}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {canEdit && (
                <div className="flex gap-1 shrink-0">
                  {lead.status === "new" && (
                    <button
                      onClick={(e) => { e.stopPropagation(); updateStatus(lead.id, "contacted"); }}
                      className="p-1.5 rounded-lg transition-colors"
                      style={{ color: "#F59E0B" }}
                      title="Mark Contacted"
                    >
                      <MessageSquare size={14} />
                    </button>
                  )}
                  {lead.status === "contacted" && (
                    <button
                      onClick={(e) => { e.stopPropagation(); updateStatus(lead.id, "qualified"); }}
                      className="p-1.5 rounded-lg transition-colors"
                      style={{ color: "#10B981" }}
                      title="Mark Qualified"
                    >
                      <CheckCircle size={14} />
                    </button>
                  )}
                  {lead.status === "qualified" && (
                    <button
                      onClick={(e) => { e.stopPropagation(); updateStatus(lead.id, "closed"); }}
                      className="p-1.5 rounded-lg transition-colors"
                      style={{ color: "#6B7280" }}
                      title="Close"
                    >
                      <CheckCircle size={14} />
                    </button>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <MessageSquare size={40} className="mx-auto mb-3 opacity-30" style={{ color: "var(--clr-text-muted)" }} />
          <p className="text-sm font-medium" style={{ color: "var(--clr-text-muted)" }}>No leads found</p>
        </div>
      )}

      {/* Lead Detail Modal */}
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
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                  {selected.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-lg font-bold" style={{ color: "var(--clr-text)" }}>{selected.name}</h3>
                  <p className="text-xs font-mono" style={{ color: "var(--clr-accent)" }}>{selected.id}</p>
                </div>
              </div>
              {statusBadge(selected.status)}
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Mail size={14} style={{ color: "var(--clr-text-muted)" }} />
                <a href={`mailto:${selected.email}`} className="font-medium" style={{ color: "var(--clr-accent)" }}>{selected.email}</a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone size={14} style={{ color: "var(--clr-text-muted)" }} />
                <span style={{ color: "var(--clr-text)" }}>{selected.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                {typeIcon(selected.type)}
                <span className="font-medium" style={{ color: "var(--clr-text)" }}>{typeLabel(selected.type)}</span>
              </div>
              {selected.property && (
                <div className="flex items-center gap-2 text-sm">
                  <User size={14} style={{ color: "var(--clr-text-muted)" }} />
                  <span style={{ color: "var(--clr-text)" }}>{selected.property}</span>
                </div>
              )}
            </div>

            <div className="rounded-lg p-3 mb-4" style={{ background: "var(--clr-bg-alt)" }}>
              <p className="text-xs font-semibold mb-1" style={{ color: "var(--clr-text-muted)" }}>Message</p>
              <p className="text-sm" style={{ color: "var(--clr-text)" }}>{selected.message}</p>
            </div>

            {canEdit && (
              <div className="space-y-2 mb-4">
                <div className="flex gap-2">
                  {selected.status === "new" && (
                    <button onClick={() => updateStatus(selected.id, "contacted")} className="flex-1 py-2 rounded-lg text-xs font-bold" style={{ background: "#F59E0B", color: "white" }}>
                      Mark Contacted
                    </button>
                  )}
                  {selected.status === "contacted" && (
                    <button onClick={() => updateStatus(selected.id, "qualified")} className="flex-1 py-2 rounded-lg text-xs font-bold" style={{ background: "#10B981", color: "white" }}>
                      Mark Qualified
                    </button>
                  )}
                  {selected.status === "qualified" && (
                    <button onClick={() => updateStatus(selected.id, "closed")} className="flex-1 py-2 rounded-lg text-xs font-bold" style={{ background: "#6B7280", color: "white" }}>
                      Close Lead
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <input
                    type="text"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Add a note..."
                    className="flex-1 px-3 py-2 rounded-lg text-xs border outline-none"
                    style={{ background: "var(--clr-bg)", borderColor: "var(--clr-border)", color: "var(--clr-text)" }}
                  />
                  <button className="px-3 py-2 rounded-lg" style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                    <Send size={14} />
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setSelected(null)}
              className="w-full py-2.5 rounded-lg text-xs font-semibold border"
              style={{ borderColor: "var(--clr-border)", color: "var(--clr-text-muted)" }}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
