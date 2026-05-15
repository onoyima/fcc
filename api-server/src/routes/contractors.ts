import { Router } from "express";
import { db, contractorsTable, insertContractorSchema } from "@workspace/db";
import { authenticate, authorize } from "../middlewares/auth";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/contractors", async (req, res) => {
  try {
    const contractors = await db.select().from(contractorsTable);
    res.json({ contractors });
  } catch {
    res.status(500).json({ error: "Failed to fetch contractors" });
  }
});

router.get("/contractors/:id", async (req, res) => {
  try {
    const [contractor] = await db.select().from(contractorsTable).where(eq(contractorsTable.id, Number(req.params.id)));
    if (!contractor) {
      res.status(404).json({ error: "Contractor not found" });
      return;
    }
    res.json({ contractor });
  } catch {
    res.status(500).json({ error: "Failed to fetch contractor" });
  }
});

router.post("/contractors", async (req, res) => {
  try {
    const data = insertContractorSchema.parse(req.body);
    const [contractor] = await db.insert(contractorsTable).values(data).returning();
    res.status(201).json({ contractor });
  } catch (err: any) {
    res.status(400).json({ error: "Validation failed", details: err.errors || err.message });
  }
});

router.put("/contractors/:id", authenticate, authorize("super_admin"), async (req, res) => {
  try {
    const [contractor] = await db.update(contractorsTable).set(req.body).where(eq(contractorsTable.id, Number(req.params.id))).returning();
    if (!contractor) {
      res.status(404).json({ error: "Contractor not found" });
      return;
    }
    res.json({ contractor });
  } catch {
    res.status(500).json({ error: "Failed to update contractor" });
  }
});

export default router;
