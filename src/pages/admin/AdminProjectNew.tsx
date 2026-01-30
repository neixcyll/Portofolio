import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectForm, ProjectFormValues } from "@/components/admin/ProjectForm";
import { api } from "@/lib/api";

const AdminProjectNew = () => {
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (values: ProjectFormValues) => {
    setSaving(true);
    await api.createProject({
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

  return (
    <div className="min-h-screen bg-background px-6 py-10">
      <div className="mx-auto max-w-3xl space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Tambah Project</h1>
          <p className="text-sm text-muted-foreground">
            Isi detail project baru untuk portfolio.
          </p>
        </div>
        <ProjectForm onSubmit={handleSubmit} isSubmitting={saving} />
      </div>
    </div>
  );
};

export default AdminProjectNew;
