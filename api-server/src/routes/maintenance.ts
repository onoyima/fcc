import { Router } from "express";
import { db, maintenanceRequestsTable, insertMaintenanceRequestSchema } from "@workspace/db";
import { authenticate, authorize } from "../middlewares/auth";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/maintenance", authenticate, async (req, res) => {
  try {
    const { status, priority } = req.query;
    let query = db.select().from(maintenanceRequestsTable);
    if (status) query = query.where(eq(maintenanceRequestsTable.status, status as any)) as any;
    if (priority) query = query.where(eq(maintenanceRequestsTable.priority, priority as any)) as any;
    const requests = await query;
    res.json({ maintenanceRequests: requests });
  } catch {
    res.status(500).json({ error: "Failed to fetch maintenance requests" });
  }
});

router.get("/maintenance/:id", authenticate, async (req, res) => {
  try {
    const [request] = await db.select().from(maintenanceRequestsTable).where(eq(maintenanceRequestsTable.id, Number(req.params.id)));
    if (!request) {
      res.status(404).json({ error: "Maintenance request not found" });
      return;
    }
    res.json({ maintenanceRequest: request });
  } catch {
    res.status(500).json({ error: "Failed to fetch maintenance request" });
  }
});

router.post("/maintenance", authenticate, async (req, res) => {
  try {
    const data = insertMaintenanceRequestSchema.parse(req.body);
    const [request] = await db.insert(maintenanceRequestsTable).values(data).returning();
    res.status(201).json({ maintenanceRequest: request });
  } catch (err: any) {
    res.status(400).json({ error: "Validation failed", details: err.errors || err.message });
  }
});

router.put("/maintenance/:id", authenticate, authorize("super_admin", "maintenance_officer", "property_manager"), async (req, res) => {
  try {
    const [request] = await db.update(maintenanceRequestsTable).set(req.body).where(eq(maintenanceRequestsTable.id, Number(req.params.id))).returning();
    if (!request) {
      res.status(404).json({ error: "Maintenance request not found" });
      return;
    }
    res.json({ maintenanceRequest: request });
  } catch {
    res.status(500).json({ error: "Failed to update maintenance request" });
  }
});

export default router;
