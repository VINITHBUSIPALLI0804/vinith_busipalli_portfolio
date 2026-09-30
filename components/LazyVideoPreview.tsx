"use client";

import { useEffect, useRef } from "react";

type LazyVideoPreviewProps = {
  src: string;
  ariaLabel: string;
};

export default function LazyVideoPreview({ src, ariaLabel }: LazyVideoPreviewProps) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let sourceLoaded = false;
    const activate = () => {
      if (!sourceLoaded) {
        video.src = src;
        sourceLoaded = true;
        video.load();
      }

      void video.play().catch((error: unknown) => {
        if (!(error instanceof DOMException && (error.name === "NotAllowedError" || error.name === "AbortError"))) {
          console.error("Unable to play portfolio video preview.", error);
        }
      });
    };

    if (!("IntersectionObserver" in window)) {
      activate();
      return () => video.pause();
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          activate();
        } else {
          video.pause();
        }
      },
      { rootMargin: "0px", threshold: 0.01 },
    );

    observer.observe(video);
    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [src]);

  return <video ref={videoRef} muted autoPlay loop playsInline preload="none" aria-label={ariaLabel} />;
}
