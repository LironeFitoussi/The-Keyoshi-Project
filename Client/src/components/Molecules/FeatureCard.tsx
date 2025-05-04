import React from 'react';
import { Card, CardTitle, CardDescription } from '@/components/ui/card';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  desc: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, desc, className }) => (
  <Card className={`flex flex-col items-center text-center p-6 hover:shadow-lg transition-shadow ${className || ''}`}>
    <div className="text-4xl mb-2">{icon}</div>
    <CardTitle className="mb-1">{title}</CardTitle>
    <CardDescription>{desc}</CardDescription>
  </Card>
); 