import { pgTable, serial, varchar, text, integer, decimal, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { usersTable } from "./users";

export const propertyTypeEnum = pgEnum("property_type", ["for_sale", "for_rent", "land", "commercial", "shortlet"]);
export const propertyStatusEnum = pgEnum("property_status", ["available", "pending", "sold", "rented", "under_offer"]);

export const propertiesTable = pgTable("properties", {
  id: serial("id").primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  type: propertyTypeEnum("type").notNull(),
  status: propertyStatusEnum("status").notNull().default("available"),
  price: decimal("price", { precision: 15, scale: 2 }).notNull(),
  priceLabel: varchar("price_label", { length: 100 }),
  currency: varchar("currency", { length: 10 }).notNull().default("NGN"),
  bedrooms: integer("bedrooms").default(0),
  bathrooms: integer("bathrooms").default(0),
  sqm: integer("sqm").default(0),
  location: varchar("location", { length: 255 }).notNull(),
  city: varchar("city", { length: 100 }),
  state: varchar("state", { length: 100 }),
  address: text("address"),
  latitude: decimal("latitude", { precision: 10, scale: 7 }),
  longitude: decimal("longitude", { precision: 10, scale: 7 }),
  images: text("images").array(),
  featured: boolean("featured").notNull().default(false),
  tag: varchar("tag", { length: 100 }),
  listedBy: integer("listed_by").references(() => usersTable.id),
  isVerified: boolean("is_verified").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertPropertySchema = createInsertSchema(propertiesTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertProperty = typeof propertiesTable.$inferInsert;
export type Property = typeof propertiesTable.$inferSelect;
