import { HeroSection } from "@/components/Organisms/HeroSection";
import { AboutSection } from "@/components/Organisms/AboutSection";
import { FeaturesSection } from "@/components/Organisms/FeaturesSection";
import { TestimonialsSection } from "@/components/Organisms/TestimonialsSection";
import { CallToActionSection } from "@/components/Organisms/CallToActionSection";
import { useTranslation } from "react-i18next";

const features = [
  { icon: "🌐" },
  { icon: "🤝" },
  { icon: "📖" },
  { icon: "🔥" },
];

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-16 py-8 px-4 max-w-5xl mx-auto">
      <h1>{t("welcome")}</h1>

      <HeroSection
        image="https://c4.wallpaperflare.com/wallpaper/870/204/59/avatar-the-last-airbender-avatar-the-last-air-bender-wallpaper-preview.jpg"
        title={t("home.hero.title")}
        subtitle={t("home.hero.subtitle")}
        githubUrl="https://github.com/your-org/your-repo"
      />
      <AboutSection
        avatar="https://wallpapercave.com/wp/wp7916843.jpg"
        aboutText={
          <>
            <b>{t("home.about.title")}</b> {t("home.about.content")}
          </>
        }
      />
      <FeaturesSection features={features} />
      <TestimonialsSection />
      <CallToActionSection
        title={t("home.callToAction.title")}
        buttonText={t("home.callToAction.buttonText")}
        githubUrl="https://github.com/your-org/your-repo"
        subtitle={t("home.callToAction.subtitle")}
      />
    </div>
  );
}
