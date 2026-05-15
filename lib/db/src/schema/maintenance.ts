import { pgTable, serial, varchar, text, integer, timestamp, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { propertiesTable } from "./properties";
import { tenantsTable } from "./tenants";

export const maintenancePriorityEnum = pgEnum("maintenance_priority", ["low", "medium", "high", "emergency"]);
export const maintenanceStatusEnum = pgEnum("maintenance_status", ["open", "in_progress", "resolved", "closed"]);

export const maintenanceRequestsTable = pgTable("maintenance_requests", {
  id: serial("id").primaryKey(),
  propertyId: integer("property_id").notNull().references(() => propertiesTable.id),
  tenantId: integer("tenant_id").references(() => tenantsTable.id),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description").notNull(),
  priority: maintenancePriorityEnum("priority").notNull().default("medium"),
  status: maintenanceStatusEnum("status").notNull().default("open"),
  assignedTo: integer("assigned_to"),
  images: text("images").array(),
  resolvedAt: timestamp("resolved_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertMaintenanceRequestSchema = createInsertSchema(maintenanceRequestsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertMaintenanceRequest = typeof maintenanceRequestsTable.$inferInsert;
export type MaintenanceRequest = typeof maintenanceRequestsTable.$inferSelect;
