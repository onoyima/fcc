import { Router } from "express";
import { db, tenantsTable, insertTenantSchema } from "@workspace/db";
import { authenticate, authorize } from "../middlewares/auth";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/tenants", authenticate, async (req, res) => {
  try {
    const tenants = await db.select().from(tenantsTable);
    res.json({ tenants });
  } catch {
    res.status(500).json({ error: "Failed to fetch tenants" });
  }
});

router.get("/tenants/:id", authenticate, async (req, res) => {
  try {
    const [tenant] = await db.select().from(tenantsTable).where(eq(tenantsTable.id, Number(req.params.id)));
    if (!tenant) {
      res.status(404).json({ error: "Tenant not found" });
      return;
    }
    res.json({ tenant });
  } catch {
    res.status(500).json({ error: "Failed to fetch tenant" });
  }
});

router.post("/tenants", authenticate, async (req, res) => {
  try {
    const data = insertTenantSchema.parse(req.body);
    const [tenant] = await db.insert(tenantsTable).values(data).returning();
    res.status(201).json({ tenant });
  } catch (err: any) {
    res.status(400).json({ error: "Validation failed", details: err.errors || err.message });
  }
});

router.put("/tenants/:id", authenticate, async (req, res) => {
  try {
    const [tenant] = await db.update(tenantsTable).set(req.body).where(eq(tenantsTable.id, Number(req.params.id))).returning();
    if (!tenant) {
      res.status(404).json({ error: "Tenant not found" });
      return;
    }
    res.json({ tenant });
  } catch {
    res.status(500).json({ error: "Failed to update tenant" });
  }
});

router.delete("/tenants/:id", authenticate, authorize("super_admin"), async (req, res) => {
  try {
    await db.delete(tenantsTable).where(eq(tenantsTable.id, Number(req.params.id)));
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete tenant" });
  }
});

export default router;
