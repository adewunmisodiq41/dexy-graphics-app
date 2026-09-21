import MediaThumb from "./MediaThumb";

export type WebItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  imageUrl?: string | null;
  liveUrl?: string | null;
};

const CATEGORY_LABEL: Record<string, string> = {
  BUSINESS: "Business Website",
  KENNEL: "Kennel Website",
  ECOMMERCE: "E-commerce",
  PORTFOLIO: "Portfolio Website",
  LANDING_PAGE: "Landing Page",
  CUSTOM: "Custom Build",
};

export default function WebPortfolio({ items }: { items: WebItem[] }) {
  return (
    <section className="section-pad rule" id="web-portfolio">
      <div className="wrap">
        <div className="head-row">
          <h2>Websites built for your vision.</h2>
          <p className="head-note">Live links replace these previews as projects go public — each build is planned and coded from the ground up.</p>
        </div>

        <div className="grid-web">
          {items.map((item) => (
            <div className="browser-card" key={item.id}>
              <div className="browser-chrome">
                <div className="browser-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <div className="browser-url">{item.liveUrl ? item.liveUrl.replace(/^https?:\/\//, "") : "yourproject.com"}</div>
              </div>
              <div className="browser-screen">
                {item.imageUrl ? (
                  <MediaThumb src={item.imageUrl} alt={item.title} sizes="(max-width:760px) 100vw, 50vw" />
                ) : (
                  <>
                    <div className="bs-bar w40"></div>
                    <div className="bs-bar w80"></div>
                    <div className="bs-bar w60"></div>
                    <div className="bs-blocks">
                      <div className="bs-block"></div>
                      <div className="bs-block"></div>
                    </div>
                  </>
                )}
              </div>
              <div className="web-meta">
                <h4>{item.title}</h4>
                <div className="cat">{CATEGORY_LABEL[item.category] || item.category}</div>
                <p>{item.description}</p>
                <div className="web-btns">
                  {item.liveUrl ? (
                    <a href={item.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost btn-sm">
                      View Website
                    </a>
                  ) : (
                    <a href="#contact" className="btn btn-ghost btn-sm">
                      View Website
                    </a>
                  )}
                  <a href="#contact" className="btn btn-solid btn-sm">
                    View Project
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
