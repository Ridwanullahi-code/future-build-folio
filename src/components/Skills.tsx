const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend",
      skills: [
        { name: "React", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "JavaScript", level: 90 },
        { name: "CSS3", level: 85 },
        { name: "Tailwind CSS", level: 90 },
        { name: "HTML5", level: 95 },
      ]
    },
    {
      title: "Backend",
      skills: [
        { name: "Python", level: 85 },
        { name: "Node.js", level: 75 },
        { name: "Express.js", level: 70 },
        { name: "REST APIs", level: 80 },
        { name: "GraphQL", level: 65 },
      ]
    },
    {
      title: "Database & Tools",
      skills: [
        { name: "PostgreSQL", level: 80 },
        { name: "MongoDB", level: 75 },
        { name: "Git", level: 90 },
        { name: "GitHub", level: 90 },
      ]
    }
  ];

  const technologies = [
    "React", "TypeScript", "Python", "PostgreSQL", "MongoDB", 
    "Git", "GitHub", "Node.js", "Express.js", "Tailwind CSS",
    "REST APIs", "GraphQL"
  ];

  return (
    <section id="skills" className="py-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive set of modern technologies and frameworks that I use to build 
            robust, scalable, and user-friendly applications.
          </p>
        </div>

        {/* Technology Tags */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-secondary/50 border border-border/50 rounded-full text-sm font-medium hover:bg-secondary/70 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>

      
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div 
              key={index}
              className="p-6 rounded-xl bg-card/50 border border-border/50 card-hover"
            >
              <h3 className="text-xl font-semibold mb-6 text-primary">{category.title}</h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-secondary/30 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-primary to-accent h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;