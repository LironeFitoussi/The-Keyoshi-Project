import React from "react";

export interface TeamMember {
  avatar: string;
  name: string;
  role: string;
  bio: string;
}

interface TeamShowcaseProps {
  team: TeamMember[];
}

const TeamShowcase: React.FC<TeamShowcaseProps> = ({ team }) => (
  <section className="py-12">
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Meet the Team</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
      {team.map((member, idx) => (
        <div key={idx} className="flex flex-col items-center bg-white rounded-xl shadow p-6">
          <img src={member.avatar} alt={member.name} className="w-24 h-24 rounded-full border-2 border-primary mb-3" />
          <h3 className="font-semibold text-lg mb-1">{member.name}</h3>
          <span className="text-primary text-sm mb-2">{member.role}</span>
          <p className="text-sm text-muted-foreground text-center">{member.bio}</p>
        </div>
      ))}
    </div>
  </section>
);

export default TeamShowcase; 