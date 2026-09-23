"use client";

import { saveDesignProject } from "@/lib/actions";
import ImageUploadField from "@/components/admin/ImageUploadField";
import MultiImageUploadField from "@/components/admin/MultiImageUploadField";

const CATEGORIES = ["LOGOS", "PEDIGREE", "BREEDING", "STUD", "ANIMATED", "BRANDING"];

export type DesignFormValues = {
  id?: string;
  title?: string;
  category?: string;
  description?: string;
  imageUrl?: string | null;
  images?: string[];
  price?: number | null;
  published?: boolean;
};

export default function DesignForm({ initial }: { initial?: DesignFormValues }) {
  return (
    <form action={saveDesignProject} className="admin-card">
      {initial?.id && <input type="hidden" name="id" value={initial.id} />}
      <div className="field">
        <label htmlFor="title">Title</label>
        <input id="title" name="title" required defaultValue={initial?.title} />
      </div>
      <div className="field">
        <label htmlFor="category">Category</label>
        <select id="category" name="category" required defaultValue={initial?.category || CATEGORIES[0]}>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" required defaultValue={initial?.description} />
      </div>
      <div className="field">
        <label htmlFor="price">Price in USD (optional — leave blank to show no price)</label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          min="0"
          placeholder="e.g. 150.00"
          defaultValue={initial?.price ?? ""}
        />
      </div>
      <ImageUploadField name="imageUrl" defaultValue={initial?.imageUrl} label="Main image or video" />
      <MultiImageUploadField name="images" defaultValue={initial?.images || []} />
      <div className="field" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <input type="checkbox" id="published" name="published" defaultChecked={initial?.published ?? true} style={{ width: "auto" }} />
        <label htmlFor="published" style={{ margin: 0 }}>
          Published (visible on the live site)
        </label>
      </div>
      <button type="submit" className="btn btn-solid">
        {initial?.id ? "Save Changes" : "Create Project"}
      </button>
    </form>
  );
}
