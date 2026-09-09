import { useEffect, useRef, useState } from "react";
import { useT } from "../lang.jsx";

const SUGGESTIONS = [
  {
    en: "What makes SGS GROUP different from other AI vendors in Vietnam?",
    vi: "Điều gì khiến SGS GROUP khác biệt so với các nhà cung cấp AI khác tại Việt Nam?",
  },
  {
    en: "How long does it take to automate a business process end-to-end?",
    vi: "Mất bao lâu để tự động hóa end-to-end một quy trình kinh doanh?",
  },
  {
    en: "What ROI can I expect from a document automation project?",
    vi: "ROI tôi có thể kỳ vọng từ dự án tự động hóa tài liệu?",
  },
  {
    en: "I want a pilot for my factory. Reach me at john@company.com",
    vi: "Tôi muốn pilot cho nhà máy. Liên hệ tôi qua john@company.com",
  },
];

const FALLBACK = {
  en: "I can't reach my reasoning engine right now. Please try again in a minute — or contact us directly at info@sgsgroup.vn / +84 379281 445 and we'll respond within 24 hours.",
  vi: "Tôi chưa kết nối được bộ suy luận lúc này. Bạn thử lại sau một phút — hoặc liên hệ trực tiếp info@sgsgroup.vn / +84 379281 445, chúng tôi phản hồi trong 24 giờ.",
};

function NewChatIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function ArrowUpIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 19V5M5 12l7-7 7 7" />
    </svg>
  );
}

export default function AIHub() {
  const t = useT();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, thinking]);

  const send = async (text) => {
    const value = (text ?? input).trim();
    if (!value || thinking) return;

    const userMsg = { role: "user", text: value };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setThinking(true);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
        signal: AbortSignal.timeout(25000),
      });
      const data = await res.json().catch(() => ({}));
      const reply =
        res.ok && data.reply
          ? data.reply
          : t(FALLBACK);
      setMessages((m) => [...m, { role: "assistant", text: reply }]);
    } catch {
      setMessages((m) => [...m, { role: "assistant", text: t(FALLBACK) }]);
    } finally {
      setThinking(false);
    }
  };

  return (
    <div className="mx-auto flex max-w-6xl gap-4 px-3 pb-8 pt-20 sm:px-6 h-[calc(100vh-5rem)]">
      {/* Sidebar — ChatGPT style */}
      <aside
        className="hidden w-60 shrink-0 flex-col rounded-2xl bg-canvas-subtle p-2 lg:flex"
        aria-label="Chat sessions"
      >
        <button
          onClick={() => setMessages([])}
          className="mb-2 flex items-center gap-2.5 rounded-lg px-2.5 py-2.5 text-sm font-medium text-[#0d0d0d] transition-colors hover:bg-black/[0.06] dark:text-[#ececec] dark:hover:bg-white/[0.07]"
        >
          <NewChatIcon />
          {t({ en: "New chat", vi: "Trò chuyện mới" })}
        </button>
        <div className="mono-label px-2.5 pb-1.5 pt-2">
          {t({ en: "Today", vi: "Hôm nay" })}
        </div>
        <ul className="space-y-0.5 text-sm">
          <li className="cursor-default rounded-lg bg-black/[0.06] px-2.5 py-2 text-[#0d0d0d] dark:bg-white/[0.08] dark:text-[#ececec]">
            {messages.length === 0
              ? t({ en: "New Conversation", vi: "Trò chuyện mới" })
              : t({ en: `${messages.length} messages`, vi: `${messages.length} tin nhắn` })}
          </li>
        </ul>
        <div className="mt-auto px-2.5 pb-1 font-mono text-[10px] uppercase tracking-widest text-[#8f8f8f]">
          SGS Neural Core · Live
        </div>
      </aside>

      {/* Chat panel */}
      <div className="glass flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex items-center justify-between border-b border-black/10 px-5 py-3 dark:border-white/10">
          <span className="text-sm font-semibold">SGS AI Hub</span>
          <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#8f8f8f]">
            <span className="h-1.5 w-1.5 rounded-full bg-ok animate-pulse-slow" />
            Neural Link Established
          </span>
        </div>

        <div ref={scrollRef} className="flex-1 overflow-y-auto">
          <div className="mx-auto max-w-3xl px-5 py-6">
            {messages.length === 0 ? (
              /* Empty state — centered like ChatGPT */
              <div className="flex min-h-[45vh] flex-col items-center justify-center text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {t({ en: "What can I help with?", vi: "Tôi có thể giúp gì cho bạn?" })}
                </h1>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.25em] text-[#8f8f8f]">
                  {t({ en: "Ask about our tech, process, pricing", vi: "Hỏi về công nghệ, quy trình, chi phí" })}
                </p>
                <div className="mt-8 grid w-full gap-2 sm:grid-cols-2">
                  {SUGGESTIONS.map((q, i) => (
                    <button
                      key={i}
                      onClick={() => send(t(q))}
                      className="rounded-2xl border border-black/10 px-4 py-3 text-left text-[13px] leading-snug text-[#5d5d5d] transition-colors hover:bg-black/[0.04] hover:text-[#0d0d0d] dark:border-white/10 dark:text-[#b4b4b4] dark:hover:bg-white/[0.06] dark:hover:text-white"
                    >
                      {t(q)}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {messages.map((m, i) =>
                  m.role === "user" ? (
                    <div key={i} className="flex justify-end">
                      <div className="max-w-[80%] rounded-3xl bg-[#e3e3e3] px-4 py-2.5 text-[15px] leading-relaxed text-[#0d0d0d] dark:bg-[#303030] dark:text-[#ececec]">
                        {m.text}
                      </div>
                    </div>
                  ) : (
                    <div key={i} className="max-w-[92%] whitespace-pre-wrap text-[15px] leading-7 text-[#0d0d0d] dark:text-[#ececec]">
                      {m.text}
                    </div>
                  )
                )}
                {thinking && (
                  <div className="flex w-fit items-center gap-1.5 rounded-3xl bg-[#e3e3e3] px-4 py-3 dark:bg-[#303030]">
                    {[0, 1, 2].map((d) => (
                      <span
                        key={d}
                        className="h-1.5 w-1.5 rounded-full bg-[#8f8f8f] animate-pulse-slow"
                        style={{ animationDelay: `${d * 250}ms` }}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Composer — ChatGPT style */}
        <div className="px-4 pb-4 pt-1 sm:px-6">
          <form
            className="composer mx-auto flex max-w-3xl items-end gap-2 py-2 pl-5 pr-2"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={t({ en: "Ask anything about technology...", vi: "Hỏi bất cứ điều gì về công nghệ..." })}
              className="flex-1 bg-transparent py-2 text-[15px] outline-none placeholder:text-[#8f8f8f]"
            />
            <button
              type="button"
              aria-label="Voice Input"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full text-[#8f8f8f] transition-colors hover:bg-black/[0.06] hover:text-[#0d0d0d] dark:hover:bg-white/[0.08] dark:hover:text-white"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <rect x="9" y="3" width="6" height="11" rx="3" />
                <path d="M5 11a7 7 0 0 0 14 0M12 18v3" />
              </svg>
            </button>
            <button
              type="submit"
              disabled={!input.trim() || thinking}
              aria-label="Send"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-[#0d0d0d] text-white transition-opacity disabled:cursor-not-allowed disabled:opacity-25 dark:bg-white dark:text-[#0d0d0d]"
            >
              <ArrowUpIcon />
            </button>
          </form>
          <p className="mx-auto mt-2 max-w-3xl text-center text-[11px] text-[#8f8f8f]">
            {t({
              en: "SGS AI Hub can make mistakes. Check important info.",
              vi: "SGS AI Hub có thể mắc lỗi. Hãy kiểm tra thông tin quan trọng.",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
