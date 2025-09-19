import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download } from "lucide-react";
import developerPortrait from "@/assets/image.jpg";

const Hero = () => {
  const socialLinks = [
    { icon: Github, href: "https://github.com/Ridwanullahi-code", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/ajayi-ridwan/", label: "LinkedIn" },
    { icon: Mail, href: "mailto:ridwanullahiajayi01@gmail.com", label: "Email" },
  ];

  const downloadResume = () => {
    const link = document.createElement('a');
    link.href = '/JAYI_RIDWAN_RESUME.pdf';
    link.download = 'AJAYI_RIDWAN_RESUME.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center pt-20 pb-16"
    >
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <p className="text-primary font-medium text-lg">Hello, I'm</p>
              <h1 className="text-5xl lg:text-7xl font-bold leading-tight">
                Full-stack
                <span className="text-gradient block">Developer</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Recent IT graduate from FUTA with expertise in React, TypeScript, Python, 
                and databases. Passionate about creating maintainable, clean code and 
                innovative web solutions.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="lg">
                View Projects
              </Button>
              <Button variant="outline" size="lg" onClick={downloadResume}>
                <Download className="mr-2 h-4 w-4" />
                Download CV
              </Button>
            </div>

            <div className="flex gap-4">
              {socialLinks.map((social, index) => (
                <Button
                  key={index}
                  variant="glass"
                  size="icon"
                  asChild
                >
                  <a
                    href={social.href}
                    aria-label={social.label}
                    className="hover:text-primary transition-colors"
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Right Content - Profile Image */}
          <div className="relative lg:justify-self-end animate-float">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl"></div>
              <div className="relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/20 bg-gradient-to-tr from-primary/10 to-accent/10">
                <img
                  src={developerPortrait}
                  alt="Full-Stack Developer Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;