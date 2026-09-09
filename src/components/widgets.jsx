import { useEffect, useState } from "react";
import { useT } from "../lang.jsx";

const frame = "terminal glass rounded-xl p-4";

/* Module 01 — sales forecast chart */
export function ForecastWidget() {
  const t = useT();
  const bars = [34, 42, 38, 52, 47, 63, 58, 74];
  return (
    <div className={frame}>
      <div className="mono-label mb-3">{t({ en: "Sales forecast", vi: "Dự báo bán hàng" })}</div>
      <div className="flex h-24 items-end gap-1.5">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`flex-1 rounded-sm ${i >= 6 ? "bg-gradient-to-t from-accent to-primary-glow" : "bg-black/10 dark:bg-white/10"}`}
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
      <div className="mt-3 flex items-center justify-between font-mono text-[11px] text-[#8f8f8f]">
        <span>$2,463k → <span className="text-primary-glow">AI: $2,902k</span></span>
        <span>{t({ en: "Confidence: 96%", vi: "Độ tin cậy: 96%" })}</span>
      </div>
    </div>
  );
}

/* Module 02 — Scan/Extract/Verify/Sync pipeline */
export function PipelineWidget() {
  const t = useT();
  const steps = [
    { en: "Scan", vi: "Quét" },
    { en: "Extract", vi: "Trích xuất" },
    { en: "Verify", vi: "Kiểm tra" },
    { en: "Sync", vi: "Đồng bộ" },
  ];
  const [active, setActive] = useState(0);
  const [running, setRunning] = useState(true);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 900);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div className={frame}>
      <div className="flex items-center justify-between gap-2">
        {steps.map((s, i) => (
          <div key={i} className="flex flex-1 items-center gap-2">
            <div
              className={`flex flex-1 flex-col items-center gap-1.5 rounded-lg border px-2 py-3 font-mono text-[11px] transition-colors ${
                i === active
                  ? "border-primary-glow/60 bg-primary/10 text-primary-glow"
                  : "border-black/10 text-[#8f8f8f] dark:border-white/10"
              }`}
            >
              <span className="text-sm">{i + 1}</span>
              {t(s)}
            </div>
            {i < steps.length - 1 && <span className="text-[#afafaf] dark:text-white/20">→</span>}
          </div>
        ))}
      </div>
      <button
        onClick={() => setRunning((r) => !r)}
        className="btn-shine mt-3 w-full rounded-md border border-primary-glow/40 bg-primary/10 py-2 font-mono text-[11px] uppercase tracking-[0.2em] text-primary-glow transition-colors hover:bg-primary/20"
      >
        {running ? t({ en: "◼ Abort sequence", vi: "◼ Dừng chuỗi" }) : t({ en: "Initiate sequence", vi: "Chạy chuỗi" })}
      </button>
    </div>
  );
}

/* Module 03 — prompt terminal */
export function TerminalWidget() {
  const t = useT();
  const [value, setValue] = useState("");
  const [sent, setSent] = useState([]);
  return (
    <div className={frame}>
      <div className="mono-label mb-3">SGS AI_CORE</div>
      <div className="min-h-16 space-y-1.5 font-mono text-[11px] leading-relaxed text-[#8f8f8f]">
        {sent.length === 0 && <p className="opacity-60">// {t({ en: "awaiting input…", vi: "chờ dữ liệu…" })}</p>}
        {sent.map((line, i) => (
          <p key={i}>
            <span className="text-primary-glow">&gt;</span> {line}
          </p>
        ))}
      </div>
      <form
        className="mt-3 flex overflow-hidden rounded-md border border-black/10 focus-within:border-primary-glow/60 dark:border-white/15"
        onSubmit={(e) => {
          e.preventDefault();
          if (!value.trim()) return;
          setSent((s) => [...s, value.trim()].slice(-4));
          setValue("");
        }}
      >
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={t({ en: "Input data...", vi: "Nhập dữ liệu..." })}
          className="w-full bg-transparent px-3 py-2 font-mono text-xs outline-none placeholder:text-[#5d5d5d]"
        />
        <button type="submit" className="bg-primary/15 px-3 text-primary-glow" aria-label="Run">
          →
        </button>
      </form>
    </div>
  );
}

/* Module 04 — live ops status */
export function StatusWidget() {
  const t = useT();
  const [rps, setRps] = useState(14.5);
  useEffect(() => {
    const id = setInterval(() => setRps(12 + Math.random() * 5), 2000);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={frame}>
      <div className="mono-label mb-3">{t({ en: "Ops status", vi: "Trạng thái vận hành" })}</div>
      <div className="flex items-center justify-between font-mono text-sm">
        <span className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 rounded-full bg-ok animate-pulse-slow" />
          {t({ en: "System: OK", vi: "Hệ thống: OK" })}
        </span>
        <span className="text-primary-glow">RPS: {rps.toFixed(1)}k</span>
      </div>
      <div className="mt-3 grid grid-cols-12 gap-1">
        {Array.from({ length: 24 }).map((_, i) => (
          <div
            key={i}
            className="h-6 rounded-sm bg-gradient-to-t from-accent/60 to-primary-glow/60"
            style={{ opacity: 0.25 + ((i * 7) % 10) / 13 }}
          />
        ))}
      </div>
    </div>
  );
}

/* Module 05 — data lake counter */
export function LakeWidget() {
  const t = useT();
  const [pb, setPb] = useState(84.9318);
  useEffect(() => {
    const id = setInterval(() => setPb((p) => p + 0.0001), 400);
    return () => clearInterval(id);
  }, []);
  return (
    <div className={frame}>
      <div className="mono-label mb-3">{t({ en: "Data lake volume", vi: "Dung lượng data lake" })}</div>
      <div className="font-mono text-2xl text-primary-glow">
        {pb.toFixed(4)} <span className="text-sm text-[#8f8f8f]">PB</span>
      </div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-ok">
        ● {t({ en: "ETL: active", vi: "ETL: đang chạy" })}
      </div>
      <div className="mt-3 flex items-center gap-2 font-mono text-[10px] text-[#8f8f8f]">
        <span className="rounded border border-black/10 px-2 py-1 dark:border-white/15">{t({ en: "RAW_INGEST", vi: "GỐC" })}</span>
        <span className="text-primary-glow">→</span>
        <span className="rounded border border-black/10 px-2 py-1 dark:border-white/15">{t({ en: "STRUCTURED", vi: "CHUẨN HÓA" })}</span>
      </div>
    </div>
  );
}
