import { Router } from "express";

const router = Router();

router.get("/projects", async (req, res) => {
  const prisma = req.prisma;
  const projects = await prisma.project.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });
  return res.json(projects);
});

router.get("/projects/:slug", async (req, res) => {
  const prisma = req.prisma;
  const project = await prisma.project.findFirst({
    where: { slug: req.params.slug, published: true },
  });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  return res.json(project);
});

export default router;
