import { useContext, useState } from "react";
import { useT, SECTIONS, LangContext } from "../lang.jsx";

export default function Header({ section, onNavigate, dark, onToggleTheme }) {
  const t = useT();
  const { lang, setLang } = useContext(LangContext);
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-black/10 bg-white/85 backdrop-blur-md dark:border-white/10 dark:bg-canvas/85">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-3 px-4 sm:px-6">
        <button
          onClick={() => onNavigate("home")}
          className="flex items-center gap-2.5"
          aria-label="SGS GROUP — Home"
        >
          <img src="/logo.svg" alt="" className="h-8 w-8 rounded-lg" />
          <span className="font-display text-lg font-semibold tracking-tight">SGS GROUP</span>
        </button>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {SECTIONS.map((s) => (
            <button
              key={s.id}
              onClick={() => onNavigate(s.id)}
              className={`rounded-full px-3.5 py-1.5 text-sm transition-colors ${
                section === s.id
                  ? "bg-black/[0.06] font-medium text-[#0d0d0d] dark:bg-white/10 dark:text-white"
                  : "text-[#5d5d5d] hover:bg-black/[0.05] hover:text-[#0d0d0d] dark:text-[#b4b4b4] dark:hover:bg-white/[0.07] dark:hover:text-white"
              }`}
            >
              {t(s.name)}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <div
            className="flex items-center rounded-full border border-black/10 p-0.5 font-mono text-[11px] dark:border-white/15"
            role="group"
            aria-label="Language"
          >
            {["en", "vi"].map((code) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
                  lang === code
                    ? "bg-black/[0.07] font-medium text-[#0d0d0d] dark:bg-white/10 dark:text-white"
                    : "text-[#8f8f8f] hover:text-[#0d0d0d] dark:text-[#8f8f8f] dark:hover:text-white"
                }`}
              >
                {code}
              </button>
            ))}
          </div>

          <button
            onClick={onToggleTheme}
            aria-label="Switch Theme"
            className="grid h-9 w-9 place-items-center rounded-full text-[#5d5d5d] transition-colors hover:bg-black/[0.06] hover:text-[#0d0d0d] dark:text-[#b4b4b4] dark:hover:bg-white/[0.08] dark:hover:text-white"
          >
            {dark ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
              </svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" />
              </svg>
            )}
          </button>

          <button
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-full text-[#5d5d5d] transition-colors hover:bg-black/[0.06] md:hidden dark:text-[#b4b4b4] dark:hover:bg-white/[0.08]"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-black/10 bg-white/95 px-4 py-3 backdrop-blur-md md:hidden dark:border-white/10 dark:bg-canvas/95" aria-label="Mobile">
          <div className="flex flex-col">
            {SECTIONS.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  onNavigate(s.id);
                  setOpen(false);
                }}
                className={`flex items-center justify-between rounded-md px-3 py-3 text-left text-sm ${
                  section === s.id ? "text-primary-glow" : "text-[#5d5d5d] dark:text-[#ececec]"
                }`}
              >
                <span>{t(s.name)}</span>
                <span className="font-mono text-[11px] text-[#8f8f8f]">{s.num}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
