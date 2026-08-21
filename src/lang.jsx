import { createContext, useContext } from "react";

export const LangContext = createContext({ lang: "en", setLang: () => {} });

/** t({ en: "...", vi: "..." }) → string for the active language */
export const useT = () => {
  const { lang } = useContext(LangContext);
  return (o) => (o && typeof o === "object" ? o[lang] ?? o.en : o);
};

export const SECTIONS = [
  { id: "home", num: "01", name: { en: "Home", vi: "Trang chủ" } },
  { id: "tech", num: "02", name: { en: "Technology", vi: "Công nghệ" } },
  { id: "aihub", num: "03", name: { en: "AI Hub", vi: "AI Hub" } },
  { id: "about", num: "04", name: { en: "About Us", vi: "Về chúng tôi" } },
  { id: "contact", num: "05", name: { en: "Contact", vi: "Liên hệ" } },
];
