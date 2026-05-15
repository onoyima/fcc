import { Router } from "express";
import { db, estatesTable, insertEstateSchema } from "@workspace/db";
import { authenticate, authorize } from "../middlewares/auth";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/estates", async (req, res) => {
  try {
    const estates = await db.select().from(estatesTable);
    res.json({ estates });
  } catch {
    res.status(500).json({ error: "Failed to fetch estates" });
  }
});

router.get("/estates/:id", async (req, res) => {
  try {
    const [estate] = await db.select().from(estatesTable).where(eq(estatesTable.id, Number(req.params.id)));
    if (!estate) {
      res.status(404).json({ error: "Estate not found" });
      return;
    }
    res.json({ estate });
  } catch {
    res.status(500).json({ error: "Failed to fetch estate" });
  }
});

router.post("/estates", authenticate, authorize("super_admin", "estate_manager"), async (req, res) => {
  try {
    const data = insertEstateSchema.parse(req.body);
    const [estate] = await db.insert(estatesTable).values(data).returning();
    res.status(201).json({ estate });
  } catch (err: any) {
    res.status(400).json({ error: "Validation failed", details: err.errors || err.message });
  }
});

router.put("/estates/:id", authenticate, authorize("super_admin", "estate_manager"), async (req, res) => {
  try {
    const [estate] = await db.update(estatesTable).set(req.body).where(eq(estatesTable.id, Number(req.params.id))).returning();
    if (!estate) {
      res.status(404).json({ error: "Estate not found" });
      return;
    }
    res.json({ estate });
  } catch {
    res.status(500).json({ error: "Failed to update estate" });
  }
});

export default router;
