import { useTranslation } from "react-i18next";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const handleLanguageChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  // log the current language
  // console.log(i18n.language);
  return (
    <Select onValueChange={handleLanguageChange} value={i18n.language}>
      <SelectTrigger>
        <SelectValue>{i18n.language === 'en' ? 'English' : 'Hebrew'}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="en">English</SelectItem>
        <SelectItem value="he">Hebrew</SelectItem>
      </SelectContent>
    </Select>
  );
}
