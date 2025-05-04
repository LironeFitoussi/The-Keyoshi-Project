import React from 'react';

interface AvatarProps {
  src: string;
  alt?: string;
  className?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ src, alt, className }) => (
  <img
    src={src}
    alt={alt || 'Avatar'}
    className={`rounded-full border-2 border-accent object-cover shadow ${className || ''}`}
  />
); 