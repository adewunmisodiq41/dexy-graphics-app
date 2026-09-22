"use client";

import { useState } from "react";
import Image from "next/image";
import { put } from "@vercel/blob/client";
import { isVideoUrl } from "@/lib/media";

export default function ImageUploadField({
  name,
  defaultValue,
  label = "Image or Video",
}: {
  name: string;
  defaultValue?: string | null;
  label?: string;
}) {
  const [url, setUrl] = useState(defaultValue || "");
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setProgress(0);
    setError("");

    try {
      const pathname = `uploads/${Date.now()}-${file.name}`;

      const tokenRes = await fetch("/api/blob-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pathname }),
      });
      const tokenData = await tokenRes.json();
      if (!tokenRes.ok || !tokenData.clientToken) {
        throw new Error(tokenData.error || "Could not get an upload token");
      }

      const blob = await put(pathname, file, {
        access: "public",
        token: tokenData.clientToken,
        multipart: file.size > 10 * 1024 * 1024,
        onUploadProgress: (p) => setProgress(Math.round(p.percentage)),
      });

      setUrl(blob.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  const video = isVideoUrl(url);

  return (
    <div className="field">
      <label>{label}</label>
      <input type="hidden" name={name} value={url} />
      {url && (
        <div style={{ position: "relative", width: 140, height: 100, marginBottom: 10, borderRadius: 4, overflow: "hidden", border: "1px solid var(--border-strong)", background: "var(--bg-sunken)" }}>
          {video ? (
            <video src={url} muted loop autoPlay playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          ) : (
            <Image src={url} alt="Preview" fill sizes="140px" style={{ objectFit: "cover" }} />
          )}
        </div>
      )}
      <input type="file" accept="image/*,video/*" onChange={handleFile} disabled={uploading} />
      {uploading && (
        <p className="form-note">Uploading… {progress > 0 ? `${progress}%` : ""}</p>
      )}
      {error && <p className="form-note" style={{ color: "var(--accent-ink)" }}>{error}</p>}
      {url && !uploading && (
        <button type="button" className="btn btn-ghost btn-sm" style={{ marginTop: 8 }} onClick={() => setUrl("")}>
          Remove {video ? "video" : "image"}
        </button>
      )}
    </div>
  );
}
