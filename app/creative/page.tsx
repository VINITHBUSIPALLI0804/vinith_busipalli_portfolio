"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import CreativeDriveWorksLink from "@/components/CreativeDriveWorksLink";

const projects = [
  { number: "01", title: "GRAPHIC DESIGN", description: "Posters, social media designs and visual graphics.", visual: "identity" },
  { number: "02", title: "3D / VFX", description: "3D models, effects and visual experiments.", visual: "character" },
  { number: "03", title: "VIDEO EDITING", description: "Reels, short videos and cinematic edits.", visual: "video" },
  { number: "04", title: "LENS CREATION", description: "Interactive AR lenses and social experiences.", visual: "world" },
  { number: "05", title: "UI / UX", description: "Clean and creative digital interface designs.", visual: "motion" },
  { number: "06", title: "GAME DEVELOPMENT", description: "Game concepts, environments and interactive experiences.", visual: "content" },
  { number: "07", title: "AR / VR", description: "Immersive AR/VR experiences and experiments.", visual: "arvr" },
] as const;

const toolkit: [string, string[]][] = [
  ["3D", ["BLENDER", "CINEMA 4D", "MAYA", "FUSION 360", "SOLIDWORKS"]],
  ["DESIGN", ["PHOTOSHOP", "ILLUSTRATOR", "FIGMA", "ADOBE XD", "ADOBE INDESIGN", "CANVA"]],
  ["MOTION", ["AFTER EFFECTS", "PREMIERE PRO", "CAPCUT", "VN", "INVIDEO", "COLOR GRADING", "SOUND EFFECTS"]],
  ["GAME", ["UNITY", "UNREAL ENGINE"]],
  ["VIDEO", ["EDITING", "MOTION", "LENS STUDIO", "GEN AI", "POSTER BRANDING", "MARKETING", "SOCIAL MEDIA HANDLING"]],
];

function CreativeVisual() {
  const mountRef = useRef<HTMLDivElement>(null);
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(28, 1, .1, 100);
    camera.position.set(0, .1, 5.2);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    scene.add(new THREE.AmbientLight(0xf4ead2, 1.6));
    const keyLight = new THREE.DirectionalLight(0xd8bd82, 3);
    keyLight.position.set(2, 3, 4);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x7bd1d0, 2.5, 8);
    rimLight.position.set(-2, 1, 2);
    scene.add(rimLight);

    const fallback = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.2, 1),
      new THREE.MeshStandardMaterial({ color: 0xc6a86b, wireframe: true, transparent: true, opacity: .82 }),
    );
    group.add(fallback);
    const inner = new THREE.Mesh(
      new THREE.TorusKnotGeometry(.62, .08, 96, 12),
      new THREE.MeshStandardMaterial({ color: 0x7bd1d0, metalness: .55, roughness: .24, wireframe: true, transparent: true, opacity: .65 }),
    );
    group.add(inner);

    let loadedModel: THREE.Object3D | null = null;
    new GLTFLoader().load("/images/model.glb", (gltf) => {
      loadedModel = gltf.scene;
      loadedModel.scale.setScalar(1.45);
      loadedModel.position.y = -.45;
      loadedModel.visible = false;
      group.add(loadedModel);
    });

    const resize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    const move = (event: globalThis.PointerEvent) => {
      const bounds = mount.getBoundingClientRect();
      pointer.current.x = ((event.clientX - bounds.left) / bounds.width - .5) * 2;
      pointer.current.y = ((event.clientY - bounds.top) / bounds.height - .5) * 2;
    };
    const leave = () => { pointer.current.x = 0; pointer.current.y = 0; };
    mount.addEventListener("pointermove", move);
    mount.addEventListener("pointerleave", leave);
    window.addEventListener("resize", resize);
    let frame = 0;
    const animate = (time: number) => {
      const seconds = time * .001;
      group.rotation.y += (pointer.current.x * .16 + Math.sin(seconds * .42) * .11 - group.rotation.y) * .035;
      group.rotation.x += (pointer.current.y * -.1 + Math.sin(seconds * .55) * .035 - group.rotation.x) * .035;
      group.position.y += (Math.sin(seconds * .7) * .08 - group.position.y) * .035;
      inner.rotation.x = seconds * .22;
      inner.rotation.z = seconds * .16;
      renderer.render(scene, camera);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      mount.removeEventListener("pointermove", move);
      mount.removeEventListener("pointerleave", leave);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="creative-visual-canvas" ref={mountRef} aria-label="Interactive abstract 3D creative visual" />;
}

export default function CreativePage() {
  const [menu, setMenu] = useState(false);
  return (
    <main className="creative-site">
      <div className="creative-background" aria-hidden="true"><span /><i /><i /><i /></div>
      <img className="creative-page-background-image" src="/images/min.png" alt="" aria-hidden="true" />
      <nav className="hero-nav creative-nav" aria-label="Creative portfolio navigation">
        <Link className="hero-brand" href="/" aria-label="Back to main portfolio"><span>VB</span><small>CREATIVE</small></Link>
        <button className="menu-trigger" onClick={() => setMenu((value) => !value)} type="button" aria-expanded={menu} aria-controls="creative-navigation">
          <span className="menu-trigger-icon" aria-hidden="true"><i /><i /><i /></span><span className="menu-trigger-text">MENU</span>
        </button>
      </nav>
      <nav id="creative-navigation" className={`creative-menu${menu ? " creative-menu-open" : ""}`} aria-label="Creative section navigation">
        {[['01', 'WORK', '#creative-work'], ['02', 'TOOLKIT', '#toolkit'], ['03', 'PROCESS', '#process'], ['04', 'CONTACT', '#contact']].map(([number, label, href]) => <a href={href} key={number} onClick={() => setMenu(false)}><span>{number}</span>{label}</a>)}
      </nav>

      <section className="creative-hero" id="home">
        <div className="creative-hero-copy">
          <div className="creative-nameplate"><h2>VINITH BUSIPALLI</h2><span>CREATIVE PORTFOLIO</span></div>
          <h1>I CREATE<br />DIGITAL<br /><em>EXPERIENCES.</em></h1>
          <p className="creative-lede">I turn ideas into visual experiences through design, 3D, motion, games and storytelling.</p>
          <a className="creative-cta" href="#creative-work">EXPLORE MY WORK <span>→</span></a>
          <CreativeDriveWorksLink />
        </div>
        <div className="creative-hero-visual"><img className="creative-portrait" src="/images/creative-portrait.png" alt="Vinith Busipalli creative portrait" /><div className="creative-orbits"><i /><i /><i /></div></div>
      </section>

      <section className="creative-work" id="creative-work">
        <div className="creative-heading"><div className="creative-nameplate"><h2>WORKS</h2></div></div>
        <div className="creative-projects">
          {projects.map(({ number, title, description, visual }) => (
            <a className={`creative-project creative-project-${visual}`} href={`/creative/${visual}`} key={number}>
              <div className="creative-project-art">
                {visual === "identity" ? <img src="/gd.png" alt="Graphic design work" /> : visual === "character" ? <img src="/3d.png" alt="3D and VFX work" /> : visual === "video" ? <img src="/ve.png" alt="Video editing work" /> : visual === "world" ? <img src="/lc.png" alt="Lens creation work" /> : visual === "motion" ? <img src="/ui.png" alt="UI and UX work" /> : visual === "arvr" ? <img src="/arvr.png" alt="AR and VR work" /> : <img src="/gad.png" alt="Game development work" />}
              </div>
              <div className="creative-project-copy">
                <div><h2>{title}</h2><p>{description}</p></div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="creative-toolkit" id="toolkit"><div className="creative-heading"><div className="creative-nameplate"><h2>SKILLS AND TOOLS</h2></div></div><div className="creative-tool-grid">{toolkit.map(([label, items]) => <div key={label}><h3>{label}</h3>{items.map((item) => <span key={item}>{item}</span>)}</div>)}</div></section>

      <section className="creative-process" id="process" aria-label="Creative process"><div className="creative-process-grid">{[["01", "IDEA", "Define the problem, audience, and intended experience."], ["02", "EXPLORE", "Compare visual directions, references, composition, typography, and interaction."], ["03", "BUILD", "Bring the direction to life through design, 3D, motion, code, or interactive media."], ["04", "REFINE", "Test the result, then refine its composition, motion, and usability."]].map(([, title, text]) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div></section>

      <section className="creative-contact" id="contact"><h2>LET&apos;S MAKE<br /><em>SOMETHING<br />WORTH SEEING.</em></h2><p>Have a visual idea, product or story that needs to exist? Let&apos;s build it.</p><div><a href="https://mail.google.com/mail/?view=cm&to=vinithbusipalli@gmail.com" target="_blank" rel="noreferrer">START A PROJECT <span>→</span></a><Link href="/">BACK TO MAIN PORTFOLIO <span>→</span></Link></div></section>
      <footer className="creative-footer"><Link href="/">HOME / MAIN PORTFOLIO</Link><span>VB / CREATIVE</span><span>© {new Date().getFullYear()} VINITH BUSIPALLI</span></footer>
    </main>
  );
}
