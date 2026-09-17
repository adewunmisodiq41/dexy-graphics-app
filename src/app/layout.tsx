import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
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

export const metadata: Metadata = {
  title: "Dexy Graphics — Design, Web & Print Studio",
  description:
    "Dexy Graphics is a one-studio creative practice offering logo & brand design, kennel and pedigree graphics, web development, and custom printing.",
  openGraph: {
    title: "Dexy Graphics — Design, Web & Print Studio",
    description:
      "Logo design, breeding & kennel graphics, websites, and custom printing — one studio, every deliverable.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${archivo.variable} ${jetbrainsMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
