# Dexy Graphics — Website + Admin Dashboard

A full production codebase for the Dexy Graphics creative studio site: public marketing site
(design/web/print portfolio, testimonials, contact form) plus a password-protected admin
dashboard for managing all of it, backed by a real database.

**Stack:** Next.js 15 (App Router, TypeScript) · Prisma ORM · PostgreSQL (Neon) · NextAuth v5
(credentials login) · Vercel Blob (image uploads) · Tailwind CSS — the same stack pattern used
for the Fleet Manager and kennel/breeder site projects, deployed on Vercel with a Neon database.

## What's included

- **Public site** (`/`) — hero, about, services, filterable graphic-design portfolio with a
  project modal, web-development portfolio, printing product grid, process, testimonials, and a
  contact form that saves every inquiry to the database.
- **Admin dashboard** (`/admin`) — single login, protected by middleware. Full CRUD for:
  - Design portfolio (logos, pedigree/breeding/stud/animated banners, branding)
  - Web portfolio (screenshots, live links)
  - Printing products
  - Testimonials
  - Site settings (brand name, hero copy, about text, email/WhatsApp/location)
  - Inquiries (view every submission, mark status: New / In Progress / Done / Archived)
- Image uploads anywhere in the admin (portfolio images, screenshots, testimonial photos) go
  straight to **Vercel Blob** and the URL is stored in Postgres.

## 1. Local setup

```bash
npm install
cp .env.example .env
```

Fill in `.env`:

| Variable | Where to get it |
|---|---|
| `DATABASE_URL` / `DIRECT_URL` | Neon dashboard → your project → **Connect** (use the pooled string for `DATABASE_URL`, the direct/unpooled one for `DIRECT_URL`) |
| `AUTH_SECRET` | Run `npx auth secret` or `openssl rand -base64 32` |
| `NEXTAUTH_URL` | `http://localhost:3000` locally; your live URL in production |
| `BLOB_READ_WRITE_TOKEN` | Vercel project → **Storage** tab → create a Blob store → copy the token |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` | Whatever you want your first admin login to be — used only by the seed script |

Then create the database tables and seed starter content + your admin login:

```bash
npx prisma migrate dev --name init
npm run db:seed
npm run dev
```

Visit `http://localhost:3000` for the site and `http://localhost:3000/admin` to log in with the
`ADMIN_EMAIL` / `ADMIN_PASSWORD` you set.

> `npm install` also runs `prisma generate` automatically (see the `postinstall` script) — it
> needs a normal internet connection to fetch Prisma's query engine the first time.

## 2. Set up Neon (if you haven't already)

1. Create a project at [neon.tech](https://neon.tech) (or a new database inside your existing
   account, same as the other projects).
2. From the connection details, copy the **pooled** connection string into `DATABASE_URL` and the
   **direct** connection string into `DIRECT_URL`.

## 3. Deploy to Vercel

1. Push this repo to GitHub.
2. Import it into Vercel.
3. Add the same environment variables from `.env` in the Vercel project's **Settings → Environment
   Variables** (`DATABASE_URL`, `DIRECT_URL`, `AUTH_SECRET`, `NEXTAUTH_URL` set to your production
   domain, `BLOB_READ_WRITE_TOKEN`).
4. Create a **Blob store** under the project's **Storage** tab if you haven't already, and copy its
   token into `BLOB_READ_WRITE_TOKEN`.
5. Deploy. Vercel runs `npm run build`, which runs `prisma generate` then `next build`.
6. Run the migration and seed once against the production database (from your machine, with the
   production `DATABASE_URL`/`DIRECT_URL` in your local `.env`):

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

That's it — the live site reads everything from Postgres, and `/admin` lets you manage it without
touching code again.

## Editing content

Everything the static brief asked to be "editable" now lives in the database and has a form in
`/admin`:

- **Site Settings** — brand name, hero headline/subtext, about text, email, WhatsApp, location,
  Instagram link.
- **Design / Web / Print / Testimonials** — add, edit, delete, upload images, and toggle
  "Published" to hide something without deleting it.
- **Inquiries** — every contact-form submission lands here with a status you can update.

The seed data (portfolio items, testimonials) is placeholder content clearly labeled as such —
replace or delete it from `/admin` once you have real projects and client feedback to show.

## Notes / known gaps

- The contact form's optional file upload uses Vercel Blob; if `BLOB_READ_WRITE_TOKEN` isn't set,
  the inquiry still saves — just without the attachment.
- There's a single admin role — no multi-user permissions or a password-reset flow yet.
- Portfolio ordering uses a simple `order` field in the database; reordering via drag-and-drop in
  the admin isn't built yet (edit the `order` value directly via Prisma Studio — `npm run
  db:studio` — if you need to resequence).

