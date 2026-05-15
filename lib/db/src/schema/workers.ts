import { pgTable, serial, varchar, text, integer, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const workerSkillEnum = pgEnum("worker_skill", [
  "mason", "carpenter", "welder", "tiler", "painter", "electrician",
  "plumber", "pop_installer", "interior_designer", "site_supervisor",
  "quantity_surveyor", "heavy_equipment_operator", "steel_fixer", "general_labor",
]);

export const workerStatusEnum = pgEnum("worker_status", ["available", "assigned", "on_leave", "inactive"]);

export const workersTable = pgTable("workers", {
  id: serial("id").primaryKey(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  email: varchar("email", { length: 255 }),
  skill: workerSkillEnum("skill").notNull(),
  experienceYears: integer("experience_years").default(0),
  status: workerStatusEnum("status").notNull().default("available"),
  dailyRate: integer("daily_rate"),
  isCertified: boolean("is_certified").notNull().default(false),
  idNumber: varchar("id_number", { length: 100 }),
  address: text("address"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertWorkerSchema = createInsertSchema(workersTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertWorker = typeof workersTable.$inferInsert;
export type Worker = typeof workersTable.$inferSelect;
