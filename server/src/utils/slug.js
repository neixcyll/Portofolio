import slugify from "slugify";

export const createSlug = (title) =>
  slugify(title, {
    lower: true,
    strict: true,
    trim: true,
  });

export const generateUniqueSlug = async ({ title, prisma, ignoreId }) => {
  const base = createSlug(title);
  let candidate = base;
  let counter = 1;

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const existing = await prisma.project.findUnique({
      where: { slug: candidate },
      select: { id: true },
    });

    if (!existing || (ignoreId && existing.id === ignoreId)) {
      return candidate;
    }

    candidate = `${base}-${counter}`;
    counter += 1;
  }
};
