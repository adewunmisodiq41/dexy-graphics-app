const WHY = [
  {
    icon: "M12 3v6M12 15v6M3 12h6M15 12h6",
    title: "Custom, not templated",
    desc: "Every logo, banner, and layout is built for your brief — nothing pulled from a stock template pack.",
  },
  {
    icon: "M4 12l5 5L20 6",
    title: "Attention to detail",
    desc: "Alignment, spacing, colour accuracy, and print-readiness are checked before anything ships.",
  },
  {
    icon: "M3 4h18v16H3zM3 9h18",
    title: "Three services, one brand",
    desc: "Design, development, and print run through a single studio so your identity stays consistent everywhere.",
  },
  {
    icon: "M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z",
    title: "Clear communication",
    desc: "You'll always know the status of your project — updates, revisions, and delivery dates, in plain terms.",
  },
];

const STEPS = [
  { title: "Tell me your vision", desc: "Share your idea, business, or project requirements — as much or as little detail as you have." },
  { title: "Plan & design", desc: "I develop the concept and build the design, website, or print artwork around it." },
  { title: "Review & refine", desc: "You review the work and request changes until it fits exactly what you had in mind." },
  { title: "Final delivery", desc: "The completed design, website, or print-ready artwork is delivered in the formats you need." },
];

export default function WhyProcess() {
  return (
    <>
      <section className="section-pad rule">
        <div className="wrap">
          <div className="head-row">
            <h2>Your vision. My creative skills.</h2>
          </div>
          <div className="grid-why">
            {WHY.map((w) => (
              <div className="why-card" key={w.title}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                  <path d={w.icon} />
                </svg>
                <h4>{w.title}</h4>
                <p>{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad rule">
        <div className="wrap">
          <div className="head-row">
            <h2>How it works</h2>
          </div>
          <div>
            {STEPS.map((s, i) => (
              <div className="process-item" key={s.title}>
                <span className="process-num">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
