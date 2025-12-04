import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Instagram, ArrowUp } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
];

const footerLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative border-t border-border bg-card/50">
      {/* Gradient Line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

      <div className="container mx-auto px-6 lg:px-12 py-16">
        <div className="grid md:grid-cols-3 gap-12 items-center">
          {/* Logo & Description */}
          <div>
            <motion.a
              href="#home"
              className="text-2xl font-serif font-bold text-gradient inline-block mb-4"
              whileHover={{ scale: 1.05 }}
            >
              Portfolio
            </motion.a>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Creating exceptional digital experiences through thoughtful design 
              and innovative development.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="flex justify-center md:justify-end gap-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-xl bg-secondary border border-border hover:border-primary/50 hover:bg-primary/10 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={18} className="text-muted-foreground hover:text-primary transition-colors" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Portfolio. All rights reserved.
          </p>

          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-3 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300"
            aria-label="Scroll to top"
          >
            <ArrowUp size={18} />
          </motion.button>
        </div>
      </div>
    </footer>
  );
};
