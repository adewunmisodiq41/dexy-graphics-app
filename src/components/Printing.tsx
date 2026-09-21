import MediaThumb from "./MediaThumb";
import RequestQuoteButton from "./RequestQuoteButton";

export type PrintItem = {
  id: string;
  name: string;
  spec: string;
  description: string;
  imageUrl?: string | null;
};

const ICONS: Record<string, string> = {
  "Event Tents": "M4 20h16M6 20V9l6-5 6 5v11",
  "Custom Caps": "M4 14a8 8 0 0116 0M2 14h20M12 6v0",
  "Branded Bags": "M6 8h12l-1 12H7L6 8zM9 8V6a3 3 0 016 0v2",
  "Stickers": "M12 3l2.5 5 5.5.8-4 3.9.9 5.5L12 15.8 7.1 18.2 8 12.7 4 8.8l5.5-.8L12 3z",
  "Branded Rugs": "M4 5h16v14H4zM4 9h16M8 9v10",
  "Custom T-Shirts": "M8 4L4 7l2 3 2-1v11h8V9l2 1 2-3-4-3-2 2h-2z",
};
const DEFAULT_ICON = "M4 4h16v16H4z";

export default function Printing({ items }: { items: PrintItem[] }) {
  return (
    <section className="section-pad" id="printing">
      <div className="wrap">
        <div className="head-row">
          <h2>From digital design to physical branding.</h2>
          <p className="head-note">Select a product, describe what you need, and I&apos;ll follow up with a quote — no fixed pricing shown, every job is scoped to spec.</p>
        </div>

        <div className="grid-print">
          {items.map((item) => (
            <div className="print-card" key={item.id}>
              {item.imageUrl ? (
                <div style={{ position: "relative", aspectRatio: "4/3", borderRadius: "var(--radius-sm)", overflow: "hidden" }}>
                  <MediaThumb src={item.imageUrl} alt={item.name} sizes="(max-width:600px) 100vw, 33vw" />
                </div>
              ) : (
                <svg className="print-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                  <path d={ICONS[item.name] || DEFAULT_ICON} />
                </svg>
              )}
              <div>
                <h4>{item.name}</h4>
                <p>{item.description}</p>
              </div>
              <span className="print-spec">{item.spec}</span>
              <RequestQuoteButton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
