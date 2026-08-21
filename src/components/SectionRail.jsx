import { useT, SECTIONS } from "../lang.jsx";

export default function SectionRail({ section, onNavigate }) {
  const t = useT();
  return (
    <nav
      aria-label="Sections"
      className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-2 lg:flex"
    >
      {SECTIONS.map((s) => {
        const active = section === s.id;
        return (
          <button
            key={s.id}
            onClick={() => onNavigate(s.id)}
            aria-current={active}
            className={`group flex items-center justify-end gap-2 rounded-md px-2 py-1 font-mono text-[11px] transition-colors ${
              active
                ? "text-primary-glow"
                : "text-[#8f8f8f] hover:text-[#0d0d0d] dark:text-[#5d5d5d] dark:hover:text-[#cdcdcd]"
            }`}
          >
            <span className={`hidden translate-x-2 opacity-0 transition-all group-hover:translate-x-0 group-hover:opacity-100 xl:inline`}>
              {t(s.name)}
            </span>
            <span
              className={`grid h-8 w-8 place-items-center rounded-md border transition-colors ${
                active
                  ? "border-primary-glow/60 bg-primary/10"
                  : "border-black/10 group-hover:border-primary-glow/40 dark:border-white/10"
              }`}
            >
              {s.num}
            </span>
          </button>
        );
      })}
    </nav>
  );
}
