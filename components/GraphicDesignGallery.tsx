"use client";

import { useState } from "react";
import { projectVideoUrl } from "@/lib/projectVideo";
import LazyVideoPreview from "./LazyVideoPreview";

type GraphicDesignItem = {
  src: string;
  type: "image" | "video";
};

type GraphicDesignGalleryProps = {
  items: GraphicDesignItem[];
};

export default function GraphicDesignGallery({ items }: GraphicDesignGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const rowSize = Math.ceil(items.length / 2);
  const rows = [items.slice(0, rowSize), items.slice(rowSize)];

  return (
    <>
      <div className="creative-design-carousel" aria-label="Graphic design project gallery">
        {rows.map((row, rowIndex) => (
          <div className={`creative-design-row${rowIndex === 1 ? " creative-design-row-reverse" : ""}`} key={rowIndex}>
            <div className="creative-design-track">
              {[...row, ...row].map((item, index) => {
                const itemIndex = rowIndex * rowSize + (index % row.length);
                const projectNumber = itemIndex + 1;
                return (
                  <button className="creative-design-card" type="button" key={`${item.src}-${index}`} onClick={() => setSelectedIndex(itemIndex)} aria-label={`Enlarge graphic design project ${projectNumber}`}>
                    {item.type === "video" ? (
                      <LazyVideoPreview src={projectVideoUrl(item.src)} ariaLabel={`Graphic design video ${projectNumber}`} />
                    ) : (
                      <img src={item.src} alt={`Graphic design project ${projectNumber}`} />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {selectedIndex !== null && (
        <div className="creative-design-lightbox" role="dialog" aria-modal="true" aria-label="Expanded graphic design project" onClick={() => setSelectedIndex(null)}>
          <button className="creative-design-close" type="button" onClick={() => setSelectedIndex(null)} aria-label="Close expanded image">X</button>
          <button className="creative-design-arrow creative-design-arrow-left" type="button" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex + items.length - 1) % items.length); }} aria-label="Previous graphic design project">←</button>
          {items[selectedIndex].type === "video" ? (
            <video controls autoPlay playsInline preload="metadata" onClick={(event) => event.stopPropagation()}>
              <source src={projectVideoUrl(items[selectedIndex].src)} type="video/mp4" />
            </video>
          ) : (
            <img src={items[selectedIndex].src} alt={`Expanded graphic design project ${selectedIndex + 1}`} onClick={(event) => event.stopPropagation()} />
          )}
          <button className="creative-design-arrow creative-design-arrow-right" type="button" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex + 1) % items.length); }} aria-label="Next graphic design project">→</button>
        </div>
      )}
    </>
  );
}
