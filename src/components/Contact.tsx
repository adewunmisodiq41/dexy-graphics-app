import ContactForm from "./ContactForm";

export default function Contact({
  email,
  whatsapp,
  location,
}: {
  email: string;
  whatsapp: string;
  location: string;
}) {
  const waLink = `https://wa.me/${whatsapp.replace(/[^0-9]/g, "")}`;

  return (
    <section className="section-pad rule" id="contact">
      <div className="wrap contact-grid">
        <div className="contact-info">
          <h2 className="h-display" style={{ fontSize: "clamp(28px,4vw,42px)" }}>
            Let&apos;s bring your vision to life.
          </h2>
          <p>Have a project in mind? Whether it&apos;s a logo, website, banner, or custom printing, tell me the details below and I&apos;ll follow up.</p>
          <div className="contact-detail">
            <div className="contact-detail-row">
              <span>Email</span>
              <span>{email}</span>
            </div>
            <div className="contact-detail-row">
              <span>WhatsApp</span>
              <span>{whatsapp}</span>
            </div>
            <div className="contact-detail-row">
              <span>Based in</span>
              <span>{location}</span>
            </div>
          </div>
          <a href={waLink} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
            Chat on WhatsApp
          </a>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
