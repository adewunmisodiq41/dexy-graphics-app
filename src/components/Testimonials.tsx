"use client";

import { useRef } from "react";
import { isVideoUrl } from "@/lib/media";

export type TestimonialItem = {
  id: string;
  clientName: string;
  clientRole?: string | null;
  quote: string;
  avatarUrl?: string | null;
};

export default function Testimonials({ items }: { items: TestimonialItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: 1 | -1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector<HTMLDivElement>(".testi-card");
    const amount = (card?.offsetWidth || 400) + 24;
    track.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  if (items.length === 0) return null;

  return (
    <section className="section-pad rule">
      <div className="wrap">
        <div className="head-row">
          <h2>What my clients say</h2>
        </div>
        <div className="testi-wrap">
          <div className="testi-track" ref={trackRef}>
            {items.map((t) => {
              const isPlaceholder = t.clientName === "Client name";
              return (
                <div className="testi-card" key={t.id}>
                  {isPlaceholder && <span className="testi-tag">PLACEHOLDER — REPLACE WITH REAL FEEDBACK</span>}
                  <p className="testi-quote">&quot;{t.quote}&quot;</p>
                  <div className="testi-who">
                    <div className="testi-avatar">
                      {t.avatarUrl ? (
                        isVideoUrl(t.avatarUrl) ? (
                          <video src={t.avatarUrl} muted loop autoPlay playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={t.avatarUrl} alt={t.clientName} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        )
                      ) : (
                        "—"
                      )}
                    </div>
                    <div>
                      <div className="testi-name">{t.clientName}</div>
                      {t.clientRole && <div className="testi-role">{t.clientRole}</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="testi-nav">
            <button onClick={() => scroll(-1)} aria-label="Previous">
              ←
            </button>
            <button onClick={() => scroll(1)} aria-label="Next">
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
