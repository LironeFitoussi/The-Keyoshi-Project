import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Bot } from "lucide-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function TranslatorGPTButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <>
      <Button
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-shadow"
        onClick={() => setIsOpen(true)}
        aria-label={t("translator.button.aria")}
      >
        <Bot className="h-6 w-6" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t("translator.title")}</DialogTitle>
            <DialogDescription>
              {t("translator.description")}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">
              {t("translator.details")}
            </p>
            
            <a
              href="https://chatgpt.com/g/g-6762d48afe2081918feb2bcbc9f89dc7-avatar-lore-translator"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-10 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            >
              {t("translator.openButton")}
            </a>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 