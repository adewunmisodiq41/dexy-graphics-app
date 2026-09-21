import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteTestimonial } from "@/lib/actions";
import TestimonialForm from "@/components/admin/TestimonialForm";

export const revalidate = 0;

export default async function TestimonialsAdminPage() {
  const items = await prisma.testimonial.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="h-display" style={{ fontSize: 30, marginBottom: 24 }}>
        Testimonials
      </h1>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Client</th>
              <th>Quote</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.clientName}</td>
                <td style={{ maxWidth: 320 }}>{item.quote.slice(0, 60)}{item.quote.length > 60 ? "…" : ""}</td>
                <td>
                  <span className="badge">{item.published ? "Published" : "Hidden"}</span>
                </td>
                <td style={{ display: "flex", gap: 10 }}>
                  <Link href={`/admin/testimonials/${item.id}`} className="btn btn-ghost btn-sm">
                    Edit
                  </Link>
                  <form action={deleteTestimonial}>
                    <input type="hidden" name="id" value={item.id} />
                    <button type="submit" className="btn btn-ghost btn-sm">
                      Delete
                    </button>
                  </form>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={4} style={{ color: "var(--fg-soft)" }}>
                  No testimonials yet — add one below.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, margin: "30px 0 14px" }}>Add a testimonial</h2>
      <TestimonialForm />
    </div>
  );
}
