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
import TechDetail from "./sections/TechDetail.jsx";

function TechAnalytics({ onNavigate }) {
  return <TechDetail module="analytics" onNavigate={onNavigate} />;
}
function TechAutomation({ onNavigate }) {
  return <TechDetail module="automation" onNavigate={onNavigate} />;
}
function TechAI({ onNavigate }) {
  return <TechDetail module="ai" onNavigate={onNavigate} />;
}
function TechCloud({ onNavigate }) {
  return <TechDetail module="cloud" onNavigate={onNavigate} />;
}
function TechBigData({ onNavigate }) {
  return <TechDetail module="bigdata" onNavigate={onNavigate} />;
}

const VIEWS = {
  home: Home,
  tech: Technology,
  "tech-analytics": TechAnalytics,
  "tech-automation": TechAutomation,
  "tech-ai": TechAI,
  "tech-cloud": TechCloud,
  "tech-bigdata": TechBigData,
  aihub: AIHub,
  about: AboutUs,
  contact: Contact,
};

const TITLES = {
  en: {
    home: "SGS GROUP — Enterprise AI & Automation for Vietnam & Southeast Asia",
    tech: "Technologies — SGS GROUP",
    "tech-analytics": "Data Analytics — SGS GROUP",
    "tech-automation": "Automation — SGS GROUP",
    "tech-ai": "AI Technology — SGS GROUP",
    "tech-cloud": "Cloud Computing — SGS GROUP",
    "tech-bigdata": "Big Data Processing — SGS GROUP",
    aihub: "AI Hub — SGS GROUP",
    about: "About Us — SGS GROUP",
    contact: "Contact — SGS GROUP",
  },
  vi: {
    home: "SGS GROUP — AI Doanh Nghiệp & Tự Động Hóa cho Việt Nam & Đông Nam Á",
    tech: "Công nghệ — SGS GROUP",
    "tech-analytics": "Phân tích Dữ liệu — SGS GROUP",
    "tech-automation": "Tự động hóa — SGS GROUP",
    "tech-ai": "Công nghệ AI — SGS GROUP",
    "tech-cloud": "Điện toán đám mây — SGS GROUP",
    "tech-bigdata": "Xử lý Big Data — SGS GROUP",
    aihub: "AI Hub — SGS GROUP",
    about: "Về chúng tôi — SGS GROUP",
    contact: "Liên hệ — SGS GROUP",
  },
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
    document.title = (TITLES[lang] && TITLES[lang][section]) || TITLES[lang].home;
  }, [lang, section]);

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
          <Active onNavigate={setSection} key={section} />
        </main>
        <Footer onNavigate={setSection} />
        <SectionRail section={section} onNavigate={setSection} />
      </div>
    </LangContext.Provider>
  );
}
