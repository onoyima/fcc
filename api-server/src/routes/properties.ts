import { Router } from "express";
import { db, propertiesTable, insertPropertySchema } from "@workspace/db";
import { authenticate, authorize, type AuthRequest } from "../middlewares/auth";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/properties", async (req, res) => {
  try {
    const { type, status, city, featured, search } = req.query;
    let query = db.select().from(propertiesTable);

    const conditions = [];
    if (type) conditions.push(eq(propertiesTable.type, type as any));
    if (status) conditions.push(eq(propertiesTable.status, status as any));
    if (city) conditions.push(eq(propertiesTable.city, city as string));
    if (featured === "true") conditions.push(eq(propertiesTable.featured, true));
    if (search) {
      const pattern = `%${search}%`;
      const { like, or } = await import("drizzle-orm");
      conditions.push(or(like(propertiesTable.title, pattern), like(propertiesTable.location, pattern)));
    }

    if (conditions.length > 0) {
      const { and } = await import("drizzle-orm");
      query = (db.select().from(propertiesTable) as any).where(and(...conditions));
    }

    const properties = await query;
    res.json({ properties });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch properties" });
  }
});

router.get("/properties/:id", async (req, res) => {
  try {
    const [property] = await db.select().from(propertiesTable).where(eq(propertiesTable.id, Number(req.params.id)));
    if (!property) {
      res.status(404).json({ error: "Property not found" });
      return;
    }
    res.json({ property });
  } catch {
    res.status(500).json({ error: "Failed to fetch property" });
  }
});

router.post("/properties", authenticate, authorize("super_admin", "property_manager", "estate_agent"), async (req: AuthRequest, res) => {
  try {
    const data = insertPropertySchema.parse({ ...req.body, listedBy: req.user!.id });
    const [property] = await db.insert(propertiesTable).values(data).returning();
    res.status(201).json({ property });
  } catch (err: any) {
    res.status(400).json({ error: "Validation failed", details: err.errors || err.message });
  }
});

router.put("/properties/:id", authenticate, authorize("super_admin", "property_manager"), async (req, res) => {
  try {
    const [property] = await db.update(propertiesTable).set(req.body).where(eq(propertiesTable.id, Number(req.params.id))).returning();
    if (!property) {
      res.status(404).json({ error: "Property not found" });
      return;
    }
    res.json({ property });
  } catch {
    res.status(500).json({ error: "Failed to update property" });
  }
});

router.delete("/properties/:id", authenticate, authorize("super_admin"), async (req, res) => {
  try {
    await db.delete(propertiesTable).where(eq(propertiesTable.id, Number(req.params.id)));
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete property" });
  }
});

export default router;
