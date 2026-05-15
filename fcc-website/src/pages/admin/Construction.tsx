import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Search, HardHat, MapPin, Calendar, Users, CheckCircle, Clock, AlertTriangle } from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

interface Project {
  id: string;
  name: string;
  location: string;
  type: string;
  budget: string;
  spent: string;
  progress: number;
  status: "planning" | "in_progress" | "completed" | "on_hold";
  startDate: string;
  endDate: string;
  team: number;
  milestones: { label: string; done: boolean }[];
}

const defaultProjects: Project[] = [
  {
    id: "PRJ-001",
    name: "Lekki Phase 2 Estate Development",
    location: "Lekki, Lagos",
    type: "Estate Development",
    budget: "₦850,000,000",
    spent: "₦510,000,000",
    progress: 60,
    status: "in_progress",
    startDate: "2025-01-15",
    endDate: "2026-06-30",
    team: 45,
    milestones: [
      { label: "Site Clearing", done: true },
      { label: "Foundation", done: true },
      { label: "Structural Framing", done: true },
      { label: "Roofing", done: false },
      { label: "Interior Finishing", done: false },
      { label: "Landscaping", done: false },
    ],
  },
  {
    id: "PRJ-002",
    name: "Victoria Island Commercial Complex",
    location: "Victoria Island, Lagos",
    type: "Commercial",
    budget: "₦2,500,000,000",
    spent: "₦875,000,000",
    progress: 35,
    status: "in_progress",
    startDate: "2025-03-01",
    endDate: "2027-02-28",
    team: 120,
    milestones: [
      { label: "Design & Approvals", done: true },
      { label: "Excavation", done: true },
      { label: "Foundation", done: true },
      { label: "Steel Structure", done: false },
      { label: "Facade Installation", done: false },
      { label: "Interior Fit-out", done: false },
    ],
  },
  {
    id: "PRJ-003",
    name: "Banana Island Luxury Villas",
    location: "Banana Island, Lagos",
    type: "Residential",
    budget: "₦1,200,000,000",
    spent: "₦1,200,000,000",
    progress: 100,
    status: "completed",
    startDate: "2024-06-01",
    endDate: "2025-12-15",
    team: 60,
    milestones: [
      { label: "Design Phase", done: true },
      { label: "Construction", done: true },
      { label: "Interior Design", done: true },
      { label: "Landscaping", done: true },
      { label: "Handover", done: true },
    ],
  },
  {
    id: "PRJ-004",
    name: "Ibeju-Lekki Industrial Park",
    location: "Ibeju-Lekki, Lagos",
    type: "Industrial",
    budget: "₦4,000,000,000",
    spent: "₦600,000,000",
    progress: 15,
    status: "planning",
    startDate: "2025-09-01",
    endDate: "2027-12-31",
    team: 15,
    milestones: [
      { label: "Feasibility Study", done: true },
      { label: "Design & Engineering", done: false },
      { label: "Permits & Approvals", done: false },
      { label: "Construction", done: false },
      { label: "Commissioning", done: false },
    ],
  },
  {
    id: "PRJ-005",
    name: "Ikeja Smart City Towers",
    location: "Ikeja, Lagos",
    type: "Mixed-Use",
    budget: "₦3,800,000,000",
    spent: "₦1,900,000,000",
    progress: 50,
    status: "in_progress",
    startDate: "2025-02-01",
    endDate: "2026-08-31",
    team: 85,
    milestones: [
      { label: "Foundation", done: true },
      { label: "Core Structure", done: true },
      { label: "Facade", done: false },
      { label: "MEP Systems", done: false },
      { label: "Interior Finishes", done: false },
    ],
  },
  {
    id: "PRJ-006",
    name: "Ajah Road & Drainage Project",
    location: "Ajah, Lagos",
    type: "Infrastructure",
    budget: "₦750,000,000",
    spent: "₦562,000,000",
    progress: 75,
    status: "on_hold",
    startDate: "2024-10-01",
    endDate: "2025-12-31",
    team: 30,
    milestones: [
      { label: "Survey & Design", done: true },
      { label: "Earthwork", done: true },
      { label: "Drainage Installation", done: true },
      { label: "Road Paving", done: false },
      { label: "Street Lighting", done: false },
    ],
  },
];

const PROJECTS_KEY = "fcc_admin_projects";

function getProjects(): Project[] {
  try {
    const data = localStorage.getItem(PROJECTS_KEY);
    if (data) return JSON.parse(data);
  } catch {}
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(defaultProjects));
  return defaultProjects;
}

export default function ConstructionManagement() {
  const { hasRole } = useAdminAuth();
  const [projects, setProjects] = useState<Project[]>(getProjects);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);

  const filtered = projects.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || p.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const statusBadge = (status: string) => {
    const map: Record<string, { color: string; label: string }> = {
      planning: { color: "#3B82F6", label: "Planning" },
      in_progress: { color: "#F59E0B", label: "In Progress" },
      completed: { color: "#10B981", label: "Completed" },
      on_hold: { color: "#EF4444", label: "On Hold" },
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

  const canEdit = hasRole("super_admin", "construction_manager");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "var(--clr-text)" }}>Construction Management</h1>
          <p className="text-sm mt-1" style={{ color: "var(--clr-text-muted)" }}>
            Track projects, milestones, and site progress
          </p>
        </div>
        {canEdit && (
          <button
            onClick={() => { setEditing(null); setShowForm(true); }}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold tracking-wide transition-all"
            style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}
          >
            <Plus size={16} />
            New Project
          </button>
        )}
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--clr-text-muted)" }} />
          <input
            type="text"
            placeholder="Search projects..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl text-sm border outline-none transition-all"
            style={{
              background: "var(--clr-card)",
              borderColor: "var(--clr-border)",
              color: "var(--clr-text)",
            }}
          />
        </div>
        <div className="flex gap-2">
          {["all", "in_progress", "planning", "completed", "on_hold"].map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className="px-3 py-2 rounded-lg text-xs font-semibold transition-all capitalize"
              style={{
                background: statusFilter === s ? "var(--clr-accent)" : "var(--clr-card)",
                color: statusFilter === s ? "var(--clr-accent-text)" : "var(--clr-text-muted)",
                border: statusFilter === s ? "none" : `1px solid var(--clr-border)`,
              }}
            >
              {s.replace(/_/g, " ")}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards */}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filtered.map((project, i) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="rounded-xl border overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-lg group"
            style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}
          >
            <div className="p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--clr-accent)" }}>
                    {project.id}
                  </p>
                  <h3 className="text-sm font-bold mt-0.5" style={{ color: "var(--clr-text)" }}>
                    {project.name}
                  </h3>
                </div>
                {statusBadge(project.status)}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-xs" style={{ color: "var(--clr-text-muted)" }}>
                  <MapPin size={12} />
                  {project.location}
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: "var(--clr-text-muted)" }}>
                  <HardHat size={12} />
                  {project.type}
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: "var(--clr-text-muted)" }}>
                  <Users size={12} />
                  {project.team} workers
                </div>
                <div className="flex items-center gap-2 text-xs" style={{ color: "var(--clr-text-muted)" }}>
                  <Calendar size={12} />
                  {project.startDate} — {project.endDate}
                </div>
              </div>

              {/* Progress bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span style={{ color: "var(--clr-text-muted)" }}>Progress</span>
                  <span className="font-bold" style={{ color: "var(--clr-text)" }}>{project.progress}%</span>
                </div>
                <div className="w-full h-2 rounded-full" style={{ background: "var(--clr-bg-alt)" }}>
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${project.progress}%`,
                      background: "var(--clr-gradient-accent)",
                    }}
                  />
                </div>
              </div>

              {/* Budget */}
              <div className="flex items-center justify-between mt-3 pt-3 border-t text-xs" style={{ borderColor: "var(--clr-border)" }}>
                <span style={{ color: "var(--clr-text-muted)" }}>Budget: {project.budget}</span>
                <span className="font-semibold" style={{ color: "var(--clr-accent)" }}>Spent: {project.spent}</span>
              </div>

              {/* Milestones */}
              <div className="mt-3 pt-3 border-t space-y-1.5" style={{ borderColor: "var(--clr-border)" }}>
                <p className="text-[10px] font-bold uppercase tracking-wider" style={{ color: "var(--clr-text-muted)" }}>
                  Milestones
                </p>
                {project.milestones.slice(0, 4).map((m) => (
                  <div key={m.label} className="flex items-center gap-2 text-xs">
                    {m.done ? (
                      <CheckCircle size={12} style={{ color: "#10B981" }} />
                    ) : (
                      <Clock size={12} style={{ color: "var(--clr-text-muted)" }} />
                    )}
                    <span style={{ color: m.done ? "var(--clr-text)" : "var(--clr-text-muted)" }}>
                      {m.label}
                    </span>
                  </div>
                ))}
                {project.milestones.length > 4 && (
                  <p className="text-[10px] font-medium" style={{ color: "var(--clr-accent)" }}>
                    +{project.milestones.length - 4} more
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-16">
          <HardHat size={40} className="mx-auto mb-3 opacity-30" style={{ color: "var(--clr-text-muted)" }} />
          <p className="text-sm font-medium" style={{ color: "var(--clr-text-muted)" }}>No projects found</p>
        </div>
      )}

      {/* New/Edit Project Modal */}
      {showForm && (
        <ProjectFormModal
          project={editing}
          onClose={() => { setShowForm(false); setEditing(null); }}
          onSave={(p) => {
            if (editing) {
              setProjects((prev) => prev.map((x) => (x.id === p.id ? p : x)));
            } else {
              setProjects((prev) => [...prev, p]);
            }
            localStorage.setItem(PROJECTS_KEY, JSON.stringify(
              editing
                ? projects.map((x) => (x.id === p.id ? p : x))
                : [...projects, p]
            ));
            setShowForm(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}

function ProjectFormModal({
  project,
  onClose,
  onSave,
}: {
  project: Project | null;
  onClose: () => void;
  onSave: (p: Project) => void;
}) {
  const [form, setForm] = useState({
    name: project?.name || "",
    location: project?.location || "",
    type: project?.type || "Residential",
    budget: project?.budget || "",
    status: project?.status || "planning",
    startDate: project?.startDate || "",
    endDate: project?.endDate || "",
    team: project?.team || 1,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      id: project?.id || `PRJ-${Date.now().toString(36).toUpperCase()}`,
      ...form,
      spent: project?.spent || "₦0",
      progress: project?.progress || 0,
      milestones: project?.milestones || [],
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="w-full max-w-lg rounded-xl p-6"
        style={{ background: "var(--clr-card)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-bold mb-4" style={{ color: "var(--clr-text)" }}>
          {project ? "Edit Project" : "New Project"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold mb-1" style={{ color: "var(--clr-text-muted)" }}>Project Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full px-3 py-2.5 rounded-lg text-sm border outline-none"
              style={{ background: "var(--clr-bg)", borderColor: "var(--clr-border)", color: "var(--clr-text)" }}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "var(--clr-text-muted)" }}>Location</label>
              <input
                required
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg text-sm border outline-none"
                style={{ background: "var(--clr-bg)", borderColor: "var(--clr-border)", color: "var(--clr-text)" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "var(--clr-text-muted)" }}>Type</label>
              <select
                value={form.type}
                onChange={(e) => setForm({ ...form, type: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg text-sm border outline-none"
                style={{ background: "var(--clr-bg)", borderColor: "var(--clr-border)", color: "var(--clr-text)" }}
              >
                {["Residential", "Commercial", "Industrial", "Mixed-Use", "Infrastructure", "Estate Development"].map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "var(--clr-text-muted)" }}>Budget</label>
              <input
                required
                value={form.budget}
                onChange={(e) => setForm({ ...form, budget: e.target.value })}
                placeholder="₦1,000,000,000"
                className="w-full px-3 py-2.5 rounded-lg text-sm border outline-none"
                style={{ background: "var(--clr-bg)", borderColor: "var(--clr-border)", color: "var(--clr-text)" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "var(--clr-text-muted)" }}>Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                className="w-full px-3 py-2.5 rounded-lg text-sm border outline-none"
                style={{ background: "var(--clr-bg)", borderColor: "var(--clr-border)", color: "var(--clr-text)" }}
              >
                {["planning", "in_progress", "completed", "on_hold"].map((s) => (
                  <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "var(--clr-text-muted)" }}>Start Date</label>
              <input
                type="date"
                required
                value={form.startDate}
                onChange={(e) => setForm({ ...form, startDate: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg text-sm border outline-none"
                style={{ background: "var(--clr-bg)", borderColor: "var(--clr-border)", color: "var(--clr-text)" }}
              />
            </div>
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: "var(--clr-text-muted)" }}>End Date</label>
              <input
                type="date"
                required
                value={form.endDate}
                onChange={(e) => setForm({ ...form, endDate: e.target.value })}
                className="w-full px-3 py-2.5 rounded-lg text-sm border outline-none"
                style={{ background: "var(--clr-bg)", borderColor: "var(--clr-border)", color: "var(--clr-text)" }}
              />
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-sm font-semibold border"
              style={{ borderColor: "var(--clr-border)", color: "var(--clr-text-muted)" }}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg text-sm font-bold"
              style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}
            >
              {project ? "Update" : "Create"}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
}
