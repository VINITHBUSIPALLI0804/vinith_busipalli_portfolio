"use client";

import { useState } from "react";
import { projectVideoUrl } from "@/lib/projectVideo";
import LazyVideoPreview from "./LazyVideoPreview";

type ThreeDVfxItem = {
  src: string;
  type: "image" | "video";
};

type ThreeDVfxGalleryProps = {
  items: readonly ThreeDVfxItem[];
  galleryClassName?: string;
  projectLabel?: string;
};

export default function ThreeDVfxGallery({ items, galleryClassName = "creative-design-carousel creative-3d-gallery", projectLabel = "3D and VFX" }: ThreeDVfxGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className={galleryClassName} aria-label={`${projectLabel} project gallery`}>
        {[items.slice(0, 3), items.slice(3)].map((row, rowIndex) => (
          <div className={`creative-design-row${rowIndex === 1 ? " creative-design-row-reverse" : ""}`} key={rowIndex}>
            <div className="creative-design-track">
              {[...row, ...row].map((item, index) => {
                const projectNumber = (rowIndex * 3) + (index % row.length) + 1;
                return (
                  <button className="creative-design-card" type="button" key={`${item.src}-${index}`} onClick={() => setSelectedIndex(projectNumber - 1)} aria-label={`Enlarge ${projectLabel} project ${projectNumber}`}>
                    {item.type === "video" ? (
                      <LazyVideoPreview src={projectVideoUrl(item.src)} ariaLabel={`${projectLabel} project ${projectNumber}`} />
                    ) : (
                      <img src={item.src} alt={`${projectLabel} project ${projectNumber}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {selectedIndex !== null && (
        <div className="creative-design-lightbox" role="dialog" aria-modal="true" aria-label={`Expanded ${projectLabel} project`} onClick={() => setSelectedIndex(null)}>
          <button className="creative-design-close" type="button" onClick={() => setSelectedIndex(null)} aria-label={`Close expanded ${projectLabel} project`}>X</button>
          <button className="creative-design-arrow creative-design-arrow-left" type="button" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex + items.length - 1) % items.length); }} aria-label={`Previous ${projectLabel} project`}>←</button>
          {items[selectedIndex].type === "video" ? (
            <video src={projectVideoUrl(items[selectedIndex].src)} controls preload="metadata" playsInline onClick={(event) => event.stopPropagation()} />
          ) : (
            <img src={items[selectedIndex].src} alt={`Expanded ${projectLabel} project ${selectedIndex + 1}`} onClick={(event) => event.stopPropagation()} />
          )}
          <button className="creative-design-arrow creative-design-arrow-right" type="button" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex + 1) % items.length); }} aria-label={`Next ${projectLabel} project`}>→</button>
        </div>
      )}
    </>
  );
}