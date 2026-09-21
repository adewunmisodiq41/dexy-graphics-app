import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import PrintForm from "@/components/admin/PrintForm";

export const revalidate = 0;

export default async function EditPrintProduct({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.printProduct.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="h-display" style={{ fontSize: 30, marginBottom: 24 }}>
        Edit Print Product
      </h1>
      <PrintForm initial={item} />
    </div>
  );
}
