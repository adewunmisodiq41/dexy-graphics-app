"use client";

import { saveTestimonial } from "@/lib/actions";
import ImageUploadField from "@/components/admin/ImageUploadField";

export type TestimonialFormValues = {
  id?: string;
  clientName?: string;
  clientRole?: string | null;
  quote?: string;
  avatarUrl?: string | null;
  published?: boolean;
};

export default function TestimonialForm({ initial }: { initial?: TestimonialFormValues }) {
  return (
    <form action={saveTestimonial} className="admin-card">
      {initial?.id && <input type="hidden" name="id" value={initial.id} />}
      <div className="field">
        <label htmlFor="clientName">Client name</label>
        <input id="clientName" name="clientName" required defaultValue={initial?.clientName} />
      </div>
      <div className="field">
        <label htmlFor="clientRole">Client business / role (optional)</label>
        <input id="clientRole" name="clientRole" defaultValue={initial?.clientRole || ""} />
      </div>
      <div className="field">
        <label htmlFor="quote">Testimonial</label>
        <textarea id="quote" name="quote" required defaultValue={initial?.quote} />
      </div>
      <ImageUploadField name="avatarUrl" defaultValue={initial?.avatarUrl} label="Photo (optional)" />
      <div className="field" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <input type="checkbox" id="published" name="published" defaultChecked={initial?.published ?? true} style={{ width: "auto" }} />
        <label htmlFor="published" style={{ margin: 0 }}>
          Published (visible on the live site)
        </label>
      </div>
      <button type="submit" className="btn btn-solid">
        {initial?.id ? "Save Changes" : "Add Testimonial"}
      </button>
    </form>
  );
}
