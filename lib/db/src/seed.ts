import "dotenv/config";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import bcrypt from "bcryptjs";
import * as schema from "./schema";

const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzle(pool, { schema });

async function main() {
  console.log("Seeding database...");

  // Clear existing data in dependency-safe order
  await db.delete(schema.chatsTable);
  await db.delete(schema.notificationsTable);
  await db.delete(schema.auditLogsTable);
  await db.delete(schema.paymentsTable);
  await db.delete(schema.invoicesTable);
  await db.delete(schema.leasesTable);
  await db.delete(schema.maintenanceRequestsTable);
  await db.delete(schema.tenantsTable);
  await db.delete(schema.landlordsTable);
  await db.delete(schema.propertiesTable);
  await db.delete(schema.payrollTable);
  await db.delete(schema.workersTable);
  await db.delete(schema.contractorsTable);
  await db.delete(schema.projectsTable);
  await db.delete(schema.estatesTable);
  await db.delete(schema.usersTable);

  const pw = (s: string) => bcrypt.hashSync(s, 10);

  // ─── Users ────────────────────────────────────────────────────────────
  const [u1] = await db.insert(schema.usersTable).values({
    email: "admin@forecity.com", passwordHash: pw("Admin@123"),
    firstName: "Super", lastName: "Admin", role: "super_admin", emailVerified: true, isActive: true,
  }).returning();

  const [u2] = await db.insert(schema.usersTable).values({
    email: "construction@forecity.com", passwordHash: pw("Const@123"),
    firstName: "Construction", lastName: "Manager", role: "construction_manager", emailVerified: true, isActive: true,
  }).returning();

  const [u3] = await db.insert(schema.usersTable).values({
    email: "property@forecity.com", passwordHash: pw("Prop@123"),
    firstName: "Property", lastName: "Manager", role: "property_manager", emailVerified: true, isActive: true,
  }).returning();

  const [u4] = await db.insert(schema.usersTable).values({
    email: "finance@forecity.com", passwordHash: pw("Finance@123"),
    firstName: "Accountant", lastName: "FCC", role: "accountant", emailVerified: true, isActive: true,
  }).returning();

  const [u5] = await db.insert(schema.usersTable).values({
    email: "estate@forecity.com", passwordHash: pw("Estate@123"),
    firstName: "Estate", lastName: "Manager", role: "estate_manager", emailVerified: true, isActive: true,
  }).returning();

  const [u6] = await db.insert(schema.usersTable).values({
    email: "hr@forecity.com", passwordHash: pw("Hr@123"),
    firstName: "HR", lastName: "Manager", role: "hr_manager", emailVerified: true, isActive: true,
  }).returning();

  const [u7] = await db.insert(schema.usersTable).values({
    email: "support@forecity.com", passwordHash: pw("Support@123"),
    firstName: "Customer", lastName: "Support", role: "customer_support", emailVerified: true, isActive: true,
  }).returning();

  // Agents
  const [agent1] = await db.insert(schema.usersTable).values({
    email: "chioma.eze@forecity.com", passwordHash: pw("Agent@123"),
    firstName: "Chioma", lastName: "Eze", role: "estate_agent", emailVerified: true, isActive: true,
  }).returning();

  const [agent2] = await db.insert(schema.usersTable).values({
    email: "tunde.bakare@forecity.com", passwordHash: pw("Agent@123"),
    firstName: "Tunde", lastName: "Bakare", role: "estate_agent", emailVerified: true, isActive: true,
  }).returning();

  const [agent3] = await db.insert(schema.usersTable).values({
    email: "funmi.adeyemi@forecity.com", passwordHash: pw("Agent@123"),
    firstName: "Funmi", lastName: "Adeyemi", role: "estate_agent", emailVerified: true, isActive: true,
  }).returning();

  // Site supervisors / workers
  const [worker1] = await db.insert(schema.usersTable).values({
    email: "tunde.balogun@forecity.com", passwordHash: pw("Worker@123"),
    firstName: "Tunde", lastName: "Balogun", role: "site_supervisor", emailVerified: true, isActive: true,
  }).returning();

  const [worker2] = await db.insert(schema.usersTable).values({
    email: "aisha.mohammed@forecity.com", passwordHash: pw("Worker@123"),
    firstName: "Aisha", lastName: "Mohammed", role: "worker", emailVerified: true, isActive: true,
  }).returning();

  console.log(`  ✓ ${12} users seeded`);

  // ─── Properties ──────────────────────────────────────────────────────
  const [p1] = await db.insert(schema.propertiesTable).values({
    title: "4-Bedroom Luxury Duplex", type: "for_sale", status: "available",
    price: "250000000", priceLabel: "₦250,000,000", currency: "NGN",
    bedrooms: 4, bathrooms: 5, sqm: 650,
    location: "Banana Island, Lagos", city: "Lagos", state: "Lagos",
    images: ["https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800"],
    featured: true, tag: "Luxury", listedBy: agent1.id, isVerified: true,
  }).returning();

  const [p2] = await db.insert(schema.propertiesTable).values({
    title: "3-Bedroom Apartment", type: "for_rent", status: "available",
    price: "4500000", priceLabel: "₦4,500,000/yr", currency: "NGN",
    bedrooms: 3, bathrooms: 3, sqm: 200,
    location: "Victoria Island, Lagos", city: "Lagos", state: "Lagos",
    images: ["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800"],
    featured: true, listedBy: agent2.id, isVerified: true,
  }).returning();

  const [p3] = await db.insert(schema.propertiesTable).values({
    title: "Commercial Plot — Lekki Phase 1", type: "land", status: "available",
    price: "85000000", priceLabel: "₦85,000,000", currency: "NGN",
    sqm: 1200,
    location: "Lekki Phase 1, Lagos", city: "Lagos", state: "Lagos",
    images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"],
    listedBy: agent1.id, isVerified: true,
  }).returning();

  const [p4] = await db.insert(schema.propertiesTable).values({
    title: "Office Space — Ikoyi", type: "commercial", status: "available",
    price: "12000000", priceLabel: "₦12,000,000/yr", currency: "NGN",
    bathrooms: 2, sqm: 450,
    location: "Ikoyi, Lagos", city: "Lagos", state: "Lagos",
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"],
    featured: true, listedBy: agent3.id, isVerified: true,
  }).returning();

  const [p5] = await db.insert(schema.propertiesTable).values({
    title: "5-Bedroom Mansion", type: "for_sale", status: "available",
    price: "480000000", priceLabel: "₦480,000,000", currency: "NGN",
    bedrooms: 5, bathrooms: 6, sqm: 890,
    location: "Parkview Estate, Ikoyi", city: "Lagos", state: "Lagos",
    images: ["https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800"],
    featured: true, tag: "Premium", listedBy: agent2.id, isVerified: true,
  }).returning();

  const [p6] = await db.insert(schema.propertiesTable).values({
    title: "2-Bedroom Apartment", type: "for_rent", status: "available",
    price: "2800000", priceLabel: "₦2,800,000/yr", currency: "NGN",
    bedrooms: 2, bathrooms: 2, sqm: 120,
    location: "GRA, Ikeja", city: "Lagos", state: "Lagos",
    images: ["https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800"],
    listedBy: agent3.id, isVerified: true,
  }).returning();

  const [p7] = await db.insert(schema.propertiesTable).values({
    title: "Residential Land — Ajah", type: "land", status: "available",
    price: "35000000", priceLabel: "₦35,000,000", currency: "NGN",
    sqm: 600,
    location: "Ajah, Lagos", city: "Lagos", state: "Lagos",
    images: ["https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800"],
    listedBy: agent1.id,
  }).returning();

  const [p8] = await db.insert(schema.propertiesTable).values({
    title: "Retail Space — The Palms", type: "commercial", status: "available",
    price: "8500000", priceLabel: "₦8,500,000/yr", currency: "NGN",
    bathrooms: 1, sqm: 200,
    location: "Lekki, Lagos", city: "Lagos", state: "Lagos",
    images: ["https://images.unsplash.com/photo-1497366216548-37526070297c?w=800"],
    listedBy: agent2.id,
  }).returning();

  console.log(`  ✓ ${8} properties seeded`);

  // ─── Tenants ──────────────────────────────────────────────────────────
  const [t1] = await db.insert(schema.tenantsTable).values({
    firstName: "Adebayo", lastName: "Ogunlesi",
    email: "adebayo.o@email.com", phone: "+234 802 345 6789",
    propertyId: p1.id, unitNumber: "Villa 4",
  }).returning();

  const [t2] = await db.insert(schema.tenantsTable).values({
    firstName: "Chioma", lastName: "Nwosu",
    email: "chioma.n@email.com", phone: "+234 803 456 7890",
    propertyId: p2.id, unitNumber: "Block B, Flat 3",
  }).returning();

  const [t3] = await db.insert(schema.tenantsTable).values({
    firstName: "Emeka", lastName: "Okonkwo",
    email: "emeka.o@email.com", phone: "+234 805 678 9012",
    propertyId: p1.id, unitNumber: "Unit 8",
  }).returning();

  const [t4] = await db.insert(schema.tenantsTable).values({
    firstName: "Folake", lastName: "Adeniyi",
    email: "folake.a@email.com", phone: "+234 806 789 0123",
    propertyId: p6.id, unitNumber: "Block C, Flat 7",
  }).returning();

  const [t5] = await db.insert(schema.tenantsTable).values({
    firstName: "Godwin", lastName: "Obasi",
    email: "godwin.o@email.com", phone: "+234 808 901 2345",
    propertyId: p6.id, unitNumber: "Unit 12",
  }).returning();

  const [t6] = await db.insert(schema.tenantsTable).values({
    firstName: "Halima", lastName: "Bello",
    email: "halima.b@email.com", phone: "+234 809 012 3456",
    propertyId: p2.id, unitNumber: "Block A, Flat 10",
  }).returning();

  console.log(`  ✓ ${6} tenants seeded`);

  // ─── Leases ────────────────────────────────────────────────────────────
  const [l1] = await db.insert(schema.leasesTable).values({ tenantId: t1.id, propertyId: p1.id, startDate: "2025-01-01", endDate: "2026-12-31", rentAmount: "4500000", rentFrequency: "monthly", status: "active" }).returning();
  const [l2] = await db.insert(schema.leasesTable).values({ tenantId: t2.id, propertyId: p2.id, startDate: "2024-06-01", endDate: "2025-05-31", rentAmount: "375000", rentFrequency: "monthly", status: "active" }).returning();
  const [l3] = await db.insert(schema.leasesTable).values({ tenantId: t3.id, propertyId: p1.id, startDate: "2025-02-01", endDate: "2026-01-31", rentAmount: "850000", rentFrequency: "monthly", status: "active" }).returning();
  const [l4] = await db.insert(schema.leasesTable).values({ tenantId: t4.id, propertyId: p6.id, startDate: "2025-03-15", endDate: "2026-03-14", rentAmount: "280000", rentFrequency: "monthly", status: "active" }).returning();
  const [l5] = await db.insert(schema.leasesTable).values({ tenantId: t5.id, propertyId: p6.id, startDate: "2024-09-01", endDate: "2025-08-31", rentAmount: "520000", rentFrequency: "monthly", status: "active" }).returning();
  const [l6] = await db.insert(schema.leasesTable).values({ tenantId: t6.id, propertyId: p2.id, startDate: "2025-01-01", endDate: "2025-12-31", rentAmount: "320000", rentFrequency: "monthly", status: "active" }).returning();
  console.log(`  ✓ ${6} leases seeded`);

  // ─── Invoices ─────────────────────────────────────────────────────────
  await db.insert(schema.invoicesTable).values([
    { invoiceNumber: "INV-2025-001", tenantId: t1.id, leaseId: l1.id, amount: "4500000", dueDate: "2025-04-30", status: "paid", paidAt: new Date("2025-04-28"), description: "April 2025 Rent" },
    { invoiceNumber: "INV-2025-002", tenantId: t3.id, leaseId: l3.id, amount: "850000", dueDate: "2025-04-30", status: "overdue", description: "April 2025 Rent" },
    { invoiceNumber: "INV-2025-003", tenantId: t4.id, leaseId: l4.id, amount: "280000", dueDate: "2025-04-30", status: "paid", paidAt: new Date("2025-04-25"), description: "April 2025 Rent" },
    { invoiceNumber: "INV-2025-004", tenantId: t6.id, leaseId: l6.id, amount: "320000", dueDate: "2025-04-30", status: "overdue", description: "April 2025 Rent" },
    { invoiceNumber: "INV-2025-005", tenantId: t2.id, leaseId: l2.id, amount: "375000", dueDate: "2025-04-30", status: "paid", paidAt: new Date("2025-04-20"), description: "April 2025 Rent" },
    { invoiceNumber: "INV-2025-006", tenantId: t5.id, leaseId: l5.id, amount: "520000", dueDate: "2025-04-30", status: "paid", paidAt: new Date("2025-04-22"), description: "April 2025 Rent" },
  ]);
  console.log(`  ✓ ${6} invoices seeded`);

  // ─── Projects ─────────────────────────────────────────────────────────
  await db.insert(schema.projectsTable).values([
    { title: "Lekki Phase 2 Estate Development", category: "residential", status: "ongoing", location: "Lekki, Lagos", budget: "850000000", startDate: "2025-01-15", endDate: "2026-06-30", managerId: u2.id, progress: 60, milestones: JSON.stringify(["Site Clearing", "Foundation", "Structural Framing"]), description: "Large-scale residential estate development in Lekki Phase 2" },
    { title: "Victoria Island Commercial Complex", category: "commercial", status: "ongoing", location: "Victoria Island, Lagos", budget: "2500000000", startDate: "2025-03-01", endDate: "2027-02-28", managerId: u2.id, progress: 35, milestones: JSON.stringify(["Design & Approvals", "Excavation", "Foundation"]), description: "Premium commercial complex on Victoria Island" },
    { title: "Banana Island Luxury Villas", category: "residential", status: "completed", location: "Banana Island, Lagos", budget: "1200000000", startDate: "2024-06-01", endDate: "2025-12-15", managerId: u1.id, progress: 100, milestones: JSON.stringify(["Design Phase", "Construction", "Interior Design", "Landscaping", "Handover"]), description: "Exclusive luxury villa project on Banana Island" },
    { title: "Ibeju-Lekki Industrial Park", category: "industrial", status: "planning", location: "Ibeju-Lekki, Lagos", budget: "4000000000", startDate: "2025-09-01", endDate: "2027-12-31", managerId: u2.id, progress: 15, milestones: JSON.stringify(["Feasibility Study"]), description: "Major industrial park development in Ibeju-Lekki" },
    { title: "Ikeja Smart City Towers", category: "mixed_use", status: "ongoing", location: "Ikeja, Lagos", budget: "3800000000", startDate: "2025-02-01", endDate: "2026-08-31", managerId: u2.id, progress: 50, milestones: JSON.stringify(["Foundation", "Core Structure"]), description: "Mixed-use smart city development in Ikeja" },
    { title: "Ajah Road & Drainage Project", category: "infrastructure", status: "on_hold", location: "Ajah, Lagos", budget: "750000000", startDate: "2024-10-01", endDate: "2025-12-31", managerId: u2.id, progress: 75, milestones: JSON.stringify(["Survey & Design", "Earthwork", "Drainage Installation"]), description: "Infrastructure road and drainage project in Ajah" },
  ]);
  console.log(`  ✓ ${6} projects seeded`);

  // ─── Workers ──────────────────────────────────────────────────────────
  // ─── Workers ──────────────────────────────────────────────────────────
  const [w1] = await db.insert(schema.workersTable).values({
    firstName: "Tunde", lastName: "Balogun", phone: "+234 802 111 1111", email: "tunde.b@forecity.com",
    skill: "site_supervisor", dailyRate: 350000, status: "assigned", isCertified: true,
    experienceYears: 12,
  }).returning();
  const [w2] = await db.insert(schema.workersTable).values({
    firstName: "Aisha", lastName: "Mohammed", phone: "+234 802 222 2222", email: "aisha.m@forecity.com",
    skill: "quantity_surveyor", dailyRate: 280000, status: "assigned", isCertified: true,
    experienceYears: 8,
  }).returning();
  const [w3] = await db.insert(schema.workersTable).values({
    firstName: "Chidi", lastName: "Okonkwo", phone: "+234 802 333 3333", email: "chidi.o@forecity.com",
    skill: "general_labor", dailyRate: 180000, status: "assigned",
    experienceYears: 15,
  }).returning();
  const [w4] = await db.insert(schema.workersTable).values({
    firstName: "Blessing", lastName: "Adebayo", phone: "+234 802 444 4444", email: "blessing.a@forecity.com",
    skill: "general_labor", dailyRate: 150000, status: "assigned",
    experienceYears: 5,
  }).returning();
  const [w5] = await db.insert(schema.workersTable).values({
    firstName: "Segun", lastName: "Ogunleye", phone: "+234 802 555 5555", email: "segun.o@forecity.com",
    skill: "heavy_equipment_operator", dailyRate: 200000, status: "available", isCertified: true,
    experienceYears: 10,
  }).returning();
  const [w6] = await db.insert(schema.workersTable).values({
    firstName: "Funmilayo", lastName: "Eze", phone: "+234 802 666 6666", email: "funmilayo.e@forecity.com",
    skill: "quantity_surveyor", dailyRate: 250000, status: "assigned", isCertified: true,
    experienceYears: 7,
  }).returning();
  console.log(`  ✓ ${6} workers seeded`);

  // ─── Payroll ──────────────────────────────────────────────────────────
  await db.insert(schema.payrollTable).values([
    { workerId: w1.id, amount: "350000", periodStart: new Date("2025-04-01"), periodEnd: new Date("2025-04-30"), status: "paid", paidAt: new Date("2025-04-28") },
    { workerId: w2.id, amount: "280000", periodStart: new Date("2025-04-01"), periodEnd: new Date("2025-04-30"), status: "paid", paidAt: new Date("2025-04-28") },
    { workerId: w3.id, amount: "180000", periodStart: new Date("2025-04-01"), periodEnd: new Date("2025-04-30"), status: "pending" },
    { workerId: w4.id, amount: "150000", periodStart: new Date("2025-04-01"), periodEnd: new Date("2025-04-30"), status: "paid", paidAt: new Date("2025-04-28") },
    { workerId: w5.id, amount: "200000", periodStart: new Date("2025-04-01"), periodEnd: new Date("2025-04-30"), status: "pending" },
    { workerId: w6.id, amount: "250000", periodStart: new Date("2025-04-01"), periodEnd: new Date("2025-04-30"), status: "paid", paidAt: new Date("2025-04-28") },
  ]);
  console.log(`  ✓ ${6} payroll entries seeded`);

  // ─── Maintenance Requests ────────────────────────────────────────────
  await db.insert(schema.maintenanceRequestsTable).values([
    { tenantId: t3.id, propertyId: p1.id, title: "Plumbing Issue - Leaking Pipe", description: "Kitchen sink pipe leaking continuously", priority: "high", status: "open" },
    { tenantId: t5.id, propertyId: p6.id, title: "Electrical Fault - Power Outage", description: "Living room and bedroom power outlets not working", priority: "emergency", status: "in_progress" },
    { tenantId: t6.id, propertyId: p2.id, title: "Air Conditioning Not Working", description: "AC unit in master bedroom not cooling", priority: "medium", status: "open" },
  ]);
  console.log(`  ✓ ${3} maintenance requests seeded`);

  // ─── Contractors ──────────────────────────────────────────────────────
  await db.insert(schema.contractorsTable).values([
    { companyName: "BuildRight Construction Ltd", contactPerson: "James Okoro", email: "james@buildright.com", phone: "+234 803 111 0000", specialization: "General Contracting", isActive: true },
    { companyName: "Elite Electrical Services", contactPerson: "Kunle Adams", email: "kunle@eliteelectrical.com", phone: "+234 803 222 0000", specialization: "Electrical", isActive: true },
    { companyName: "Pristine Plumbing Solutions", contactPerson: "Emma Nwachukwu", email: "emma@pristineplumb.com", phone: "+234 803 333 0000", specialization: "Plumbing", isActive: true },
    { companyName: "SteelFrame Nigeria Ltd", contactPerson: "Babatunde Lawal", email: "babs@steelframe.com", phone: "+234 803 444 0000", specialization: "Structural Steel", isActive: true },
    { companyName: "GreenScape Landscaping", contactPerson: "Ngozi Eze", email: "ngozi@greenscape.com", phone: "+234 803 555 0000", specialization: "Landscaping", isActive: false },
  ]);
  console.log(`  ✓ ${5} contractors seeded`);

  // ─── Estates ─────────────────────────────────────────────────────────
  await db.insert(schema.estatesTable).values([
    { name: "Banana Island Estate", location: "Banana Island, Lagos", description: "Exclusive luxury waterfront estate", totalUnits: 45, amenities: ["24/7 Security", "Clubhouse", "Swimming Pool", "Tennis Court"], status: "active" },
    { name: "Victoria Garden City", location: "Ajah, Lagos", description: "Large-scale gated community with modern amenities", totalUnits: 320, amenities: ["Security", "Shopping Mall", "School", "Parks", "Gym"], status: "active" },
    { name: "Parkview Estate", location: "Ikoyi, Lagos", description: "Prestigious residential estate in the heart of Ikoyi", totalUnits: 85, amenities: ["Security", "Green Areas", "Children's Playground"], status: "active" },
    { name: "Lekki Phase 2 Estate", location: "Lekki, Lagos", description: "Growing residential estate with modern infrastructure", totalUnits: 200, amenities: ["Security", "Drainage", "Street Lighting"], status: "active" },
  ]);
  console.log(`  ✓ ${4} estates seeded`);

  // ─── Landlords ────────────────────────────────────────────────────────
  await db.insert(schema.landlordsTable).values([
    { firstName: "Chief", lastName: "Adekunle", email: "chief.adekunle@email.com", phone: "+234 801 111 0000", isVerified: true },
    { firstName: "Mrs", lastName: "Williams", email: "mrs.williams@email.com", phone: "+234 801 222 0000", isVerified: true },
  ]);
  console.log(`  ✓ ${2} landlords seeded`);

  // ─── Notifications ────────────────────────────────────────────────────
  await db.insert(schema.notificationsTable).values([
    { userId: u1.id, title: "New Lead Assigned", message: "Chidi Eze has been assigned to you as a new lead.", type: "lead", isRead: false },
    { userId: u1.id, title: "Payment Received", message: "Adebayo Ogunlesi paid rent — ₦4,500,000", type: "payment", isRead: false },
    { userId: u2.id, title: "Project Milestone", message: "Lekki Phase 2 — Foundation work completed", type: "project", isRead: false },
    { userId: u3.id, title: "Maintenance Request", message: "Electrical fault reported at Victoria Garden City", type: "maintenance", isRead: false },
    { userId: u4.id, title: "Invoice Overdue", message: "Halima Bello — ₦320,000 rent overdue", type: "payment", isRead: false },
  ]);
  console.log(`  ✓ ${5} notifications seeded`);

  // ─── Chats ─────────────────────────────────────────────────────────────
  await db.insert(schema.chatsTable).values([
    { senderId: u7.id, receiverId: u1.id, message: "New inquiry from Chidi Eze — interested in Parkview Estate", isRead: false },
    { senderId: u1.id, receiverId: u3.id, message: "Please review the new property listing for Banana Island Villas", isRead: false },
    { senderId: u2.id, receiverId: u1.id, message: "Ikeja Smart City project is 50% complete — on schedule", isRead: true },
  ]);
  console.log(`  ✓ ${3} chat messages seeded`);

  console.log("\n✅ Database seeded successfully!");
  await pool.end();
}

main().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
