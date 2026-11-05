import { useCallback, useEffect, useRef, useState } from "react";
import "./cinematic-hero.css";

/**
 * Review-only media. This URL is never loaded unless the explicit
 * VITE_MILA_HERO_PREVIEW=true build flag is set.
 * Swap to an approved, owner-controlled asset URL before release.
 */
const DRAFT_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_33irX78ICVwRYWpFZ5l6a5vZbf5/hf_20261105_053425_aec257c7-b66c-45d0-8aaa-aad101695819.mp4";
const previewEnabled = import.meta.env.VITE_MILA_HERO_PREVIEW === "true";

function allowedVideoUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" ? url.href : null;
  } catch {
    return null;
  }
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(true);
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener?.("change", update);
    return () => query.removeEventListener?.("change", update);
  }, []);
  return reduced;
}

export function ClonelyWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={"cf-wordmark " + className} aria-label="Clonely Fanz">
      <span>CLONELY</span>
      <span>FANZ</span>
    </span>
  );
}

/** Geometric, hand-controlled lacquer lips. Never ask a video model to spell the logo. */
function LacquerKiss() {
  return (
    <svg className="cf-lips" viewBox="0 0 280 156" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="cf-lacquer" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#671326" />
          <stop offset=".38" stopColor="#d64d69" />
          <stop offset=".72" stopColor="#9e203c" />
          <stop offset="1" stopColor="#3d0718" />
        </linearGradient>
      </defs>
      <path d="M16 76C42 55 68 21 97 26C113 29 127 45 140 43C155 44 169 27 187 26C218 23 249 55 264 77C235 95 211 131 172 133C158 132 146 120 140 119C129 123 122 134 106 134C67 129 42 99 16 76Z" fill="url(#cf-lacquer)" stroke="#e38b93" strokeWidth="1.2" />
      <path d="M18 77C61 82 83 70 107 78C125 84 129 89 141 90C154 89 160 82 177 79C210 72 231 81 262 77" stroke="#360714" strokeWidth="7" strokeLinecap="round" />
      <path d="M56 61C86 35 108 36 127 53M159 52C185 38 208 43 227 61" stroke="#fff2df" strokeOpacity=".26" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

interface CinematicHeroProps {
  posterUrl: string | null;
  canPlay: boolean;
}

/**
 * Exact sequence is intentionally video-clock driven:
 * the current draft's actual kiss timing requires visual review and calibration.
 * No generated overlay is loaded and the words always remain real HTML text.
 */
export default function CinematicHero({ posterUrl, canPlay }: CinematicHeroProps) {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLVideoElement>(null);
  const playedRef = useRef(false);
  const [kissActive, setKissActive] = useState(false);
  const [mediaFailed, setMediaFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [overlayFailed, setOverlayFailed] = useState(false);
  const [replayCount, setReplayCount] = useState(0);
  const [visible, setVisible] = useState(true);

  const approvedUrl = allowedVideoUrl(import.meta.env.VITE_MILA_HERO_VIDEO_URL);
  // Only a reviewer preview can load the separate unapproved transparent WebM.
  const hyperframesOverlayUrl = previewEnabled ? allowedVideoUrl(import.meta.env.VITE_KISS_OVERLAY_VIDEO_URL) : null;
  const videoUrl = previewEnabled ? approvedUrl ?? DRAFT_VIDEO : approvedUrl;
  const allowPlayback = canPlay && visible && !reducedMotion && !mediaFailed && !!videoUrl;

  useEffect(() => {
    if (!canPlay) return;
    const observer = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
    }, { threshold: 0.05 });
    const stage = document.querySelector(".cf-cinema");
    if (stage) observer.observe(stage);
    return () => observer.disconnect();
  }, [canPlay]);

  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    if (allowPlayback) {
      const playPromise = el.play();
      if (playPromise) void playPromise.catch(() => setMediaFailed(true));
    } else {
      el.pause();
    }
  }, [allowPlayback, replayCount]);

  const onTimeUpdate = useCallback(() => {
    const el = videoRef.current;
    if (!el || playedRef.current) return;
    if (el.currentTime >= 5.45 && el.currentTime < 7.9) {
      playedRef.current = true;
      setKissActive(true);
      try { window.sessionStorage.setItem("clonely-kiss-seen", "yes"); } catch { /* optional */ }
    }
  }, []);

  useEffect(() => {
    try {
      playedRef.current = window.sessionStorage.getItem("clonely-kiss-seen") === "yes";
    } catch { /* optional */ }
  }, []);

  const replay = useCallback(() => {
    if (!videoRef.current || reducedMotion || !videoUrl) return;
    playedRef.current = false;
    setKissActive(false);
    setOverlayFailed(false);
    setReplayCount(count => count + 1);
    videoRef.current.currentTime = 0;
    try { window.sessionStorage.removeItem("clonely-kiss-seen"); } catch { /* optional */ }
  }, [reducedMotion, videoUrl]);

  return (
    <div className="cf-cinema" aria-label="Mila cinematic hero presentation">
      {posterUrl && (
        <img className="cf-cinema-poster" src={posterUrl} alt="Mila, a fictional adult AI character" fetchPriority="high" />
      )}
      {allowPlayback && (
        <video
          ref={videoRef}
          className={"cf-cinema-video" + (videoReady ? " cf-cinema-video--ready" : "")}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          poster={posterUrl || undefined}
          aria-hidden="true"
          tabIndex={-1}
          onLoadedData={() => setVideoReady(true)}
          onError={() => setMediaFailed(true)}
          onTimeUpdate={onTimeUpdate}
          onSeeked={() => { if (videoRef.current && videoRef.current.currentTime < 1) setKissActive(false); }}
        >
          <source src={videoUrl!} type="video/mp4" />
        </video>
      )}
      <div className="cf-film-vignette" aria-hidden="true" />
      {!posterUrl && !videoReady && <div className="cf-cinema-placeholder" aria-hidden="true"><span>M</span></div>}
      {allowPlayback && kissActive && hyperframesOverlayUrl && !overlayFailed && (
        <video
          key={"hyperframes-" + replayCount}
          ref={overlayRef}
          className="cf-hyperframes-overlay"
          src={hyperframesOverlayUrl}
          aria-hidden="true"
          playsInline
          muted
          autoPlay
          preload="auto"
          onCanPlay={() => {
            const player = overlayRef.current;
            if (player && player.paused) void player.play().catch(() => setOverlayFailed(true));
          }}
          onError={() => setOverlayFailed(true)}
        />
      )}
      {allowPlayback && kissActive && (!hyperframesOverlayUrl || overlayFailed) && (
        <div className="cf-impact-sequence" key={replayCount} aria-hidden="true">
          <span className="cf-kiss-flight"><LacquerKiss /></span>
          <span className="cf-impact-glow" />
          <span className="cf-impact-wordmark"><ClonelyWordmark /></span>
        </div>
      )}
      <div className="cf-cinema-content">
        <p className="cf-film-label">MILA · CC—001</p>
        <h1 id="clonely-hero-title">Meet <em>Mila.</em></h1>
        <p className="cf-film-deck">An original AI muse.<br />A world of her own.</p>
        <div className="cf-film-actions">
          <a href="#mila" className="cf-film-button">Discover Mila <span aria-hidden="true">↗</span></a>
          <a href="#disclosure" className="cf-film-text-link">A fictional AI creator</a>
        </div>
        <p className="cf-film-disclosure">Original synthetic character · Adults 21+</p>
        {allowPlayback && (
          <button className="cf-replay" type="button" onClick={replay} aria-label="Replay Mila's cinematic introduction">
            Replay the kiss <span aria-hidden="true">↺</span>
          </button>
        )}
      </div>
      <div className="cf-film-edge" aria-hidden="true">AN ORIGINAL DIGITAL MUSE — 001</div>
      {previewEnabled && <span className="cf-preview-flag">UNAPPROVED MEDIA PREVIEW · NOT FOR RELEASE</span>}
    </div>
  );
}
