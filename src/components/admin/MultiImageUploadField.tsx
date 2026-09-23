"use client";

import { useState } from "react";
import Image from "next/image";
import { uploadImage } from "@/lib/actions";
import { isVideoUrl } from "@/lib/media";

export default function MultiImageUploadField({
  name,
  defaultValue = [],
  label = "Related examples",
}: {
  name: string;
  defaultValue?: string[];
  label?: string;
}) {
  const [urls, setUrls] = useState<string[]>(defaultValue);
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
      setUrls((prev) => [...prev, res.url as string]);
    } else {
      setError(res.error || "Upload failed");
    }
    e.target.value = "";
  }

  function removeAt(i: number) {
    setUrls((prev) => prev.filter((_, idx) => idx !== i));
  }

  return (
    <div className="field">
      <label>{label}</label>
      <input type="hidden" name={name} value={JSON.stringify(urls)} />

      {urls.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 10 }}>
          {urls.map((url, i) => (
            <div key={url + i} style={{ position: "relative", width: 100, height: 76, borderRadius: 4, overflow: "hidden", border: "1px solid var(--border-strong)", background: "var(--bg-sunken)" }}>
              {isVideoUrl(url) ? (
                <video src={url} muted style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              ) : (
                <Image src={url} alt="" fill sizes="100px" style={{ objectFit: "cover" }} />
              )}
              <button
                type="button"
                onClick={() => removeAt(i)}
                aria-label="Remove"
                style={{ position: "absolute", top: 2, right: 2, background: "rgba(0,0,0,.65)", color: "#fff", border: "none", borderRadius: "50%", width: 20, height: 20, fontSize: 12, lineHeight: "20px", cursor: "pointer" }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      <input type="file" accept="image/*,video/*" onChange={handleFile} disabled={uploading} />
      {uploading && <p className="form-note">Uploading…</p>}
      {error && <p className="form-note" style={{ color: "var(--accent-ink)" }}>{error}</p>}
      <p className="form-note">Add as many as you&apos;d like, one at a time — these show as extra examples on the project&apos;s page.</p>
    </div>
  );
}
