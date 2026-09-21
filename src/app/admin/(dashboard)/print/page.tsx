import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deletePrintProduct } from "@/lib/actions";
import PrintForm from "@/components/admin/PrintForm";

export const revalidate = 0;

export default async function PrintAdminPage() {
  const items = await prisma.printProduct.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="h-display" style={{ fontSize: 30, marginBottom: 24 }}>
        Printing Products
      </h1>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Spec</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.name}</td>
                <td>{item.spec}</td>
                <td>
                  <span className="badge">{item.published ? "Published" : "Hidden"}</span>
                </td>
                <td style={{ display: "flex", gap: 10 }}>
                  <Link href={`/admin/print/${item.id}`} className="btn btn-ghost btn-sm">
                    Edit
                  </Link>
                  <form action={deletePrintProduct}>
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
                  No print products yet — add one below.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, margin: "30px 0 14px" }}>Add a new product</h2>
      <PrintForm />
    </div>
  );
}
