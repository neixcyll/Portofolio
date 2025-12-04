import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    category: "Web Development",
    description: "A modern e-commerce solution with seamless checkout experience and real-time inventory management.",
    tags: ["React", "Node.js", "Stripe", "MongoDB"],
    image: "gradient-1",
  },
  {
    id: 2,
    title: "Finance Dashboard",
    category: "UI/UX Design",
    description: "Comprehensive financial analytics dashboard with real-time data visualization and insights.",
    tags: ["Figma", "React", "D3.js", "TypeScript"],
    image: "gradient-2",
  },
  {
    id: 3,
    title: "Social Media App",
    category: "Mobile Development",
    description: "Feature-rich social platform connecting communities through shared interests and experiences.",
    tags: ["React Native", "Firebase", "Redux", "AI"],
    image: "gradient-3",
  },
  {
    id: 4,
    title: "Brand Identity System",
    category: "Branding",
    description: "Complete brand overhaul including logo design, color system, and comprehensive style guidelines.",
    tags: ["Illustrator", "Photoshop", "Brand Strategy"],
    image: "gradient-4",
  },
];

const categories = ["All", "Web Development", "UI/UX Design", "Mobile Development", "Branding"];

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
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/20 to-background" />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm font-medium uppercase tracking-widest mb-4 block">
            Portfolio
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold mb-6">
            Selected <span className="text-gradient">Works</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A curated collection of projects that showcase my expertise in design and development
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeCategory === category
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              onMouseEnter={() => setHoveredProject(project.id)}
              onMouseLeave={() => setHoveredProject(null)}
              className="group relative rounded-2xl overflow-hidden border border-border bg-card"
            >
              {/* Project Image/Gradient */}
              <div className="aspect-[16/10] relative overflow-hidden">
                <div 
                  className={`absolute inset-0 transition-transform duration-700 group-hover:scale-110 ${
                    project.image === "gradient-1" ? "bg-gradient-to-br from-primary/30 via-secondary to-primary/10" :
                    project.image === "gradient-2" ? "bg-gradient-to-br from-blue-500/30 via-secondary to-purple-500/10" :
                    project.image === "gradient-3" ? "bg-gradient-to-br from-green-500/30 via-secondary to-teal-500/10" :
                    "bg-gradient-to-br from-pink-500/30 via-secondary to-orange-500/10"
                  }`}
                />
                
                {/* Overlay */}
                <motion.div
                  initial={false}
                  animate={{ opacity: hoveredProject === project.id ? 1 : 0 }}
                  className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center gap-4"
                >
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 rounded-full bg-primary text-primary-foreground"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                  <motion.a
                    href="#"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 rounded-full bg-secondary text-secondary-foreground border border-border"
                  >
                    <Github size={20} />
                  </motion.a>
                </motion.div>
              </div>

              {/* Project Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="text-xs text-primary uppercase tracking-wider">
                      {project.category}
                    </span>
                    <h3 className="text-xl font-serif font-bold mt-1 group-hover:text-gradient transition-all duration-300">
                      {project.title}
                    </h3>
                  </div>
                  <motion.div
                    animate={{ rotate: hoveredProject === project.id ? 45 : 0 }}
                    className="p-2 rounded-full bg-secondary"
                  >
                    <ArrowUpRight size={16} className="text-foreground" />
                  </motion.div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs bg-secondary/50 text-secondary-foreground rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="text-center mt-12"
        >
          <motion.a
            href="#"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 border border-primary text-primary font-medium rounded-full hover:bg-primary hover:text-primary-foreground transition-all duration-300"
          >
            View All Projects
            <ArrowUpRight size={18} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
};
