import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { ProjectForm, ProjectFormValues } from "@/components/admin/ProjectForm";
import { api } from "@/lib/api";

const AdminProjectEdit = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const projectId = Number(id);
  const [saving, setSaving] = useState(false);

  const { data: project } = useQuery({
    queryKey: ["admin-project", projectId],
    queryFn: () => api.getAdminProject(projectId),
    enabled: Number.isFinite(projectId),
  });

  const handleSubmit = async (values: ProjectFormValues) => {
    if (!Number.isFinite(projectId)) return;
    setSaving(true);
    await api.updateProject(projectId, {
      title: values.title,
      category: values.category,
      description: values.description,
      tags: values.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      demoUrl: values.demoUrl || null,
      githubUrl: values.githubUrl || null,
      thumbnailUrl: values.thumbnailUrl || null,
      featured: values.featured,
      published: values.published,
    });
    setSaving(false);
    navigate("/admin/projects");
  };

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Edit Project</h1>
          <p className="text-sm text-muted-foreground">
            Perbarui informasi project yang sudah ada.
          </p>
        </div>
        <ProjectForm
          initialData={project}
          onSubmit={handleSubmit}
          isSubmitting={saving}
        />
      </div>
    </div>
  );
};

export default AdminProjectEdit;
