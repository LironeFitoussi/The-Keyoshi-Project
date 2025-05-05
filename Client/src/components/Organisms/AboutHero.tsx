import React from "react";

interface AboutHeroProps {
  logo: string;
  title: string;
  tagline: string;
}

const AboutHero: React.FC<AboutHeroProps> = ({ logo, title, tagline }) => (
  <section className="relative flex flex-col items-center justify-center text-center py-16 md:py-24 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 overflow-hidden">
    <img src={logo} alt="Project Logo" className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary shadow-lg mb-6 z-10" />
    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
      {title}
    </h1>
    <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto z-10">
      {tagline}
    </p>
    {/* Decorative background shapes */}
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-200 rounded-full opacity-30 blur-2xl" />
      <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-pink-200 rounded-full opacity-30 blur-2xl" />
    </div>
  </section>
);

export default AboutHero; 