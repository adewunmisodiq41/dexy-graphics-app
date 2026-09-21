"use client";

import Image from "next/image";
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
  if (isVideoUrl(src)) {
    return (
      <video
        src={src}
        muted
        loop
        autoPlay
        playsInline
        style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
      />
    );
  }
  return <Image src={src} alt={alt} fill sizes={sizes} />;
}
