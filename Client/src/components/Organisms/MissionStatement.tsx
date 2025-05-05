import React from "react";

export interface Value {
  icon: string;
  title: string;
  description: string;
}

interface MissionStatementProps {
  mission: string;
  vision: string;
  values: Value[];
}

const MissionStatement: React.FC<MissionStatementProps> = ({ mission, vision, values }) => (
  <section className="flex flex-col gap-10 items-center py-12">
    <div className="max-w-2xl text-center">
      <h2 className="text-2xl md:text-3xl font-bold mb-2">Our Mission</h2>
      <p className="text-lg text-muted-foreground mb-4">{mission}</p>
      <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
      <p className="text-base text-muted-foreground">{vision}</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8 w-full max-w-4xl">
      {values.map((value, idx) => (
        <div key={idx} className="flex flex-col items-center bg-white rounded-xl shadow p-6">
          <span className="text-4xl mb-2">{value.icon}</span>
          <h4 className="font-semibold text-lg mb-1">{value.title}</h4>
          <p className="text-sm text-muted-foreground text-center">{value.description}</p>
        </div>
      ))}
    </div>
  </section>
);

export default MissionStatement; 