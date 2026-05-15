import { Router } from "express";
import { db, leasesTable, insertLeaseSchema } from "@workspace/db";
import { authenticate, authorize } from "../middlewares/auth";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/leases", authenticate, async (req, res) => {
  try {
    const { status } = req.query;
    let query = db.select().from(leasesTable);
    if (status) query = query.where(eq(leasesTable.status, status as any)) as any;
    const leases = await query;
    res.json({ leases });
  } catch {
    res.status(500).json({ error: "Failed to fetch leases" });
  }
});

router.get("/leases/:id", authenticate, async (req, res) => {
  try {
    const [lease] = await db.select().from(leasesTable).where(eq(leasesTable.id, Number(req.params.id)));
    if (!lease) {
      res.status(404).json({ error: "Lease not found" });
      return;
    }
    res.json({ lease });
  } catch {
    res.status(500).json({ error: "Failed to fetch lease" });
  }
});

router.post("/leases", authenticate, async (req, res) => {
  try {
    const data = insertLeaseSchema.parse(req.body);
    const [lease] = await db.insert(leasesTable).values(data).returning();
    res.status(201).json({ lease });
  } catch (err: any) {
    res.status(400).json({ error: "Validation failed", details: err.errors || err.message });
  }
});

router.put("/leases/:id", authenticate, async (req, res) => {
  try {
    const [lease] = await db.update(leasesTable).set(req.body).where(eq(leasesTable.id, Number(req.params.id))).returning();
    if (!lease) {
      res.status(404).json({ error: "Lease not found" });
      return;
    }
    res.json({ lease });
  } catch {
    res.status(500).json({ error: "Failed to update lease" });
  }
});

router.delete("/leases/:id", authenticate, authorize("super_admin"), async (req, res) => {
  try {
    await db.delete(leasesTable).where(eq(leasesTable.id, Number(req.params.id)));
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete lease" });
  }
});

export default router;
