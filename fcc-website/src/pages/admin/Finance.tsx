import { useState } from "react";
import { motion } from "framer-motion";
import {
  DollarSign, TrendingUp, TrendingDown, FileText, Download,
  Plus, Search, Calendar, ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import { useAdminAuth } from "@/contexts/AdminAuthContext";

interface Invoice {
  id: string;
  client: string;
  type: "rent" | "service" | "construction" | "maintenance";
  amount: string;
  issued: string;
  due: string;
  status: "paid" | "pending" | "overdue" | "draft";
}

interface PayrollEntry {
  id: string;
  name: string;
  role: string;
  salary: string;
  status: "paid" | "pending";
  month: string;
}

const defaultInvoices: Invoice[] = [
  { id: "INV-001", client: "Adebayo Ogunlesi", type: "rent", amount: "₦4,500,000", issued: "2025-04-01", due: "2025-04-30", status: "paid" },
  { id: "INV-002", client: "Lekki Phase 2 Project", type: "construction", amount: "₦28,000,000", issued: "2025-04-05", due: "2025-05-15", status: "pending" },
  { id: "INV-003", client: "Emeka Okonkwo", type: "rent", amount: "₦850,000", issued: "2025-04-01", due: "2025-04-30", status: "overdue" },
  { id: "INV-004", client: "Victoria Island Commercial", type: "service", amount: "₦3,200,000", issued: "2025-03-20", due: "2025-04-20", status: "paid" },
  { id: "INV-005", client: "Folake Adeniyi", type: "rent", amount: "₦280,000", issued: "2025-04-01", due: "2025-04-30", status: "paid" },
  { id: "INV-006", client: "Ajah Drainage Project", type: "construction", amount: "₦15,000,000", issued: "2025-04-10", due: "2025-05-10", status: "draft" },
  { id: "INV-007", client: "Halima Bello", type: "rent", amount: "₦320,000", issued: "2025-04-01", due: "2025-04-30", status: "overdue" },
  { id: "INV-008", client: "Banana Island Villa Maint.", type: "maintenance", amount: "₦640,000", issued: "2025-03-15", due: "2025-04-15", status: "paid" },
];

const defaultPayroll: PayrollEntry[] = [
  { id: "PR-001", name: "Engineer Tunde Balogun", role: "Site Supervisor", salary: "₦350,000", status: "paid", month: "April 2025" },
  { id: "PR-002", name: "Aisha Mohammed", role: "Quantity Surveyor", salary: "₦280,000", status: "paid", month: "April 2025" },
  { id: "PR-003", name: "Chidi Okonkwo", role: "Foreman", salary: "₦180,000", status: "pending", month: "April 2025" },
  { id: "PR-004", name: "Blessing Adebayo", role: "Admin Officer", salary: "₦150,000", status: "paid", month: "April 2025" },
  { id: "PR-005", name: "Segun Ogunleye", role: "Heavy Equipment Operator", salary: "₦200,000", status: "pending", month: "April 2025" },
  { id: "PR-006", name: "Funmilayo Eze", role: "Accountant", salary: "₦250,000", status: "paid", month: "April 2025" },
];

const FINANCE_KEY = "fcc_admin_finance";

function getData() {
  try {
    const raw = localStorage.getItem(FINANCE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  const data = { invoices: defaultInvoices, payroll: defaultPayroll };
  localStorage.setItem(FINANCE_KEY, JSON.stringify(data));
  return data;
}

export default function FinancialManagement() {
  const { hasRole } = useAdminAuth();
  const [data, setData] = useState(getData);
  const [tab, setTab] = useState<"invoices" | "payroll" | "reports">("invoices");
  const [search, setSearch] = useState("");

  const canEdit = hasRole("super_admin", "accountant");

  const filteredInvoices = data.invoices.filter((inv: Invoice) =>
    inv.client.toLowerCase().includes(search.toLowerCase()) || inv.id.toLowerCase().includes(search.toLowerCase())
  );

  const statusBadge = (status: string) => {
    const map: Record<string, { color: string; label: string }> = {
      paid: { color: "#10B981", label: "Paid" },
      pending: { color: "#F59E0B", label: "Pending" },
      overdue: { color: "#EF4444", label: "Overdue" },
      draft: { color: "#6B7280", label: "Draft" },
    };
    const s = map[status] || { color: "#6B7280", label: status };
    return (
      <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full" style={{ background: `${s.color}15`, color: s.color }}>
        {s.label}
      </span>
    );
  };

  const markPaid = (id: string) => {
    setData((prev: any) => {
      const updated = {
        ...prev,
        invoices: prev.invoices.map((inv: Invoice) =>
          inv.id === id ? { ...inv, status: "paid" as const } : inv
        ),
      };
      localStorage.setItem(FINANCE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black" style={{ color: "var(--clr-text)" }}>Financial Management</h1>
          <p className="text-sm mt-1" style={{ color: "var(--clr-text-muted)" }}>Invoices, payroll, expenses, and P&L reports</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Revenue (MTD)", value: "₦38.2M", change: "+8.3%", up: true, color: "#10B981" },
          { label: "Pending Invoices", value: "₦44.1M", change: "", up: false, color: "#F59E0B" },
          { label: "Overdue", value: "₦1.17M", change: "+2 tenants", up: false, color: "#EF4444" },
          { label: "Payroll (April)", value: "₦1.41M", change: "6 workers", up: true, color: "#3B82F6" },
        ].map((card, i) => (
          <motion.div
            key={card.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className="rounded-xl border p-4"
            style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}
          >
            <p className="text-xs font-medium mb-1" style={{ color: "var(--clr-text-muted)" }}>{card.label}</p>
            <p className="text-xl font-black" style={{ color: "var(--clr-text)" }}>{card.value}</p>
            {card.change && (
              <p className="text-xs mt-1 font-medium" style={{ color: card.color }}>
                {card.up ? <TrendingUp size={10} className="inline mr-0.5" /> : <TrendingDown size={10} className="inline mr-0.5" />}
                {card.change}
              </p>
            )}
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b pb-0" style={{ borderColor: "var(--clr-border)" }}>
        {(["invoices", "payroll", "reports"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition-all border-b-2 -mb-[1px] ${
              tab === t ? "" : "opacity-50"
            }`}
            style={{
              color: tab === t ? "var(--clr-accent)" : "var(--clr-text-muted)",
              borderColor: tab === t ? "var(--clr-accent)" : "transparent",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Invoices Tab */}
      {tab === "invoices" && (
        <div className="rounded-xl border overflow-hidden" style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
          <div className="p-4 border-b flex items-center gap-3" style={{ borderColor: "var(--clr-border)" }}>
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "var(--clr-text-muted)" }} />
              <input
                type="text"
                placeholder="Search invoices..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-8 pr-3 py-2 rounded-lg text-xs border outline-none"
                style={{ background: "var(--clr-bg)", borderColor: "var(--clr-border)", color: "var(--clr-text)" }}
              />
            </div>
            {canEdit && (
              <button className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold" style={{ background: "var(--clr-accent)", color: "var(--clr-accent-text)" }}>
                <Plus size={14} />
                New Invoice
              </button>
            )}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-xs uppercase tracking-wider font-bold" style={{ borderColor: "var(--clr-border)", color: "var(--clr-text-muted)" }}>
                  <th className="text-left px-4 py-3">Invoice</th>
                  <th className="text-left px-4 py-3">Client</th>
                  <th className="text-left px-4 py-3">Type</th>
                  <th className="text-left px-4 py-3">Amount</th>
                  <th className="text-left px-4 py-3">Due</th>
                  <th className="text-left px-4 py-3">Status</th>
                  {canEdit && <th className="text-right px-4 py-3">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--clr-border)" }}>
                {filteredInvoices.map((inv: Invoice, i: number) => (
                  <motion.tr
                    key={inv.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    style={{ color: "var(--clr-text)" }}
                  >
                    <td className="px-4 py-3"><span className="font-mono text-xs font-semibold">{inv.id}</span></td>
                    <td className="px-4 py-3 text-xs font-medium">{inv.client}</td>
                    <td className="px-4 py-3 text-xs capitalize">{inv.type}</td>
                    <td className="px-4 py-3 text-xs font-bold">{inv.amount}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--clr-text-muted)" }}>{inv.due}</td>
                    <td className="px-4 py-3">{statusBadge(inv.status)}</td>
                    {canEdit && (
                      <td className="px-4 py-3 text-right">
                        {(inv.status === "pending" || inv.status === "overdue") && (
                          <button
                            onClick={() => markPaid(inv.id)}
                            className="px-2 py-1 rounded text-[10px] font-bold"
                            style={{ background: "#10B98115", color: "#10B981" }}
                          >
                            Mark Paid
                          </button>
                        )}
                      </td>
                    )}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Payroll Tab */}
      {tab === "payroll" && (
        <div className="rounded-xl border overflow-hidden" style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}>
          <div className="p-4 border-b" style={{ borderColor: "var(--clr-border)" }}>
            <p className="text-sm font-semibold" style={{ color: "var(--clr-text)" }}>April 2025 Payroll</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-xs uppercase tracking-wider font-bold" style={{ borderColor: "var(--clr-border)", color: "var(--clr-text-muted)" }}>
                  <th className="text-left px-4 py-3">Employee</th>
                  <th className="text-left px-4 py-3">Role</th>
                  <th className="text-left px-4 py-3">Salary</th>
                  <th className="text-left px-4 py-3">Status</th>
                  {canEdit && <th className="text-right px-4 py-3">Action</th>}
                </tr>
              </thead>
              <tbody className="divide-y" style={{ borderColor: "var(--clr-border)" }}>
                {data.payroll.map((entry: PayrollEntry, i: number) => (
                  <motion.tr
                    key={entry.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.04 }}
                    style={{ color: "var(--clr-text)" }}
                  >
                    <td className="px-4 py-3 text-sm font-medium">{entry.name}</td>
                    <td className="px-4 py-3 text-xs" style={{ color: "var(--clr-text-muted)" }}>{entry.role}</td>
                    <td className="px-4 py-3 text-xs font-bold">{entry.salary}</td>
                    <td className="px-4 py-3">
                      <span
                        className="text-[10px] font-bold uppercase px-2 py-0.5 rounded-full"
                        style={{
                          background: entry.status === "paid" ? "#10B98115" : "#F59E0B15",
                          color: entry.status === "paid" ? "#10B981" : "#F59E0B",
                        }}
                      >
                        {entry.status}
                      </span>
                    </td>
                    {canEdit && (
                      <td className="px-4 py-3 text-right">
                        {entry.status === "pending" && (
                          <button className="px-2 py-1 rounded text-[10px] font-bold" style={{ background: "#10B98115", color: "#10B981" }}>
                            Mark Paid
                          </button>
                        )}
                      </td>
                    )}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Reports Tab */}
      {tab === "reports" && (
        <div className="grid gap-4 md:grid-cols-2">
          {[
            { label: "Profit & Loss Summary", desc: "April 2025 financial performance", color: "#10B981", items: [
              { l: "Total Revenue", v: "₦38,200,000" },
              { l: "Total Expenses", v: "₦14,500,000" },
              { l: "Net Profit", v: "₦23,700,000" },
              { l: "Profit Margin", v: "62%" },
            ]},
            { label: "Revenue Breakdown", desc: "By category this month", color: "#3B82F6", items: [
              { l: "Rental Income", v: "₦12,800,000" },
              { l: "Construction Contracts", v: "₦18,500,000" },
              { l: "Service Fees", v: "₦4,200,000" },
              { l: "Other Income", v: "₦2,700,000" },
            ]},
            { label: "Expense Breakdown", desc: "Major cost centers", color: "#EF4444", items: [
              { l: "Payroll", v: "₦6,800,000" },
              { l: "Materials", v: "₦4,200,000" },
              { l: "Equipment", v: "₦1,800,000" },
              { l: "Administrative", v: "₦1,700,000" },
            ]},
            { label: "Accounts Receivable", desc: "Aging analysis", color: "#F59E0B", items: [
              { l: "Current (0-30 days)", v: "₦31,400,000" },
              { l: "31-60 days", v: "₦8,200,000" },
              { l: "61-90 days", v: "₦1,700,000" },
              { l: "Over 90 days", v: "₦850,000" },
            ]},
          ].map((report, i) => (
            <motion.div
              key={report.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border p-5"
              style={{ background: "var(--clr-card)", borderColor: "var(--clr-border)" }}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${report.color}15`, color: report.color }}>
                  <FileText size={16} />
                </div>
                <div>
                  <h3 className="text-sm font-bold" style={{ color: "var(--clr-text)" }}>{report.label}</h3>
                  <p className="text-[10px]" style={{ color: "var(--clr-text-muted)" }}>{report.desc}</p>
                </div>
              </div>
              <div className="space-y-2">
                {report.items.map((item) => (
                  <div key={item.l} className="flex items-center justify-between text-xs py-1 border-b" style={{ borderColor: "var(--clr-border)" }}>
                    <span style={{ color: "var(--clr-text-muted)" }}>{item.l}</span>
                    <span className="font-bold" style={{ color: "var(--clr-text)" }}>{item.v}</span>
                  </div>
                ))}
              </div>
              <button
                className="mt-3 w-full flex items-center justify-center gap-1.5 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all"
                style={{ background: `${report.color}10`, color: report.color }}
              >
                <Download size={12} />
                Download Report
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
