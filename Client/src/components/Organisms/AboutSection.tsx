import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/Atoms/Avatar';
import { motion } from 'framer-motion';

interface AboutSectionProps {
  avatar: string;
  aboutText: React.ReactNode;
  className?: string;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ avatar, aboutText, className }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.1 }}
    className={`flex flex-col md:flex-row items-center gap-8 ${className || ''}`}
  >
    <div className="flex-shrink-0">
      <Avatar src={avatar} alt="Project Avatar" className="w-32 h-32 md:w-40 md:h-40 border-4" />
    </div>
    <Card className="flex-1 p-6">
      <CardHeader>
        <CardTitle>About the Project</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground text-base">{aboutText}</p>
      </CardContent>
    </Card>
  </motion.section>
); 