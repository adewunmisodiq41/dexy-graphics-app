import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { deleteDesignProject } from "@/lib/actions";
import DesignForm from "@/components/admin/DesignForm";

export const revalidate = 0;

export default async function DesignAdminPage() {
  const items = await prisma.designProject.findMany({ orderBy: { order: "asc" } });

  return (
    <div>
      <h1 className="h-display" style={{ fontSize: 30, marginBottom: 24 }}>
        Design Portfolio
      </h1>

      <div className="admin-card">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.title}</td>
                <td>{item.category}</td>
                <td>
                  <span className="badge">{item.published ? "Published" : "Hidden"}</span>
                </td>
                <td style={{ display: "flex", gap: 10 }}>
                  <Link href={`/admin/design/${item.id}`} className="btn btn-ghost btn-sm">
                    Edit
                  </Link>
                  <form action={deleteDesignProject}>
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
                  No design projects yet — add one below.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <h2 style={{ fontSize: 18, fontWeight: 700, margin: "30px 0 14px" }}>Add a new project</h2>
      <DesignForm />
    </div>
  );
}
