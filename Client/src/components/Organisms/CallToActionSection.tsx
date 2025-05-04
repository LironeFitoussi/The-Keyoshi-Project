import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface CallToActionSectionProps {
  title: string;
  buttonText: string;
  githubUrl: string;
  subtitle?: string;
  className?: string;
}

export const CallToActionSection: React.FC<CallToActionSectionProps> = ({ title, buttonText, githubUrl, subtitle, className }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.4 }}
    className={`flex flex-col items-center gap-4 mt-8 ${className || ''}`}
  >
    <h3 className="text-xl font-semibold">{title}</h3>
    <Button asChild size="lg">
      <a href={githubUrl} target="_blank" rel="noopener noreferrer">
        {buttonText}
      </a>
    </Button>
    {subtitle && <span className="text-muted-foreground text-sm">{subtitle}</span>}
  </motion.section>
); 