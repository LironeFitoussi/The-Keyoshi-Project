import { useLoaderData } from 'react-router-dom';
import { HeroSection } from '@/components/Organisms/HeroSection';
import { AboutSection } from '@/components/Organisms/AboutSection';
import { FeaturesSection } from '@/components/Organisms/FeaturesSection';
import { TestimonialsSection } from '@/components/Organisms/TestimonialsSection';
import { CallToActionSection } from '@/components/Organisms/CallToActionSection';

const testimonials = [
  {
    name: 'Jane Doe',
    title: 'Product Manager',
    quote: 'This project is a gift to the Avatar community! The Hebrew translations are top-notch.',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    name: 'John Smith',
    title: 'Lead Developer',
    quote: 'Open source, open story. I love contributing to something meaningful.',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    name: 'Emily Chen',
    title: 'Translator',
    quote: 'Translating the Avatar chronicles to Hebrew is a dream come true!',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

const features = [
  {
    title: 'Open Source',
    desc: 'All translations and code are public and free to use.',
    icon: '🌐',
  },
  {
    title: 'Community Driven',
    desc: 'Collaborate with fans and linguists worldwide.',
    icon: '🤝',
  },
  {
    title: 'Faithful Translations',
    desc: 'Preserving the spirit and nuance of the original stories.',
    icon: '📖',
  },
  {
    title: 'For Fans, By Fans',
    desc: 'A project built by Avatar fans for the Hebrew-speaking community.',
    icon: '🔥',
  },
];

export default function Home() {
  const data = useLoaderData() as { message: string };
  return (
    <div className="flex flex-col gap-16 py-8 px-4 max-w-5xl mx-auto">
      <HeroSection
        image="https://c4.wallpaperflare.com/wallpaper/870/204/59/avatar-the-last-airbender-avatar-the-last-air-bender-wallpaper-preview.jpg"
        title="The Keyoshi Project"
        subtitle="Open Source. Open Story. Bringing Avatar: The Last Airbender chronicles to Hebrew speakers."
        message={data.message}
        githubUrl="https://github.com/your-org/your-repo"
      />
      <AboutSection
        avatar="https://wallpapercave.com/wp/wp7916843.jpg"
        aboutText={<><b>The Keyoshi Project</b> is an open-source initiative dedicated to translating the Avatar: The Last Airbender chronicles into Hebrew. Our goal is to make these beloved stories accessible to Hebrew speakers everywhere, powered by community collaboration and a love for the Avatar universe.</>}
      />
      <FeaturesSection features={features} />
      <TestimonialsSection testimonials={testimonials} />
      <CallToActionSection
        title="Ready to join the journey?"
        buttonText="Contribute on GitHub"
        githubUrl="https://github.com/your-org/your-repo"
        subtitle="Star us and help bring the Avatar stories to more fans!"
      />
    </div>
  );
}
