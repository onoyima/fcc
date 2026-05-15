import { Router } from "express";
import { db, payrollTable, insertPayrollSchema } from "@workspace/db";
import { authenticate, authorize } from "../middlewares/auth";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/payroll", authenticate, authorize("super_admin", "accountant", "hr_manager"), async (req, res) => {
  try {
    const payroll = await db.select().from(payrollTable);
    res.json({ payroll });
  } catch {
    res.status(500).json({ error: "Failed to fetch payroll" });
  }
});

router.post("/payroll", authenticate, authorize("super_admin", "accountant"), async (req, res) => {
  try {
    const data = insertPayrollSchema.parse(req.body);
    const [entry] = await db.insert(payrollTable).values(data).returning();
    res.status(201).json({ payroll: entry });
  } catch (err: any) {
    res.status(400).json({ error: "Validation failed", details: err.errors || err.message });
  }
});

router.put("/payroll/:id", authenticate, authorize("super_admin", "accountant"), async (req, res) => {
  try {
    const [entry] = await db.update(payrollTable).set(req.body).where(eq(payrollTable.id, Number(req.params.id))).returning();
    if (!entry) {
      res.status(404).json({ error: "Payroll entry not found" });
      return;
    }
    res.json({ payroll: entry });
  } catch {
    res.status(500).json({ error: "Failed to update payroll entry" });
  }
});

export default router;
