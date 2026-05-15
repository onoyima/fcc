import { Router } from "express";
import { db, invoicesTable, insertInvoiceSchema } from "@workspace/db";
import { authenticate, authorize } from "../middlewares/auth";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/invoices", authenticate, async (req, res) => {
  try {
    const { status, tenantId } = req.query;
    let query = db.select().from(invoicesTable);
    if (status) query = query.where(eq(invoicesTable.status, status as any)) as any;
    if (tenantId) query = query.where(eq(invoicesTable.tenantId, Number(tenantId))) as any;
    const invoices = await query;
    res.json({ invoices });
  } catch {
    res.status(500).json({ error: "Failed to fetch invoices" });
  }
});

router.get("/invoices/:id", authenticate, async (req, res) => {
  try {
    const [invoice] = await db.select().from(invoicesTable).where(eq(invoicesTable.id, Number(req.params.id)));
    if (!invoice) {
      res.status(404).json({ error: "Invoice not found" });
      return;
    }
    res.json({ invoice });
  } catch {
    res.status(500).json({ error: "Failed to fetch invoice" });
  }
});

router.post("/invoices", authenticate, authorize("super_admin", "accountant", "property_manager"), async (req, res) => {
  try {
    const data = insertInvoiceSchema.parse(req.body);
    const [invoice] = await db.insert(invoicesTable).values(data).returning();
    res.status(201).json({ invoice });
  } catch (err: any) {
    res.status(400).json({ error: "Validation failed", details: err.errors || err.message });
  }
});

router.put("/invoices/:id", authenticate, authorize("super_admin", "accountant"), async (req, res) => {
  try {
    const [invoice] = await db.update(invoicesTable).set(req.body).where(eq(invoicesTable.id, Number(req.params.id))).returning();
    if (!invoice) {
      res.status(404).json({ error: "Invoice not found" });
      return;
    }
    res.json({ invoice });
  } catch {
    res.status(500).json({ error: "Failed to update invoice" });
  }
});

export default router;
