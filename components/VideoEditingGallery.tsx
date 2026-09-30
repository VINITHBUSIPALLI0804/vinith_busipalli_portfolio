"use client";

import { useState } from "react";
import { projectVideoUrl } from "@/lib/projectVideo";
import LazyVideoPreview from "./LazyVideoPreview";

type VideoEditingGalleryProps = {
  videos: readonly string[];
  projectLabel?: string;
};

export default function VideoEditingGallery({ videos, projectLabel = "video editing" }: VideoEditingGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <>
      <div className="creative-design-carousel" aria-label={`${projectLabel} project gallery`}>
        {[videos.slice(0, 6), videos.slice(6)].map((row, rowIndex) => (
          <div className={`creative-design-row${rowIndex === 1 ? " creative-design-row-reverse" : ""}`} key={rowIndex}>
            <div className="creative-design-track">
              {[...row, ...row].map((video, index) => {
                const projectNumber = (rowIndex === 0 ? 0 : 6) + (index % row.length) + 1;
                const videoUrl = projectVideoUrl(video);
                return (
                  <button className="creative-design-card" type="button" key={`${video}-${index}`} onClick={() => setSelectedIndex(projectNumber - 1)} aria-label={`Enlarge ${projectLabel} project ${projectNumber}`}>
                    <LazyVideoPreview src={videoUrl} ariaLabel={`${projectLabel} project ${projectNumber}`} />
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      {selectedIndex !== null && (
        <div className="creative-design-lightbox" role="dialog" aria-modal="true" aria-label={`Expanded ${projectLabel} project`} onClick={() => setSelectedIndex(null)}>
          <button className="creative-design-close" type="button" onClick={() => setSelectedIndex(null)} aria-label={`Close expanded ${projectLabel} video`}>X</button>
          <button className="creative-design-arrow creative-design-arrow-left" type="button" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex + videos.length - 1) % videos.length); }} aria-label={`Previous ${projectLabel} project`}>←</button>
          <video src={projectVideoUrl(videos[selectedIndex])} controls preload="metadata" playsInline onClick={(event) => event.stopPropagation()} />
          <button className="creative-design-arrow creative-design-arrow-right" type="button" onClick={(event) => { event.stopPropagation(); setSelectedIndex((selectedIndex + 1) % videos.length); }} aria-label={`Next ${projectLabel} project`}>→</button>
        </div>
      )}
    </>
  );
}