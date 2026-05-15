import { Router } from "express";
import { db, paymentsTable, insertPaymentSchema } from "@workspace/db";
import { authenticate, authorize } from "../middlewares/auth";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/payments", authenticate, async (req, res) => {
  try {
    const { invoiceId } = req.query;
    let query = db.select().from(paymentsTable);
    if (invoiceId) query = query.where(eq(paymentsTable.invoiceId, Number(invoiceId))) as any;
    const payments = await query;
    res.json({ payments });
  } catch {
    res.status(500).json({ error: "Failed to fetch payments" });
  }
});

router.post("/payments", authenticate, async (req, res) => {
  try {
    const data = insertPaymentSchema.parse(req.body);
    const [payment] = await db.insert(paymentsTable).values(data).returning();
    res.status(201).json({ payment });
  } catch (err: any) {
    res.status(400).json({ error: "Validation failed", details: err.errors || err.message });
  }
});

export default router;
