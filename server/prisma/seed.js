import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const adminEmail = process.env.ADMIN_EMAIL || "admin@example.com";
const adminPassword = process.env.ADMIN_PASSWORD || "admin12345";

const projects = [
  {
    title: "Cyber Portfolio",
    slug: "cyber-portfolio",
    category: "Web",
    description: "Landing page portfolio bertema cyber dengan animasi modern.",
    tags: ["React", "Tailwind", "Vite"],
    demoUrl: "https://example.com/portfolio",
    githubUrl: "https://github.com/example/cyber-portfolio",
    thumbnailUrl: "/uploads/sample-portfolio.png",
    featured: true,
    published: true,
  },
  {
    title: "UIUX Fintech Dashboard",
    slug: "uiux-fintech-dashboard",
    category: "UIUX",
    description: "Desain UI/UX dashboard fintech lengkap dengan design system.",
    tags: ["Figma", "UIUX"],
    demoUrl: "https://example.com/fintech",
    githubUrl: null,
    thumbnailUrl: "/uploads/sample-fintech.png",
    featured: false,
    published: true,
  },
  {
    title: "Mobile Habit Tracker",
    slug: "mobile-habit-tracker",
    category: "Mobile",
    description: "Aplikasi mobile untuk tracking kebiasaan harian.",
    tags: ["React Native", "Expo"],
    demoUrl: null,
    githubUrl: "https://github.com/example/habit-tracker",
    thumbnailUrl: "/uploads/sample-habit.png",
    featured: false,
    published: false,
  },
];

async function main() {
  const passwordHash = await bcrypt.hash(adminPassword, 10);

  await prisma.admin.upsert({
    where: { email: adminEmail },
    update: { passwordHash },
    create: { email: adminEmail, passwordHash },
  });

  for (const project of projects) {
    await prisma.project.upsert({
      where: { slug: project.slug },
      update: {},
      create: project,
    });
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
