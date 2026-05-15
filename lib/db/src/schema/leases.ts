import { pgTable, serial, varchar, integer, decimal, timestamp, date, text, pgEnum, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { propertiesTable } from "./properties";
import { tenantsTable } from "./tenants";
import { landlordsTable } from "./landlords";

export const leaseStatusEnum = pgEnum("lease_status", ["active", "expired", "terminated", "pending"]);

export const leasesTable = pgTable("leases", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull().references(() => propertiesTable.id),
  tenantId: integer("tenant_id").notNull().references(() => tenantsTable.id),
  landlordId: integer("landlord_id").references(() => landlordsTable.id),
  startDate: date("start_date").notNull(),
  endDate: date("end_date").notNull(),
  rentAmount: decimal("rent_amount", { precision: 12, scale: 2 }).notNull(),
  rentFrequency: varchar("rent_frequency", { length: 20 }).notNull().default("monthly"),
  securityDeposit: decimal("security_deposit", { precision: 12, scale: 2 }),
  status: leaseStatusEnum("status").notNull().default("pending"),
  agreementDoc: text("agreement_doc"),
  signedByTenant: boolean("signed_by_tenant").notNull().default(false),
  signedByLandlord: boolean("signed_by_landlord").notNull().default(false),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertLeaseSchema = createInsertSchema(leasesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertLease = typeof leasesTable.$inferInsert;
export type Lease = typeof leasesTable.$inferSelect;
