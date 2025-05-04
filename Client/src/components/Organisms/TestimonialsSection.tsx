import React from 'react';
import { TestimonialCard } from '@/components/Molecules/TestimonialCard';
import { motion } from 'framer-motion';

interface Testimonial {
  avatar: string;
  quote: string;
  name: string;
  title: string;
}

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  className?: string;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials, className }) => (
  <motion.section
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay: 0.3 }}
    className={`flex flex-col items-center gap-8 relative ${className || ''}`}
  >
    <h2 className="text-2xl md:text-3xl font-semibold mb-2">What our users say</h2>
    <div className="grid md:grid-cols-3 gap-6 w-full">
      {testimonials.map((t) => (
        <TestimonialCard key={t.name} {...t} />
      ))}
    </div>
  </motion.section>
); 