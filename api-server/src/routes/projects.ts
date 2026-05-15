import { Router } from "express";
import { db, projectsTable, insertProjectSchema } from "@workspace/db";
import { authenticate, authorize } from "../middlewares/auth";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/projects", async (req, res) => {
  try {
    const { status, category } = req.query;
    let query = db.select().from(projectsTable);
    if (status) query = query.where(eq(projectsTable.status, status as any)) as any;
    if (category) query = query.where(eq(projectsTable.category, category as any)) as any;
    const projects = await query;
    res.json({ projects });
  } catch {
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

router.get("/projects/:id", async (req, res) => {
  try {
    const [project] = await db.select().from(projectsTable).where(eq(projectsTable.id, Number(req.params.id)));
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.json({ project });
  } catch {
    res.status(500).json({ error: "Failed to fetch project" });
  }
});

router.post("/projects", authenticate, authorize("super_admin", "construction_manager", "project_manager"), async (req: any, res) => {
  try {
    const data = insertProjectSchema.parse({ ...req.body, managerId: req.user!.id });
    const [project] = await db.insert(projectsTable).values(data).returning();
    res.status(201).json({ project });
  } catch (err: any) {
    res.status(400).json({ error: "Validation failed", details: err.errors || err.message });
  }
});

router.put("/projects/:id", authenticate, authorize("super_admin", "construction_manager", "project_manager"), async (req, res) => {
  try {
    const [project] = await db.update(projectsTable).set(req.body).where(eq(projectsTable.id, Number(req.params.id))).returning();
    if (!project) {
      res.status(404).json({ error: "Project not found" });
      return;
    }
    res.json({ project });
  } catch {
    res.status(500).json({ error: "Failed to update project" });
  }
});

router.delete("/projects/:id", authenticate, authorize("super_admin"), async (req, res) => {
  try {
    await db.delete(projectsTable).where(eq(projectsTable.id, Number(req.params.id)));
    res.json({ success: true });
  } catch {
    res.status(500).json({ error: "Failed to delete project" });
  }
});

export default router;
