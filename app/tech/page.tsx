"use client";

import Link from "next/link";
import { useRef, useState, type PointerEvent } from "react";

const projects = [
  {
    number: "01",
    title: "SOFTWARE DEVELOPMENT",
    description: "Reliable software products engineered from thoughtful interfaces to maintainable systems.",
    tags: ["TYPESCRIPT", "NEXT.JS", "NODE.JS"],
    visual: "ai",
    slug: "software-development",
  },
  {
    number: "02",
    title: "AI / ML",
    description: "Intelligent systems and machine learning workflows built to solve practical problems.",
    tags: ["PYTHON", "LLMS", "MACHINE LEARNING"],
    visual: "stack",
    slug: "ai-ml",
  },
  {
    number: "03",
    title: "MOBILE APPLICATION DEVELOPMENT",
    description: "Focused mobile experiences designed for useful, intuitive everyday interactions.",
    tags: ["JAVASCRIPT", "TYPESCRIPT", "MOBILE"],
    visual: "mobile",
    slug: "mobile-development",
  },
  {
    number: "04",
    title: "GAME DEVELOPMENT",
    description: "Interactive worlds built around responsive systems, play and experimentation.",
    tags: ["C++", "3D", "INTERACTION"],
    visual: "game",
    slug: "game-development",
  },
];

const stackGroups: [string, string[]][] = [
  ["LANGUAGES", ["Python", "JavaScript", "TypeScript", "C", "C++"]],
  ["FRAMEWORKS", ["Next.js", "React", "Node.js"]],
  ["AI / ML", ["Machine Learning", "AI Systems", "Intelligent Workflows"]],
  ["TOOLS", ["Git", "GitHub", "Docker", "Linux"]],
];

function SystemVisual({ type }: { type: string }) {
  return (
    <div className={`tech-project-visual visual-${type}`} aria-hidden="true">
      <span className="visual-orbit orbit-a" />
      <span className="visual-orbit orbit-b" />
      <span className="visual-core" />
      <span className="visual-line line-a" />
      <span className="visual-line line-b" />
      <span className="visual-line line-c" />
      <span className="visual-node node-a" />
      <span className="visual-node node-b" />
      <span className="visual-node node-c" />
      {type === "stack" && <span className="visual-window"><i /><i /><i /></span>}
      {type === "mobile" && <span className="visual-window"><i /><i /><i /></span>}
      {type === "game" && <span className="visual-crosshair" />}
    </div>
  );
}

function TechPortrait() {
  const portraitRef = useRef<HTMLDivElement>(null);
  const spinTimerRef = useRef<number | null>(null);
  const [isCoinSpinning, setIsCoinSpinning] = useState(false);

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || !portraitRef.current) return;
    const bounds = portraitRef.current.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    portraitRef.current.style.setProperty("--tech-portrait-x", `${x * -4}deg`);
    portraitRef.current.style.setProperty("--tech-portrait-y", `${y * 4}deg`);
    portraitRef.current.style.setProperty("--tech-portrait-shift-x", `${x * -10}px`);
    portraitRef.current.style.setProperty("--tech-portrait-shift-y", `${y * -10}px`);
  };

  const handlePointerLeave = () => {
    portraitRef.current?.style.setProperty("--tech-portrait-x", "0deg");
    portraitRef.current?.style.setProperty("--tech-portrait-y", "0deg");
    portraitRef.current?.style.setProperty("--tech-portrait-shift-x", "0px");
    portraitRef.current?.style.setProperty("--tech-portrait-shift-y", "0px");
  };

  const handleCoinSpin = () => {
    if (spinTimerRef.current) window.clearTimeout(spinTimerRef.current);
    setIsCoinSpinning(false);
    window.requestAnimationFrame(() => setIsCoinSpinning(true));
    spinTimerRef.current = window.setTimeout(() => setIsCoinSpinning(false), 2000);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleCoinSpin();
    }
  };

  return (
    <div className="tech-portrait-wrap" aria-label="Portrait of Vinith Busipalli">
      <div className="portrait-orbit-system" aria-hidden="true">
        <span className="portrait-orbit portrait-orbit-one" />
        <span className="portrait-orbit portrait-orbit-two" />
        <span className="portrait-orbit portrait-orbit-three" />
        <span className="portrait-crosshair" />
        <span className="portrait-marker portrait-marker-one" />
        <span className="portrait-marker portrait-marker-two" />
        <span className="portrait-marker portrait-marker-three" />
      </div>
      <div
        ref={portraitRef}
        className="tech-portrait"
        onClick={handleCoinSpin}
        onKeyDown={handleKeyDown}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        role="button"
        tabIndex={0}
        aria-label="Rotate portrait"
      >
        <img className={isCoinSpinning ? "tech-portrait-spinning" : ""} src="/vinith_front.png" alt="Vinith Busipalli" />
      </div>
      <div className="portrait-capabilities" aria-label="Tech capabilities">
        <span>SOFTWARE</span>
        <span>AI / ML</span>
        <span>MOBILE APPS</span>
        <span>Game Development</span>
      </div>
    </div>
  );
}

export default function TechPage() {
  const [menu, setMenu] = useState(false);

  return (
    <main className="tech-site">
      <div className="tech-grid" aria-hidden="true" />
      <div className="tech-hologram" aria-hidden="true">
        <span className="hologram-plane" />
        <span className="hologram-scan" />
        <span className="hologram-beam hologram-beam-one" />
        <span className="hologram-beam hologram-beam-two" />
        <span className="neural-network neural-network-one" aria-hidden="true">
          <i className="neural-edge neural-edge-one" /><i className="neural-edge neural-edge-two" /><i className="neural-edge neural-edge-three" />
          <i className="neural-node neural-node-one" /><i className="neural-node neural-node-two" /><i className="neural-node neural-node-three" /><i className="neural-node neural-node-four" />
        </span>
      </div>
      <div className="tech-ring tech-ring-one" aria-hidden="true" />
      <div className="tech-ring tech-ring-two" aria-hidden="true" />

      <nav className="hero-nav tech-hero-nav" aria-label="Tech portfolio navigation">
        <Link className="hero-brand" href="/" aria-label="Back to main portfolio">
          <span>VB</span>
          <small>TECH</small>
        </Link>
        <button className="menu-trigger" onClick={() => setMenu((value) => !value)} type="button" aria-expanded={menu} aria-controls="tech-navigation">
          <span className="menu-trigger-icon" aria-hidden="true"><i /><i /><i /></span>
          <span className="menu-trigger-text">MENU</span>
        </button>
      </nav>
      <nav id="tech-navigation" className={`tech-menu${menu ? " tech-menu-open" : ""}`} aria-label="Tech section navigation">
        {[["01", "WORK", "#work"], ["02", "ABOUT", "#about"], ["03", "STACK", "#stack"], ["04", "CONTACT", "#contact"]].map(([number, label, href]) => (
              <a href={href === '#work' ? '#tech-work' : href} key={number} onClick={() => setMenu(false)}><span>{number}</span>{label}</a>
        ))}
      </nav>

      <section className="tech-hero" id="home">
        <div className="tech-hero-copy">
          <p className="tech-eyebrow"><span>01</span> COMPUTER SCIENCE ENGINEER · DEVELOPER</p>
          <h1>BUILDING<br />DIGITAL<br /><em>SYSTEMS.</em></h1>
          <p className="tech-lede">I design and build software, intelligent systems and digital experiences that solve real problems.</p>
          <a className="tech-scroll" href="#tech-work">VIEW MY WORK <span>→</span></a>
        </div>
        <TechPortrait />
      </section>

      <section className="tech-work" id="tech-work">
        <div className="tech-section-heading">
          <p className="tech-eyebrow"><span>02</span> SELECTED WORK</p>
          <p className="tech-section-note">A collection of systems, products and experiments designed to move ideas into reality.</p>
        </div>
        <div className="tech-project-list">
          {projects.map((project) => (
            <Link className="tech-project" href={`/tech/${project.slug}`} key={project.number}>
              <SystemVisual type={project.visual} />
              <div className="tech-project-meta">
                <span className="project-number">{project.number}</span>
                <div className="project-copy">
                  <h2>{project.title}</h2>
                  <p>{project.description}</p>
                  <div className="project-tags">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                </div>
                <span className="project-arrow" aria-hidden="true">↗</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="tech-about" id="about">
        <p className="tech-eyebrow"><span>03</span> ABOUT THE BUILDER</p>
        <div>
          <h2>ENGINEERING<br /><em>WITH INTENT.</em></h2>
          <p>I am a computer science engineer interested in software engineering, AI, mobile applications, game development and digital products. I like understanding how technology works, then making it clearer, faster and more useful.</p>
        </div>
      </section>

      <section className="tech-stack" id="stack">
        <div className="tech-section-heading">
          <p className="tech-eyebrow"><span>04</span> TECHNICAL STACK</p>
          <p className="tech-section-note">The tools I use to turn a question into a working system.</p>
        </div>
        <div className="stack-system">
          {stackGroups.map(([label, items]) => (
            <div className="stack-group" key={label}>
              <h3>{label}</h3>
              <ul>{items.map((item) => <li key={item}>{item}<span>↗</span></li>)}</ul>
            </div>
          ))}
        </div>
      </section>

      <section className="tech-contact" id="contact">
        <p className="tech-eyebrow"><span>05</span> OPEN CHANNEL</p>
        <h2>LET&apos;S BUILD<br /><em>SOMETHING USEFUL.</em></h2>
        <div className="tech-contact-actions">
          <a href="mailto:vinithbusipalli@gmail.com">GET IN TOUCH <span>↗</span></a>
        </div>
      </section>

      <footer className="tech-footer">
        <Link href="/">HOME / MAIN PORTFOLIO</Link>
        <span>VB / TECH</span>
        <span>© {new Date().getFullYear()} VINITH BUSIPALLI</span>
      </footer>
    </main>
  );
}
