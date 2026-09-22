import Image from "next/image";

const BrandMark = () => (
  <svg className="mark" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="13" r="11" stroke="currentColor" strokeWidth="1.4" />
    <line x1="13" y1="1" x2="13" y2="7" stroke="currentColor" strokeWidth="1.4" />
    <line x1="13" y1="19" x2="13" y2="25" stroke="currentColor" strokeWidth="1.4" />
    <line x1="1" y1="13" x2="7" y2="13" stroke="currentColor" strokeWidth="1.4" />
    <line x1="19" y1="13" x2="25" y2="13" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="13" cy="13" r="2.6" fill="currentColor" />
  </svg>
);

function Logo({ logoUrl }: { logoUrl?: string | null }) {
  if (logoUrl) {
    return (
      <span className="mark" style={{ position: "relative", display: "inline-block", overflow: "hidden", borderRadius: 4 }}>
        <Image src={logoUrl} alt="" fill sizes="26px" style={{ objectFit: "contain" }} />
      </span>
    );
  }
  return <BrandMark />;
}

export default function Footer({
  brandName,
  email,
  whatsapp,
  instagramUrl,
  logoUrl,
}: {
  brandName: string;
  email: string;
  whatsapp: string;
  instagramUrl?: string | null;
  logoUrl?: string | null;
}) {
  const waLink = `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`;
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="brand">
              <Logo logoUrl={logoUrl} />
              {brandName}
            </div>
            <p>A one-studio creative practice — logo &amp; brand design, kennel and pedigree graphics, web development, and custom printing.</p>
          </div>
          <div>
            <h5>Navigate</h5>
            <ul>
              <li>
                <a href="#about">About</a>
              </li>
              <li>
                <a href="#services">Services</a>
              </li>
              <li>
                <a href="#portfolio">Portfolio</a>
              </li>
              <li>
                <a href="#contact">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h5>Services</h5>
            <ul>
              <li>
                <a href="#services">Graphic Design</a>
              </li>
              <li>
                <a href="#web-portfolio">Web Development</a>
              </li>
              <li>
                <a href="#printing">Printing</a>
              </li>
            </ul>
          </div>
          <div>
            <h5>Connect</h5>
            <ul>
              <li>
                <a href={`mailto:${email}`}>{email}</a>
              </li>
              <li>
                <a href={waLink} target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </li>
              {instagramUrl && (
                <li>
                  <a href={instagramUrl} target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>
            © {year} {brandName}. All rights reserved.
          </span>
          <span>Design, web &amp; print — one studio.</span>
        </div>
      </div>
    </footer>
  );
}
