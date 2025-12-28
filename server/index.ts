import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distPath = path.resolve(__dirname, "../dist");

const app = express();
const PORT = process.env.NODE_ENV === "production" ? 5000 : 3001;
const HOST = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";

// Preload index.html into memory for fast serving
let cachedIndexHtml = "";
try {
  cachedIndexHtml = fs.readFileSync(path.join(distPath, "index.html"), "utf-8");
} catch (e) {
  console.log("index.html not found - build may be needed");
}

app.use(cors());
app.use(express.json());

// Health check endpoints - respond immediately, no DB
app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Root handler - serve SPA for browsers, OK for health probes
app.get("/", (req, res) => {
  const acceptsHtml = req.headers.accept?.includes("text/html");
  if (acceptsHtml && cachedIndexHtml) {
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    return res.status(200).send(cachedIndexHtml);
  }
  res.status(200).type("text/plain").send("OK");
});

// Static files
app.use(express.static(distPath, {
  maxAge: "1h",
  setHeaders: (res, filePath) => {
    if (filePath.endsWith(".html")) {
      res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
    }
  }
}));

// Lazy database loader - only connects when API is called
let db: any = null;
let schema: any = null;

async function getDb() {
  if (!db) {
    const { drizzle } = await import("drizzle-orm/node-postgres");
    const pg = await import("pg");
    schema = await import("../shared/schema");
    const pool = new pg.default.Pool({ connectionString: process.env.DATABASE_URL });
    db = drizzle(pool, { schema });
  }
  return { db, schema };
}

// API Routes
app.get("/api/services", async (req, res) => {
  try {
    const { db, schema } = await getDb();
    const { eq } = await import("drizzle-orm");
    const allServices = await db.select().from(schema.services).where(eq(schema.services.isActive, true));
    res.json(allServices);
  } catch (error) {
    console.error("Error fetching services:", error);
    res.status(500).json({ error: "Failed to fetch services" });
  }
});

app.post("/api/contact", async (req, res) => {
  try {
    const { db, schema } = await getDb();
    const { name, email, phone, company, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: "Name, email, and message are required" });
    }
    const [newContact] = await db.insert(schema.contacts).values({ name, email, phone, company, message }).returning();
    res.status(201).json({ success: true, contact: newContact });
  } catch (error) {
    console.error("Error creating contact:", error);
    res.status(500).json({ error: "Failed to submit contact form" });
  }
});

app.get("/api/contacts", async (req, res) => {
  try {
    const { db, schema } = await getDb();
    const { desc } = await import("drizzle-orm");
    const allContacts = await db.select().from(schema.contacts).orderBy(desc(schema.contacts.createdAt));
    res.json(allContacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Failed to fetch contacts" });
  }
});

app.post("/api/chat", async (req, res) => {
  try {
    const { db, schema } = await getDb();
    const { sessionId, role, content } = req.body;
    if (!sessionId || !role || !content) {
      return res.status(400).json({ error: "sessionId, role, and content are required" });
    }
    const [newMessage] = await db.insert(schema.chatHistory).values({ sessionId, role, content }).returning();
    res.status(201).json({ success: true, message: newMessage });
  } catch (error) {
    console.error("Error saving chat message:", error);
    res.status(500).json({ error: "Failed to save chat message" });
  }
});

app.get("/api/chat/:sessionId", async (req, res) => {
  try {
    const { db, schema } = await getDb();
    const { eq } = await import("drizzle-orm");
    const { sessionId } = req.params;
    const messages = await db.select().from(schema.chatHistory).where(eq(schema.chatHistory.sessionId, sessionId)).orderBy(schema.chatHistory.createdAt);
    res.json(messages);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

// SPA fallback - must be last
app.use((req, res, next) => {
  if (req.path.startsWith("/api")) {
    return next();
  }
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.sendFile(path.join(distPath, "index.html"));
});

// Start server AFTER all routes are registered
app.listen(PORT, HOST, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});
