"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { isVideoUrl } from "@/lib/media";

export default function MediaThumb({
  src,
  alt,
  sizes,
}: {
  src: string;
  alt: string;
  sizes: string;
}) {
  const video = isVideoUrl(src);

  const bgStyle: CSSProperties = {
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    filter: "blur(22px) brightness(0.65) saturate(1.1)",
    transform: "scale(1.15)",
  };

  return (
    <>
      {video ? (
        <video src={src} muted loop autoPlay playsInline aria-hidden="true" style={bgStyle} />
      ) : (
        <Image src={src} alt="" aria-hidden="true" fill sizes={sizes} style={bgStyle} />
      )}

      {video ? (
        <video
          src={src}
          muted
          loop
          autoPlay
          playsInline
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain" }}
        />
      ) : (
        <Image src={src} alt={alt} fill sizes={sizes} style={{ objectFit: "contain" }} />
      )}
    </>
  );
}
