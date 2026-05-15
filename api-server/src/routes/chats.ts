import { Router } from "express";
import { db, chatsTable, insertChatSchema } from "@workspace/db";
import { authenticate, type AuthRequest } from "../middlewares/auth";
import { eq, or } from "drizzle-orm";

const router = Router();

router.get("/chats", authenticate, async (req: AuthRequest, res) => {
  try {
    const chats = await db.select().from(chatsTable).where(
      or(eq(chatsTable.senderId, req.user!.id), eq(chatsTable.receiverId, req.user!.id))
    );
    res.json({ chats });
  } catch {
    res.status(500).json({ error: "Failed to fetch chats" });
  }
});

router.post("/chats", authenticate, async (req: AuthRequest, res) => {
  try {
    const data = insertChatSchema.parse({ ...req.body, senderId: req.user!.id });
    const [chat] = await db.insert(chatsTable).values(data).returning();
    res.status(201).json({ chat });
  } catch (err: any) {
    res.status(400).json({ error: "Validation failed", details: err.errors || err.message });
  }
});

router.put("/chats/:id/read", authenticate, async (req: AuthRequest, res) => {
  try {
    const [chat] = await db.update(chatsTable)
      .set({ isRead: true, readAt: new Date() })
      .where(eq(chatsTable.id, Number(req.params.id)))
      .returning();
    if (!chat) {
      res.status(404).json({ error: "Chat not found" });
      return;
    }
    res.json({ chat });
  } catch {
    res.status(500).json({ error: "Failed to update chat" });
  }
});

export default router;
