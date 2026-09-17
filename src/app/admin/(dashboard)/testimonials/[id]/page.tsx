import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import TestimonialForm from "@/components/admin/TestimonialForm";

export const revalidate = 0;

export default async function EditTestimonial({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.testimonial.findUnique({ where: { id } });
  if (!item) notFound();

  return (
    <div>
      <h1 className="h-display" style={{ fontSize: 30, marginBottom: 24 }}>
        Edit Testimonial
      </h1>
      <TestimonialForm initial={item} />
    </div>
  );
}
