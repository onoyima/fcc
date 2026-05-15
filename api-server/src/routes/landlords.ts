import { Router } from "express";
import { db, landlordsTable, insertLandlordSchema } from "@workspace/db";
import { authenticate } from "../middlewares/auth";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/landlords", authenticate, async (req, res) => {
  try {
    const landlords = await db.select().from(landlordsTable);
    res.json({ landlords });
  } catch {
    res.status(500).json({ error: "Failed to fetch landlords" });
  }
});

router.get("/landlords/:id", authenticate, async (req, res) => {
  try {
    const [landlord] = await db.select().from(landlordsTable).where(eq(landlordsTable.id, Number(req.params.id)));
    if (!landlord) {
      res.status(404).json({ error: "Landlord not found" });
      return;
    }
    res.json({ landlord });
  } catch {
    res.status(500).json({ error: "Failed to fetch landlord" });
  }
});

router.post("/landlords", authenticate, async (req, res) => {
  try {
    const data = insertLandlordSchema.parse(req.body);
    const [landlord] = await db.insert(landlordsTable).values(data).returning();
    res.status(201).json({ landlord });
  } catch (err: any) {
    res.status(400).json({ error: "Validation failed", details: err.errors || err.message });
  }
});

router.put("/landlords/:id", authenticate, async (req, res) => {
  try {
    const [landlord] = await db.update(landlordsTable).set(req.body).where(eq(landlordsTable.id, Number(req.params.id))).returning();
    if (!landlord) {
      res.status(404).json({ error: "Landlord not found" });
      return;
    }
    res.json({ landlord });
  } catch {
    res.status(500).json({ error: "Failed to update landlord" });
  }
});

export default router;
