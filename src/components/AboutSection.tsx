import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Briefcase, Coffee, Users } from "lucide-react";

const stats = [
  { icon: Briefcase, value: "50+", label: "Projects" },
  { icon: Users, value: "30+", label: "Clients" },
  { icon: Award, value: "5+", label: "Years" },
  { icon: Coffee, value: "∞", label: "Coffee" },
];

export const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div ref={ref} className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left Column - Visual */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative aspect-square max-w-md mx-auto">
              {/* Decorative rings */}
              <motion.div
                className="absolute inset-0 rounded-full border border-primary/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-8 rounded-full border border-accent/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              
              {/* Center content */}
              <div className="absolute inset-16 glass-card rounded-3xl flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={isInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.3, type: "spring" }}
                  className="text-center"
                >
                  <span className="text-7xl font-bold text-gradient">A</span>
                  <p className="text-xs text-muted-foreground mt-2">Your photo</p>
                </motion.div>
              </div>

              {/* Floating badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5 }}
                className="absolute -bottom-4 -right-4 px-5 py-3 glass-card rounded-2xl"
              >
                <p className="text-2xl font-bold text-gradient">5+</p>
                <p className="text-xs text-muted-foreground">Years exp.</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <motion.span
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full mb-6"
            >
              About me
            </motion.span>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Passionate about{" "}
              <span className="text-gradient">building</span> cool stuff
            </h2>
            
            <div className="space-y-4 text-muted-foreground leading-relaxed mb-10">
              <p>
                With over 5 years of experience, I specialize in creating 
                beautiful, functional digital experiences that users love.
              </p>
              <p>
                My approach combines clean code with creative design thinking, 
                ensuring every project exceeds expectations.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-4 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-center p-4 glass-card rounded-2xl"
                >
                  <stat.icon className="w-5 h-5 mx-auto mb-2 text-primary" />
                  <p className="text-xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
