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
import { PrivacyPolicy, TermsAndConditions } from "./sections/LegalPages.jsx";

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
function TechForecast({ onNavigate }) {
  return <TechDetail module="forecast" onNavigate={onNavigate} />;
}

const VIEWS = {
  home: Home,
  tech: Technology,
  "tech-analytics": TechAnalytics,
  "tech-automation": TechAutomation,
  "tech-ai": TechAI,
  "tech-cloud": TechCloud,
  "tech-bigdata": TechBigData,
  "tech-forecast": TechForecast,
  privacy: PrivacyPolicy,
  terms: TermsAndConditions,
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
    "tech-forecast": "Demand Forecasting — SGS GROUP",
    privacy: "Privacy Policy — SGS GROUP",
    terms: "Terms & Conditions — SGS GROUP",
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
    "tech-forecast": "Dự báo nhu cầu — SGS GROUP",
    privacy: "Chính sách bảo mật — SGS GROUP",
    terms: "Điều khoản & Điều kiện — SGS GROUP",
    aihub: "AI Hub — SGS GROUP",
    about: "Về chúng tôi — SGS GROUP",
    contact: "Liên hệ — SGS GROUP",
  },
};

const LEGAL_PATHS = {
  privacy: "/privacy-policy",
  terms: "/terms-and-conditions",
};

function sectionFromPath(pathname) {
  return Object.entries(LEGAL_PATHS).find(([, path]) => path === pathname)?.[0] || null;
}

export default function App() {
  const [section, setSection] = useState(
    () => sectionFromPath(window.location.pathname) || localStorage.getItem("sgs-section") || "home",
  );
  const [lang, setLang] = useState(() => localStorage.getItem("sgs-lang") || "en");
  const [dark, setDark] = useState(() => (localStorage.getItem("sgs-theme-v2") || "light") === "dark");
  const isLegalPage = section === "privacy" || section === "terms";

  const navigate = (nextSection) => {
    const nextPath = LEGAL_PATHS[nextSection] || "/";
    if (window.location.pathname !== nextPath) {
      window.history.pushState({}, "", nextPath);
    }
    setSection(nextSection);
  };

  useEffect(() => {
    if (section !== "privacy" && section !== "terms") {
      localStorage.setItem("sgs-section", section);
    }
    window.scrollTo({ top: 0 });
  }, [section]);

  useEffect(() => {
    const handlePopState = () => {
      setSection(sectionFromPath(window.location.pathname) || localStorage.getItem("sgs-section") || "home");
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

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
        {!isLegalPage && (
          <Header
            section={section}
            onNavigate={navigate}
            dark={dark}
            onToggleTheme={() => setDark((d) => !d)}
          />
        )}
        <main className="flex-1">
          <Active onNavigate={navigate} key={section} />
        </main>
        {!isLegalPage && <Footer onNavigate={navigate} />}
        {!isLegalPage && <SectionRail section={section} onNavigate={navigate} />}
      </div>
    </LangContext.Provider>
  );
}
