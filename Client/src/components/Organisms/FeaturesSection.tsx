import React from 'react';
import { FeatureCard } from '@/components/Molecules/FeatureCard';
import { motion } from 'framer-motion';
import { t } from 'i18next';

interface Feature {
  icon: string;
}

interface FeaturesSectionProps {
  features: Feature[];
  className?: string;
}

export const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features, className }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.2 }}
    className={`grid md:grid-cols-4 gap-6 ${className || ''}`}
  >
    {features.map((f, idx) => (
      <FeatureCard key={f.icon} icon={f.icon} title={t(`home.features.feature${idx+1}.title`)} desc={t(`home.features.feature${idx+1}.description`)} />
    ))}
  </motion.section>
); 