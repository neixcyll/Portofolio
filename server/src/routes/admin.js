import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import multer from "multer";
import path from "path";
import fs from "fs";
import { authenticate } from "../middleware/auth.js";
import { generateUniqueSlug } from "../utils/slug.js";

const router = Router();

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, name);
  },
});

const upload = multer({ storage });

const parseTags = (tags) => {
  if (!tags) return [];
  if (Array.isArray(tags)) return tags.filter(Boolean);
  if (typeof tags === "string") {
    return tags
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }
  return [];
};

router.post("/login", async (req, res) => {
  const prisma = req.prisma;
  const { email, password } = req.body || {};

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password required" });
  }

  const admin = await prisma.admin.findUnique({ where: { email } });

  if (!admin) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const isValid = await bcrypt.compare(password, admin.passwordHash);
  if (!isValid) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { adminId: admin.id, email: admin.email },
    process.env.JWT_SECRET,
    { expiresIn: "2h" }
  );

  return res.json({ accessToken: token });
});

router.get("/projects", authenticate, async (req, res) => {
  const prisma = req.prisma;
  const projects = await prisma.project.findMany({
    orderBy: { createdAt: "desc" },
  });
  return res.json(projects);
});

router.get("/projects/:id", authenticate, async (req, res) => {
  const prisma = req.prisma;
  const id = Number(req.params.id);
  const project = await prisma.project.findUnique({ where: { id } });

  if (!project) {
    return res.status(404).json({ message: "Project not found" });
  }

  return res.json(project);
});

router.post("/projects", authenticate, async (req, res) => {
  const prisma = req.prisma;
  const {
    title,
    category,
    description,
    tags,
    demoUrl,
    githubUrl,
    thumbnailUrl,
    featured,
    published,
  } = req.body || {};

  if (!title || !category || !description) {
    return res
      .status(400)
      .json({ message: "Title, category, and description are required" });
  }

  const slug = await generateUniqueSlug({ title, prisma });

  const project = await prisma.project.create({
    data: {
      title,
      slug,
      category,
      description,
      tags: parseTags(tags),
      demoUrl: demoUrl || null,
      githubUrl: githubUrl || null,
      thumbnailUrl: thumbnailUrl || null,
      featured: Boolean(featured),
      published: Boolean(published),
    },
  });

  return res.status(201).json(project);
});

router.put("/projects/:id", authenticate, async (req, res) => {
  const prisma = req.prisma;
  const id = Number(req.params.id);
  const existing = await prisma.project.findUnique({ where: { id } });

  if (!existing) {
    return res.status(404).json({ message: "Project not found" });
  }

  const {
    title,
    category,
    description,
    tags,
    demoUrl,
    githubUrl,
    thumbnailUrl,
    featured,
    published,
  } = req.body || {};

  const slug = title
    ? await generateUniqueSlug({ title, prisma, ignoreId: id })
    : existing.slug;

  const project = await prisma.project.update({
    where: { id },
    data: {
      title: title ?? existing.title,
      slug,
      category: category ?? existing.category,
      description: description ?? existing.description,
      tags: tags ? parseTags(tags) : existing.tags,
      demoUrl: demoUrl === undefined ? existing.demoUrl : demoUrl || null,
      githubUrl: githubUrl === undefined ? existing.githubUrl : githubUrl || null,
      thumbnailUrl:
        thumbnailUrl === undefined ? existing.thumbnailUrl : thumbnailUrl || null,
      featured: featured === undefined ? existing.featured : Boolean(featured),
      published:
        published === undefined ? existing.published : Boolean(published),
    },
  });

  return res.json(project);
});

router.delete("/projects/:id", authenticate, async (req, res) => {
  const prisma = req.prisma;
  const id = Number(req.params.id);

  await prisma.project.delete({ where: { id } });
  return res.status(204).send();
});

router.patch("/projects/:id/publish", authenticate, async (req, res) => {
  const prisma = req.prisma;
  const id = Number(req.params.id);
  const existing = await prisma.project.findUnique({ where: { id } });

  if (!existing) {
    return res.status(404).json({ message: "Project not found" });
  }

  const published =
    typeof req.body?.published === "boolean"
      ? req.body.published
      : !existing.published;

  const project = await prisma.project.update({
    where: { id },
    data: { published },
  });

  return res.json(project);
});

router.post(
  "/upload",
  authenticate,
  upload.single("file"),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ message: "File is required" });
    }

    const filePath = `/uploads/${req.file.filename}`;
    return res.json({ url: filePath });
  }
);

export default router;
