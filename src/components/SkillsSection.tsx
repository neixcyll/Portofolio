import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Smartphone, Globe, Database, Sparkles } from "lucide-react";

const skills = [
  {
    icon: Code2,
    title: "Frontend Development",
    description: "Building responsive and interactive user interfaces with modern frameworks.",
    technologies: ["React", "TypeScript", "Next.js", "Vue.js", "Tailwind CSS"],
    color: "from-blue-500/20 to-cyan-500/20",
  },
  {
    icon: Database,
    title: "Backend Development",
    description: "Creating robust server-side applications and RESTful APIs.",
    technologies: ["Node.js", "Python", "PostgreSQL", "MongoDB", "GraphQL"],
    color: "from-green-500/20 to-emerald-500/20",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Designing intuitive and visually stunning user experiences.",
    technologies: ["Figma", "Adobe XD", "Photoshop", "Illustrator", "Framer"],
    color: "from-pink-500/20 to-purple-500/20",
  },
  {
    icon: Smartphone,
    title: "Mobile Development",
    description: "Developing cross-platform mobile applications.",
    technologies: ["React Native", "Flutter", "iOS", "Android", "Expo"],
    color: "from-orange-500/20 to-yellow-500/20",
  },
  {
    icon: Globe,
    title: "DevOps & Cloud",
    description: "Deploying and managing scalable cloud infrastructure.",
    technologies: ["AWS", "Docker", "Kubernetes", "CI/CD", "Vercel"],
    color: "from-indigo-500/20 to-violet-500/20",
  },
  {
    icon: Sparkles,
    title: "AI & Innovation",
    description: "Integrating AI solutions and exploring emerging technologies.",
    technologies: ["OpenAI", "TensorFlow", "ChatGPT", "Machine Learning", "Web3"],
    color: "from-primary/20 to-gold-light/20",
  },
];

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
            Expertise
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit of modern technologies and methodologies 
            to bring your vision to life
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group relative p-8 rounded-2xl bg-card border border-border hover:border-primary/50 transition-all duration-500"
            >
              {/* Gradient Background */}
              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${skill.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              
              <div className="relative z-10">
                {/* Icon */}
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors"
                >
                  <skill.icon className="w-7 h-7 text-primary" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-serif font-bold mb-3 group-hover:text-gradient transition-all duration-300">
                  {skill.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                  {skill.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-2">
                  {skill.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded-full group-hover:bg-secondary/80 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 p-8 rounded-2xl bg-gradient-to-r from-primary/10 via-secondary to-primary/10 border border-border"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "99%", label: "Client Satisfaction" },
              { value: "24/7", label: "Support Available" },
              { value: "<1hr", label: "Response Time" },
              { value: "100%", label: "Project Success" },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <p className="text-3xl md:text-4xl font-serif font-bold text-gradient mb-2">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
