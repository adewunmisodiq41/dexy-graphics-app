export default function About({
  name,
  lede,
  body,
}: {
  name: string;
  lede: string;
  body: string;
}) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <section className="section-pad" id="about">
      <div className="wrap about-grid">
        <div className="contact-sheet">
          <span className="initials">{initials}</span>
          <span className="frame-label spec">FRAME 01 / STUDIO PORTRAIT</span>
          <span className="frame-label-r spec">EDIT: ADD PHOTO</span>
          <div className="crop tl"></div>
          <div className="crop tr"></div>
          <div className="crop bl"></div>
          <div className="crop br"></div>
        </div>
        <div className="about-copy">
          <h2 className="h-display" style={{ fontSize: "clamp(28px,4vw,44px)", marginBottom: 22 }}>
            More than design. I build ideas into reality.
          </h2>
          <p className="lede">{lede}</p>
          <p>{body}</p>
          <ul className="principle-list">
            <li>
              <span className="p-num">01</span>
              <div>
                <h4>One studio, every deliverable</h4>
                <p>Design, development, and print are handled together, so your brand looks and feels the same everywhere it shows up.</p>
              </div>
            </li>
            <li>
              <span className="p-num">02</span>
              <div>
                <h4>Built on real engineering</h4>
                <p>A background in electronics and computer engineering shapes how sites and systems are structured — not just how they look.</p>
              </div>
            </li>
            <li>
              <span className="p-num">03</span>
              <div>
                <h4>Direct communication</h4>
                <p>You work with the person actually designing and building — no account managers, no relay chain, no guesswork.</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
