import { GraduationCap, Users, Code, Award } from "lucide-react";

const Education = () => {
  const education = [
    {
      institution: "Federal University of Technology, Akure (FUTA)",
      degree: "Bachelor of Technology - Information Technology",
      period: "2025 Graduate",
      type: "University Degree",
      icon: GraduationCap,
      highlights: [
        "Software Engineering Fundamentals",
        "Database Management Systems", 
        "Data Structures & Algorithms",
        "Computer Networks & Security",
        "AI & Machine Learning"
      ],
      achievement: "Secong Class Upper"
    },
    {
      institution: "Microverse",
      degree: "Full-Stack Web Development Program",
      period: "Remote Program",
      type: "Professional Training",
      icon: Code,
      highlights: [
        "Collaborative Remote Development",
        "React & JavaScript Mastery",
        "Backend Development with Python",
        "Agile Development Practices"
      ],
      achievement: "100+ Hours Pair Programming"
    }
  ];

  return (
    <section id="education" className="py-24 bg-card/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Educational <span className="text-gradient">Background</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Strong academic foundation combined with hands-on professional training
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {education.map((edu, index) => (
            <div
              key={index}
              className="group p-8 rounded-2xl bg-card/50 border border-border/50 card-hover"
            >
              <div className="flex flex-col lg:flex-row lg:items-start gap-6">
                {/* Icon & Type */}
                <div className="flex items-center gap-4 lg:flex-col lg:items-center lg:text-center lg:min-w-[120px]">
                  <div className="p-3 rounded-xl bg-primary/10 text-primary">
                    <edu.icon size={32} />
                  </div>
                  <span className="text-sm font-medium text-primary">{edu.type}</span>
                </div>

                {/* Content */}
                <div className="flex-1 space-y-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{edu.degree}</h3>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <p className="text-muted-foreground font-medium">{edu.institution}</p>
                      <span className="text-sm bg-accent/10 text-accent px-3 py-1 rounded-full w-fit">
                        {edu.period}
                      </span>
                    </div>
                  </div>

                  {/* Key Highlights */}
                  <div className="grid sm:grid-cols-2 gap-2">
                    {edu.highlights.map((highlight, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                        <span className="text-sm text-muted-foreground">{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* Achievement */}
                  <div className="flex items-center gap-2 pt-2">
                    <Award size={16} className="text-accent" />
                    <span className="text-sm font-medium text-accent">{edu.achievement}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Credentials */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-muted/50 text-sm">
            <Users size={16} className="text-primary" />
            <span>Collaborative Development Experience • Remote Work Ready • Continuous Learner</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;