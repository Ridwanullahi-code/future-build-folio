const About = () => {
  const stats = [
    { number: "2025", label: "FUTA Graduate" },
    { number: "350+", label: "Hours Coding" },
    { number: "10+", label: "Projects Built" },
    { number: "95%", label: "Client Satisfaction" },
  ];

  const services = [
    {
      title: "Frontend Development",
      description: "Building responsive and interactive user interfaces with React, TypeScript, and modern CSS frameworks.",
      icon: "🎨"
    },
    {
      title: "Backend Development", 
      description: "Creating robust server-side applications with Python, databases, and API development.",
      icon: "⚙️"
    },
    {
      title: "Full-Stack Solutions",
      description: "Delivering complete web applications from database design to user interface implementation.",
      icon: "🚀"
    }
  ];

  return (
    <section id="about" className="py-24 bg-background/50">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold">
                About <span className="text-gradient">Me</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                I'm a passionate Full-Stack Developer who recently graduated with a degree in 
                Information Technology from the Federal University of Technology, Akure (FUTA). 
                My journey in tech has been enriched by completing remote web development programs, 
                including Microverse, where I honed my collaborative coding skills.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                While I may be new to the professional world, I bring fresh perspectives, 
                modern development practices, and an eagerness to contribute to innovative projects. 
                My goal is to write maintainable, clean, and understandable code that makes 
                development enjoyable and efficient.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-primary">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Services */}
          <div className="space-y-6">
            {services.map((service, index) => (
              <div 
                key={index}
                className="p-6 rounded-xl bg-card/50 border border-border/50 card-hover"
              >
                <div className="flex items-start gap-4">
                  <div className="text-2xl">{service.icon}</div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;