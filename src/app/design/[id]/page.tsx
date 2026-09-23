import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import SiteNav from "@/components/SiteNav";
import Footer from "@/components/Footer";
import MediaThumb from "@/components/MediaThumb";

export const revalidate = 0;

const CATEGORY_LABEL: Record<string, string> = {
  LOGOS: "Logo Design",
  PEDIGREE: "Pedigree Banner",
  BREEDING: "Breeding Banner",
  STUD: "Stud Banner",
  ANIMATED: "Animated Banner",
  BRANDING: "Branding",
};

function glyphFor(title: string) {
  return title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default async function DesignDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const [project, settings] = await Promise.all([
    prisma.designProject.findUnique({ where: { id } }),
    prisma.siteSettings.upsert({ where: { id: "settings" }, update: {}, create: { id: "settings" } }),
  ]);

  if (!project || !project.published) notFound();

  const gallery = [project.imageUrl, ...project.images].filter((u): u is string => Boolean(u));

  return (
    <main>
      <SiteNav brandName={settings.brandName} logoUrl={settings.logoUrl} />

      <section className="section-pad">
        <div className="wrap">
          <div className="head-row">
            <div>
              <span className="spec" style={{ color: "var(--accent)" }}>
                {CATEGORY_LABEL[project.category] || project.category}
              </span>
              <h1 className="h-display" style={{ fontSize: "clamp(30px,4.4vw,50px)", marginTop: 10 }}>
                {project.title}
              </h1>
            </div>
            {project.price != null && (
              <div style={{ textAlign: "right" }}>
                <div className="spec">STARTING AT</div>
                <div className="h-display" style={{ fontSize: 32 }}>
                  ${project.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </div>
              </div>
            )}
          </div>

          <p style={{ color: "var(--fg-soft)", fontSize: 17, maxWidth: "62ch", marginBottom: 40 }}>{project.description}</p>

          {gallery.length > 0 ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20, marginBottom: 48 }}>
              {gallery.map((url, i) => (
                <div key={url + i} style={{ position: "relative", aspectRatio: "5/4", borderRadius: "var(--radius)", overflow: "hidden", background: "var(--bg-sunken)", border: "1px solid var(--border)" }}>
                  <MediaThumb src={url} alt={`${project.title} — example ${i + 1}`} sizes="(max-width:600px) 100vw, 45vw" />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-art" style={{ marginBottom: 48, aspectRatio: "16/9" }}>
              <span className="glyph">{glyphFor(project.title)}</span>
            </div>
          )}

          <Link href="/#contact" className="btn btn-solid">
            Start a similar project →
          </Link>
        </div>
      </section>

      <Footer brandName={settings.brandName} email={settings.email} whatsapp={settings.whatsapp} instagramUrl={settings.instagramUrl} logoUrl={settings.logoUrl} />
    </main>
  );
}
