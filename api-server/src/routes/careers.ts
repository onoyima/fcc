import { Router } from "express";
import { db, jobApplicationsTable, insertJobApplicationSchema, workersTable, insertWorkerSchema, contractorsTable, insertContractorSchema } from "@workspace/db";

const router = Router();

router.post("/careers/apply", async (req, res) => {
  try {
    const { applicationType } = req.body;

    if (applicationType === "job") {
      const data = insertJobApplicationSchema.parse(req.body);
      const [application] = await db.insert(jobApplicationsTable).values(data).returning();
      res.status(201).json({ application });
      return;
    }

    if (applicationType === "labor") {
      const data = insertWorkerSchema.parse({
        firstName: req.body.firstName || "",
        lastName: req.body.lastName || "",
        phone: req.body.phone,
        skill: req.body.skill,
        experienceYears: req.body.experienceYears ? Number(req.body.experienceYears) : 0,
      });
      const [worker] = await db.insert(workersTable).values(data).returning();
      res.status(201).json({ worker });
      return;
    }

    if (applicationType === "contractor") {
      const data = insertContractorSchema.parse({
        companyName: req.body.companyName,
        contactPerson: req.body.contactPerson,
        email: req.body.email,
        phone: req.body.phone,
        specialization: req.body.specialization,
      });
      const [contractor] = await db.insert(contractorsTable).values(data).returning();
      res.status(201).json({ contractor });
      return;
    }

    res.status(400).json({ error: "Invalid applicationType. Must be 'job', 'labor', or 'contractor'" });
  } catch (err: any) {
    res.status(400).json({ error: "Validation failed", details: err.errors || err.message });
  }
});

export default router;
