import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { PrismaClient } from "@prisma/client";
import publicRoutes from "./routes/public.js";
import adminRoutes from "./routes/admin.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const PORT = process.env.PORT || 4000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:5173";

app.use(
  cors({
    origin: CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.prisma = prisma;
  next();
});

app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));
app.use("/api", publicRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.use((err, req, res, next) => {
  // eslint-disable-next-line no-console
  console.error(err);
  res.status(500).json({ message: "Internal server error" });
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server running on http://localhost:${PORT}`);
});
