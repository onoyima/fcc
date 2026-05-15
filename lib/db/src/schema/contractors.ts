import { pgTable, serial, varchar, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const contractorsTable = pgTable("contractors", {
  id: serial("id").primaryKey(),
  companyName: varchar("company_name", { length: 255 }).notNull(),
  contactPerson: varchar("contact_person", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  specialization: text("specialization"),
  yearsInBusiness: integer("years_in_business"),
  isVerified: boolean("is_verified").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertContractorSchema = createInsertSchema(contractorsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertContractor = typeof contractorsTable.$inferInsert;
export type Contractor = typeof contractorsTable.$inferSelect;
