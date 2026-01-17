import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";

type Project = {
  id: number;
  title: string;
  category: string;
  description: string;
  tags: string[];
  gradient: string;
  image?: string;

  // ✅ links
  githubUrl?: string;
  liveUrl?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "FIxieStore",
    category: "Web Dev",
    description: "Website e-commerce untuk penjualan sparepart sepeda Fixie",
    tags: ["React", "Node.js", "Supabase"],
    gradient: "from-cyan-500/20 to-blue-500/20",
    image: "/project/fixiestore.png", // ✅ FIX: projects (bukan project)
    githubUrl: "https://github.com/neixcyll/FixieStoreV2.0",
    liveUrl: "https://vercel.com/neils-projects-628fce30/fixiestore/3Xqedhe7mPiuAVVDQsco86QesEqw",
  },
  // {
  //   id: 2,
  //   title: "Finance Dashboard",
  //   category: "UI/UX",
  //   description: "Analytics dashboard with real-time data visualization.",
  //   tags: ["Figma", "React", "D3.js"],
  //   gradient: "from-purple-500/20 to-pink-500/20",
  //   image: "/projects/finance-dashboard.jpg",
  //   githubUrl: "https://github.com/USERNAME/finance-dashboard",
  //   liveUrl: "https://finance-dashboard.vercel.app",
  // },
  // {
  //   id: 3,
  //   title: "Social App",
  //   category: "Mobile",
  //   description: "Feature-rich social platform connecting communities.",
  //   tags: ["React Native", "Firebase"],
  //   gradient: "from-green-500/20 to-emerald-500/20",
  //   image: "/projects/social-app.jpg",
  //   githubUrl: "https://github.com/USERNAME/social-app",
  //   // liveUrl: "", // kalau belum ada gapapa, iconnya ga muncul
  // },
  // {
  //   id: 4,
  //   title: "Brand Identity",
  //   category: "Design",
  //   description: "Complete brand overhaul with logo and style guidelines.",
  //   tags: ["Illustrator", "Branding"],
  //   gradient: "from-orange-500/20 to-yellow-500/20",
  //   image: "/projects/brand-identity.jpg",
  //   // githubUrl: "", // optional
  //   liveUrl: "https://www.behance.net/USERNAME", // bisa link behance juga
  // },
];

const categories = ["All", "Web Dev", "UI/UX", "Mobile", "Design"];

export const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);
  const [brokenImages, setBrokenImages] = useState<Record<number, boolean>>({});

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-32 relative">
      <div className="absolute inset-0 cyber-grid opacity-50" />

      <div
        ref={ref}
        className="container mx-auto px-6 lg:px-12 relative z-10"
      >
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
            Daftar Project
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Berikut adalah beberapa proyek yang telah saya kerjakan
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
              {/* Media */}
              <div className="aspect-[16/10] relative overflow-hidden">
                {/* FOTO (kalau ada & tidak error) */}
                {project.image && !brokenImages[project.id] && (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    onError={() =>
                      setBrokenImages((p) => ({ ...p, [project.id]: true }))
                    }
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                  />
                )}

                {/* FALLBACK GRADIENT (kalau image kosong / error) */}
                {(!project.image || brokenImages[project.id]) && (
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
                  />
                )}

                {/* TINT GRADIENT (biar tetap cyber vibes, tapi ga nutup foto) */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-30 pointer-events-none`}
                />

                {/* DARK OVERLAY */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-br from-transparent to-background/80"
                  initial={false}
                  animate={{
                    opacity: hoveredProject === project.id ? 0.9 : 0.6,
                  }}
                />

                {/* Hover Actions */}
                <motion.div
                  initial={false}
                  animate={{
                    opacity: hoveredProject === project.id ? 1 : 0,
                    y: hoveredProject === project.id ? 0 : 20,
                  }}
                  className="absolute inset-0 flex items-center justify-center gap-4"
                >
                  {/* Live / Demo */}
                  {project.liveUrl && (
                    <motion.a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-4 rounded-2xl bg-primary text-primary-foreground"
                      aria-label="Open live demo"
                      title="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </motion.a>
                  )}

                  {/* GitHub */}
                  {project.githubUrl && (
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-4 rounded-2xl glass"
                      aria-label="Open GitHub repository"
                      title="GitHub"
                    >
                      <Github size={20} />
                    </motion.a>
                  )}
                </motion.div>
              </div>

              {/* Info */}
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
      </div>
    </section>
  );
};
