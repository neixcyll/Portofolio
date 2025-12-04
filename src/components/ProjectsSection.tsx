import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Dev",
    description: "Modern e-commerce with seamless checkout and real-time inventory.",
    tags: ["React", "Node.js", "Stripe"],
    gradient: "from-cyan-500/20 to-blue-500/20",
  },
  {
    id: 2,
    title: "Finance Dashboard",
    category: "UI/UX",
    description: "Analytics dashboard with real-time data visualization.",
    tags: ["Figma", "React", "D3.js"],
    gradient: "from-purple-500/20 to-pink-500/20",
  },
  {
    id: 3,
    title: "Social App",
    category: "Mobile",
    description: "Feature-rich social platform connecting communities.",
    tags: ["React Native", "Firebase"],
    gradient: "from-green-500/20 to-emerald-500/20",
  },
  {
    id: 4,
    title: "Brand Identity",
    category: "Design",
    description: "Complete brand overhaul with logo and style guidelines.",
    tags: ["Illustrator", "Branding"],
    gradient: "from-orange-500/20 to-yellow-500/20",
  },
];

const categories = ["All", "Web Dev", "UI/UX", "Mobile", "Design"];

export const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-32 relative">
      <div className="absolute inset-0 cyber-grid opacity-50" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary bg-primary/10 rounded-full mb-6">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Selected <span className="text-gradient">works</span>
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A collection of projects showcasing my expertise
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 text-sm font-medium rounded-xl transition-all duration-300 ${
                activeCategory === category
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative rounded-3xl overflow-hidden glass-card"
            >
              {/* Gradient Background */}
              <div className={`aspect-[16/10] relative overflow-hidden bg-gradient-to-br ${project.gradient}`}>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-transparent to-background/80"
                  initial={false}
                  animate={{ opacity: hoveredProject === project.id ? 0.9 : 0.6 }}
                />
                
                {/* Hover Actions */}
                <motion.div
                  initial={false}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0, y: hoveredProject === project.id ? 0 : 20 }}
                  className="absolute inset-0 flex items-center justify-center gap-4"
                >
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 rounded-2xl bg-primary text-primary-foreground"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 rounded-2xl glass"
                  >
                    <Github size={20} />
                  </motion.a>
                </motion.div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-[10px] text-primary uppercase tracking-wider font-semibold">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-bold mt-1 group-hover:text-gradient transition-all duration-300">
                      {project.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: hoveredProject === project.id ? 45 : 0 }}
                    className="p-2 rounded-xl bg-secondary"
                  >
                    <ArrowUpRight size={16} />
                  </motion.div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-secondary rounded-lg text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 glass rounded-2xl font-semibold hover:bg-secondary/50 transition-all duration-300"
          >
            View all projects
            <ArrowUpRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
