import Link from "next/link";
import { prisma } from "@/lib/prisma";

export const revalidate = 0;

export default async function AdminHome() {
  const [designCount, webCount, printCount, testimonialCount, newInquiries, totalInquiries] = await Promise.all([
    prisma.designProject.count(),
    prisma.webProject.count(),
    prisma.printProduct.count(),
    prisma.testimonial.count(),
    prisma.inquiry.count({ where: { status: "NEW" } }),
    prisma.inquiry.count(),
  ]);

  const cards = [
    { label: "Design projects", value: designCount, href: "/admin/design" },
    { label: "Web projects", value: webCount, href: "/admin/web" },
    { label: "Print products", value: printCount, href: "/admin/print" },
    { label: "Testimonials", value: testimonialCount, href: "/admin/testimonials" },
    { label: "New inquiries", value: newInquiries, href: "/admin/inquiries" },
    { label: "Total inquiries", value: totalInquiries, href: "/admin/inquiries" },
  ];

  return (
    <div>
      <h1 className="h-display" style={{ fontSize: 30, marginBottom: 28 }}>
        Overview
      </h1>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: 16 }}>
        {cards.map((c) => (
          <Link href={c.href} key={c.label} className="admin-card" style={{ display: "block" }}>
            <div style={{ fontSize: 13, color: "var(--fg-soft)", marginBottom: 8 }}>{c.label}</div>
            <div style={{ fontSize: 32, fontWeight: 800 }}>{c.value}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
