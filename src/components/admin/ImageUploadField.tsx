"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/lib/actions";

export default function ImageUploadField({
  name,
  defaultValue,
  label = "Image",
}: {
  name: string;
  defaultValue?: string | null;
  label?: string;
}) {
  const [url, setUrl] = useState(defaultValue || "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError("");
    const fd = new FormData();
    fd.append("file", file);
    const res = await uploadImage(fd);
    setUploading(false);
    if (res.url) {
      setUrl(res.url);
    } else {
      setError(res.error || "Upload failed");
    }
  }

  return (
    <div className="field">
      <label>{label}</label>
      <input type="hidden" name={name} value={url} />
      {url && (
        <div style={{ position: "relative", width: 140, height: 100, marginBottom: 10, borderRadius: 4, overflow: "hidden", border: "1px solid var(--border-strong)" }}>
          <Image src={url} alt="Preview" fill sizes="140px" style={{ objectFit: "cover" }} />
        </div>
      )}
      <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} />
      {uploading && <p className="form-note">Uploading…</p>}
      {error && <p className="form-note" style={{ color: "var(--accent-ink)" }}>{error}</p>}
      {url && (
        <button type="button" className="btn btn-ghost btn-sm" style={{ marginTop: 8 }} onClick={() => setUrl("")}>
          Remove image
        </button>
      )}
    </div>
  );
}
