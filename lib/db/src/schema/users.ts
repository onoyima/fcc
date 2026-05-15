import { pgTable, serial, text, varchar, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const userRoleEnum = pgEnum("user_role", [
  "super_admin", "construction_manager", "project_manager", "site_supervisor",
  "estate_manager", "property_manager", "estate_agent", "landlord", "tenant",
  "accountant", "hr_manager", "maintenance_officer", "customer_support", "worker",
]);

export const usersTable = pgTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  firstName: varchar("first_name", { length: 100 }).notNull(),
  lastName: varchar("last_name", { length: 100 }).notNull(),
  phone: varchar("phone", { length: 20 }),
  role: userRoleEnum("role").notNull().default("customer_support"),
  avatarUrl: text("avatar_url"),
  emailVerified: boolean("email_verified").notNull().default(false),
  twoFactorEnabled: boolean("two_factor_enabled").notNull().default(false),
  kycVerified: boolean("kyc_verified").notNull().default(false),
  isActive: boolean("is_active").notNull().default(true),
  lastLogin: timestamp("last_login"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertUserSchema = createInsertSchema(usersTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertUser = typeof usersTable.$inferInsert;
export type User = typeof usersTable.$inferSelect;
