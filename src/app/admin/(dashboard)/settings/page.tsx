import { prisma } from "@/lib/prisma";
import { saveSettings } from "@/lib/actions";

export const revalidate = 0;

export default async function SettingsAdminPage() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: "settings" },
    update: {},
    create: { id: "settings" },
  });

  return (
    <div>
      <h1 className="h-display" style={{ fontSize: 30, marginBottom: 24 }}>
        Site Settings
      </h1>

      <form action={saveSettings} className="admin-card">
        <div className="field">
          <label htmlFor="brandName">Brand name</label>
          <input id="brandName" name="brandName" required defaultValue={settings.brandName} />
        </div>
        <div className="field">
          <label htmlFor="heroHeadline">Hero headline</label>
          <textarea id="heroHeadline" name="heroHeadline" required defaultValue={settings.heroHeadline} />
        </div>
        <div className="field">
          <label htmlFor="heroSubtext">Hero supporting text</label>
          <textarea id="heroSubtext" name="heroSubtext" required defaultValue={settings.heroSubtext} />
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="email">Contact email</label>
            <input id="email" name="email" type="email" required defaultValue={settings.email} />
          </div>
          <div className="field">
            <label htmlFor="whatsapp">WhatsApp number</label>
            <input id="whatsapp" name="whatsapp" required defaultValue={settings.whatsapp} placeholder="+234 000 000 0000" />
          </div>
        </div>
        <div className="field">
          <label htmlFor="location">Location</label>
          <input id="location" name="location" required defaultValue={settings.location} />
        </div>
        <div className="field">
          <label htmlFor="instagramUrl">Instagram URL (optional)</label>
          <input id="instagramUrl" name="instagramUrl" defaultValue={settings.instagramUrl || ""} placeholder="https://instagram.com/yourhandle" />
        </div>
        <button type="submit" className="btn btn-solid">
          Save Settings
        </button>
      </form>
    </div>
  );
}
