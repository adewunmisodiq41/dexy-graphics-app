import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import DesignForm from "@/components/admin/DesignForm";

export const revalidate = 0;

export default async function EditDesignProject({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.designProject.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="h-display" style={{ fontSize: 30, marginBottom: 24 }}>
        Edit Project
      </h1>
      <DesignForm initial={item} />
    </div>
  );
}
