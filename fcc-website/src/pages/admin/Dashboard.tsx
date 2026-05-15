import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  HardHat,
  Building2,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertTriangle,
  FileText,
  ArrowRight,
} from "lucide-react";
import { Link } from "wouter";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

interface StatCard {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ReactNode;
  color: string;
}

interface RecentActivity {
  id: string;
  type: "project" | "payment" | "maintenance" | "lease" | "inquiry";
  message: string;
  time: string;
  status: "completed" | "pending" | "urgent";
}

export default function AdminDashboard() {
  const { user, hasRole } = useAdminAuth();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 18) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, []);

  const stats: StatCard[] = [
    {
      label: "Active Projects",
      value: "24",
      change: "+12%",
      trend: "up",
      icon: <HardHat size={22} />,
      color: "#3B82F6",
    },
    {
      label: "Properties Listed",
      value: "186",
      change: "+8%",
      trend: "up",
      icon: <Building2 size={22} />,
      color: "#10B981",
    },
    {
      label: "Active Tenants",
      value: "342",
      change: "+5.2%",
      trend: "up",
      icon: <Users size={22} />,
      color: "#F59E0B",
    },
    {
      label: "Revenue (MTD)",
      value: "₦12.8M",
      change: "-3.1%",
      trend: "down",
      icon: <DollarSign size={22} />,
      color: "#EF4444",
    },
  ];

  const recentActivities: RecentActivity[] = [
    {
      id: "1",
      type: "project",
      message: "Lekki Phase 2 foundation work completed ahead of schedule",
      time: "2 hours ago",
      status: "completed",
    },
    {
      id: "2",
      type: "payment",
      message: "Rent payment received from Tenant #T-042 (Adebayo O.)",
      time: "3 hours ago",
      status: "completed",
    },
    {
      id: "3",
      type: "maintenance",
      message: "Urgent: Electrical fault reported at Victoria Garden City Block C",
      time: "1 hour ago",
      status: "urgent",
    },
    {
      id: "4",
      type: "lease",
      message: "New lease agreement signed — 3-bedroom duplex, Banana Island",
      time: "5 hours ago",
      status: "completed",
    },
    {
      id: "5",
      type: "inquiry",
      message: "New property inquiry from Chidi E. — 4-bedroom in Ikoyi",
      time: "6 hours ago",
      status: "pending",
    },
    {
      id: "6",
      type: "project",
      message: "Victoria Island commercial complex — Phase 3 steel framing in progress",
      time: "8 hours ago",
      status: "pending",
    },
  ];

  const statusColor = (status: string) => {
    switch (status) {
      case "completed": return "var(--clr-accent)";
      case "pending": return "#F59E0B";
      case "urgent": return "#EF4444";
      default: return "var(--clr-text-muted)";
    }
  };

  const activityIcon = (type: string) => {
    switch (type) {
      case "project": return <HardHat size={14} />;
      case "payment": return <DollarSign size={14} />;
      case "maintenance": return <AlertTriangle size={14} />;
      case "lease": return <FileText size={14} />;
      case "inquiry": return <MessageSquare size={14} />;
      default: return <Clock size={14} />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black" style={{ color: "var(--clr-text)" }}>
          {greeting}, {user?.name?.split(" ")[0] || "Admin"}
        </h1>
        <p className="text-sm mt-1" style={{ color: "var(--clr-text-muted)" }}>
          Here's what's happening at FCC Fore-City today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl p-5 border"
            style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ background: `${stat.color}20`, color: stat.color }}
              >
                {stat.icon}
              </div>
              <span
                className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
                  stat.trend === "up" ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
                }`}
              >
                {stat.trend === "up" ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-black" style={{ color: "var(--clr-text)" }}>
              {stat.value}
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--clr-text-muted)" }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <div className="lg:col-span-2 rounded-xl border" style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
          <div className="flex items-center justify-between px-5 py-4 border-b" style={{ borderColor: "var(--clr-border)" }}>
            <h2 className="text-sm font-bold" style={{ color: "var(--clr-text)" }}>Recent Activity</h2>
            <span className="text-xs font-medium" style={{ color: "var(--clr-accent)" }}>
              View all →
            </span>
          </div>
          <div className="divide-y" style={{ borderColor: "var(--clr-border)" }}>
            {recentActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 px-5 py-3.5 transition-colors"
                style={{ borderColor: "var(--clr-border)" }}
              >
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${statusColor(activity.status)}15`, color: statusColor(activity.status) }}
                >
                  {activityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm" style={{ color: "var(--clr-text)" }}>
                    {activity.message}
                  </p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--clr-text-muted)" }}>
                    {activity.time}
                  </p>
                </div>
                <span
                  className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full shrink-0"
                  style={{
                    background: `${statusColor(activity.status)}15`,
                    color: statusColor(activity.status),
                  }}
                >
                  {activity.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions & Alerts */}
        <div className="space-y-4">
          {/* Quick Actions */}
          <div className="rounded-xl border p-5" style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
            <h2 className="text-sm font-bold mb-3" style={{ color: "var(--clr-text)" }}>Quick Actions</h2>
            <div className="space-y-2">
              {[
                { label: "New Project", href: "/admin/construction", icon: <HardHat size={16} /> },
                { label: "Add Property", href: "/admin/real-estate", icon: <Building2 size={16} /> },
                { label: "Record Payment", href: "/admin/finance", icon: <DollarSign size={16} /> },
                { label: "Maintenance Request", href: "/admin/tenants", icon: <AlertTriangle size={16} /> },
              ].map((action) => (
                <Link
                  key={action.label}
                  href={action.href}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group"
                  style={{ color: "var(--clr-text-muted)" }}
                >
                  <span style={{ color: "var(--clr-accent)" }}>{action.icon}</span>
                  {action.label}
                  <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "var(--clr-accent)" }} />
                </Link>
              ))}
            </div>
          </div>

          {/* Alerts */}
          <div className="rounded-xl border p-5" style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
            <h2 className="text-sm font-bold mb-3" style={{ color: "var(--clr-text)" }}>Pending Actions</h2>
            <div className="space-y-3">
              {[
                { label: "Property approvals pending", count: 5, color: "#F59E0B" },
                { label: "Unpaid invoices", count: 12, color: "#EF4444" },
                { label: "Open maintenance tickets", count: 8, color: "#3B82F6" },
                { label: "New lease applications", count: 3, color: "#10B981" },
              ].map((alert) => (
                <div key={alert.label} className="flex items-center justify-between">
                  <span className="text-xs" style={{ color: "var(--clr-text-muted)" }}>{alert.label}</span>
                  <span
                    className="text-xs font-bold px-2 py-0.5 rounded-full"
                    style={{ background: `${alert.color}15`, color: alert.color }}
                  >
                    {alert.count}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessageSquare({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}
