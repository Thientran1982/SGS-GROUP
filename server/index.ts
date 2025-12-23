import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { db } from "./db";
import { contacts, services, chatHistory } from "../shared/schema";
import { eq, desc } from "drizzle-orm";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.NODE_ENV === "production" ? 5000 : 3001;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.get("/api/services", async (req, res) => {
  try {
    const allServices = await db
      .select()
      .from(services)
      .where(eq(services.isActive, true));
    res.json(allServices);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, phone, company, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }

    const [newContact] = await db
      .insert(contacts)
      .values({ name, email, phone, company, message })
      .returning();

    res.status(201).json({ success: true, contact: newContact });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Failed to submit contact form" });
  }
});

app.get("/api/contacts", async (req, res) => {
  try {
    const allContacts = await db
      .select()
      .from(contacts)
      .orderBy(desc(contacts.createdAt));
    res.json(allContacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { sessionId, role, content } = req.body;
    
    if (!sessionId || !role || !content) {
      return res.status(400).json({ error: "sessionId, role, and content are required" });
    }

    const [newMessage] = await db
      .insert(chatHistory)
      .values({ sessionId, role, content })
      .returning();

    res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    console.error("Error saving chat message:", error);
    res.status(500).json({ error: "Failed to save chat message" });
  }
});

app.get("/api/chat/:sessionId", async (req, res) => {
  try {
    const { sessionId } = req.params;
    const messages = await db
      .select()
      .from(chatHistory)
      .where(eq(chatHistory.sessionId, sessionId))
      .orderBy(chatHistory.createdAt);
    res.json(messages);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "../dist");
  app.use(express.static(distPath));
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(distPath, "index.html"));
  });
}

const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";
app.listen(PORT, host, () => {
  console.log(`Server running on http://${host}:${PORT}`);
});
