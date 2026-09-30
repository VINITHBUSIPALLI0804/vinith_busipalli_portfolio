"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type PointerEvent } from "react";
import ModelViewer from "./ModelViewer";

const worlds = [
  {
    number: "01",
    title: "TECH",
    statement: "ENGINEER. AUTOMATE. SCALE.",
    items: ["SOFTWARE ENGINEERING", "AI / ML", "SYSTEMS", "AUTOMATION"],
    href: "/tech",
  },
  {
    number: "02",
    title: "CREATIVE",
    statement: "DESIGN. CREATE. COMMUNICATE.",
    items: ["UI / UX", "VISUAL DESIGN", "3D", "MOTION"],
    href: "/creative",
  },
];

const featuredProjects = [
  {
    title: "Outdoor Gear Brand Identity",
    category: "Graphic Design",
    description: "Developed an outdoor brand identity and applied it across camping gear, footwear and apparel mockups.",
    src: "/projects/graphic-design/design-3.jpeg",
    type: "image",
    href: "/creative/identity",
  },
  {
    title: "Omega Merchandise Collection",
    category: "Graphic Design",
    description: "Created an Omega identity application across wearable, packaging, stationery and product merchandise mockups.",
    src: "/projects/graphic-design/design-8.jpeg",
    type: "image",
    href: "/creative/identity",
  },
  {
    title: "Ganesh Chaturthi 3D Visual",
    category: "3D / VFX",
    description: "Developed a stylized 3D character sequence using modeling, lighting, animation and compositing for a polished visual narrative.",
    src: "/projects/3d/123.mp4",
    type: "video",
    href: "/creative/character",
  },
  {
    title: "Katana 3D Illustration",
    category: "3D / VFX",
    description: "Created a dramatic katana visual with stylized lighting, composition and custom graphic treatment.",
    src: "/projects/3d/katana.png",
    type: "image",
    href: "/creative/character",
  },
  {
    title: "Cinematic Reel Edit",
    category: "Video Editing",
    description: "Edited a fast-paced short-form video with refined pacing, transitions, color work and sound-led visual rhythm.",
    src: "/projects/video-editing/0425-1.mp4",
    type: "video",
    href: "/creative/video",
  },
  {
    title: "Interactive Face AR Lens",
    category: "Lens Creation",
    description: "Designed interactive Snapchat AR lenses combining 3D assets, effects and face tracking for engaging social experiences.",
    src: "/projects/lens/2.mp4",
    type: "video",
    href: "/creative/world",
  },
  {
    title: "AllPay Payment Confirmation",
    category: "UI / UX",
    description: "Designed the payment-success screen for AllPay, with a clear receipt, transaction details and next-step actions.",
    src: "/projects/uiux/allpay/4.png",
    type: "image",
    href: "/creative/motion",
  },
  {
    title: "Central Medical Hospital Portal",
    category: "UI / UX",
    description: "Designed a hospital departments portal with accessible service details, emergency information and appointment actions.",
    src: "/projects/uiux/hospital/Screenshot%202026-09-30%20112637.png",
    type: "image",
    href: "/creative/hospital",
  },
  {
    title: "Vyre Fashion Storefront",
    category: "UI / UX",
    description: "Designed a fashion shopping interface featuring a curated product carousel, clear product details and browsing controls.",
    src: "/projects/uiux/vyre/Screenshot%202026-09-30%20114514.png",
    type: "image",
    href: "/creative/motion",
  },
  {
    title: "Game Environment Showcase",
    category: "Game Development",
    description: "Produced an interactive game environment, bringing together scene design, gameplay presentation and real-time visual development.",
    src: "/projects/game/1.mp4",
    type: "video",
    href: "/creative/content",
  },
  {
    title: "Immersive AR / VR Prototype",
    category: "AR / VR",
    description: "Created an immersive spatial experience using interactive visuals and real-time media for a more engaging digital environment.",
    src: "/projects/arvr/3.mp4",
    type: "video",
    href: "/creative/arvr",
  },
] as const;

export default function PortfolioHome() {
  const [intro, setIntro] = useState(true);
  const [introLeaving, setIntroLeaving] = useState(false);
  const [homeRevealed, setHomeRevealed] = useState(false);
  const [menu, setMenu] = useState(false);
  const [cursorLabel, setCursorLabel] = useState("");
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [worldsVisible, setWorldsVisible] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const worldsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const proceed = () => {
      setIntroLeaving(true);
      window.setTimeout(() => setIntro(false), 600);
    };

    const keydown = () => {
      if (!introLeaving) proceed();
    };

    const pointerdown = () => {
      if (!introLeaving) proceed();
    };

    const move = (e: MouseEvent) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    window.addEventListener("keydown", keydown);
    window.addEventListener("pointerdown", pointerdown);
    const introTimer = window.setTimeout(proceed, 5000);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("pointerdown", pointerdown);
      window.clearTimeout(introTimer);
    };
  }, [introLeaving]);

  useEffect(() => {
    if (intro) {
      setHomeRevealed(false);
      return;
    }

    const revealTimer = window.setTimeout(() => setHomeRevealed(true), 120);
    return () => window.clearTimeout(revealTimer);
  }, [intro]);

  useEffect(() => {
    const worldsSection = worldsRef.current;
    if (!worldsSection) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setWorldsVisible(true);
        observer.disconnect();
      }
    }, { threshold: 0.18 });

    observer.observe(worldsSection);
    return () => observer.disconnect();
  }, []);

  const scrollToWorlds = () => {
    document.getElementById("worlds")?.scrollIntoView({ behavior: "smooth" });
  };

  const sendGmailMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const params = new URLSearchParams({
      view: "cm",
      fs: "1",
      to: "vinithbusipalli@gmail.com",
      su: `Portfolio Contact from ${contactForm.name || "Website Visitor"}`,
      body: `Name: ${contactForm.name}\nEmail: ${contactForm.email}\n\nMessage:\n${contactForm.message}`,
    });
    window.open(`https://mail.google.com/mail/?${params.toString()}`, "_blank", "noopener,noreferrer");
  };

  return (
    <main className={intro ? `site intro-active${introLeaving ? " intro-leaving" : ""}` : "site"}>
      <div className="grain" aria-hidden="true" />
      <div className="site-wide-background" aria-hidden="true">
        <img className="site-wide-portrait" src="/vinith.png" alt="" />
        <span className="site-wide-watermark">VB</span>
        <span className="site-wide-grid" />
        <span className="site-wide-trace site-wide-trace-one" />
        <span className="site-wide-trace site-wide-trace-two" />
        <span className="site-wide-trace site-wide-trace-three" />
      </div>

      <div
        className={`cursor ${cursorLabel ? "cursor-expanded" : ""}`}
        style={{ transform: `translate3d(${cursorPos.x}px, ${cursorPos.y}px, 0)` }}
        aria-hidden="true"
      >
        <span>{cursorLabel}</span>
      </div>

      <nav id="site-navigation" className={`overlay-nav ${menu ? "open" : ""}`} aria-hidden={!menu}>
        <button className="nav-close" onClick={() => setMenu(false)} type="button">
          CLOSE ×
        </button>
        <div className="nav-list">
          {[
            ["01", "Home", "#home"],
            ["02", "Worlds", "#worlds"],
            ["03", "Work", "#work"],
            ["04", "Experience", "#experience"],
            ["05", "Contact", "#contact"],
          ].map(([n, label, href]) => (
            <a key={n} href={href} onClick={() => setMenu(false)}>
              {n}
              <span>{label}</span>
            </a>
          ))}
        </div>
      </nav>

      {intro && (
        <section className="intro" aria-label="Portfolio introduction">
          <div className="ambient-background" aria-hidden="true">
            <div className="signal-field">
              <span className="signal-line signal-line-one" />
              <span className="signal-line signal-line-two" />
              <span className="signal-line signal-line-three" />
              <span className="signal-line signal-line-four" />
              <span className="signal-line signal-line-five" />
              <span className="signal-line signal-line-six" />
            </div>
            <span className="signal-scan" />
            <span className="signal-monogram">VB</span>
            <span className="hologram-grid" />
            <span className="hologram-scan" />
            <span className="hologram-shimmer" />
            <span className="ambient-glow ambient-glow-one" />
            <span className="ambient-glow ambient-glow-two" />
            <span className="ambient-glow ambient-glow-three" />
          </div>
          <div className="neuron-frame" aria-hidden="true">
            <span className="neuron-edge neuron-top" />
            <span className="neuron-edge neuron-right" />
            <span className="neuron-edge neuron-bottom" />
            <span className="neuron-edge neuron-left" />
          </div>
          <div className="initials" aria-hidden="true">
            <span>V</span>
            <span>B</span>
          </div>
          <div className="name" aria-label="Vinith Busipalli">
            <span className="letter v">V</span>
            <span className="letter i">I</span>
            <span className="letter n">N</span>
            <span className="letter i2">I</span>
            <span className="letter t">T</span>
            <span className="letter h">H</span>
            <span className="letter b">B</span>
            <span className="letter u">U</span>
            <span className="letter s">S</span>
            <span className="letter i3">I</span>
            <span className="letter p">P</span>
            <span className="letter a">A</span>
            <span className="letter l">L</span>
            <span className="letter l2">L</span>
            <span className="letter i4">I</span>
          </div>
          <p className="intro-prompt">PRESS ANY KEY OR TAP TO CONTINUE</p>
        </section>
      )}

      <section id="home" className="hero section-pad">
        <div className="hero-texture" aria-hidden="true" />
        <div className="identity-field" aria-hidden="true">
          <span className="identity-watermark">VB</span>
          <span className="identity-grid" />
          <span className="identity-trace identity-trace-one" />
          <span className="identity-trace identity-trace-two" />
          <span className="identity-trace identity-trace-three" />
        </div>

        <nav className="hero-nav" aria-label="Homepage navigation">
          <a
            className="hero-brand"
            href="#home"
            onMouseEnter={() => setCursorLabel("HOME")}
            onMouseLeave={() => setCursorLabel("")}
          >
            <span>VB</span>
            <small>HOME</small>
          </a>

          <button
            className="menu-trigger"
            onClick={() => setMenu((v) => !v)}
            onMouseEnter={() => setCursorLabel("MENU")}
            onMouseLeave={() => setCursorLabel("")}
            aria-label={menu ? "Close navigation" : "Open navigation"}
            aria-expanded={menu}
            aria-controls="site-navigation"
            type="button"
          >
            <span className="menu-trigger-icon" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="menu-trigger-text">MENU</span>
          </button>
        </nav>

        <div className={`hero-copy${homeRevealed ? " hero-copy-revealed" : ""}`}>
          <p className="eyebrow">COMPUTER SCIENCE ENGINEER · DESIGNER · CREATOR</p>
          <h1 aria-label="Vinith Busipalli">
            <span className="hero-name-line">VINITH</span>
            <em className="hero-name-line">BUSIPALLI</em>
          </h1>
          <p className="hero-line">I am Vinith Busipalli, a computer science engineer and designer exploring AI, digital products, and creative technology.</p>
          <button
            className="scroll-link"
            type="button"
            onClick={scrollToWorlds}
            onMouseEnter={() => setCursorLabel("EXPLORE")}
            onMouseLeave={() => setCursorLabel("")}
          >
            SCROLL TO EXPLORE
            <span aria-hidden="true">↓</span>
          </button>
        </div>

        <div className="hero-identity">
          <div className="portrait-frame">
            <ModelViewer />
          </div>
        </div>
      </section>

      <section ref={worldsRef} id="worlds" className={`worlds section-pad${worldsVisible ? " worlds-visible" : ""}`}>
        <div className="worlds-background" aria-hidden="true">
          <span className="identity-watermark">VB</span>
          <span className="identity-grid" />
          <span className="identity-trace identity-trace-one" />
          <span className="identity-trace identity-trace-two" />
          <span className="identity-trace identity-trace-three" />
        </div>
        <div className="section-heading">
          <h2>
            Explore my <em>Expertise.</em>
          </h2>
        </div>
        <div className="world-grid">
          {worlds.map((world, index) => (
            <Link
              key={world.title}
              className={`world-card world-card-${index === 0 ? "tech" : "creative"}`}
              href={world.href}
              onPointerMove={(event: PointerEvent<HTMLAnchorElement>) => {
                if (event.pointerType === "touch") return;
                const bounds = event.currentTarget.getBoundingClientRect();
                const x = (event.clientX - bounds.left) / bounds.width - 0.5;
                const y = (event.clientY - bounds.top) / bounds.height - 0.5;
                event.currentTarget.style.setProperty("--card-rotate-x", `${y * -7}deg`);
                event.currentTarget.style.setProperty("--card-rotate-y", `${x * 7}deg`);
                event.currentTarget.style.setProperty("--character-x", `${x * 16}px`);
              }}
              onPointerLeave={(event: PointerEvent<HTMLAnchorElement>) => {
                event.currentTarget.style.setProperty("--card-rotate-x", "0deg");
                event.currentTarget.style.setProperty("--card-rotate-y", "0deg");
                event.currentTarget.style.setProperty("--character-x", "0px");
                setCursorLabel("");
              }}
              onMouseEnter={() => setCursorLabel("ENTER")}
            >
              <span className={`world-photo-block world-photo-block-${index === 0 ? "tech" : "creative"}`}>
                <img
                  src={index === 0 ? "/tech_vinith.png" : "/design_vinith.png"}
                  alt={index === 0 ? "Vinith working at a laptop" : "Vinith creating a design"}
                />
              </span>
              <span className="world-number">{world.number}</span>
              <span className="world-content">
                <span className="world-card-kicker">{world.title}</span>
                <span className="world-statement">{world.statement}</span>
                <span className="world-items">
                  {world.items.map((item) => <span key={item}>{item}</span>)}
                </span>
              </span>
              <span className="world-arrow" aria-hidden="true">→</span>
            </Link>
          ))}
        </div>
      </section>

      <section id="work" className="featured-work section-pad" aria-labelledby="featured-work-title">
        <div className="featured-work-heading">
          <h2 id="featured-work-title">Works.</h2>
        </div>
        <div className="featured-work-rows">
          {[0, 1, 2].map((rowIndex) => {
            const row = featuredProjects.filter((_, index) => index % 3 === rowIndex);
            return (
            <div className={`featured-work-row featured-work-row-${rowIndex + 1}`} key={rowIndex}>
              <div className="featured-work-track">
                {[...row, ...row].map((project, index) => (
                  <Link className="featured-work-card" href={project.href} key={`${project.title}-${index}`}>
                    <div className="featured-work-media">
                      {project.type === "video" ? (
                        <video autoPlay muted loop playsInline preload="metadata" aria-label={project.title}>
                          <source src={project.src} type="video/mp4" />
                        </video>
                      ) : (
                        <img src={project.src} alt={project.title} />
                      )}
                    </div>
                    <div className="featured-work-copy">
                      <h3>{project.title}</h3>
                      <p className="featured-work-category">{project.category}</p>
                      <p>{project.description}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            );
          })}
        </div>
        <Link className="featured-work-link" href="/creative">VIEW ALL CREATIVE WORK <span aria-hidden="true">→</span></Link>
      </section>

      <section id="experience" className="placeholder section-pad">
        <header className="proof-hero">
          <h2>EXPERIENCE,<br />ACHIEVEMENTS<br /><em>&amp; WORK.</em></h2>
        </header>

        <div className="proof-section proof-experience">
          <h3>Experience</h3>
          <article className="proof-timeline-card">
            <div><h4>Product Development Intern</h4><p>Yuvamytr</p></div>
            <p className="proof-date">June 2025 – May 2026</p>
            <p>Full-stack product development experience involving web development, implementation and building practical digital solutions.</p>
          </article>
          <article className="proof-timeline-card">
            <div><h4>Video Editing Intern</h4><p>Agents Clan</p></div>
            <p className="proof-date">April 2026 – July 2026</p>
            <p>Worked across video editing, event management and videography for creative content and event experiences.</p>
          </article>
        </div>

        <div className="proof-section">
          <h3>Achievements</h3>
          <div className="proof-achievement-grid">
            <article><h4>IndiaSkills – Graphic Design</h4><p className="proof-detail">Medal of Excellence · Regional Level</p><p>Recognised with a Medal of Excellence at the IndiaSkills Regional Level in Graphic Designing.</p></article>
            <article><h4>India Skill Competition Karnataka 2025</h4><p className="proof-detail">Graphic Design · State Level Selection</p><p>Selected for the Karnataka State Level India Skill Competition 2025 in the Graphic Design category.</p></article>
            <article><h4>Snapchat Lens Creation</h4><p className="proof-detail">98K+ Users</p><p>Created and published interactive Snapchat AR lenses, reaching more than 98K users.</p></article>
            <article><h4>NMIT Hacks</h4><p className="proof-detail">Social Media Team</p><p>Contributed to the NMIT Hacks community through social media, creative content and event promotion.</p></article>
            <article><h4>NSS</h4><p className="proof-detail">Social Service</p><p>Participated in social service activities through NSS and contributed to community-focused initiatives.</p></article>
          </div>
        </div>

        <div className="proof-section">
          <h3>Project Highlights</h3>
          <div className="proof-project-grid">
            <article className="proof-project proof-project-neuro"><div className="proof-neuro-visual" aria-hidden="true"><i /><i /><i /></div><div><p>AI / ML</p><h4>NeuroScan AI</h4><span>Brain MRI analysis and brain tumour classification using deep learning.</span></div></article>
            <Link className="proof-project" href="/creative/arvr"><img src="/arvr.png" alt="AR Vehicle World" /><div><p>AR / VR</p><h4>AR Vehicle World</h4><span>An AR/VR experience developed using Unity and AR technologies.</span></div></Link>
          </div>
        </div>
      </section>

      <section id="contact" className="contact section-pad" aria-labelledby="contact-title">
        <p className="section-index">05 / CONTACT</p>
        <div className="contact-redesign">
          <div className="contact-intro">
            <h2 id="contact-title">LET&apos;S WORK<br /><em>TOGETHER.</em></h2>
            <p>Have an idea, project or creative challenge? Send me a message and let&apos;s turn it into something meaningful.</p>
          </div>
          <form className="contact-form" onSubmit={sendGmailMessage}>
            <label>Name<input type="text" name="name" value={contactForm.name} onChange={(event) => setContactForm((form) => ({ ...form, name: event.target.value }))} required /></label>
            <label>Email<input type="email" name="email" value={contactForm.email} onChange={(event) => setContactForm((form) => ({ ...form, email: event.target.value }))} required /></label>
            <label>Message<textarea name="message" value={contactForm.message} onChange={(event) => setContactForm((form) => ({ ...form, message: event.target.value }))} required rows={5} /></label>
            <button type="submit">SEND MESSAGE <span aria-hidden="true">→</span></button>
          </form>
          <div className="contact-actions"><a href="https://mail.google.com/mail/?view=cm&fs=1&to=vinithbusipalli@gmail.com" target="_blank" rel="noreferrer">vinithbusipalli@gmail.com <span>→</span></a><a href="https://wa.me/917022532236" target="_blank" rel="noreferrer">CHAT ON WHATSAPP <span>→</span></a></div>
        </div>
      </section>
      <footer className="portfolio-footer section-pad">
        <div className="portfolio-footer-intro"><h2>VINITH BUSIPALLI</h2><p>CREATIVE / TECHNOLOGY</p><span>Designing, building and experimenting across technology and creative media.</span></div>
        <nav className="portfolio-footer-nav" aria-label="Portfolio navigation">
          <div>
            <h3>EXPLORE</h3>
            <a href="#home">Home</a>
            <a href="#worlds">Expertise</a>
            <a href="#work">Selected work</a>
            <a href="#experience">Experience</a>
            <a href="#contact">Contact</a>
          </div>
          <div>
            <h3>PORTFOLIOS</h3>
            <Link href="/tech">Technology</Link>
            <Link href="/creative">Creative</Link>
          </div>
        </nav>
        <div className="portfolio-footer-bottom"><span>VB / VINITH BUSIPALLI</span><span>© {new Date().getFullYear()} VINITH BUSIPALLI</span><a href="#home">BACK TO TOP ↑</a></div>
      </footer>
    </main>
  );
}
