import { Router } from "express";
import { db, notificationsTable, insertNotificationSchema } from "@workspace/db";
import { authenticate, type AuthRequest } from "../middlewares/auth";
import { eq } from "drizzle-orm";

const router = Router();

router.get("/notifications", authenticate, async (req: AuthRequest, res) => {
  try {
    const notifications = await db.select().from(notificationsTable).where(eq(notificationsTable.userId, req.user!.id));
    res.json({ notifications });
  } catch {
    res.status(500).json({ error: "Failed to fetch notifications" });
  }
});

router.put("/notifications/:id/read", authenticate, async (req: AuthRequest, res) => {
  try {
    const [notification] = await db.update(notificationsTable)
      .set({ isRead: true, readAt: new Date() })
      .where(eq(notificationsTable.id, Number(req.params.id)))
      .returning();
    if (!notification) {
      res.status(404).json({ error: "Notification not found" });
      return;
    }
    res.json({ notification });
  } catch {
    res.status(500).json({ error: "Failed to update notification" });
  }
});

router.post("/notifications", authenticate, async (req, res) => {
  try {
    const data = insertNotificationSchema.parse(req.body);
    const [notification] = await db.insert(notificationsTable).values(data).returning();
    res.status(201).json({ notification });
  } catch (err: any) {
    res.status(400).json({ error: "Validation failed", details: err.errors || err.message });
  }
});

export default router;
