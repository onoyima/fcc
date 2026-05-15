import { Router } from "express";
import { db, workersTable, insertWorkerSchema } from "@workspace/db";
import { authenticate, authorize } from "../middlewares/auth";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/workers", async (req, res) => {
  try {
    const { skill, status } = req.query;
    let query = db.select().from(workersTable);
    if (skill) query = query.where(eq(workersTable.skill, skill as any)) as any;
    if (status) query = query.where(eq(workersTable.status, status as any)) as any;
    const workers = await query;
    res.json({ workers });
  } catch {
    res.status(500).json({ error: "Failed to fetch workers" });
  }
});

router.get("/workers/:id", async (req, res) => {
  try {
    const [worker] = await db.select().from(workersTable).where(eq(workersTable.id, Number(req.params.id)));
    if (!worker) {
      res.status(404).json({ error: "Worker not found" });
      return;
    }
    res.json({ worker });
  } catch {
    res.status(500).json({ error: "Failed to fetch worker" });
  }
});

router.post("/workers", async (req, res) => {
  try {
    const data = insertWorkerSchema.parse(req.body);
    const [worker] = await db.insert(workersTable).values(data).returning();
    res.status(201).json({ worker });
  } catch (err: any) {
    res.status(400).json({ error: "Validation failed", details: err.errors || err.message });
  }
});

router.put("/workers/:id", authenticate, authorize("super_admin", "hr_manager"), async (req, res) => {
  try {
    const [worker] = await db.update(workersTable).set(req.body).where(eq(workersTable.id, Number(req.params.id))).returning();
    if (!worker) {
      res.status(404).json({ error: "Worker not found" });
      return;
    }
    res.json({ worker });
  } catch {
    res.status(500).json({ error: "Failed to update worker" });
  }
});

export default router;
