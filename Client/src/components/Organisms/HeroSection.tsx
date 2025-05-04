import React from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface HeroSectionProps {
  image: string;
  title: string;
  subtitle: string;
  githubUrl: string;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ image, title, subtitle, githubUrl }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.7 }}
    className="relative flex flex-col items-center gap-4 text-center"
  >
    <div className="w-full h-64 md:h-80 rounded-xl overflow-hidden relative mb-4">
      <img
        src={image}
        alt="Hero"
        className="object-cover w-full h-full opacity-90"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
    </div>
    <h1 className="text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text ">
      {title}
    </h1>
    <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
      {subtitle}
      <br />
    </p>
    <Button asChild size="lg" className="mt-4">
      <a href={githubUrl} target="_blank" rel="noopener noreferrer">
        ⭐ Star us on GitHub
      </a>
    </Button>
  </motion.section>
); 