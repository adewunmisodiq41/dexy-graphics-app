"use client";

import { savePrintProduct } from "@/lib/actions";
import ImageUploadField from "@/components/admin/ImageUploadField";

export type PrintFormValues = {
  id?: string;
  name?: string;
  spec?: string;
  description?: string;
  imageUrl?: string | null;
  published?: boolean;
};

export default function PrintForm({ initial }: { initial?: PrintFormValues }) {
  return (
    <form action={savePrintProduct} className="admin-card">
      {initial?.id && <input type="hidden" name="id" value={initial.id} />}
      <div className="field">
        <label htmlFor="name">Product name</label>
        <input id="name" name="name" required defaultValue={initial?.name} />
      </div>
      <div className="field">
        <label htmlFor="spec">Spec label</label>
        <input id="spec" name="spec" placeholder="e.g. SCREEN PRINT / DTG" required defaultValue={initial?.spec} />
      </div>
      <div className="field">
        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" required defaultValue={initial?.description} />
      </div>
      <ImageUploadField name="imageUrl" defaultValue={initial?.imageUrl} />
      <div className="field" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <input type="checkbox" id="published" name="published" defaultChecked={initial?.published ?? true} style={{ width: "auto" }} />
        <label htmlFor="published" style={{ margin: 0 }}>
          Published (visible on the live site)
        </label>
      </div>
      <button type="submit" className="btn btn-solid">
        {initial?.id ? "Save Changes" : "Create Product"}
      </button>
    </form>
  );
}
