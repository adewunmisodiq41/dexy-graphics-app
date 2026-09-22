import { prisma } from "@/lib/prisma";
import SiteNav from "@/components/SiteNav";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import PortfolioSection from "@/components/PortfolioSection";
import WebPortfolio from "@/components/WebPortfolio";
import Printing from "@/components/Printing";
import WhyProcess from "@/components/WhyProcess";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const revalidate = 0;

async function getData() {
  const [settings, design, web, print, testimonials] = await Promise.all([
    prisma.siteSettings.upsert({
      where: { id: "settings" },
      update: {},
      create: { id: "settings" },
    }),
    prisma.designProject.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    prisma.webProject.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    prisma.printProduct.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
    prisma.testimonial.findMany({ where: { published: true }, orderBy: { order: "asc" } }),
  ]);
  return { settings, design, web, print, testimonials };
}

export default async function Home() {
  const { settings, design, web, print, testimonials } = await getData();

  return (
    <main>
      <SiteNav brandName={settings.brandName} logoUrl={settings.logoUrl} />
      <Hero headline={settings.heroHeadline} subtext={settings.heroSubtext} />
      <Services />
      <PortfolioSection items={design} />
      <WebPortfolio items={web} />
      <Printing items={print} />
      <WhyProcess />
      <Testimonials items={testimonials} />
      <Contact email={settings.email} whatsapp={settings.whatsapp} location={settings.location} />
      <Footer brandName={settings.brandName} email={settings.email} whatsapp={settings.whatsapp} instagramUrl={settings.instagramUrl} logoUrl={settings.logoUrl} />
    </main>
  );
}
