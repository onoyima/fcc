import { pgTable, serial, varchar, integer, decimal, timestamp, text, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { invoicesTable } from "./invoices";

export const paymentMethodEnum = pgEnum("payment_method", ["card", "bank_transfer", "ussd", "paystack", "flutterwave", "cash", "other"]);
export const paymentStatusEnum = pgEnum("payment_status", ["pending", "successful", "failed", "refunded"]);

export const paymentsTable = pgTable("payments", {
  id: serial("id").primaryKey(),
  invoiceId: integer("invoice_id").notNull().references(() => invoicesTable.id),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  method: paymentMethodEnum("method").notNull(),
  status: paymentStatusEnum("status").notNull().default("pending"),
  transactionRef: varchar("transaction_ref", { length: 255 }),
  gatewayResponse: text("gateway_response"),
  paidAt: timestamp("paid_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const insertPaymentSchema = createInsertSchema(paymentsTable).omit({ id: true, createdAt: true });
export type InsertPayment = typeof paymentsTable.$inferInsert;
export type Payment = typeof paymentsTable.$inferSelect;
