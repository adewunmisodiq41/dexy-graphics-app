"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { put, del } from "@vercel/blob";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth, signIn, signOut } from "@/lib/auth";

async function requireAdmin() {
  const session = await auth();
  if (!session) throw new Error("Not authorized");
  return session;
}

// ---------------- PUBLIC: contact form ----------------

const inquirySchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().email("Enter a valid email"),
  whatsapp: z.string().optional(),
  service: z.string().min(1, "Select a service"),
  budget: z.string().optional(),
  details: z.string().min(1, "Tell us a bit about the project"),
});

export type InquiryFormState = {
  ok: boolean;
  message: string;
};

export async function submitInquiry(
  _prev: InquiryFormState,
  formData: FormData
): Promise<InquiryFormState> {
  const raw = {
    fullName: formData.get("fullName")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    whatsapp: formData.get("whatsapp")?.toString() || "",
    service: formData.get("service")?.toString() || "",
    budget: formData.get("budget")?.toString() || "",
    details: formData.get("details")?.toString() || "",
  };

  const parsed = inquirySchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message || "Please check the form and try again." };
  }

  let fileUrl: string | undefined;
  const file = formData.get("file") as File | null;
  if (file && file.size > 0) {
    try {
      const blob = await put(`inquiries/${Date.now()}-${file.name}`, file, {
        access: "public",
        storeId: process.env.dexy2_STORE_ID,
      });
      fileUrl = blob.url;
    } catch {
      // If Blob isn't configured yet, continue without the attachment
      fileUrl = undefined;
    }
  }

  await prisma.inquiry.create({
    data: {
      fullName: parsed.data.fullName,
      email: parsed.data.email,
      whatsapp: parsed.data.whatsapp || undefined,
      service: parsed.data.service,
      budget: parsed.data.budget || undefined,
      details: parsed.data.details,
      fileUrl,
    },
  });

  return { ok: true, message: "Thanks — your inquiry has been sent. I'll get back to you shortly." };
}

// ---------------- ADMIN: auth ----------------

export async function adminSignIn(_prev: { error?: string } | undefined, formData: FormData) {
  const email = formData.get("email")?.toString();
  const password = formData.get("password")?.toString();
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/admin",
    });
  } catch (err) {
    if (err instanceof Error && err.message.includes("NEXT_REDIRECT")) throw err;
    return { error: "Invalid email or password." };
  }
  return { error: undefined };
}

export async function adminSignOut() {
  await signOut({ redirectTo: "/admin/login" });
}

// ---------------- ADMIN: image upload ----------------

export async function uploadImage(formData: FormData): Promise<{ url?: string; error?: string }> {
  await requireAdmin();
  const file = formData.get("file") as File | null;
  if (!file || file.size === 0) return { error: "No file provided" };
  try {
    const blob = await put(`uploads/${Date.now()}-${file.name}`, file, {
      access: "public",
      storeId: process.env.dexy2_STORE_ID,
    });
    return { url: blob.url };
  } catch (err) {
    console.error("Blob upload failed:", err);
    const message = err instanceof Error ? err.message : "Unknown error";
    return { error: `Upload failed: ${message}` };
  }
}

// ---------------- ADMIN: design projects ----------------

const designSchema = z.object({
  title: z.string().min(1),
  category: z.enum(["LOGOS", "PEDIGREE", "BREEDING", "STUD", "ANIMATED", "BRANDING"]),
  description: z.string().min(1),
  imageUrl: z.string().optional(),
  published: z.boolean().default(true),
});

export async function saveDesignProject(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  const parsed = designSchema.parse({
    title: formData.get("title"),
    category: formData.get("category"),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl")?.toString() || undefined,
    published: formData.get("published") === "on",
  });

  if (id) {
    await prisma.designProject.update({ where: { id }, data: parsed });
  } else {
    await prisma.designProject.create({ data: parsed });
  }
  revalidatePath("/admin/design");
  revalidatePath("/");
  redirect("/admin/design");
}

export async function deleteDesignProject(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.designProject.delete({ where: { id } });
  revalidatePath("/admin/design");
  revalidatePath("/");
}

// ---------------- ADMIN: web projects ----------------

const webSchema = z.object({
  title: z.string().min(1),
  category: z.enum(["BUSINESS", "KENNEL", "ECOMMERCE", "PORTFOLIO", "LANDING_PAGE", "CUSTOM"]),
  description: z.string().min(1),
  imageUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  published: z.boolean().default(true),
});

export async function saveWebProject(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  const parsed = webSchema.parse({
    title: formData.get("title"),
    category: formData.get("category"),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl")?.toString() || undefined,
    liveUrl: formData.get("liveUrl")?.toString() || undefined,
    published: formData.get("published") === "on",
  });

  if (id) {
    await prisma.webProject.update({ where: { id }, data: parsed });
  } else {
    await prisma.webProject.create({ data: parsed });
  }
  revalidatePath("/admin/web");
  revalidatePath("/");
  redirect("/admin/web");
}

export async function deleteWebProject(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.webProject.delete({ where: { id } });
  revalidatePath("/admin/web");
  revalidatePath("/");
}

// ---------------- ADMIN: print products ----------------

const printSchema = z.object({
  name: z.string().min(1),
  spec: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().optional(),
  published: z.boolean().default(true),
});

export async function savePrintProduct(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  const parsed = printSchema.parse({
    name: formData.get("name"),
    spec: formData.get("spec"),
    description: formData.get("description"),
    imageUrl: formData.get("imageUrl")?.toString() || undefined,
    published: formData.get("published") === "on",
  });

  if (id) {
    await prisma.printProduct.update({ where: { id }, data: parsed });
  } else {
    await prisma.printProduct.create({ data: parsed });
  }
  revalidatePath("/admin/print");
  revalidatePath("/");
  redirect("/admin/print");
}

export async function deletePrintProduct(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.printProduct.delete({ where: { id } });
  revalidatePath("/admin/print");
  revalidatePath("/");
}

// ---------------- ADMIN: testimonials ----------------

const testimonialSchema = z.object({
  clientName: z.string().min(1),
  clientRole: z.string().optional(),
  quote: z.string().min(1),
  avatarUrl: z.string().optional(),
  published: z.boolean().default(true),
});

export async function saveTestimonial(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  const parsed = testimonialSchema.parse({
    clientName: formData.get("clientName"),
    clientRole: formData.get("clientRole")?.toString() || undefined,
    quote: formData.get("quote"),
    avatarUrl: formData.get("avatarUrl")?.toString() || undefined,
    published: formData.get("published") === "on",
  });

  if (id) {
    await prisma.testimonial.update({ where: { id }, data: parsed });
  } else {
    await prisma.testimonial.create({ data: parsed });
  }
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
  redirect("/admin/testimonials");
}

export async function deleteTestimonial(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  if (!id) return;
  await prisma.testimonial.delete({ where: { id } });
  revalidatePath("/admin/testimonials");
  revalidatePath("/");
}

// ---------------- ADMIN: inquiries ----------------

export async function updateInquiryStatus(formData: FormData) {
  await requireAdmin();
  const id = formData.get("id")?.toString();
  const status = formData.get("status")?.toString();
  if (!id || !status) return;
  await prisma.inquiry.update({
    where: { id },
    data: { status: status as "NEW" | "IN_PROGRESS" | "DONE" | "ARCHIVED" },
  });
  revalidatePath("/admin/inquiries");
}

// ---------------- ADMIN: site settings ----------------

const settingsSchema = z.object({
  brandName: z.string().min(1),
  heroHeadline: z.string().min(1),
  heroSubtext: z.string().min(1),
  email: z.string().email(),
  whatsapp: z.string().min(1),
  location: z.string().min(1),
  instagramUrl: z.string().optional(),
  logoUrl: z.string().optional(),
});

export async function saveSettings(formData: FormData) {
  await requireAdmin();
  const parsed = settingsSchema.parse({
    brandName: formData.get("brandName"),
    heroHeadline: formData.get("heroHeadline"),
    heroSubtext: formData.get("heroSubtext"),
    email: formData.get("email"),
    whatsapp: formData.get("whatsapp"),
    location: formData.get("location"),
    instagramUrl: formData.get("instagramUrl")?.toString() || undefined,
    logoUrl: formData.get("logoUrl")?.toString() || undefined,
  });

  await prisma.siteSettings.upsert({
    where: { id: "settings" },
    update: parsed,
    create: { id: "settings", ...parsed },
  });
  revalidatePath("/admin/settings");
  revalidatePath("/");
}

export { del as deleteBlob };
