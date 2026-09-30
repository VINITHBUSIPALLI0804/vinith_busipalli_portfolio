import Link from "next/link";
import { notFound } from "next/navigation";

const cases = {
  "software-development": {
    number: "01",
    title: "SOFTWARE DEVELOPMENT",
    description: "Reliable software products engineered from thoughtful interfaces to maintainable systems.",
  },
  "ai-ml": {
    number: "02",
    title: "AI / ML",
    description: "Intelligent systems and machine learning workflows built to solve practical problems.",
  },
  "mobile-development": {
    number: "03",
    title: "MOBILE APPLICATION DEVELOPMENT",
    description: "Focused mobile experiences designed for useful, intuitive everyday interactions.",
  },
  "game-development": {
    number: "04",
    title: "GAME DEVELOPMENT",
    description: "Interactive worlds built around responsive systems, play and experimentation.",
  },
} as const;

export default async function TechCaseStudy({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = cases[slug as keyof typeof cases];

  if (!project) notFound();

  return (
    <main className="tech-site tech-case-study">
      <div className="tech-grid" aria-hidden="true" />
      <nav className="tech-nav" aria-label="Case study navigation">
        <Link className="tech-brand" href="/tech"><strong>VB</strong><span>/ TECH</span></Link>
        <Link className="tech-back-mobile" href="/tech">BACK ↗</Link>
      </nav>
      <section className="case-hero">
        <p className="tech-eyebrow"><span>{project.number}</span> TECH / CASE STUDY</p>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <Link className="case-back" href="/tech">← BACK TO TECH PORTFOLIO</Link>
      </section>
    </main>
  );
}
