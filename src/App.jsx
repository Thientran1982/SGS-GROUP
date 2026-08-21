import { useEffect, useMemo, useState } from "react";
import { LangContext } from "./lang.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SectionRail from "./components/SectionRail.jsx";
import Home from "./sections/Home.jsx";
import Technology from "./sections/Technology.jsx";
import AIHub from "./sections/AIHub.jsx";
import AboutUs from "./sections/AboutUs.jsx";
import Contact from "./sections/Contact.jsx";

const VIEWS = {
  home: Home,
  tech: Technology,
  aihub: AIHub,
  about: AboutUs,
  contact: Contact,
};

const TITLES = {
  en: "SGS GROUP — Enterprise AI & Automation for Vietnam & Southeast Asia",
  vi: "SGS GROUP — AI Doanh Nghiệp & Tự Động Hóa cho Việt Nam & Đông Nam Á",
};

export default function App() {
  const [section, setSection] = useState(() => localStorage.getItem("sgs-section") || "home");
  const [lang, setLang] = useState(() => localStorage.getItem("sgs-lang") || "en");
  const [dark, setDark] = useState(() => (localStorage.getItem("sgs-theme-v2") || "light") === "dark");

  useEffect(() => {
    localStorage.setItem("sgs-section", section);
    window.scrollTo({ top: 0 });
  }, [section]);

  useEffect(() => {
    localStorage.setItem("sgs-lang", lang);
    document.documentElement.lang = lang;
    document.title = TITLES[lang];
  }, [lang]);

  useEffect(() => {
    localStorage.setItem("sgs-theme-v2", dark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  const ctx = useMemo(() => ({ lang, setLang }), [lang]);
  const Active = VIEWS[section] ?? Home;

  return (
    <LangContext.Provider value={ctx}>
      <div className="min-h-screen flex flex-col">
        <Header
          section={section}
          onNavigate={setSection}
          dark={dark}
          onToggleTheme={() => setDark((d) => !d)}
        />
        <main className="flex-1">
          <Active key={section} />
        </main>
        <Footer onNavigate={setSection} />
        <SectionRail section={section} onNavigate={setSection} />
      </div>
    </LangContext.Provider>
  );
}
