import { Github, Linkedin, Mail, Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: Github, href: "#", label: "GitHub" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Mail, href: "mailto:your.email@example.com", label: "Email" },
  ];

  return (
    <footer className="py-12 border-t border-border/50 bg-background/30">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <div className="text-xl font-bold text-gradient mb-2">
              Full-Stack Developer
            </div>
            <p className="text-muted-foreground text-sm">
              Building the future, one line of code at a time.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                aria-label={social.label}
                className="p-2 rounded-lg bg-card/50 border border-border/50 hover:bg-card hover:border-primary/20 transition-all duration-300 hover:scale-110"
              >
                <social.icon className="h-5 w-5 text-muted-foreground hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-border/30 text-center">
          <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
            © {currentYear} Made with <Heart className="h-4 w-4 text-red-500" /> by a passionate developer
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;