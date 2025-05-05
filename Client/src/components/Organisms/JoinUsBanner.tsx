import React from "react";

interface JoinUsBannerProps {
  message: string;
  buttonText: string;
  buttonUrl: string;
}

const JoinUsBanner: React.FC<JoinUsBannerProps> = ({ message, buttonText, buttonUrl }) => (
  <section className="py-12 flex flex-col items-center bg-gradient-to-r from-primary to-accent rounded-xl shadow-lg mt-12">
    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 text-center">{message}</h2>
    <a
      href={buttonUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="px-8 py-3 bg-white text-primary font-semibold rounded-full shadow hover:bg-gray-100 transition"
    >
      {buttonText}
    </a>
  </section>
);

export default JoinUsBanner; 