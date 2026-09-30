"use client";

import { useRef } from "react";

export default function ModelViewer() {
  const portraitRef = useRef<HTMLDivElement>(null);

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const portrait = portraitRef.current;
    if (!portrait) return;

    const bounds = portrait.getBoundingClientRect();
    const horizontalPosition = (event.clientX - bounds.left) / bounds.width - 0.5;
    const verticalPosition = (event.clientY - bounds.top) / bounds.height - 0.5;
    const rotateY = horizontalPosition * 60;
    const rotateX = verticalPosition * -20;

    portrait.style.setProperty("--portrait-rotate-x", `${rotateX}deg`);
    portrait.style.setProperty("--portrait-rotate-y", `${rotateY}deg`);
  };

  const handlePointerLeave = () => {
    const portrait = portraitRef.current;
    if (!portrait) return;

    portrait.style.setProperty("--portrait-rotate-x", "0deg");
    portrait.style.setProperty("--portrait-rotate-y", "0deg");
  };

  return (
    <div
      ref={portraitRef}
      className="model-viewer"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label="Interactive portrait"
    >
      <img src="/vinith_front.png" alt="Vinith Busipalli" />
    </div>
  );
}
