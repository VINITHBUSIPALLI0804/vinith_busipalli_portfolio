"use client";

import { useState } from "react";

type GraphicDesignGalleryProps = {
  images: string[];
};

export default function GraphicDesignGallery({ images }: GraphicDesignGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className="creative-design-carousel" aria-label="Graphic design project gallery">
        {[images.slice(0, 6), images.slice(6)].map((row, rowIndex) => (
          <div className={`creative-design-row${rowIndex === 1 ? " creative-design-row-reverse" : ""}`} key={rowIndex}>
            <div className="creative-design-track">
              {[...row, ...row].map((image, index) => {
                const projectNumber = (rowIndex * 6) + (index % 6) + 1;
                return (
                  <button className="creative-design-card" type="button" key={`${image}-${index}`} onClick={() => setSelectedIndex(projectNumber - 1)} aria-label={`Enlarge graphic design project ${projectNumber}`}>
                    <img src={image} alt={`Graphic design project ${projectNumber}`} />
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
          <button className="creative-design-arrow creative-design-arrow-left" type="button" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex + images.length - 1) % images.length); }} aria-label="Previous graphic design project">←</button>
          <img src={images[selectedIndex]} alt={`Expanded graphic design project ${selectedIndex + 1}`} onClick={(event) => event.stopPropagation()} />
          <button className="creative-design-arrow creative-design-arrow-right" type="button" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex + 1) % images.length); }} aria-label="Next graphic design project">→</button>
        </div>
      )}
    </>
  );
}
