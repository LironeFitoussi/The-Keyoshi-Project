import React from "react";
import { useTranslation } from "react-i18next";

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

interface TimelineProps {
  milestones: Milestone[];
}

const Timeline: React.FC<TimelineProps> = ({ milestones }) => {
  const { t } = useTranslation();

  return (
    <section className="py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
        {t("aboutPage.timelineSection.title")}
      </h2>
      <div className="relative border-l-4 border-primary max-w-3xl mx-auto">
        {milestones.map((item, idx) => (
          <div key={idx} className="mb-10 ml-6">
            <div className="absolute w-4 h-4 bg-primary rounded-full -left-2.5 border-4 border-white"></div>
            <span className="text-primary font-bold text-lg">{item.year}</span>
            <h3 className="font-semibold text-xl mb-1">{item.title}</h3>
            <p className="text-muted-foreground text-base">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Timeline; 