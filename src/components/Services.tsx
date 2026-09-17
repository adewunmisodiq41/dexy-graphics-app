const SERVICES = [
  {
    tag: "01 — GRAPHIC DESIGN",
    title: "Graphic Design",
    desc: "From professional logos to custom promotional graphics, I create designs that represent your brand and communicate your vision — including specialised work for dog breeders and kennels.",
    chips: ["Logo Design", "Pedigree Banners", "Breeding Banners", "Stud Banners", "Animated Banners", "Brand Graphics"],
    cta: "Explore Graphic Design",
    href: "#portfolio",
  },
  {
    tag: "02 — WEB DEVELOPMENT",
    title: "Web Development",
    desc: "Modern, responsive websites designed and built to help your business establish a strong, credible online presence — for any industry, not only dog breeders.",
    chips: ["Business Websites", "Kennel Websites", "E-commerce", "Portfolio Sites", "Landing Pages", "Custom Builds"],
    cta: "Explore Web Development",
    href: "#web-portfolio",
  },
  {
    tag: "03 — PRINTING",
    title: "Printing Services",
    desc: "Turn your brand into physical products with custom printing and branded materials, ready for events, retail, or everyday business use.",
    chips: ["Tents", "Caps", "Bags", "Stickers", "Rugs", "T-Shirts"],
    cta: "Explore Printing",
    href: "#printing",
  },
];

export default function Services() {
  return (
    <section className="section-pad rule" id="services">
      <div className="wrap">
        <div className="head-row">
          <h2>What I do</h2>
          <p className="head-note">Three disciplines, one workflow — pick one service or combine them into a single brand rollout.</p>
        </div>

        {SERVICES.map((s) => (
          <div className="service-row" key={s.title}>
            <div className="service-head">
              <div>
                <span className="stag">{s.tag}</span>
                <h3>{s.title}</h3>
              </div>
            </div>
            <div className="service-body">
              <p>{s.desc}</p>
              <div className="chip-row">
                {s.chips.map((c) => (
                  <span className="chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>
              <a href={s.href} className="btn btn-ghost btn-sm">
                {s.cta} <span className="btn-arrow">→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
