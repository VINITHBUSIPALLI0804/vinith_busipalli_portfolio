"use client";

import CharacterViewer from "@/components/PortfolioHome";
import { useEffect, useState } from "react";

export default function PortfolioHome() {
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIntroDone(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {!introDone && (
        <section className="intro">
          <div className="orbit orbit-one"></div>
          <div className="orbit orbit-two"></div>

          <div className="intro-name">
            <span className="intro-v">V</span>
            <span className="intro-middle">VINITH USIPALLI</span>
            <span className="intro-b">B</span>
          </div>
        </section>
      )}

      <main className={`portfolio ${introDone ? "portfolio-show" : ""}`}>
        <nav className="navbar">
          <div className="logo">VB</div>

          <div className="nav-links">
            <a href="#home">01 Home</a>
            <a href="#worlds">02 Worlds</a>
            <a href="#work">03 Work</a>
            <a href="#experience">04 Experience</a>
            <a href="#contact">05 Contact</a>
          </div>
        </nav>

        <section id="home" className="hero">
          <div className="hero-small">COMPUTER SCIENCE ENGINEER - CREATOR - DESIGNER </div>

          <h1>
            VINITH
            <br />
            BUSIPALLI
          </h1>

          <p>I build with code, intelligence and imagination.</p>

          <div className="scroll-text">SCROLL TO EXPLORE ↓</div>
        </section>

        <section className="hero-character" aria-label="Interactive portrait">
          <CharacterViewer />
        </section>

        <section id="worlds" className="content-section">
          <span>01 / IDENTITY</span>
          <h2>BUILD. DESIGN. EXPERIMENT. CREATE.</h2>
        </section>

        <section id="work" className="content-section">
          <span>02 / PORTFOLIO WORLDS</span>
          <h2>Choose a world.</h2>
        </section>

        <section id="experience" className="content-section">
          <span>03 / EXPERIENCE</span>
          <h2>Creating digital experiences.</h2>
        </section>

        <section id="contact" className="content-section">
          <span>04 / CONTACT</span>
          <h2>Let's build something.</h2>
        </section>
      </main>
    </>
  );
}