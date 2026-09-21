"use client";

import { useState } from "react";
import Image from "next/image";

export type DesignItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string | null;
};

const CATEGORY_LABEL: Record<string, string> = {
  ALL: "All",
  LOGOS: "Logos",
  PEDIGREE: "Pedigree Banners",
  BREEDING: "Breeding Banners",
  STUD: "Stud Banners",
  ANIMATED: "Animated Banners",
  BRANDING: "Branding",
};

const FILTERS = ["ALL", "LOGOS", "PEDIGREE", "BREEDING", "STUD", "ANIMATED", "BRANDING"];

function glyphFor(title: string) {
  return title
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export default function PortfolioSection({ items }: { items: DesignItem[] }) {
  const [filter, setFilter] = useState("ALL");
  const [active, setActive] = useState<DesignItem | null>(null);

  const visible = filter === "ALL" ? items : items.filter((i) => i.category === filter);

  return (
    <section className="section-pad" id="portfolio">
      <div className="wrap">
        <div className="head-row">
          <h2>Designs that speak for your brand.</h2>
          <p className="head-note">A running record of logo, banner, and brand work — filter by category or open any piece for the full brief.</p>
        </div>

        <div className="filter-bar">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-btn${filter === f ? " active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {CATEGORY_LABEL[f]}
            </button>
          ))}
        </div>

        {visible.length === 0 ? (
          <p style={{ color: "var(--fg-soft)" }}>No projects in this category yet — check back soon.</p>
        ) : (
          <div className="grid-portfolio">
            {visible.map((item) => (
              <div className="p-card" key={item.id} onClick={() => setActive(item)}>
                <div className="p-art">
                  {item.imageUrl ? (
                    <Image src={item.imageUrl} alt={item.title} fill sizes="(max-width:600px) 100vw, 33vw" />
                  ) : (
                    <span className="glyph">{glyphFor(item.title)}</span>
                  )}
                </div>
                <div className="p-meta">
                  <div>
                    <h4>{item.title}</h4>
                    <span className="cat">{CATEGORY_LABEL[item.category]}</span>
                  </div>
                  <span className="go">↗</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {active && (
        <div className="modal-backdrop" onClick={() => setActive(null)}>
          <div className="modal-box" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setActive(null)} aria-label="Close">
              ✕
            </button>
            <div className="modal-art">
              {active.imageUrl ? (
                <Image src={active.imageUrl} alt={active.title} fill sizes="640px" />
              ) : (
                <span className="glyph">{glyphFor(active.title)}</span>
              )}
            </div>
            <span className="cat">{CATEGORY_LABEL[active.category]}</span>
            <h3>{active.title}</h3>
            <p>
              {active.description}
              {!active.imageUrl && " Placeholder artwork — replace with the real project image."}
            </p>
            <a href="#contact" className="btn btn-solid btn-sm" onClick={() => setActive(null)}>
              Start a similar project →
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
