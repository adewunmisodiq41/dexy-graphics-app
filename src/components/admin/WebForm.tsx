"use client";

import { saveWebProject } from "@/lib/actions";
import ImageUploadField from "@/components/admin/ImageUploadField";

const CATEGORIES = ["BUSINESS", "KENNEL", "ECOMMERCE", "PORTFOLIO", "LANDING_PAGE", "CUSTOM"];

export type WebFormValues = {
  id?: string;
  title?: string;
  category?: string;
  description?: string;
  imageUrl?: string | null;
  liveUrl?: string | null;
  published?: boolean;
};

export default function WebForm({ initial }: { initial?: WebFormValues }) {
  return (
    <form action={saveWebProject} className="admin-card">
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
        <label htmlFor="liveUrl">Live URL (optional)</label>
        <input id="liveUrl" name="liveUrl" placeholder="https://" defaultValue={initial?.liveUrl || ""} />
      </div>
      <ImageUploadField name="imageUrl" defaultValue={initial?.imageUrl} label="Screenshot" />
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
