import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export default function Contact() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically handle the form submission
    // For now, we'll just show a success message
    toast.success(t("contactPage.form.success"));
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Contact Information Card */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-bold">{t("contactPage.title")}</CardTitle>
            <CardDescription>
              {t("contactPage.description")}
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="p-2">
                  📍
                </Badge>
                <div>
                  <h3 className="font-semibold">{t("contactPage.info.location.label")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("contactPage.info.location.value")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="p-2">
                  📧
                </Badge>
                <div>
                  <h3 className="font-semibold">{t("contactPage.info.email.label")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("contactPage.info.email.value")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <Badge variant="outline" className="p-2">
                  📱
                </Badge>
                <div>
                  <h3 className="font-semibold">{t("contactPage.info.phone.label")}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t("contactPage.info.phone.value")}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact Form Card */}
        <Card>
          <CardHeader>
            <CardTitle>{t("contactPage.form.title")}</CardTitle>
            <CardDescription>
              {t("contactPage.form.description")}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="name">{t("contactPage.form.fields.name.label")}</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder={t("contactPage.form.fields.name.placeholder")}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">{t("contactPage.form.fields.email.label")}</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t("contactPage.form.fields.email.placeholder")}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject">{t("contactPage.form.fields.subject.label")}</Label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder={t("contactPage.form.fields.subject.placeholder")}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">{t("contactPage.form.fields.message.label")}</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={t("contactPage.form.fields.message.placeholder")}
                  value={formData.message}
                  onChange={handleChange}
                  className="min-h-[150px]"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                {t("contactPage.form.submit")}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 