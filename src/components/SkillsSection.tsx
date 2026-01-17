import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Palette, Smartphone, Globe, Database, Sparkles } from "lucide-react";

const skills = [
  {
    icon: Code2,
    title: "Frontend",
    technologies: ["React", "TypeScript", "Tailwind"],
  },
  {
    icon: Database,
    title: "Backend",
    technologies: ["mysql", "Supabase", "Node.js", "Laravel"],
  },
  {
    icon: Sparkles,
    title: "AI",
    technologies: ["OpenAI", "Gemini"],
  },
];

export const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-32 relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[200px]"
          style={{ background: "radial-gradient(circle, hsla(190, 95%, 55%, 0.08) 0%, transparent 70%)" }}
        />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full mb-6">
            Skill
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Tech <span className="text-gradient">stack</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Saya mengerjakan menggunakan teknologi terbaru untuk memastikan hasil yang optimal dan berkualitas tinggi.
          </p>
        </motion.div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group p-6 rounded-3xl glass-card hover:border-primary/30 transition-all duration-300"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4"
              >
                <skill.icon className="w-6 h-6 text-primary" />
              </motion.div>

              <h3 className="text-lg font-bold mb-3 group-hover:text-gradient transition-all duration-300">
                {skill.title}
              </h3>

              <div className="flex flex-wrap gap-1.5">
                {skill.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 text-[10px] bg-secondary rounded-lg text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
