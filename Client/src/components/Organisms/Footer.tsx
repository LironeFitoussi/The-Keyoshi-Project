import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const { t, i18n } = useTranslation();
  const isHebrew = i18n.language === "he";

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.books"), href: "/books" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.contact"), href: "/contact" },
    { name: t("nav.api"), href: "/api" },
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/your-repo",
      icon: Github,
    },
    {
      name: "Twitter",
      href: "https://twitter.com/your-handle",
      icon: Twitter,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/your-profile",
      icon: Linkedin,
    },
    {
      name: "Email",
      href: "mailto:contact@example.com",
      icon: Mail,
    },
  ];

  return (
    <footer className="bg-background border-t h-[100px]" dir={isHebrew ? "rtl" : "ltr"}>
      <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <nav className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2" aria-label="Footer">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex justify-center gap-3 mt-4 sm:mt-0">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="text-muted-foreground hover:text-primary h-8 w-8"
                >
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                  >
                    <Icon className="size-4" />
                  </a>
                </Button>
              );
            })}
          </div>
        </div>
        <p className="mt-4 text-center sm:text-start text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} The Keyoshi Project. {t("footer.rights")}
        </p>
      </div>
    </footer>
  );
}
