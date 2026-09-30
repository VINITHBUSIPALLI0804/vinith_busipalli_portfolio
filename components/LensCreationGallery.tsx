"use client";

import { useState } from "react";
import { projectVideoUrl } from "@/lib/projectVideo";

type LensCreationGalleryProps = {
  videos: string[];
};

export default function LensCreationGallery({ videos }: LensCreationGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className="creative-design-carousel" aria-label="Lens creation project gallery">
        {[videos.slice(0, 3), videos.slice(3)].map((row, rowIndex) => (
          <div className={`creative-design-row${rowIndex === 1 ? " creative-design-row-reverse" : ""}`} key={rowIndex}>
            <div className="creative-design-track">
              {[...row, ...row].map((video, index) => {
                const projectNumber = (rowIndex * 3) + (index % 3) + 1;
                const videoUrl = projectVideoUrl(video);
                return (
                  <button className="creative-design-card" type="button" key={`${video}-${index}`} onClick={() => setSelectedIndex(projectNumber - 1)} aria-label={`Enlarge lens creation project ${projectNumber}`}>
                    <video src={videoUrl} muted autoPlay loop playsInline preload="metadata" aria-label={`Lens creation project ${projectNumber}`} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {selectedIndex !== null && (
        <div className="creative-design-lightbox" role="dialog" aria-modal="true" aria-label="Expanded lens creation project" onClick={() => setSelectedIndex(null)}>
          <button className="creative-design-close" type="button" onClick={() => setSelectedIndex(null)} aria-label="Close expanded video">X</button>
          <button className="creative-design-arrow creative-design-arrow-left" type="button" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex + videos.length - 1) % videos.length); }} aria-label="Previous lens creation project">←</button>
          <video src={projectVideoUrl(videos[selectedIndex])} controls preload="auto" playsInline onClick={(event) => event.stopPropagation()} />
          <button className="creative-design-arrow creative-design-arrow-right" type="button" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex + 1) % videos.length); }} aria-label="Next lens creation project">→</button>
        </div>
      )}
    </>
  );
}