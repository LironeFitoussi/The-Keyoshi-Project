import { AboutSection } from "@/components/Organisms/AboutSection";
import { useTranslation } from "react-i18next";

export default function About() {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-16 py-8 px-4 max-w-5xl mx-auto">
      <h1>{t("about")}</h1>
      <AboutSection
        avatar="https://wallpapercave.com/wp/wp7916843.jpg"
        aboutText={
          <>
            <b>{t("home.about.title")}</b> {t("home.about.content")}
          </>
        }
      />
    </div>
  );
}
  