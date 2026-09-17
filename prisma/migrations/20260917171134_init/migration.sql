-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN');

-- CreateEnum
CREATE TYPE "DesignCategory" AS ENUM ('LOGOS', 'PEDIGREE', 'BREEDING', 'STUD', 'ANIMATED', 'BRANDING');

-- CreateEnum
CREATE TYPE "WebCategory" AS ENUM ('BUSINESS', 'KENNEL', 'ECOMMERCE', 'PORTFOLIO', 'LANDING_PAGE', 'CUSTOM');

-- CreateEnum
CREATE TYPE "InquiryStatus" AS ENUM ('NEW', 'IN_PROGRESS', 'DONE', 'ARCHIVED');

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "name" TEXT,
    "role" "Role" NOT NULL DEFAULT 'ADMIN',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DesignProject" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "DesignCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "images" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "published" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DesignProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebProject" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" "WebCategory" NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "liveUrl" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WebProject_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PrintProduct" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "spec" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "imageUrl" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PrintProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Testimonial" (
    "id" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientRole" TEXT,
    "quote" TEXT NOT NULL,
    "avatarUrl" TEXT,
    "published" BOOLEAN NOT NULL DEFAULT true,
    "order" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Testimonial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inquiry" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "whatsapp" TEXT,
    "service" TEXT NOT NULL,
    "budget" TEXT,
    "details" TEXT NOT NULL,
    "fileUrl" TEXT,
    "status" "InquiryStatus" NOT NULL DEFAULT 'NEW',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inquiry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SiteSettings" (
    "id" TEXT NOT NULL DEFAULT 'settings',
    "brandName" TEXT NOT NULL DEFAULT 'Dexy Graphics',
    "heroHeadline" TEXT NOT NULL DEFAULT 'Designing brands. Building websites. Bringing visions to life.',
    "heroSubtext" TEXT NOT NULL DEFAULT 'Professional graphic design, modern websites, and custom printing solutions for businesses, brands, and individuals.',
    "aboutName" TEXT NOT NULL DEFAULT 'Adewunmi Sodiq',
    "aboutLede" TEXT NOT NULL DEFAULT 'I''m Adewunmi Sodiq — the designer and developer behind Dexy Graphics.',
    "aboutBody" TEXT NOT NULL DEFAULT 'I create logos, websites, and printed branding that help businesses, breeders, and individuals present themselves with confidence.',
    "email" TEXT NOT NULL DEFAULT 'hello@dexygraphics.com',
    "whatsapp" TEXT NOT NULL DEFAULT '+234 000 000 0000',
    "location" TEXT NOT NULL DEFAULT 'Lagos, Nigeria',
    "instagramUrl" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SiteSettings_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");
