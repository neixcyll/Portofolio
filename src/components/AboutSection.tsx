import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Briefcase, Coffee, Users } from "lucide-react";

const stats = [
  { icon: Briefcase, value: "50+", label: "Projects Completed" },
  { icon: Users, value: "30+", label: "Happy Clients" },
  { icon: Award, value: "5+", label: "Years Experience" },
  { icon: Coffee, value: "∞", label: "Cups of Coffee" },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/5 to-transparent" />
      
      <div className="container mx-auto px-6 lg:px-12">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Image/Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border-gradient">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary to-background" />
              {/* Decorative Elements */}
              <motion.div
                className="absolute top-8 left-8 w-20 h-20 border border-primary/30 rounded-lg"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute bottom-8 right-8 w-32 h-32 border border-primary/20 rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              {/* Profile Image Placeholder */}
              <div className="absolute inset-8 flex items-center justify-center">
                <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : {}}
                transition={{ delay: 0.3, type: "spring" }}
                className="w-40 h-40 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center"
              >
                <span className="text-6xl font-bold text-gradient">A</span>
              </motion.div>
                  <p className="text-sm text-muted-foreground">Your Photo Here</p>
                </div>
              </div>
            </div>
            
            {/* Floating Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
              className="absolute -bottom-6 -right-6 lg:right-auto lg:-left-6 px-6 py-4 bg-card border border-border rounded-xl shadow-lg"
            >
              <p className="text-3xl font-bold text-gradient">5+</p>
              <p className="text-sm text-muted-foreground">Years Experience</p>
            </motion.div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block"
            >
              About Me
            </motion.span>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Passionate About Creating{" "}
              <span className="text-gradient">Impactful</span> Digital Solutions
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-10">
              <p>
                With over 5 years of experience in web development and design, 
                I specialize in creating beautiful, functional, and user-centered 
                digital experiences that help businesses thrive in the digital age.
              </p>
              <p>
                My approach combines technical expertise with creative thinking, 
                ensuring every project not only meets but exceeds expectations. 
                I believe in the power of clean code and elegant design to solve 
                complex problems.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-secondary/50 border border-border/50"
                >
                  <div className="p-3 rounded-lg bg-primary/10">
                    <stat.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
