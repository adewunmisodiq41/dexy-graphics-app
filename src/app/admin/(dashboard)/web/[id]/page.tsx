import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import WebForm from "@/components/admin/WebForm";

export const revalidate = 0;

export default async function EditWebProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.webProject.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="h-display" style={{ fontSize: 30, marginBottom: 24 }}>
        Edit Web Project
      </h1>
      <WebForm initial={item} />
    </div>
  );
}
