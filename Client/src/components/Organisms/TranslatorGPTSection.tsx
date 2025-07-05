import { Bot } from "lucide-react";
import { Button } from "../ui/button";
import { useTranslation } from "react-i18next";

export default function TranslatorGPTSection() {
  const { t } = useTranslation();

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-block p-3 bg-primary/10 rounded-full mb-6">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          
          <h2 className="text-3xl font-bold mb-4">
            {t("translatorSection.title")}
          </h2>
          
          <p className="text-lg text-muted-foreground mb-8">
            {t("translatorSection.description")}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://chatgpt.com/g/g-6762d48afe2081918feb2bcbc9f89dc7-avatar-lore-translator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-6 rounded-md font-medium transition-colors"
            >
              <Bot className="h-5 w-5" />
              {t("translatorSection.tryButton")}
            </a>
            
            <Button
              variant="outline"
              className="h-11 px-6"
              onClick={() => window.open('https://chatgpt.com/g/g-6762d48afe2081918feb2bcbc9f89dc7-avatar-lore-translator', '_blank')}
            >
              {t("translatorSection.learnMoreButton")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
} 