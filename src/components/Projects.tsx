import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import projectShowcase from "@/assets/project-showcase.jpg";
import backendProject from "@/assets/backend-project.jpg";

const Projects = () => {
  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with React, TypeScript, and Python. Features include user authentication, product catalog, shopping cart, and payment integration.",
      image: projectShowcase,
      technologies: ["React", "TypeScript", "Python", "PostgreSQL", "Stripe"],
      liveUrl: "#",
      githubUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and advanced filtering options.",
      image: backendProject,
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather application that provides current conditions, forecasts, and weather maps using modern APIs and clean UI design.",
      image: projectShowcase,
      technologies: ["React", "TypeScript", "Weather API", "Tailwind CSS"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website showcasing my projects and skills, built with React and featuring smooth animations.",
      image: backendProject,
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      liveUrl: "#",
      githubUrl: "#",
      featured: false
    }
  ];

  const featuredProject = projects.find(p => p.featured);
  const otherProjects = projects.filter(p => !p.featured);

  return (
    <section id="projects" className="py-24 bg-background/50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A collection of projects that demonstrate my skills in full-stack development,
            showcasing everything from frontend interfaces to backend architecture.
          </p>
        </div>

        {/* Featured Project */}
        {featuredProject && (
          <div className="mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center p-8 rounded-2xl bg-card/50 border border-border/50 card-hover">
              <div className="space-y-6">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  Featured Project
                </div>
                <h3 className="text-3xl font-bold">{featuredProject.title}</h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {featuredProject.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {featuredProject.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-secondary text-sm rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button variant="hero">
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
                  <Button variant="outline">
                    <Github className="mr-2 h-4 w-4" />
                    Source Code
                  </Button>
                </div>
              </div>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-xl blur-xl"></div>
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="relative w-full h-64 lg:h-80 object-cover rounded-xl border border-border/50"
                />
              </div>
            </div>
          </div>
        )}

        {/* Other Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {otherProjects.map((project) => (
            <div
              key={project.id}
              className="group p-6 rounded-xl bg-card/50 border border-border/50 card-hover"
            >
              <div className="relative mb-4 overflow-hidden rounded-lg">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                  <Button size="sm" variant="glass">
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="glass">
                    <Github className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-1">
                {project.technologies.slice(0, 3).map((tech, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-secondary/50 text-xs rounded"
                  >
                    {tech}
                  </span>
                ))}
                {project.technologies.length > 3 && (
                  <span className="px-2 py-1 bg-secondary/50 text-xs rounded">
                    +{project.technologies.length - 3}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            <Github className="mr-2 h-4 w-4" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
