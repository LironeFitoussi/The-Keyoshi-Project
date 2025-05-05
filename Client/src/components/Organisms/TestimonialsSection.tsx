import React from 'react';
import { TestimonialCard } from '@/components/Molecules/TestimonialCard';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Placeholder avatar image (can be replaced with real images if available)
const AVATAR_PLACEHOLDERS = [
  "https://randomuser.me/api/portraits/women/44.jpg",
  "https://randomuser.me/api/portraits/men/32.jpg",
  "https://randomuser.me/api/portraits/women/68.jpg"
]


export const TestimonialsSection: React.FC = () => {
  const { t } = useTranslation();

  // Dynamically generate testimonials array based on AVATAR_PLACEHOLDERS length
  const testimonials = AVATAR_PLACEHOLDERS.map((avatar, idx) => {
    const num = idx + 1;
    return {
      avatar,
      name: t(`home.testimonials.testimonial${num}.name`),
      quote: t(`home.testimonials.testimonial${num}.quote`),
      title: t(`home.testimonials.testimonial${num}.role`),
    };
  });

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: 0.3 }}
      className="flex flex-col items-center gap-8 relative"
    >
      <h2 className="text-2xl md:text-3xl font-semibold mb-2">{t('home.testimonials.title')}</h2>
      <div className="grid md:grid-cols-3 gap-6 w-full">
        {testimonials.map((testimonial, idx) => (
          <TestimonialCard key={testimonial.name + idx} {...testimonial} />
        ))}
      </div>
    </motion.section>
  );
}; 