"use client";

import { updateInquiryStatus } from "@/lib/actions";

const STATUSES = ["NEW", "IN_PROGRESS", "DONE", "ARCHIVED"];

export type Inquiry = {
  id: string;
  fullName: string;
  email: string;
  whatsapp?: string | null;
  service: string;
  budget?: string | null;
  details: string;
  fileUrl?: string | null;
  status: string;
  createdAt: string;
};

export default function InquiryRow({ inquiry }: { inquiry: Inquiry }) {
  return (
    <div className="admin-card">
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10, marginBottom: 12 }}>
        <div>
          <strong>{inquiry.fullName}</strong>{" "}
          <span style={{ color: "var(--fg-soft)", fontSize: 13 }}>
            — {inquiry.service} — {new Date(inquiry.createdAt).toLocaleDateString()}
          </span>
        </div>
        <form action={updateInquiryStatus} style={{ display: "flex", gap: 8 }}>
          <input type="hidden" name="id" value={inquiry.id} />
          <select name="status" defaultValue={inquiry.status} onChange={(e) => e.currentTarget.form?.requestSubmit()}>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s.replace("_", " ")}
              </option>
            ))}
          </select>
        </form>
      </div>
      <p style={{ fontSize: 14, color: "var(--fg-soft)", marginBottom: 10 }}>{inquiry.details}</p>
      <div style={{ display: "flex", gap: 16, flexWrap: "wrap", fontSize: 13 }}>
        <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>
        {inquiry.whatsapp && <span>WhatsApp: {inquiry.whatsapp}</span>}
        {inquiry.budget && <span>Budget: {inquiry.budget}</span>}
        {inquiry.fileUrl && (
          <a href={inquiry.fileUrl} target="_blank" rel="noopener noreferrer">
            Attached file ↗
          </a>
        )}
      </div>
    </div>
  );
}
