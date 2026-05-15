import { pgTable, serial, varchar, integer, decimal, timestamp, date, text, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { leasesTable } from "./leases";
import { tenantsTable } from "./tenants";

export const invoiceStatusEnum = pgEnum("invoice_status", ["pending", "paid", "overdue", "cancelled"]);
export const invoiceTypeEnum = pgEnum("invoice_type", ["rent", "service_charge", "utility", "maintenance", "penalty", "other"]);

export const invoicesTable = pgTable("invoices", {
  id: serial("id").primaryKey(),
  invoiceNumber: varchar("invoice_number", { length: 50 }).notNull().unique(),
  leaseId: integer("lease_id").references(() => leasesTable.id),
  tenantId: integer("tenant_id").notNull().references(() => tenantsTable.id),
  type: invoiceTypeEnum("type").notNull().default("rent"),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  dueDate: date("due_date").notNull(),
  status: invoiceStatusEnum("status").notNull().default("pending"),
  description: text("description"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertInvoiceSchema = createInsertSchema(invoicesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertInvoice = typeof invoicesTable.$inferInsert;
export type Invoice = typeof invoicesTable.$inferSelect;
