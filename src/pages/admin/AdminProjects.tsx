import { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { api, clearAdminToken, Project } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categoryLabels: Record<Project["category"], string> = {
  Web: "Web",
  UIUX: "UI/UX",
  Mobile: "Mobile",
  Game: "Game",
  Other: "Other",
};

const AdminProjects = () => {
  const navigate = useNavigate();
  const { data: projects = [], refetch } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: api.getAdminProjects,
  });

  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<"All" | Project["category"]>(
    "All"
  );

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesCategory =
        category === "All" || project.category === category;
      const matchesSearch = project.title
        .toLowerCase()
        .includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [projects, search, category]);

  const handleLogout = () => {
    clearAdminToken();
    navigate("/admin/login");
  };

  const handlePublish = async (project: Project) => {
    await api.togglePublish(project.id, !project.published);
    await refetch();
  };

  const handleDelete = async (project: Project) => {
    const confirmed = window.confirm(
      `Hapus project "${project.title}"? Tindakan ini tidak bisa dibatalkan.`
    );
    if (!confirmed) return;
    await api.deleteProject(project.id);
    await refetch();
  };

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-6xl space-y-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-semibold">Admin Projects</h1>
            <p className="text-sm text-muted-foreground">
              Kelola project, publish, dan update konten portfolio.
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
            <Button asChild>
              <Link to="/admin/projects/new">Tambah Project</Link>
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <Input
            placeholder="Cari project..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="md:max-w-xs"
          />
          <select
            value={category}
            onChange={(event) =>
              setCategory(event.target.value as "All" | Project["category"])
            }
            className="h-10 rounded-md border border-input bg-background px-3 text-sm md:max-w-xs"
          >
            <option value="All">Semua kategori</option>
            {Object.entries(categoryLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>

        <div className="grid gap-4">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border border-border bg-card p-6 shadow-sm"
            >
              <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                  <p className="text-xs uppercase text-primary">
                    {categoryLabels[project.category]}
                  </p>
                  <h2 className="text-xl font-semibold">{project.title}</h2>
                  <p className="text-sm text-muted-foreground">
                    {project.description}
                  </p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {project.tags?.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-secondary px-3 py-1 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    variant={project.published ? "secondary" : "default"}
                    onClick={() => handlePublish(project)}
                  >
                    {project.published ? "Unpublish" : "Publish"}
                  </Button>
                  <Button variant="outline" asChild>
                    <Link to={`/admin/projects/${project.id}/edit`}>Edit</Link>
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(project)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
          {filteredProjects.length === 0 && (
            <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted-foreground">
              Tidak ada project yang cocok dengan filter.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminProjects;
