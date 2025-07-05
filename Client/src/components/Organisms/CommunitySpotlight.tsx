import React from "react";
import { useTranslation } from "react-i18next";

export interface Highlight {
  image: string;
  title: string;
  description: string;
}

interface CommunitySpotlightProps {
  highlights: Highlight[];
}

const CommunitySpotlight: React.FC<CommunitySpotlightProps> = ({ highlights }) => {
  const { t } = useTranslation();

  return (
    <section className="py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        {t("aboutPage.communitySection.title")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
        {highlights.map((item, idx) => (
          <div key={idx} className="flex flex-col items-center bg-white rounded-xl shadow p-6">
            <img 
              src={item.image} 
              alt={t("aboutPage.communitySection.highlightImageAlt", { title: item.title })} 
              className="w-full h-40 object-cover rounded-lg mb-3" 
            />
            <h3 className="font-semibold text-lg mb-1 text-center">{item.title}</h3>
            <p className="text-sm text-muted-foreground text-center">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default CommunitySpotlight; 