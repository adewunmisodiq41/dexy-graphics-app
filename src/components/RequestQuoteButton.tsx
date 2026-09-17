"use client";

export default function RequestQuoteButton({ label = "Request a Quote" }: { label?: string }) {
  return (
    <a
      href="#contact"
      className="btn btn-ghost btn-sm"
      onClick={() => {
        const sel = document.getElementById("fService") as HTMLSelectElement | null;
        if (sel) sel.value = "Printing";
      }}
    >
      {label}
    </a>
  );
}
