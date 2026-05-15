import { pgTable, serial, integer, decimal, timestamp, date, text, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { workersTable } from "./workers";

export const payrollStatusEnum = pgEnum("payroll_status", ["pending", "paid", "cancelled"]);

export const payrollTable = pgTable("payroll", {
  id: serial("id").primaryKey(),
  workerId: integer("worker_id").notNull().references(() => workersTable.id),
  amount: decimal("amount", { precision: 10, scale: 2 }).notNull(),
  periodStart: date("period_start").notNull(),
  periodEnd: date("period_end").notNull(),
  status: payrollStatusEnum("status").notNull().default("pending"),
  paidAt: timestamp("paid_at"),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPayrollSchema = createInsertSchema(payrollTable).omit({ id: true, createdAt: true });
export type InsertPayroll = typeof payrollTable.$inferInsert;
export type Payroll = typeof payrollTable.$inferSelect;
