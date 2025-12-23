import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.NODE_ENV === "production" ? 5000 : 3001;
const host = process.env.NODE_ENV === "production" ? "0.0.0.0" : "localhost";

// Start server IMMEDIATELY for health checks
app.listen(PORT, host, () => {
  console.log(`Server running on http://${host}:${PORT}`);
});

app.use(cors());
app.use(express.json());

// Production: Serve static files FIRST for fast health check
if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "../dist");
  
  // Root route for immediate health check response
  app.get("/", (req, res) => {
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(path.join(distPath, "index.html"));
  });
  
  app.use(express.static(distPath, {
    maxAge: '1h',
    setHeaders: (res, filePath) => {
      if (filePath.endsWith('.html')) {
        res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
      }
    }
  }));
}

// Health check (no DB required)
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// Lazy load database and routes
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

app.get("/api/services", async (req, res) => {
  try {
    const { db, schema } = await getDb();
    const { eq } = await import("drizzle-orm");
    const allServices = await db
      .select()
      .from(schema.services)
      .where(eq(schema.services.isActive, true));
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

    const [newContact] = await db
      .insert(schema.contacts)
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
    const { db, schema } = await getDb();
    const { desc } = await import("drizzle-orm");
    const allContacts = await db
      .select()
      .from(schema.contacts)
      .orderBy(desc(schema.contacts.createdAt));
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

    const [newMessage] = await db
      .insert(schema.chatHistory)
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
    const { db, schema } = await getDb();
    const { eq } = await import("drizzle-orm");
    const { sessionId } = req.params;
    const messages = await db
      .select()
      .from(schema.chatHistory)
      .where(eq(schema.chatHistory.sessionId, sessionId))
      .orderBy(schema.chatHistory.createdAt);
    res.json(messages);
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({ error: "Failed to fetch chat history" });
  }
});

// SPA fallback (must be last)
if (process.env.NODE_ENV === "production") {
  const distPath = path.resolve(__dirname, "../dist");
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    res.sendFile(path.join(distPath, "index.html"));
  });
}
