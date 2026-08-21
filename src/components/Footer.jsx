import { useEffect, useState } from "react";
import { useT, SECTIONS } from "../lang.jsx";

const SOCIALS = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/sgsgroupvietnam",
    path: "M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z",
  },
  {
    label: "X",
    href: "https://x.com/sgsgroupvn",
    path: "M4 4l7.5 9.5L4.5 20h2.6l5.6-5.6L17 20h3l-7.7-9.8L19.4 4h-2.6l-5 5.1L7.5 4H4z",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/sgs-group-vietnam",
    path: "M6.5 8.5v11H3.2v-11h3.3ZM4.8 3.5a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8ZM20.8 13.6v5.9h-3.3v-5.4c0-1.4-.5-2.3-1.7-2.3-1 0-1.5.6-1.8 1.3-.1.2-.1.6-.1.9v5.5H10.6v-11H14v1.5c.4-.7 1.3-1.7 3.1-1.7 2.2 0 3.7 1.5 3.7 4.5Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/sgsgroupvn",
    path: "M12 2.2c3.2 0 3.6 0 4.9.1 3.3.1 4.8 1.7 4.9 4.9.1 1.3.1 1.6.1 4.8s0 3.6-.1 4.8c-.1 3.2-1.7 4.8-4.9 4.9-1.3.1-1.6.1-4.9.1s-3.6 0-4.8-.1c-3.3-.1-4.8-1.7-4.9-4.9-.1-1.3-.1-1.6-.1-4.8s0-3.6.1-4.8C2.4 4 4 2.4 7.2 2.3c1.2-.1 1.6-.1 4.8-.1Zm0 3.6a6.2 6.2 0 1 0 0 12.4 6.2 6.2 0 0 0 0-12.4Zm0 10.2a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.4-11.8a1.4 1.4 0 1 0 0 2.9 1.4 1.4 0 0 0 0-2.9Z",
  },
];

export default function Footer({ onNavigate }) {
  const t = useT();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [latency, setLatency] = useState(241);

  useEffect(() => {
    const id = setInterval(() => setLatency(180 + Math.floor(Math.random() * 220)), 3000);
    return () => clearInterval(id);
  }, []);

  return (
    <footer className="border-t border-black/10 dark:border-white/10">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <img src="/logo.svg" alt="" className="h-8 w-8 rounded-lg" />
            <span className="font-display text-lg font-semibold tracking-tight">SGS GROUP</span>
          </div>
          <div className="mono-label mt-2">Technology</div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-[#5d5d5d] dark:text-[#b4b4b4]">
            {t({
              en: "Trusted by 50+ businesses across Vietnam & Southeast Asia. Delivering measurable AI impact since 2020.",
              vi: "Được tin cậy bởi 50+ doanh nghiệp tại Việt Nam & Đông Nam Á. Mang lại tác động AI đo lường được từ 2020.",
            })}
          </p>
          <div className="mt-5 flex gap-2">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="grid h-9 w-9 place-items-center rounded-md border border-black/10 text-[#5d5d5d] transition-colors hover:border-primary-glow/60 hover:text-primary-glow dark:border-white/10 dark:text-[#8f8f8f]"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <nav aria-label="Footer navigation">
          <h4 className="text-sm font-semibold">
            {t({ en: "Navigation", vi: "Điều hướng" })}
          </h4>
          <ul className="mt-4 space-y-2.5">
            {SECTIONS.filter((s) => s.id !== "aihub").map((s) => (
              <li key={s.id}>
                <button
                  onClick={() => onNavigate(s.id)}
                  className="text-sm text-[#5d5d5d] transition-colors hover:text-primary-glow dark:text-[#8f8f8f]"
                >
                  {t(s.name)}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h4 className="text-sm font-semibold">{t({ en: "Legal", vi: "Pháp lý" })}</h4>
          <ul className="mt-4 space-y-2.5">
            <li>
              <button className="text-sm text-[#5d5d5d] transition-colors hover:text-primary-glow dark:text-[#8f8f8f]">
                {t({ en: "Privacy Policy", vi: "Chính sách bảo mật" })}
              </button>
            </li>
            <li>
              <button className="text-sm text-[#5d5d5d] transition-colors hover:text-primary-glow dark:text-[#8f8f8f]">
                {t({ en: "Terms & Conditions", vi: "Điều khoản & Điều kiện" })}
              </button>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-sm font-semibold">{t({ en: "Newsletter", vi: "Bản tin" })}</h4>
          <form
            className="mt-4 flex overflow-hidden rounded-md border border-black/10 focus-within:border-primary-glow/60 dark:border-white/15"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.trim()) setSubscribed(true);
            }}
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              aria-label="Email"
              className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-[#8f8f8f]"
            />
            <button
              type="submit"
              className="bg-primary/15 px-4 font-mono text-xs font-medium text-primary-glow transition-colors hover:bg-primary/25"
            >
              {t({ en: "Subscribe", vi: "Đăng ký" })}
            </button>
          </form>
          {subscribed && (
            <p className="mt-2 font-mono text-[11px] text-ok">✓ {t({ en: "Subscribed", vi: "Đã đăng ký" })}</p>
          )}
          <div className="mt-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-[#8f8f8f]">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <rect x="5" y="11" width="14" height="10" rx="2" />
              <path d="M8 11V7a4 4 0 0 1 8 0v4" />
            </svg>
            AES-256 {t({ en: "Encrypted", vi: "Mã hóa" })} · {t({ en: "Data transmission secured", vi: "Truyền dữ liệu an toàn" })}
          </div>
        </div>
      </div>

      <div className="border-t border-black/10 dark:border-white/10">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-4 sm:px-6 font-mono text-[11px] text-[#8f8f8f]">
          <span>© 2026 SGS GROUP. {t({ en: "All rights reserved.", vi: "Mọi quyền được bảo lưu." })}</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-ok animate-pulse-slow" />
            {t({ en: "System Operational", vi: "Hệ thống hoạt động" })} · {latency}ms
          </span>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="rounded border border-black/10 px-2.5 py-1 uppercase tracking-widest transition-colors hover:border-primary-glow/60 hover:text-primary-glow dark:border-white/15"
          >
            {t({ en: "Top", vi: "Lên đầu" })}
          </button>
        </div>
      </div>
    </footer>
  );
}
