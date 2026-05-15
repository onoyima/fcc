import { pgTable, serial, varchar, text, integer, timestamp, boolean, pgEnum } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";

export const applicationTypeEnum = pgEnum("application_type", ["job", "labor", "contractor"]);

export const jobApplicationsTable = pgTable("job_applications", {
  id: serial("id").primaryKey(),
  applicationType: applicationTypeEnum("application_type").notNull(),
  firstName: varchar("first_name", { length: 100 }),
  lastName: varchar("last_name", { length: 100 }),
  email: varchar("email", { length: 255 }),
  phone: varchar("phone", { length: 20 }).notNull(),
  companyName: varchar("company_name", { length: 255 }),
  contactPerson: varchar("contact_person", { length: 100 }),
  positionApplied: varchar("position_applied", { length: 255 }),
  skill: varchar("skill", { length: 100 }),
  experienceYears: varchar("experience_years", { length: 50 }),
  specialization: text("specialization"),
  coverLetter: text("cover_letter"),
  isRead: boolean("is_read").notNull().default(false),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const insertJobApplicationSchema = createInsertSchema(jobApplicationsTable).omit({ id: true, createdAt: true, updatedAt: true });
export type InsertJobApplication = typeof jobApplicationsTable.$inferInsert;
export type JobApplication = typeof jobApplicationsTable.$inferSelect;
