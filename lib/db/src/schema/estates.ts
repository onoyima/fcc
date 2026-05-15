import { pgTable, serial, varchar, text, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const estatesTable = pgTable("estates", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  location: varchar("location", { length: 255 }).notNull(),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  totalUnits: integer("total_units").default(0),
  amenities: text("amenities").array(),
  images: text("images").array(),
  status: varchar("status", { length: 50 }).notNull().default("active"),
  isActive: boolean("is_active").notNull().default(true),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertEstateSchema = createInsertSchema(estatesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertEstate = typeof estatesTable.$inferInsert;
export type Estate = typeof estatesTable.$inferSelect;
