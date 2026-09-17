"use client";

import { useEffect, useState } from "react";

const BrandMark = ({ className = "mark" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="13" cy="13" r="11" stroke="currentColor" strokeWidth="1.4" />
    <line x1="13" y1="1" x2="13" y2="7" stroke="currentColor" strokeWidth="1.4" />
    <line x1="13" y1="19" x2="13" y2="25" stroke="currentColor" strokeWidth="1.4" />
    <line x1="1" y1="13" x2="7" y2="13" stroke="currentColor" strokeWidth="1.4" />
    <line x1="19" y1="13" x2="25" y2="13" stroke="currentColor" strokeWidth="1.4" />
    <circle cx="13" cy="13" r="2.6" fill="currentColor" />
  </svg>
);

export default function SiteNav({ brandName }: { brandName: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: "#about", label: "About" },
    { href: "#services", label: "Services" },
    { href: "#portfolio", label: "Portfolio" },
    { href: "#printing", label: "Printing" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <>
      <header className={`site-nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#hero" className="brand">
            <BrandMark />
            {brandName}
          </a>
          <nav className="nav-links">
            {links.map((l) => (
              <a key={l.href} href={l.href}>
                {l.label}
              </a>
            ))}
          </nav>
          <div className="nav-cta">
            <a href="#contact" className="btn btn-solid btn-sm">
              Let&apos;s Work Together
            </a>
            <button className="hamburger" aria-label="Open menu" onClick={() => setOpen(true)}>
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-panel${open ? " open" : ""}`}>
        <button className="mobile-close" onClick={() => setOpen(false)}>
          Close ✕
        </button>
        <div className="brand">
          <BrandMark />
          {brandName}
        </div>
        <a href="#hero" onClick={() => setOpen(false)}>
          Home
        </a>
        {links.map((l) => (
          <a key={l.href} href={l.href} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </div>
    </>
  );
}
