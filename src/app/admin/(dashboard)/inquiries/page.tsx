import { prisma } from "@/lib/prisma";
import InquiryRow from "@/components/admin/InquiryRow";

export const revalidate = 0;

export default async function InquiriesAdminPage() {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="h-display" style={{ fontSize: 30, marginBottom: 24 }}>
        Inquiries
      </h1>

      {inquiries.length === 0 && <p style={{ color: "var(--fg-soft)" }}>No inquiries yet — they&apos;ll show up here as visitors submit the contact form.</p>}

      {inquiries.map((inquiry) => (
        <InquiryRow
          key={inquiry.id}
          inquiry={{
            ...inquiry,
            createdAt: inquiry.createdAt.toISOString(),
          }}
        />
      ))}
    </div>
  );
}
