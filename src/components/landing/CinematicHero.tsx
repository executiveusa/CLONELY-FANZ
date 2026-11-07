import { useCallback, useEffect, useRef, useState } from "react";
import "./cinematic-hero.css";

const DRAFT_VIDEO = "https://d8j0ntlcm91z4.cloudfront.net/user_33irX78ICVwRYWpFZ5l6a5vZbf5/hf_20261105_053425_aec257c7-b66c-45d0-8aaa-aad101695819.mp4";
const previewEnabled = import.meta.env.VITE_MILA_HERO_PREVIEW === "true";
// An explicit preview-only URL switch: never surfaces unapproved baked media in production.
// V5: lips remain visible 1.07s after flight, morph into the fixed centered stacked wordmark;
// baked composite is self-contained, so never overlay a second kiss effect.
const previewFilmVersion = previewEnabled && typeof window !== "undefined"
  ? new URLSearchParams(window.location.search).get("milaFilm") : null;
const bakedReviewCutEnabled = previewFilmVersion === "v4" || previewFilmVersion === "v6" || previewFilmVersion === "v7";
const speakingReviewEnabled = previewFilmVersion === "v6" || previewFilmVersion === "v7";
const workflowReviewEnabled = previewFilmVersion === "v7";
const BAKED_REVIEW_VIDEO = "https://d2ol7oe51mr4n9.cloudfront.net/user_33irX78ICVwRYWpFZ5l6a5vZbf5/d9ffc42a-31bc-49f5-b7ad-0f1670cf2a28.mp4";
const SPEAKING_REVIEW_VIDEO = "https://d2ol7oe51mr4n9.cloudfront.net/user_33irX78ICVwRYWpFZ5l6a5vZbf5/4d585f27-851d-499c-b7b8-c9cad6ea72cd.mp4";
// Fully rendered V7 contains V5 kiss, owner-locked V6 narration, and a labeled simulated workflow.
const WORKFLOW_REVIEW_VIDEO = "https://d2ol7oe51mr4n9.cloudfront.net/user_33irX78ICVwRYWpFZ5l6a5vZbf5/d86c710f-3f1b-4d3d-9f20-620575412f1d.mp4";
/** Calibrate after reviewing the actual Mila frame at the end of her kiss. */
const configuredCue = Number(import.meta.env.VITE_MILA_KISS_CUE_SECONDS);
export const KISS_CUE_SECONDS = Number.isFinite(configuredCue) && configuredCue >= 0 && configuredCue <= 7
  ? configuredCue
  : 5.45;
const OVERLAY_LENGTH_SECONDS = 2.45;

function allowedMediaUrl(value: unknown): string | null {
  if (typeof value !== "string" || !value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && !url.username && !url.password ? url.href : null;
  } catch {
    return null;
  }
}

function useReducedMotion() {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : true,
  );
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  return reduced;
}

export function ClonelyWordmark({ className = "" }: { className?: string }) {
  return (
    <span className={"cf-wordmark " + className} aria-label="Clonely Fanz">
      <span aria-hidden="true">CLONELY</span>
      <span aria-hidden="true">FANZ</span>
    </span>
  );
}

function LacquerKiss() {
  return (
    <svg className="cf-lips" viewBox="0 0 280 156" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="cf-lacquer" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#671326" /><stop offset=".38" stopColor="#d64d69" />
          <stop offset=".72" stopColor="#9e203c" /><stop offset="1" stopColor="#3d0718" />
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

export default function CinematicHero({ posterUrl, canPlay }: CinematicHeroProps) {
  const reducedMotion = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const overlayRef = useRef<HTMLVideoElement>(null);
  const lastClockRef = useRef(0);
  const playedRef = useRef(false);
  const [phase, setPhase] = useState<"idle" | "active" | "complete">("idle");
  const [sequenceId, setSequenceId] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);
  const [overlayFailed, setOverlayFailed] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [visible, setVisible] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [previewCaption, setPreviewCaption] = useState("");

  const configuredVideo = allowedMediaUrl(import.meta.env.VITE_MILA_HERO_VIDEO_URL);
  const videoUrl = workflowReviewEnabled ? WORKFLOW_REVIEW_VIDEO : speakingReviewEnabled ? SPEAKING_REVIEW_VIDEO : bakedReviewCutEnabled ? BAKED_REVIEW_VIDEO : configuredVideo ?? (previewEnabled ? DRAFT_VIDEO : null);
  // Review MP4 already includes kiss and wordmark; never render a second overlay.
  const overlayUrl = previewEnabled && !bakedReviewCutEnabled ? allowedMediaUrl(import.meta.env.VITE_KISS_OVERLAY_VIDEO_URL) : null;
  const canRenderVideo = canPlay && !reducedMotion && !videoFailed && !!videoUrl;
  const canPlayNow = canRenderVideo && visible;
  const showCssFallback = !bakedReviewCutEnabled && (!overlayUrl || overlayFailed);

  useEffect(() => {
    try {
      playedRef.current = window.sessionStorage.getItem("clonely-kiss-seen") === "yes";
    } catch {
      // Session persistence is optional; visual state does not depend on storage.
    }
  }, []);

  useEffect(() => {
    const el = videoRef.current;
    if (!el || !canPlay) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), {
      rootMargin: "0px", threshold: 0.08,
    });
    const host = el.closest(".cf-cinema");
    if (host) observer.observe(host);
    return () => observer.disconnect();
  }, [canPlay, canRenderVideo]);

  useEffect(() => {
    const base = videoRef.current;
    const overlay = overlayRef.current;
    if (!base) return;
    if (!canPlayNow) {
      base.pause();
      overlay?.pause();
      return;
    }
    if (autoplayBlocked) return;
    void base.play().catch(() => setAutoplayBlocked(true));
  }, [canPlayNow, autoplayBlocked]);

  const resetVisuals = useCallback(() => {
    setPhase("idle");
    const overlay = overlayRef.current;
    if (overlay) {
      overlay.pause();
      try { overlay.currentTime = 0; } catch { /* metadata may be loading */ }
    }
  }, []);

  const onTimeUpdate = useCallback(() => {
    const base = videoRef.current;
    if (!base) return;
    if (speakingReviewEnabled) {
      const t = base.currentTime;
      setPreviewCaption(t < 12.55 ? "" : t < 14.55 ? "Welcome to Clonely Fanz." : t < 16.4 ? "I’m Mila, your host." : t < 19.3 ? "Let me show you what makes us different." : "");
    }
    if (bakedReviewCutEnabled) return;
    const time = base.currentTime;
    // Handles video loop wraps as well as user seeking backwards.
    if (time < lastClockRef.current - 0.5) resetVisuals();
    lastClockRef.current = time;

    if (!playedRef.current && !base.paused && time >= KISS_CUE_SECONDS && time < KISS_CUE_SECONDS + OVERLAY_LENGTH_SECONDS) {
      playedRef.current = true;
      setSequenceId(index => index + 1);
      setPhase("active");
      try { window.sessionStorage.setItem("clonely-kiss-seen", "yes"); } catch { /* optional */ }
    }

    const overlay = overlayRef.current;
    if (overlay && phase === "active") {
      const target = Math.max(0, time - KISS_CUE_SECONDS);
      if (target < OVERLAY_LENGTH_SECONDS) {
        // The base video's clock is canonical; seek only when drift is significant.
        if (Math.abs(overlay.currentTime - target) > 0.14 && overlay.readyState >= 1) {
          try { overlay.currentTime = target; } catch { /* seek availability varies by browser */ }
        }
        if (overlay.paused && overlay.readyState >= 2 && !base.paused) {
          void overlay.play().catch(() => setOverlayFailed(true));
        }
      }
    }

    if (phase === "active" && time >= KISS_CUE_SECONDS + OVERLAY_LENGTH_SECONDS) {
      overlay?.pause();
      setPhase("complete");
    }
  }, [phase, resetVisuals]);

  const replay = useCallback(() => {
    const base = videoRef.current;
    if (!base || !canRenderVideo) return;
    playedRef.current = false;
    lastClockRef.current = 0;
    setOverlayFailed(false);
    resetVisuals();
    setAutoplayBlocked(false);
    setPreviewCaption("");
    try { window.sessionStorage.removeItem("clonely-kiss-seen"); } catch { /* optional */ }
    base.currentTime = 0;
    void base.play().catch(() => setAutoplayBlocked(true));
  }, [canRenderVideo, resetVisuals]);

  return (
    <div className={"cf-cinema" + (canPlay ? " cf-cinema--entered" : "")} aria-label="Mila cinematic hero presentation">
      {posterUrl && (
        <img className="cf-cinema-poster" src={posterUrl} alt="Mila, a fictional adult AI character" fetchPriority="high" />
      )}
      {canRenderVideo && (
        <video
          ref={videoRef}
          className={"cf-cinema-video" + (videoReady ? " cf-cinema-video--ready" : "")}
          muted={!soundEnabled} loop={!bakedReviewCutEnabled} playsInline autoPlay preload="metadata" poster={posterUrl || undefined}
          aria-hidden="true" tabIndex={-1}
          onLoadedData={() => setVideoReady(true)}
          onError={() => setVideoFailed(true)}
          onTimeUpdate={onTimeUpdate}
          onSeeked={onTimeUpdate}
          onPause={() => overlayRef.current?.pause()}
          onPlay={() => setAutoplayBlocked(false)}
        >
          <source src={videoUrl!} type="video/mp4" />
        </video>
      )}
      <div className="cf-film-vignette" aria-hidden="true" />
      {!posterUrl && (!videoReady || !canRenderVideo) && (
        <div className="cf-cinema-placeholder" role="img" aria-label="Mila's approved portrait is awaiting review">
          <span aria-hidden="true">M</span>
        </div>
      )}

      {canRenderVideo && overlayUrl && !overlayFailed && (
        <video
          ref={overlayRef}
          className={"cf-hyperframes-overlay" + (phase === "active" && canPlayNow ? " cf-hyperframes-overlay--active" : "")}
          src={overlayUrl}
          muted playsInline preload="auto"
          aria-hidden="true" tabIndex={-1}
          onLoadedMetadata={onTimeUpdate}
          onError={() => setOverlayFailed(true)}
          onEnded={() => setPhase("complete")}
        />
      )}
      {canPlayNow && phase === "active" && showCssFallback && (
        <div className="cf-impact-sequence" key={"kiss-css-" + sequenceId} aria-hidden="true">
          <span className="cf-kiss-flight"><LacquerKiss /></span>
          <span className="cf-impact-glow" />
          <span className="cf-impact-wordmark"><ClonelyWordmark /></span>
        </div>
      )}

      {speakingReviewEnabled && previewCaption && <p className="cf-mila-caption" aria-live="off">{previewCaption}</p>}
      <div className="cf-cinema-content" aria-live="off">
        <p className="cf-film-label">MILA · CC—001</p>
        <h1 id="clonely-hero-title">Meet <em>Mila.</em></h1>
        <p className="cf-film-deck">An original AI muse.<br />A world of her own.</p>
        <div className="cf-film-actions">
          <a href="#mila" className="cf-film-button">Discover Mila <span aria-hidden="true">↗</span></a>
          <a href="#disclosure" className="cf-film-text-link">A fictional AI creator</a>
        </div>
        <p className="cf-film-disclosure">Original synthetic character · Adults 21+</p>
        {canRenderVideo && speakingReviewEnabled && (
          <button className="cf-replay cf-sound" type="button" onClick={() => setSoundEnabled(value => !value)} aria-label={soundEnabled ? "Mute Mila narration" : "Enable Mila narration"}>
            {soundEnabled ? "Mute Mila" : "Hear Mila"} <span aria-hidden="true">{soundEnabled ? "◌" : "♪"}</span>
          </button>
        )}
        {canRenderVideo && (
          <button className="cf-replay" type="button" onClick={replay} aria-label="Replay Mila's cinematic introduction">
            {autoplayBlocked ? "Play the introduction" : "Replay the kiss"} <span aria-hidden="true">↺</span>
          </button>
        )}
      </div>
      <div className="cf-film-edge" aria-hidden="true">AN ORIGINAL DIGITAL MUSE — 001</div>
      {previewEnabled && <span className="cf-preview-flag">UNAPPROVED MEDIA PREVIEW · NOT FOR RELEASE</span>}
    </div>
  );
}
