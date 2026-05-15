import { pgTable, serial, varchar, text, integer, decimal, timestamp, date, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { usersTable } from "./users";

export const projectStatusEnum = pgEnum("project_status", ["planning", "ongoing", "on_hold", "completed", "cancelled"]);
export const projectCategoryEnum = pgEnum("project_category", ["residential", "commercial", "infrastructure", "industrial", "mixed_use"]);

export const projectsTable = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  category: projectCategoryEnum("category").notNull(),
  status: projectStatusEnum("status").notNull().default("planning"),
  description: text("description"),
  location: varchar("location", { length: 255 }),
  area: varchar("area", { length: 100 }),
  budget: decimal("budget", { precision: 15, scale: 2 }),
  startDate: date("start_date"),
  endDate: date("end_date"),
  managerId: integer("manager_id").references(() => usersTable.id),
  images: text("images").array(),
  milestones: text("milestones"),
  progress: integer("progress").default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertProjectSchema = createInsertSchema(projectsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProject = typeof projectsTable.$inferInsert;
export type Project = typeof projectsTable.$inferSelect;
