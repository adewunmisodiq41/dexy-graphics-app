import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { prisma } from "@/lib/prisma";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const settings = await prisma.siteSettings
    .findUnique({ where: { id: "settings" } })
    .catch(() => null);

  const brandName = settings?.brandName || "Dexy Graphics";

  return {
    title: `${brandName} — Design, Web & Print Studio`,
    description:
      "A one-studio creative practice offering logo & brand design, kennel and pedigree graphics, web development, and custom printing.",
    openGraph: {
      title: `${brandName} — Design, Web & Print Studio`,
      description:
        "Logo design, breeding & kennel graphics, websites, and custom printing — one studio, every deliverable.",
      type: "website",
    },
    icons: settings?.logoUrl
      ? { icon: settings.logoUrl, shortcut: settings.logoUrl, apple: settings.logoUrl }
      : undefined,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');document.documentElement.setAttribute('data-theme', t === 'dark' ? 'dark' : 'light');}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`,
          }}
        />
      </head>
      <body className={`${archivo.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
