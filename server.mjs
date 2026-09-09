import http from "node:http";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = Number(process.env.API_PORT) || 3001;

/* ============ SGS Knowledge Base (system prompt) ============ */

const SYSTEM_PROMPT = `You are "SGS Assistant" — the AI assistant of SGS GROUP (website sgsgroup.vn), an enterprise AI & automation company for Vietnam and Southeast Asia, founded 2020, 40+ engineers, HQ: 122–124 B2, Sala Urban Area, Thu Duc City, HCMC. Phone: +84 379281 445. Email: info@sgsgroup.vn.

CORE OFFERINGS (5 technology modules):
1. Data Analytics (Phân tích Dữ liệu) — connects to MySQL, PostgreSQL, MongoDB, Google Sheets, Vietnamese ERPs; ML models for SEA market; predictive forecasting (demand, churn, fraud), customer segmentation, live dashboards, auto alerts. First insight in 2–4 weeks. Stat: 38% fewer stockouts.
2. Automation (Tự động hóa) — RPA bots for invoices, KYC, supply-chain reports; Vietnamese-language OCR (Tesseract); SAP/MISA/ERP integration via API or screen automation; 24/7 bots; 78% faster processing on average in first 90 days; 3,000+ workflows digitized.
3. AI Technology (Công nghệ AI) — fine-tuned LLMs for Vietnamese & domain vocabulary; multilingual NLU (VI/EN/TH/ID); computer vision (defect detection, OCR); on-premise deployment for banking/healthcare. 45+ custom AI systems; chatbots handle 70% of queries, 10k+ queries/day.
4. Cloud Computing (Điện toán đám mây) — AWS/GCP/Azure/Viettel Cloud; 500+ production environments; zero-downtime 6-week migration; Kubernetes, Terraform, GitOps; SOC 2 & ISO 27001 aligned; ~34% cloud cost reduction (right-sizing).
5. Big Data (Xử lý Big Data) — Apache Spark + Kafka; Delta Lake lakehouse (ACID on petabyte scale); real-time fraud/anomaly alerts <50ms; Airflow + dbt managed ETL; 85PB processed.

WORKING PROCESS (4 phases): (1) Audit — week 1–2, free technical assessment report; (2) Pilot — week 3–6, fixed-scope pilot on real data, success metrics written into contract; (3) Deploy — month 2–3, zero-downtime rollout + training + docs; (4) Support — month 4+, 24/7 monitoring, SLA 15min P1 / 4h P2.

KEY GUARANTEES: 6-week deployment or 100% pilot refund (in contract); zero data breaches across 200+ deployments; ISO 27001 aligned, AES-256, PDPA compliant, Law 24/2018 (Vietnam Cybersecurity Law); money-back pilot.

COMPANY FACTS: 200+ projects since 2020; 50+ enterprise clients in 6+ countries; 99.98% uptime; team led by Nguyen Duc Vinh (CEO), Tran Thi Lan Anh (CTO), Pham Minh Khoa (Head of Delivery). Legal entity: Sai Gon Sun Co., Ltd, Business Reg. 0312960439.

HOW TO ANSWER (strict rules):
- Detect the user's language: reply in Vietnamese if they write Vietnamese, English otherwise. Never mix.
- Be concise: 2–5 sentences or a short list. No long essays, no filler.
- Use ONLY facts above. If asked something you don't know (exact pricing, custom timelines, competitor comparison), do NOT invent numbers. Say it depends on scope and offer the free 30-minute audit; team responds within 24h at info@sgsgroup.vn or +84 379281 445.
- If the user shares contact details (email/phone) or shows buying intent, acknowledge warmly and point them to the free audit; mention we'll follow up within 24 hours.
- If the question is completely unrelated to business/technology (e.g. math, weather, sports), answer briefly and honestly in one sentence, then gently steer back to what you can help with.
- Never claim to be human. You are the SGS AI Assistant.`;

/* ============ Multi-model provider chain ============ */

async function callGemini(messages, model) {
  const key = process.env.GEMINI_API_KEY;
  if (!key) throw new Error("NO_GEMINI_KEY");
  const r = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${key}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        contents: messages.map((m) => ({
          role: m.role === "assistant" ? "model" : "user",
          parts: [{ text: m.text }],
        })),
        generationConfig: { temperature: 0.4, maxOutputTokens: 600 },
      }),
      signal: AbortSignal.timeout(20000),
    }
  );
  if (!r.ok) throw new Error(`GEMINI_${r.status}`);
  const data = await r.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error("GEMINI_EMPTY");
  return { text: text.trim(), model: "gemini:" + model };
}

async function callOpenAICompatible(messages, cfg) {
  const r = await fetch(cfg.baseUrl + "/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${cfg.key}`,
    },
    body: JSON.stringify({
      model: cfg.model,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map((m) => ({ role: m.role, content: m.text })),
      ],
      max_tokens: 600,
      temperature: 0.4,
    }),
    signal: AbortSignal.timeout(20000),
  });
  if (!r.ok) throw new Error(`LLM_${r.status}`);
  const data = await r.json();
  const text = data?.choices?.[0]?.message?.content;
  if (!text) throw new Error("LLM_EMPTY");
  return { text: text.trim(), model: cfg.name + ":" + cfg.model };
}

/* Provider chain: try in order, first success wins */
async function askLLM(messages) {
  const chain = [];

  // 1) Gemini — all available models as fallback ladder
  const geminiModels = (process.env.GEMINI_MODELS || "gemini-2.5-flash,gemini-flash-latest,gemini-2.5-flash-lite")
    .split(",").map(s => s.trim()).filter(Boolean);
  for (const m of geminiModels) {
    chain.push(() => callGemini(messages, m));
  }

  // 2) OpenAI (if key present)
  if (process.env.OPENAI_API_KEY) {
    chain.push(() =>
      callOpenAICompatible(messages, {
        key: process.env.OPENAI_API_KEY,
        baseUrl: "https://api.openai.com/v1",
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        name: "openai",
      })
    );
  }

  // 3) OpenRouter (if key present) — gives access to many models
  if (process.env.OPENROUTER_API_KEY) {
    chain.push(() =>
      callOpenAICompatible(messages, {
        key: process.env.OPENROUTER_API_KEY,
        baseUrl: "https://openrouter.ai/api/v1",
        model: process.env.OPENROUTER_MODEL || "meta-llama/llama-3.1-8b-instruct:free",
        name: "openrouter",
      })
    );
  }

  let lastErr;
  for (const fn of chain) {
    try {
      return await fn();
    } catch (e) {
      lastErr = e;
      console.error("[ask] provider failed:", e.message);
    }
  }
  throw lastErr || new Error("NO_PROVIDER");
}

/* ============ Lead capture (thông tin khách) ============ */

function extractLead(text) {
  const lead = {};
  const email = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
  if (email) lead.email = email[0];
  const phone = text.match(/(?:\+?84|0)\s?\d[\d\s.-]{7,12}\d/);
  if (phone) lead.phone = phone[0].replace(/\s+/g, " ").trim();
  return lead;
}

/* ============ HTTP server ============ */

const server = http.createServer(async (req, res) => {
  const send = (code, body, type = "application/json") => {
    res.writeHead(code, {
      "Content-Type": type,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    });
    res.end(typeof body === "string" ? body : JSON.stringify(body));
  };

  if (req.method === "OPTIONS") return send(204, "");

  if (req.method === "GET" && req.url === "/api/health") {
    return send(200, {
      ok: true,
      providers: {
        gemini: !!process.env.GEMINI_API_KEY,
        openai: !!process.env.OPENAI_API_KEY,
        openrouter: !!process.env.OPENROUTER_API_KEY,
      },
    });
  }

  if (req.method === "POST" && req.url === "/api/ask") {
    let body = "";
    req.on("data", (c) => (body += c));
    req.on("end", async () => {
      try {
        const { messages = [] } = JSON.parse(body || "{}");
        if (!Array.isArray(messages) || messages.length === 0) {
          return send(400, { error: "messages required" });
        }
        // Cap history to last 20 turns
        const hist = messages.slice(-20).map((m) => ({
          role: m.role === "assistant" ? "assistant" : "user",
          text: String(m.text || "").slice(0, 4000),
        }));

        const lastUser = [...hist].reverse().find((m) => m.role === "user");
        const lead = lastUser ? extractLead(lastUser.text) : {};
        if (lead.email || lead.phone) {
          console.log("[lead captured]", JSON.stringify(lead), "| asked:", (lastUser.text || "").slice(0, 120));
        }

        const { text, model } = await askLLM(hist);
        return send(200, { reply: text, model, lead: Object.keys(lead).length ? lead : undefined });
      } catch (e) {
        console.error("[ask] error:", e.message);
        return send(502, { error: "LLM_UNAVAILABLE", detail: e.message });
      }
    });
    return;
  }

  // Static fallback (not used when proxied, useful for standalone)
  send(404, { error: "not found" });
});

server.listen(PORT, "0.0.0.0", () => {
  console.log(`[server] SGS AI API listening on :${PORT}`);
});
