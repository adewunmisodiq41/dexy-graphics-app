export default function Hero({
  headline,
  subtext,
}: {
  headline: string;
  subtext: string;
}) {
  const lines = headline
    .split(".")
    .map((l) => l.trim())
    .filter(Boolean);

  return (
    <section className="hero" id="hero">
      <div className="wrap hero-grid">
        <div>
          <div className="hero-eyebrow">
            <span className="rule-short"></span> Design · Web · Print — one studio
          </div>
          <h1 className="h-display">
            {lines.map((line, i) => {
              const isLast = i === lines.length - 1;
              const words = line.split(" ");
              const lastWord = words.pop();
              return (
                <span className="row" key={i}>
                  {isLast && lastWord ? (
                    <>
                      {words.join(" ")}{" "}
                      <span className="accent-word">{lastWord}</span>.
                    </>
                  ) : (
                    line + "."
                  )}
                </span>
              );
            })}
          </h1>
          <p className="hero-sub">{subtext}</p>
          <div className="hero-cta">
            <a href="#portfolio" className="btn btn-solid">
              View My Work <span className="btn-arrow">→</span>
            </a>
            <a href="#contact" className="btn btn-ghost">
              Start a Project
            </a>
          </div>
        </div>

        <div className="hero-stack" aria-hidden="true">
          <div className="job-card card-1">
            <div className="ticket-top">
              <span className="ticket-title">Job Ticket 001</span>
              <svg className="regmark" viewBox="0 0 16 16">
                <circle cx="8" cy="8" r="6.4" fill="none" strokeWidth="1.1" />
                <line x1="8" y1="0" x2="8" y2="3.2" strokeWidth="1.1" />
                <line x1="8" y1="12.8" x2="8" y2="16" strokeWidth="1.1" />
                <line x1="0" y1="8" x2="3.2" y2="8" strokeWidth="1.1" />
                <line x1="12.8" y1="8" x2="16" y2="8" strokeWidth="1.1" />
              </svg>
            </div>
            <div className="spec">LOGO DESIGN / BRAND MARK</div>
            <div className="swatch-row">
              <div className="swatch" style={{ background: "var(--ink)" }}></div>
              <div className="swatch" style={{ background: "var(--accent)" }}></div>
              <div className="swatch" style={{ background: "var(--gold)" }}></div>
              <div className="swatch" style={{ background: "var(--paper-2)", borderColor: "var(--border-strong)" }}></div>
            </div>
            <div className="crop tl"></div>
            <div className="crop br"></div>
          </div>

          <div className="job-card card-2">
            <div className="ticket-top">
              <span className="ticket-title">Job Ticket 002</span>
            </div>
            <div className="spec">WEB DEVELOPMENT / RESPONSIVE</div>
            <div className="swatch-row">
              <div className="swatch" style={{ background: "var(--bg-sunken)", width: "100%", height: 34, borderRadius: 2 }}></div>
            </div>
            <div className="crop tl"></div>
            <div className="crop br"></div>
          </div>

          <div className="job-card card-3">
            <div className="ticket-top">
              <span className="ticket-title">Job Ticket 003</span>
            </div>
            <div className="spec">PEDIGREE / KENNEL BANNER</div>
            <div className="swatch-row">
              <div className="swatch" style={{ background: "var(--accent)" }}></div>
              <div className="swatch" style={{ background: "var(--ink)" }}></div>
            </div>
            <div className="crop tl"></div>
            <div className="crop br"></div>
          </div>

          <div className="job-card card-4">
            <div className="ticket-top">
              <span className="ticket-title">Print</span>
            </div>
            <div className="spec">CMYK / 300 DPI</div>
            <div className="crop tl"></div>
            <div className="crop br"></div>
          </div>
        </div>
      </div>

      <div className="hero-strip">
        <div className="marquee">
          <div className="marquee-track">
            {Array.from({ length: 2 }).map((_, i) => (
              <span key={i} style={{ display: "contents" }}>
                <span>Logo Design</span>
                <span>Kennel &amp; Pedigree Graphics</span>
                <span>Web Development</span>
                <span>Custom Printing</span>
                <span>Brand Identity</span>
                <span>Motion Banners</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
