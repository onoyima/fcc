import { pgTable, serial, varchar, text, timestamp, boolean, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { usersTable } from "./users";

export const landlordsTable = pgTable("landlords", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => usersTable.id),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  company: varchar("company", { length: 255 }),
  isVerified: boolean("is_verified").notNull().default(false),
  notes: text("notes"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertLandlordSchema = createInsertSchema(landlordsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertLandlord = typeof landlordsTable.$inferInsert;
export type Landlord = typeof landlordsTable.$inferSelect;
