import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/Atoms/Avatar';

interface TestimonialCardProps {
  avatar: string;
  quote: string;
  name: string;
  title: string;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ avatar, quote, name, title, className }) => (
  <Card className={`h-full flex flex-col items-center text-center p-6 ${className || ''}`}>
    <Avatar src={avatar} alt={name} className="w-16 h-16 mb-4" />
    <CardContent className="flex-1 flex flex-col gap-2">
      <p className="text-muted-foreground italic">"{quote}"</p>
      <div className="mt-4">
        <span className="font-semibold text-primary">{name}</span>
        <span className="block text-xs text-muted-foreground">{title}</span>
      </div>
    </CardContent>
  </Card>
); 