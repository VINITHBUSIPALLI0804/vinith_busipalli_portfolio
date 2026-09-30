import Link from "next/link";
import { notFound } from "next/navigation";
import CreativeDriveWorksLink from "@/components/CreativeDriveWorksLink";
import GraphicDesignGallery from "@/components/GraphicDesignGallery";
import LensCreationGallery from "@/components/LensCreationGallery";
import ThreeDVfxGallery from "@/components/ThreeDVfxGallery";
import UiUxGallery from "@/components/UiUxGallery";
import VideoEditingGallery from "@/components/VideoEditingGallery";

const cases = {
  identity: {
    number: "01",
    title: "GRAPHIC DESIGN",
    description: "Posters, social media designs and visual graphics.",
    tools: "PHOTOSHOP · ILLUSTRATOR",
  },
  character: {
    number: "02",
    title: "3D / VFX",
    description: "3D models, effects and visual experiments.",
    tools: "BLENDER · CINEMA 4D",
  },
  video: {
    number: "03",
    title: "VIDEO EDITING",
    description: "Reels, short videos and cinematic edits.",
    tools: "PREMIERE PRO · AFTER EFFECTS",
  },
  world: {
    number: "04",
    title: "LENS CREATION",
    description: "Interactive AR lenses and social experiences.",
    tools: "LENS STUDIO · BLENDER",
  },
  motion: {
    number: "05",
    title: "UI / UX",
    description: "Clean and creative digital interface designs.",
    tools: "FIGMA · PHOTOSHOP",
  },
  hospital: {
    number: "05",
    title: "UI / UX",
    description: "Healthcare interface concepts and digital experiences.",
    tools: "FIGMA · PHOTOSHOP",
  },
  content: {
    number: "06",
    title: "GAME DEVELOPMENT",
    description: "Game concepts, environments and interactive experiences.",
    tools: "UNITY · BLENDER",
  },
  arvr: {
    number: "07",
    title: "AR / VR",
    description: "Immersive AR/VR experiences and experiments.",
    tools: "UNITY · BLENDER",
  },
} as const;

const graphicDesignImages = Array.from({ length: 12 }, (_, index) => `/projects/graphic-design/design-${index + 1}.jpeg`);
const lensCreationVideos = Array.from({ length: 6 }, (_, index) => `/projects/lens/${index + 1}.mp4`);
const videoEditingVideos = [
  "/projects/video-editing/0408-1.mp4",
  "/projects/video-editing/0422-1.mp4",
  "/projects/video-editing/0425-1.mp4",
  "/projects/video-editing/0426-1.mp4",
  "/projects/video-editing/0502-1.mp4",
  "/projects/video-editing/0502-2.mp4",
  "/projects/video-editing/0506-4.mp4",
  "/projects/video-editing/0507-1.mp4",
  "/projects/video-editing/0509.mp4",
  "/projects/video-editing/0510-2.mp4",
  "/projects/video-editing/final-one.mp4",
] as const;
const gameDevelopmentItems = [
  { src: "/projects/game/1.mp4", type: "video" },
  { src: "/projects/game/2.mp4", type: "video" },
  { src: "/projects/game/3.png", type: "image" },
] as const;
const arvrVideos = Array.from({ length: 8 }, (_, index) => `/projects/arvr/${index + 1}.mp4`);
const allPayImages = Array.from({ length: 8 }, (_, index) => `/projects/uiux/allpay/${index + 1}.png`);
const hospitalImageNames = [
  "Screenshot 2026-09-30 112609.png",
  "Screenshot 2026-09-30 112619.png",
  "Screenshot 2026-09-30 112629.png",
  "Screenshot 2026-09-30 112637.png",
  "Screenshot 2026-09-30 112651.png",
  "Screenshot 2026-09-30 112702.png",
  "Screenshot 2026-09-30 112712.png",
  "Screenshot 2026-09-30 112720.png",
];
const hospitalImages = hospitalImageNames.map((name) => `/projects/uiux/hospital/${encodeURIComponent(name)}`);
const vyreImageNames = [
  "Screenshot 2026-09-30 114447.png",
  "Screenshot 2026-09-30 114504.png",
  "Screenshot 2026-09-30 114509.png",
  "Screenshot 2026-09-30 114514.png",
  "Screenshot 2026-09-30 114519.png",
  "Screenshot 2026-09-30 114524.png",
  "Screenshot 2026-09-30 114530.png",
  "Screenshot 2026-09-30 114541.png",
  "Screenshot 2026-09-30 114548.png",
  "Screenshot 2026-09-30 114555.png",
  "Screenshot 2026-09-30 114600.png",
];
const vyreImages = vyreImageNames.map((name) => `/projects/uiux/vyre/${encodeURIComponent(name)}`);
const threeDVfxItems = [
  { src: "/projects/3d/123.mp4", type: "video" },
  { src: "/projects/3d/124.mp4", type: "video" },
  { src: "/projects/3d/book0001-0100.mp4", type: "video" },
  { src: "/projects/3d/dashavathar0000-0400.mp4", type: "video" },
  { src: "/projects/3d/car.png", type: "image" },
  { src: "/projects/3d/katana.png", type: "image" },
  { src: "/projects/3d/0161-0600.mp4", type: "video" },
] as const;

export default async function CreativeCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = cases[slug as keyof typeof cases];

  if (!project) notFound();

  return (
    <main className="creative-site creative-case-study">
      <div className="creative-background" aria-hidden="true"><span /><i /><i /><i /></div>
      <img className="creative-page-background-image" src="/images/min.png" alt="" aria-hidden="true" />
      <nav className="hero-nav creative-nav" aria-label="Creative case study navigation">
        <Link className="hero-brand" href="/creative"><span>VB</span><small>CREATIVE</small></Link>
        <div className="creative-case-nav-actions">
          <CreativeDriveWorksLink />
          <Link className="creative-case-nav-link" href="/creative#creative-work">BACK TO WORK</Link>
        </div>
      </nav>
      {slug === "identity" ? (
        <section className="creative-design-page">
          <div className="creative-design-intro">
            <h1>GRAPHIC<em> DESIGNING.</em></h1>
            <p>Posters, social media designs and visual graphics.</p>
          </div>
          <GraphicDesignGallery images={graphicDesignImages} />
          <Link className="creative-case-back creative-design-back" href="/creative#creative-work">← BACK TO CREATIVE WORK</Link>
        </section>
      ) : slug === "video" ? (
        <section className="creative-design-page">
          <div className="creative-design-intro">
            <h1>VIDEO<em> EDITING.</em></h1>
            <p>Reels, short videos and cinematic edits.</p>
          </div>
          <VideoEditingGallery videos={videoEditingVideos} />
          <Link className="creative-case-back creative-design-back" href="/creative#creative-work">← BACK TO CREATIVE WORK</Link>
        </section>
      ) : slug === "character" ? (
        <section className="creative-design-page">
          <div className="creative-design-intro">

            <h1>3D /<em> VFX.</em></h1>
            <p>3D models, effects and visual experiments.</p>
          </div>
          <ThreeDVfxGallery items={threeDVfxItems} />
          <Link className="creative-case-back creative-design-back" href="/creative#creative-work">← BACK TO CREATIVE WORK</Link>
        </section>
      ) : slug === "content" ? (
        <section className="creative-design-page">
          <div className="creative-design-intro">

            <h1>GAME<em>DEVELOPMENT.</em></h1>
            <p>Game concepts, environments and interactive experiences.</p>
          </div>
          <ThreeDVfxGallery items={gameDevelopmentItems} galleryClassName="creative-design-carousel" projectLabel="Game Development" />
          <Link className="creative-case-back creative-design-back" href="/creative#creative-work">← BACK TO CREATIVE WORK</Link>
        </section>
      ) : slug === "motion" ? (
        <section className="creative-design-page">
          <div className="creative-design-intro">

            <h1>UI /<em>UX.</em></h1>
            <p>Clean and creative digital interface designs.</p>
          </div>
          <div className="creative-uiux-subproject">
            <h2>ALLPAY</h2>
          </div>
          <UiUxGallery images={allPayImages} />
          <div className="creative-uiux-subproject">

            <h2>HOSPITAL</h2>
          </div>
          <UiUxGallery images={hospitalImages} projectName="HOSPITAL" />
          <div className="creative-uiux-subproject">

            <h2>VYRE</h2>
          </div>
          <UiUxGallery images={vyreImages} projectName="VYRE" />
          <Link className="creative-case-back creative-design-back" href="/creative#creative-work">← BACK TO CREATIVE WORK</Link>
        </section>
      ) : slug === "hospital" ? (
        <section className="creative-design-page">
          <div className="creative-design-intro">

            <h1>UI <em>UX.</em></h1>
            <p>Healthcare interface concepts and digital experiences.</p>
          </div>
          <div className="creative-uiux-subproject">
            <p className="creative-eyebrow"><span>SUB-PROJECT</span> UI / UX CASE STUDY</p>
            <h2>HOSPITAL</h2>
          </div>
          <UiUxGallery images={hospitalImages} projectName="HOSPITAL" />
          <Link className="creative-case-back creative-design-back" href="/creative#creative-work">← BACK TO CREATIVE WORK</Link>
        </section>
      ) : slug === "world" ? (
        <section className="creative-design-page">
          <div className="creative-design-intro">

            <h1>LENS<em>CREATION.</em></h1>
            <p>Interactive AR lenses and social experiences.</p>
          </div>
          <LensCreationGallery videos={lensCreationVideos} />
          <Link className="creative-case-back creative-design-back" href="/creative#creative-work">← BACK TO CREATIVE WORK</Link>
        </section>
      ) : slug === "arvr" ? (
        <section className="creative-design-page">
          <div className="creative-design-intro">

            <h1>AR /<em>VR.</em></h1>
            <p>Immersive AR/VR experiences and experiments.</p>
          </div>
          <VideoEditingGallery videos={arvrVideos} projectLabel="AR / VR" />
          <Link className="creative-case-back creative-design-back" href="/creative#creative-work">← BACK TO CREATIVE WORK</Link>
        </section>
      ) : (
      <section className="creative-case-hero">
        <p className="creative-eyebrow"><span>{project.number}</span> CREATIVE / CASE STUDY</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <span className="creative-case-tools">TOOLS: {project.tools}</span>
        <Link className="creative-case-back" href="/creative#creative-work">← BACK TO CREATIVE WORK</Link>
      </section>
      )}
    </main>
  );
}
