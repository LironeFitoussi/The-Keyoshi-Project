import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";
import Flag from "react-world-flags";
import styles from "./LanguageSwitcher.module.css";

const LANGUAGES = {
  en: {
    nativeName: "English",
    countryCode: "US",
    dir: "ltr"
  },
  he: {
    nativeName: "עברית",
    countryCode: "IL",
    dir: "rtl"
  }
} as const;

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();
  
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newLang = e.target.value as keyof typeof LANGUAGES;
    document.documentElement.dir = LANGUAGES[newLang].dir;
    i18n.changeLanguage(newLang);
  };

  // Ensure correct document direction on mount
  useEffect(() => {
    const currentLang = i18n.language as keyof typeof LANGUAGES;
    document.documentElement.dir = LANGUAGES[currentLang]?.dir || "ltr";
  }, [i18n.language]);

  const currentLang = i18n.language as keyof typeof LANGUAGES;
  const currentCountry = LANGUAGES[currentLang]?.countryCode;

  return (
    <div className={styles.container}>
      <div className={styles.flagButton}>
        <Flag 
          code={currentCountry} 
          height={16}
          className={styles.flag}
        />
        <select
          value={i18n.language}
          onChange={handleChange}
          className={styles.select}
        >
          {Object.entries(LANGUAGES).map(([code, { nativeName, countryCode }]) => (
            <option key={code} value={code} className={styles.option}>
              <Flag code={countryCode} height={12} /> {nativeName}
            </option>
          ))}
        </select>
        <ChevronDown className={styles.chevron} />
      </div>
    </div>
  );
}
