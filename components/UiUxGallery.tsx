"use client";

import { useState } from "react";

type UiUxGalleryProps = {
  images: readonly string[];
  projectName?: string;
};

export default function UiUxGallery({ images, projectName = "ALLPAY" }: UiUxGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className="creative-design-carousel creative-uiux-gallery" aria-label={`${projectName} UI/UX project gallery`}>
        <div className="creative-design-row">
          <div className="creative-design-track">
            {[...images, ...images].map((image, index) => {
                const projectNumber = (index % images.length) + 1;
                return (
                  <button className="creative-design-card" type="button" key={`${image}-${index}`} onClick={() => setSelectedIndex(projectNumber - 1)} aria-label={`Enlarge ${projectName} UI/UX project ${projectNumber}`}>
                    <img src={image} alt={`${projectName} UI/UX project ${projectNumber}`} />
                  </button>
                );
            })}
          </div>
        </div>
      </div>
      {selectedIndex !== null && (
        <div className="creative-design-lightbox" role="dialog" aria-modal="true" aria-label={`Expanded ${projectName} UI/UX project`} onClick={() => setSelectedIndex(null)}>
          <button className="creative-design-close" type="button" onClick={() => setSelectedIndex(null)} aria-label={`Close expanded ${projectName} project`}>X</button>
          <button className="creative-design-arrow creative-design-arrow-left" type="button" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex + images.length - 1) % images.length); }} aria-label={`Previous ${projectName} project`}>←</button>
          <img src={images[selectedIndex]} alt={`Expanded ${projectName} UI/UX project ${selectedIndex + 1}`} onClick={(event) => event.stopPropagation()} />
          <button className="creative-design-arrow creative-design-arrow-right" type="button" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex + 1) % images.length); }} aria-label={`Next ${projectName} project`}>→</button>
        </div>
      )}
    </>
  );
}