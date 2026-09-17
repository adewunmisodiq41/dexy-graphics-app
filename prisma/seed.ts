import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  // --- Admin user ---
  const email = process.env.ADMIN_EMAIL || "admin@dexygraphics.com";
  const password = process.env.ADMIN_PASSWORD || "change-this-password";
  const passwordHash = await bcrypt.hash(password, 10);

  await prisma.adminUser.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash, name: "Adewunmi Sodiq" },
  });
  console.log(`Admin user ready: ${email}`);

  // --- Site settings (singleton) ---
  await prisma.siteSettings.upsert({
    where: { id: "settings" },
    update: {},
    create: { id: "settings" },
  });

  // --- Design projects (placeholders) ---
  const designSeed = [
    { title: "Minimalist Business Mark", category: "LOGOS", description: "A clean wordmark-and-symbol lockup built for a small business wanting a confident, modern identity." },
    { title: "Luxury Brand Refresh", category: "BRANDING", description: "A revamped identity system — logo, colour palette, and type pairing — for a premium-positioned brand." },
    { title: "Pedigree Chart Layout", category: "PEDIGREE", description: "A structured, print-ready pedigree banner designed for clarity across several generations." },
    { title: "Kennel Promotional Banner", category: "BREEDING", description: "A promotional breeding banner combining photography placeholders with kennel branding." },
    { title: "Stud Profile Banner", category: "STUD", description: "A stud showcase banner with structured stat blocks and a bold headline treatment." },
    { title: "Motion Breeding Banner", category: "ANIMATED", description: "A short motion-graphics banner for social promotion, exported for stories and reels." },
  ] as const;

  for (let i = 0; i < designSeed.length; i++) {
    const item = designSeed[i];
    const existing = await prisma.designProject.findFirst({ where: { title: item.title } });
    if (!existing) {
      await prisma.designProject.create({ data: { ...item, order: i } });
    }
  }

  // --- Web projects (placeholders) ---
  const webSeed = [
    { title: "Business Site Concept", category: "BUSINESS", description: "A responsive homepage layout for a service-based business, built mobile-first." },
    { title: "Kennel & Breeder Platform", category: "KENNEL", description: "A full breeder website concept with dogs-for-sale, pedigree, and inquiry sections." },
    { title: "E-commerce Storefront", category: "ECOMMERCE", description: "A product-grid storefront layout with cart and checkout flow scaffolding." },
    { title: "Creative Portfolio Layout", category: "PORTFOLIO", description: "A portfolio-first layout for a designer or photographer to showcase project work." },
  ] as const;

  for (let i = 0; i < webSeed.length; i++) {
    const item = webSeed[i];
    const existing = await prisma.webProject.findFirst({ where: { title: item.title } });
    if (!existing) {
      await prisma.webProject.create({ data: { ...item, order: i } });
    }
  }

  // --- Print products ---
  const printSeed = [
    { name: "Event Tents", spec: "BRANDED CANOPY / OUTDOOR", description: "Branded event tents printed and finished for outdoor use." },
    { name: "Custom Caps", spec: "EMBROIDERY / SCREEN PRINT", description: "Branded caps for teams, staff, or promotional giveaways." },
    { name: "Branded Bags", spec: "TOTE / PACKAGING", description: "Custom tote and packaging bags printed with your brand identity." },
    { name: "Stickers", spec: "DIE-CUT / VINYL", description: "Die-cut and sheet stickers for products, packaging, or promotions." },
    { name: "Branded Rugs", spec: "CUSTOM WEAVE / LOGO MAT", description: "Custom rugs and mats printed or woven with your logo for offices and events." },
    { name: "Custom T-Shirts", spec: "SCREEN PRINT / DTG", description: "Branded t-shirts for teams, events, or merchandise runs." },
  ];

  for (let i = 0; i < printSeed.length; i++) {
    const item = printSeed[i];
    const existing = await prisma.printProduct.findFirst({ where: { name: item.name } });
    if (!existing) {
      await prisma.printProduct.create({ data: { ...item, order: i } });
    }
  }

  // --- Testimonials (placeholders — clearly marked, replace with real feedback) ---
  const testimonialSeed = [
    { clientName: "Client name", clientRole: "Business / project type", quote: "This space is reserved for a genuine client testimonial once the first reviews come in." },
    { clientName: "Client name", clientRole: "Business / project type", quote: "Add a short quote about the logo, website, or print job once it's delivered and approved." },
  ];

  for (let i = 0; i < testimonialSeed.length; i++) {
    const item = testimonialSeed[i];
    const existing = await prisma.testimonial.findFirst({ where: { quote: item.quote } });
    if (!existing) {
      await prisma.testimonial.create({ data: { ...item, order: i } });
    }
  }

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
