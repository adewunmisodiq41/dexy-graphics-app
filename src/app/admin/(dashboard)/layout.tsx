import Link from "next/link";
import { adminSignOut } from "@/lib/actions";

const LINKS = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/design", label: "Design Portfolio" },
  { href: "/admin/web", label: "Web Portfolio" },
  { href: "/admin/print", label: "Printing" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/settings", label: "Site Settings" },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="admin-shell">
      <div className="admin-nav">
        <div className="admin-nav-links">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Link href="/" target="_blank" style={{ fontSize: 13, color: "var(--fg-soft)" }}>
            View site ↗
          </Link>
          <form action={adminSignOut}>
            <button className="btn btn-ghost btn-sm" type="submit">
              Sign Out
            </button>
          </form>
        </div>
      </div>
      <div className="admin-body">{children}</div>
    </div>
  );
}
