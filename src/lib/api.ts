export type Project = {
  id: number;
  title: string;
  slug: string;
  category: "Web" | "UIUX" | "Mobile" | "Game" | "Other";
  description: string;
  tags: string[];
  demoUrl?: string | null;
  githubUrl?: string | null;
  thumbnailUrl?: string | null;
  featured: boolean;
  published: boolean;
  createdAt: string;
  updatedAt: string;
};

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000";

export const getAssetUrl = (path?: string | null) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  return `${API_BASE}${path}`;
};

const getToken = () => localStorage.getItem("admin_token");

const request = async <T>(url: string, options?: RequestInit): Promise<T> => {
  const response = await fetch(`${API_BASE}${url}`, {
    headers: {
      "Content-Type": "application/json",
      ...(options?.headers || {}),
    },
    ...options,
  });

  if (!response.ok) {
    const message = await response.json().catch(() => ({}));
    throw new Error(message.message || "Request failed");
  }

  return response.json();
};

export const api = {
  login: (email: string, password: string) =>
    request<{ accessToken: string }>("/api/admin/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  getPublicProjects: () => request<Project[]>("/api/projects"),
  getProjectBySlug: (slug: string) =>
    request<Project>(`/api/projects/${slug}`),
  getAdminProjects: () =>
    request<Project[]>("/api/admin/projects", {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
  getAdminProject: (id: number) =>
    request<Project>(`/api/admin/projects/${id}`, {
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
  createProject: (payload: Partial<Project> & { tags?: string[] }) =>
    request<Project>("/api/admin/projects", {
      method: "POST",
      headers: { Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify(payload),
    }),
  updateProject: (id: number, payload: Partial<Project> & { tags?: string[] }) =>
    request<Project>(`/api/admin/projects/${id}`, {
      method: "PUT",
      headers: { Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify(payload),
    }),
  deleteProject: (id: number) =>
    request<void>(`/api/admin/projects/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${getToken()}` },
    }),
  togglePublish: (id: number, published: boolean) =>
    request<Project>(`/api/admin/projects/${id}/publish`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ published }),
    }),
  uploadThumbnail: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_BASE}/api/admin/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const message = await response.json().catch(() => ({}));
      throw new Error(message.message || "Upload failed");
    }

    return response.json() as Promise<{ url: string }>;
  },
};

export const setAdminToken = (token: string) =>
  localStorage.setItem("admin_token", token);

export const clearAdminToken = () => localStorage.removeItem("admin_token");

export const hasAdminToken = () => Boolean(getToken());
