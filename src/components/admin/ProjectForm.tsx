import { useEffect, useMemo, useState } from "react";
import { api, getAssetUrl, Project } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export type ProjectFormValues = {
  title: string;
  category: Project["category"];
  description: string;
  tags: string;
  demoUrl: string;
  githubUrl: string;
  thumbnailUrl: string;
  featured: boolean;
  published: boolean;
};

const categories: Project["category"][] = [
  "Web",
  "UIUX",
  "Mobile",
  "Game",
  "Other",
];

const categoryLabels: Record<Project["category"], string> = {
  Web: "Web",
  UIUX: "UI/UX",
  Mobile: "Mobile",
  Game: "Game",
  Other: "Other",
};

const getDefaults = (project?: Project | null): ProjectFormValues => ({
  title: project?.title || "",
  category: project?.category || "Web",
  description: project?.description || "",
  tags: project?.tags?.join(", ") || "",
  demoUrl: project?.demoUrl || "",
  githubUrl: project?.githubUrl || "",
  thumbnailUrl: project?.thumbnailUrl || "",
  featured: project?.featured || false,
  published: project?.published || false,
});

type ProjectFormProps = {
  initialData?: Project | null;
  onSubmit: (values: ProjectFormValues) => Promise<void>;
  isSubmitting?: boolean;
};

export const ProjectForm = ({
  initialData,
  onSubmit,
  isSubmitting,
}: ProjectFormProps) => {
  const [values, setValues] = useState<ProjectFormValues>(
    getDefaults(initialData)
  );
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  useEffect(() => {
    setValues(getDefaults(initialData));
  }, [initialData]);

  const previewUrl = useMemo(
    () => getAssetUrl(values.thumbnailUrl),
    [values.thumbnailUrl]
  );

  const handleChange = (field: keyof ProjectFormValues, value: string) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const handleToggle = (field: keyof ProjectFormValues, checked: boolean) => {
    setValues((prev) => ({ ...prev, [field]: checked }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    await onSubmit(values);
  };

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError(null);

    try {
      const { url } = await api.uploadThumbnail(file);
      setValues((prev) => ({ ...prev, thumbnailUrl: url }));
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Upload failed"
      );
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={values.title}
          onChange={(event) => handleChange("title", event.target.value)}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="category">Category</Label>
        <select
          id="category"
          value={values.category}
          onChange={(event) =>
            setValues((prev) => ({
              ...prev,
              category: event.target.value as Project["category"],
            }))
          }
          className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {categoryLabels[category]}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={values.description}
          onChange={(event) => handleChange("description", event.target.value)}
          rows={5}
          required
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="tags">Tags (comma separated)</Label>
        <Input
          id="tags"
          value={values.tags}
          onChange={(event) => handleChange("tags", event.target.value)}
          placeholder="React, Tailwind, Node.js"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="demoUrl">Demo URL</Label>
        <Input
          id="demoUrl"
          value={values.demoUrl}
          onChange={(event) => handleChange("demoUrl", event.target.value)}
          placeholder="https://demo.com"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="githubUrl">GitHub URL</Label>
        <Input
          id="githubUrl"
          value={values.githubUrl}
          onChange={(event) => handleChange("githubUrl", event.target.value)}
          placeholder="https://github.com/user/repo"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="thumbnail">Thumbnail Upload</Label>
        <Input
          id="thumbnail"
          type="file"
          accept="image/*"
          onChange={handleUpload}
        />
        {uploading && (
          <p className="text-xs text-muted-foreground">Uploading...</p>
        )}
        {uploadError && <p className="text-xs text-red-500">{uploadError}</p>}
        {previewUrl && (
          <div className="mt-2 rounded-xl border border-border overflow-hidden">
            <img
              src={previewUrl}
              alt="Thumbnail preview"
              className="w-full max-h-64 object-cover"
            />
          </div>
        )}
        <div className="grid gap-2">
          <Label htmlFor="thumbnailUrl">Thumbnail URL (optional)</Label>
          <Input
            id="thumbnailUrl"
            value={values.thumbnailUrl}
            onChange={(event) =>
              handleChange("thumbnailUrl", event.target.value)
            }
            placeholder="/uploads/your-file.png"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={values.featured}
            onChange={(event) =>
              handleToggle("featured", event.target.checked)
            }
          />
          Featured
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={values.published}
            onChange={(event) =>
              handleToggle("published", event.target.checked)
            }
          />
          Published
        </label>
      </div>

      <Button type="submit" disabled={isSubmitting || uploading}>
        {isSubmitting ? "Saving..." : "Save Project"}
      </Button>
    </form>
  );
};
