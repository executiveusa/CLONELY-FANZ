import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import "./landing-page.css";
import CinematicHero, { ClonelyWordmark } from "./CinematicHero";

/**
 * CLONELY-FANZ public editorial front door.
 * Only approved Mila canon may be placed into VITE_MILA_CANON_HERO_URL.
 * Fanvue's URL is intentionally opt-in until the actual profile is verified.
 * No checkout, social API, or adult media is served by this page.
 */
const MILA_IMAGE = import.meta.env.VITE_MILA_CANON_HERO_URL as string | undefined;
const FANVUE_URL = import.meta.env.VITE_MILA_FANVUE_URL as string | undefined;

function allowedFanvueUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    if (url.protocol !== "https:" || (hostname !== "fanvue.com" && !hostname.endsWith(".fanvue.com"))) return null;
    return url.toString();
  } catch {
    return null;
  }
}

function allowedHeroUrl(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

const fanvueUrl = allowedFanvueUrl(FANVUE_URL);
const heroImage = allowedHeroUrl(MILA_IMAGE);

const chapters = [
  {
    number: "01",
    name: "The editorial",
    description: "Character-led portrait stories, styled around Mila's signature crimson, ivory, and black.",
  },
  {
    number: "02",
    name: "The conversation",
    description: "A distinct voice and personality, with AI disclosure and platform-specific controls.",
  },
  {
    number: "03",
    name: "The private collection",
    description: "Subscriber releases on supported adult creator platforms, subject to approval and availability.",
  },
];

export default function LandingPage() {
  const gateRef = useRef<HTMLDivElement>(null);
  // Evaluate the session acknowledgment before first paint to avoid revealing
  // the page for a frame ahead of the modal.
  const [ageConfirmed, setAgeConfirmed] = useState(() => {
    try { return window.sessionStorage.getItem("clonely-21-plus-confirmed") === "yes"; }
    catch { return false; }
  });

  useEffect(() => {
    if (ageConfirmed) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const first = gateRef.current?.querySelector<HTMLElement>("button");
    first?.focus();
    return () => { document.body.style.overflow = previous; };
  }, [ageConfirmed]);

  const trapGateFocus = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab") return;
    const controls = gateRef.current?.querySelectorAll<HTMLElement>("button, a[href]");
    if (!controls?.length) return;
    const first = controls[0];
    const last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const confirmAge = () => {
    try {
      window.sessionStorage.setItem("clonely-21-plus-confirmed", "yes");
    } catch {
      // Acknowledgment applies to this page view if storage is disabled.
    }
    setAgeConfirmed(true);
    window.requestAnimationFrame(() => document.querySelector<HTMLElement>(".clonely-header-action")?.focus());
  };

  return (
    <div className="clonely-site" id="top">
      <a className="clonely-skip" href="#main">Skip to content</a>
      <header className="clonely-header" inert={!ageConfirmed} aria-hidden={!ageConfirmed}>
        <a className="clonely-wordmark" href="#top" aria-label="Clonely Fanz, back to top">
          <ClonelyWordmark className="cf-wordmark--header" />
        </a>
        <nav className="clonely-nav" aria-label="Main navigation">
          <a href="#mila">Meet Mila</a>
          <a href="#collection">The collection</a>
          <a href="#disclosure">AI disclosure</a>
        </nav>
        <a className="clonely-header-action" href="#mila">Explore Mila <span aria-hidden="true">↗</span></a>
      </header>

      <main id="main" inert={!ageConfirmed} aria-hidden={!ageConfirmed}>
        <section className="clonely-cinema-shell" aria-labelledby="clonely-hero-title">
          <CinematicHero posterUrl={heroImage} canPlay={ageConfirmed} />
        </section>

        <div className="clonely-marquee" aria-label="Original characters, real creative direction, AI disclosed">
          <span>ORIGINAL CHARACTERS</span><i aria-hidden="true">✳</i><span>REAL CREATIVE DIRECTION</span><i aria-hidden="true">✳</i><span>ALWAYS AI DISCLOSED</span>
        </div>

        <section id="mila" className="clonely-feature" aria-labelledby="clonely-mila-heading">
          <div className="clonely-feature-index"><span>MEET YOUR FIRST CHARACTER</span><span>001 / 001</span></div>
          <div className="clonely-feature-grid">
            <div className="clonely-feature-art" aria-hidden="true"><span>МИЛА</span><strong>MILA</strong><small>THE ORIGINAL<br/>CC—001</small></div>
            <div className="clonely-feature-content">
              <p className="clonely-kicker">THE FACE OF OUR FIRST COLLECTION</p>
              <h2 id="clonely-mila-heading">She has a name.<br/><em>And a point of view.</em></h2>
              <p>Mila is a fictional, Serbian-inspired adult AI creator. Composed. Sharp. A little playful. Her visual identity and personality are designed to remain recognizable across every approved appearance.</p>
              <div className="clonely-spec-list">
                <div><span>CHARACTER</span><strong>Mila / CC-001</strong></div>
                <div><span>LANGUAGES</span><strong>English + Serbian</strong></div>
                <div><span>VISUAL CODES</span><strong>Crimson / Black / Ivory / Gold</strong></div>
                <div><span>IDENTITY</span><strong>100% fictional · AI disclosed</strong></div>
              </div>
              {fanvueUrl ? (
                <a className="clonely-button clonely-button-primary" href={fanvueUrl} rel="noopener noreferrer" target="_blank">Find Mila on Fanvue <span aria-hidden="true">↗</span></a>
              ) : (
                <p className="clonely-availability">Fanvue profile is being prepared. No live membership link is currently verified.</p>
              )}
            </div>
          </div>
        </section>

        <section id="collection" className="clonely-collection" aria-labelledby="clonely-collection-title">
          <div className="clonely-section-heading">
            <p className="clonely-kicker">INSIDE THE WORLD</p>
            <h2 id="clonely-collection-title">ONE CHARACTER.<br/><em>MANY STORIES.</em></h2>
            <p>This studio builds original, consistent creator identities for editorial media, conversation, and subscriber experiences.</p>
          </div>
          <div className="clonely-chapters">
            {chapters.map((chapter) => (
              <article key={chapter.number} className="clonely-chapter">
                <span>{chapter.number}</span>
                <div><h3>{chapter.name}</h3><p>{chapter.description}</p></div>
                <span className="clonely-chapter-mark" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </section>

        <section id="disclosure" className="clonely-disclosure" aria-labelledby="clonely-disclosure-title">
          <span className="clonely-disclosure-mark" aria-hidden="true">AI</span>
          <div><p className="clonely-kicker">BUILT WITH TRANSPARENCY</p><h2 id="clonely-disclosure-title">THE CHARACTER IS FICTIONAL.<br/>THE CREATIVITY ISN'T.</h2><p>Mila is a synthetic adult character. Images, video, and voice may be generated or modified by AI. We do not present these characters as real people, use unlicensed likenesses, or claim that an automated conversation is a live human interaction.</p></div>
        </section>
      </main>
      <footer className="clonely-footer" inert={!ageConfirmed} aria-hidden={!ageConfirmed}>
        <ClonelyWordmark className="cf-wordmark--footer" />
        <p>Original virtual personalities. Real creative direction.</p>
        <p>AI-GENERATED / 21+ EXPERIENCE / © {new Date().getFullYear()} CLONELY-FANZ</p>
      </footer>

      {!ageConfirmed && (
        <div className="clonely-gate-backdrop" ref={gateRef} onKeyDown={trapGateFocus}>
          <section className="clonely-age-gate" role="dialog" aria-modal="true" aria-labelledby="clonely-age-gate-title" aria-describedby="clonely-age-gate-description">
            <p className="clonely-kicker">CLONELY-FANZ / ACCESS</p>
            <h2 id="clonely-age-gate-title">A WORLD FOR <em>ADULTS.</em></h2>
            <p id="clonely-age-gate-description">This is a 21+ entertainment experience featuring fictional AI-created adults. By entering, you confirm you are at least 21 and permitted to view adult-oriented material where you live.</p>
            <div className="clonely-gate-actions">
              <button type="button" autoFocus className="clonely-button clonely-button-primary" onClick={confirmAge}>I am 21 or older <span aria-hidden="true">→</span></button>
              <a href="https://www.wikipedia.org/" className="clonely-button clonely-button-secondary">Exit site</a>
            </div>
            <p className="clonely-gate-notice">This is a self-attestation, not a legal identity-verification service. Access may be subject to additional regional restrictions.</p>
          </section>
        </div>
      )}
    </div>
  );
}
