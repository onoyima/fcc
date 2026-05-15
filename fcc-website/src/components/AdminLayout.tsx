import { useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  HardHat,
  Building2,
  Users,
  DollarSign,
  MessageSquare,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Bell,
  UserCircle,
  Grid3X3,
  ClipboardCheck,
  FileText,
} from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";
import { useTheme } from "@/contexts/ThemeContext";

interface NavItem {
  label: string;
  icon: React.ReactNode;
  href: string;
  roles?: string[];
  children?: { label: string; href: string; roles?: string[] }[];
}

const navItems: NavItem[] = [
  { label: "Dashboard", icon: <LayoutDashboard size={18} />, href: "/admin" },
  {
    label: "Construction",
    icon: <HardHat size={18} />,
    href: "/admin/construction",
    roles: ["super_admin", "construction_manager", "project_manager", "site_supervisor"],
  },
  {
    label: "Real Estate",
    icon: <Building2 size={18} />,
    href: "/admin/real-estate",
    roles: ["super_admin", "property_manager", "estate_agent", "estate_manager"],
  },
  {
    label: "Tenants",
    icon: <Users size={18} />,
    href: "/admin/tenants",
    roles: ["super_admin", "property_manager", "estate_manager", "maintenance_officer"],
  },
  {
    label: "Finance",
    icon: <DollarSign size={18} />,
    href: "/admin/finance",
    roles: ["super_admin", "accountant"],
  },
  {
    label: "CRM",
    icon: <MessageSquare size={18} />,
    href: "/admin/crm",
    roles: ["super_admin", "customer_support", "estate_agent"],
  },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedMenus, setExpandedMenus] = useState<string[]>([]);
  const { user, logout, hasRole } = useAdminAuth();
  const { colors } = useTheme();
  const [location] = useLocation();

  const toggleMenu = (label: string) => {
    setExpandedMenus((prev) =>
      prev.includes(label) ? prev.filter((m) => m !== label) : [...prev, label]
    );
  };

  const filteredItems = navItems.filter(
    (item) => !item.roles || hasRole(...item.roles as any)
  );

  const isActive = (href: string) => location === href;

  const sidebarContent = (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-3 px-6 h-16 border-b" style={{ borderColor: "var(--clr-border)" }}>
        <div
          className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-black"
          style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}
        >
          FC
        </div>
        <div className={sidebarOpen ? "block" : "hidden"}>
          <p className="text-sm font-bold" style={{ color: "var(--clr-text)" }}>FCC Admin</p>
          <p className="text-[10px] uppercase tracking-widest opacity-60" style={{ color: "var(--clr-text-muted)" }}>
            Management Portal
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {filteredItems.map((item) => {
          const active = isActive(item.href);
          const hasChildren = item.children && item.children.length > 0;
          const expanded = expandedMenus.includes(item.label);

          return (
            <div key={item.href}>
              <Link
                href={item.href}
                onClick={(e) => {
                  if (hasChildren) {
                    e.preventDefault();
                    toggleMenu(item.label);
                  }
                }}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group"
                style={{
                  background: active ? `${colors.accent}20` : "transparent",
                  color: active ? "var(--clr-accent)" : "var(--clr-text-muted)",
                }}
              >
                <span className="shrink-0">{item.icon}</span>
                <span className={sidebarOpen ? "block" : "hidden"}>{item.label}</span>
                {hasChildren && sidebarOpen && (
                  <ChevronDown
                    size={14}
                    className="ml-auto transition-transform"
                    style={{ transform: expanded ? "rotate(180deg)" : "rotate(0deg)" }}
                  />
                )}
              </Link>
              {hasChildren && expanded && sidebarOpen && (
                <div className="ml-8 mt-1 space-y-1">
                  {item.children!.map((child) => {
                    const childActive = isActive(child.href);
                    return (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-3 py-2 rounded-lg text-xs font-medium transition-all"
                        style={{
                          background: childActive ? `${colors.accent}20` : "transparent",
                          color: childActive ? "var(--clr-accent)" : "var(--clr-text-muted)",
                        }}
                      >
                        {child.label}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="px-3 py-3 border-t" style={{ borderColor: "var(--clr-border)" }}>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}
          >
            {user?.name?.charAt(0) || "A"}
          </div>
          <div className={sidebarOpen ? "flex-1 min-w-0" : "hidden"}>
            <p className="text-xs font-semibold truncate" style={{ color: "var(--clr-text)" }}>
              {user?.name}
            </p>
            <p className="text-[10px] truncate capitalize opacity-60" style={{ color: "var(--clr-text-muted)" }}>
              {user?.role?.replace(/_/g, " ")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "var(--clr-bg)" }}>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex flex-col border-r transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
        style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile sidebar overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
            style={{ background: "rgba(0,0,0,0.5)" }}
            onClick={() => setMobileOpen(false)}
          >
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-72 h-full"
              style={{ background: "var(--clr-card)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {sidebarContent}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top header */}
        <header
          className="h-16 border-b flex items-center justify-between px-4 lg:px-6 shrink-0"
          style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex p-2 rounded-lg transition-colors"
              style={{ color: "var(--clr-text-muted)" }}
            >
              <Menu size={20} />
            </button>
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg transition-colors"
              style={{ color: "var(--clr-text-muted)" }}
            >
              <Menu size={20} />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
              style={{ color: "var(--clr-accent)" }}
            >
              View Site
            </Link>
            <button
              className="p-2 rounded-lg relative transition-colors"
              style={{ color: "var(--clr-text-muted)" }}
            >
              <Bell size={18} />
              <span
                className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full"
                style={{ background: "var(--clr-accent)" }}
              />
            </button>
            <button
              onClick={logout}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors"
              style={{ color: "var(--clr-text-muted)" }}
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
