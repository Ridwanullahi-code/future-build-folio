import { Button } from "@/components/ui/button";
import { ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react";
import project1 from "@/assets/plumbing-website.png";
import project2 from "@/assets/circle-thrift.png";
import project3 from "@/assets/career-recommender.png";
import project4 from "@/assets/portfolio.png";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

const Projects = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: "start",
    skipSnaps: false,
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description: "A full-stack e-commerce solution built with React, TypeScript, and Python. Features include user authentication, product catalog, shopping cart, and payment integration.",
      image: project1,
      technologies: ["React", "TypeScript", "Python", "PostgreSQL", "Stripe"],
      liveUrl: "https://www.kasbass.com/",
      githubUrl: "https://github.com/Ridwanullahi-code/plumbing-website",
      featured: true
    },
    {
      id: 2,
      title: "Task Management App",
      description: "A collaborative task management application with real-time updates, team collaboration features, and advanced filtering options.",
      image: project2,
      technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
      liveUrl: "https://circle-thrift.netlify.app/",
      githubUrl: "https://github.com/Ridwanullahi-code/circle-flow-thrift",
      featured: false
    },
    {
      id: 3,
      title: "Weather Dashboard",
      description: "A responsive weather application that provides current conditions, forecasts, and weather maps using modern APIs and clean UI design.",
      image: project3,
      technologies: ["React", "TypeScript", "Supabase", "Python"],
      liveUrl: "https://studentpath.netlify.app/",
      githubUrl: "https://github.com/Ridwanullahi-code/student-success-mentor",
      featured: false
    },
    {
      id: 4,
      title: "Portfolio Website",
      description: "A modern, responsive portfolio website showcasing my projects and skills, built with React and featuring smooth animations.",
      image: project4,
      technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      liveUrl: "https://ridwan-ajayi.netlify.app/",
      githubUrl: "https://github.com/Ridwanullahi-code/professional-portfolio",
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
                    <span key={index} className="px-3 py-1 bg-secondary text-sm rounded-md">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <Button variant="hero" onClick={() => window.open(featuredProject.liveUrl, '_blank')}>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Live Demo
                  </Button>
                  <Button variant="outline" onClick={() => window.open(featuredProject.githubUrl, '_blank')}>
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

        {/* Projects Carousel */}
        <div className="relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">Other Projects</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" onClick={scrollPrev} className="h-10 w-10">
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon" onClick={scrollNext} className="h-10 w-10">
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="embla overflow-hidden" ref={emblaRef}>
            <div className="embla__container flex">
              {otherProjects.map((project) => (
                <div
                  key={project.id}
                  className="embla__slide flex-[0_0_100%] min-w-0 md:flex-[0_0_50%] lg:flex-[0_0_33.333%] pl-4"
                >
                  <div className="group p-6 rounded-xl bg-card/50 border border-border/50 card-hover h-full">
                    <div className="relative mb-4 overflow-hidden rounded-lg">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                        <Button size="sm" variant="glass" onClick={() => window.open(project.liveUrl, '_blank')}>
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="glass" onClick={() => window.open(project.githubUrl, '_blank')}>
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
                        <span key={index} className="px-2 py-1 bg-secondary/50 text-xs rounded">
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
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg" onClick={() => window.open('https://github.com/Ridwanullahi-code', '_blank')}>
            <Github className="mr-2 h-4 w-4" />
            View All Projects on GitHub
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Projects;
