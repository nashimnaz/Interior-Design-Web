'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { E_LOGO_BASE64, E_LOGO_WHITE_MASK_BASE64 } from './preloaderAssets';

interface PreloaderProps {
  onComplete?: () => void;
  onStartReveal?: () => void;
}

/**
 * Preloader
 * 
 * Architectural Image-Fill Logo Loading Experience.
 * - Uses the exact EXCORTO E Logo silhouette as a clipping mask.
 * - Stage 1: Displays original charcoal-grey E logo (#676767) on warm ivory (#F7F5F0).
 * - Stage 2 & 3: Progressively fills the logo from LEFT TO RIGHT with a luxury interior photograph.
 * - Stage 4: Holds the complete image-filled architectural mark with a subtle light transition.
 * - Stage 5: Smoothly fades and scales out to reveal the homepage hero.
 * - Coordinates completion with initial hero frame readiness to eliminate blank flashes.
 * - Uses sessionStorage so it plays once per user session in production.
 * - Always plays during development refresh or when ?preloader=1 is present.
 */
export function Preloader({ onComplete, onStartReveal }: PreloaderProps) {
  const [isActive, setIsActive] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const revealRectRef = useRef<SVGRectElement>(null);
  const beamLineRef = useRef<SVGLineElement>(null);
  const sheenRef = useRef<SVGRectElement>(null);
  const hasFinishedRef = useRef<boolean>(false);

  // Stable references for callbacks so parent re-renders never abort the GSAP animation
  const onStartRevealRef = useRef(onStartReveal);
  onStartRevealRef.current = onStartReveal;
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // 1. Session check
    // In production, only run once per session unless ?preloader=1 or ?replay=1 is set.
    // In development mode, always run on refresh so you can inspect and verify.
    const isDev = process.env.NODE_ENV === 'development';
    const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null;
    const forceReplay = params?.get('preloader') === '1' || params?.get('replay') === '1';

    try {
      if (!isDev && !forceReplay) {
        const alreadySeen = sessionStorage.getItem('excorto_preloader_seen');
        if (alreadySeen) {
          setIsActive(false);
          onStartRevealRef.current?.();
          onCompleteRef.current?.();
          return;
        }
      }
    } catch {
      // Ignore sessionStorage exceptions in restricted sandboxes
    }

    // Expose replay helper on window for easy testing in browser console
    if (typeof window !== 'undefined') {
      (window as unknown as { __replayPreloader?: () => void }).__replayPreloader = () => {
        try { sessionStorage.removeItem('excorto_preloader_seen'); } catch {}
        window.location.reload();
      };
    }

    // 2. Preload Architectural Interior Fill Image
    const fillImg = new window.Image();
    fillImg.src = '/images/preloader/interior-fill.webp';

    // 3. Connect to homepage initial hero frame readiness
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const heroAssetUrl = isMobile 
      ? '/images/Sunlit Arched Nook with Olive Branches.png'
      : '/images/AA4DD01B-86D5-45F3-991A-BC3AD98FE52B.png';

    let isHeroReady = false;
    const heroImg = new window.Image();
    heroImg.onload = () => { isHeroReady = true; };
    heroImg.onerror = () => { isHeroReady = true; };
    heroImg.src = heroAssetUrl;
    if (heroImg.complete && heroImg.naturalWidth > 0) {
      isHeroReady = true;
    }

    // 4. Respect reduced motion
    const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      try {
        sessionStorage.setItem('excorto_preloader_seen', '1');
      } catch {}
      setIsActive(false);
      onStartRevealRef.current?.();
      onCompleteRef.current?.();
      return;
    }

    // 5. Lock background scroll while preloader is active
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const finishPreloader = () => {
      if (hasFinishedRef.current) return;
      hasFinishedRef.current = true;
      try {
        sessionStorage.setItem('excorto_preloader_seen', '1');
      } catch {}
      document.body.style.overflow = originalOverflow;
      setIsActive(false);
      onCompleteRef.current?.();
    };

    // 6. Safety fallback timeout (5s maximum)
    const safetyTimer = setTimeout(() => {
      finishPreloader();
    }, 5000);

    // 7. GSAP Orchestrated Architectural Image-Fill Reveal Timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial state: reveal width 0, beam at 0
      if (revealRectRef.current) {
        revealRectRef.current.setAttribute('width', '0');
      }
      if (beamLineRef.current) {
        beamLineRef.current.setAttribute('x1', '0');
        beamLineRef.current.setAttribute('x2', '0');
        beamLineRef.current.style.opacity = '0';
      }

      // Stage 1: Initial Solid Logo Display (charcoal-grey E logo visible for 400ms)
      tl.to({}, { duration: 0.4 });

      // Stage 2 & 3: Left-to-Right Progressive Fill Animation
      // Width animates from 0 to 365 (full width of logo)
      const fillObj = { width: 0 };
      tl.to(fillObj, {
        width: 365,
        duration: 1.6,
        ease: 'power2.inOut',
        onStart: () => {
          if (beamLineRef.current) {
            beamLineRef.current.style.opacity = '1';
          }
        },
        onUpdate: () => {
          const w = fillObj.width;
          if (revealRectRef.current) {
            revealRectRef.current.setAttribute('width', String(w));
          }
          if (beamLineRef.current) {
            beamLineRef.current.setAttribute('x1', String(w));
            beamLineRef.current.setAttribute('x2', String(w));
            if (w >= 360) {
              beamLineRef.current.style.opacity = '0';
            }
          }
        },
      });

      // Stage 4: Complete Image Fill Hold & Subtle Architectural Sheen
      if (sheenRef.current) {
        tl.to(
          sheenRef.current,
          {
            opacity: 0.8,
            duration: 0.35,
            ease: 'power2.inOut',
            yoyo: true,
            repeat: 1,
          },
          '+=0.08'
        );
      }

      // Brief hold on completed image-filled logo
      tl.to({}, { duration: 0.3 });

      // Stage 5: Coordinate with hero readiness and reveal homepage
      tl.call(() => {
        const proceedToReveal = () => {
          const exitTl = gsap.timeline({
            onComplete: () => {
              finishPreloader();
            }
          });

          // Signal homepage hero to start its entrance timeline right as preloader lifts
          onStartRevealRef.current?.();

          // Logo scales up subtly and fades
          exitTl.to(logoWrapperRef.current, {
            opacity: 0,
            scale: 1.03,
            y: -10,
            duration: 0.55,
            ease: 'power2.inOut',
          });

          // Warm ivory overlay fades out smoothly and slides up slightly
          exitTl.to(containerRef.current, {
            opacity: 0,
            yPercent: -3,
            duration: 0.65,
            ease: 'power3.inOut',
          }, '-=0.45');
        };

        if (isHeroReady || heroImg.complete) {
          proceedToReveal();
        } else {
          // If hero asset needs a moment, wait for it with 1.2s max safety cap
          const checkTimer = setInterval(() => {
            if (isHeroReady || heroImg.complete) {
              clearInterval(checkTimer);
              proceedToReveal();
            }
          }, 60);

          setTimeout(() => {
            clearInterval(checkTimer);
            proceedToReveal();
          }, 1200);
        }
      });
    });

    return () => {
      clearTimeout(safetyTimer);
      document.body.style.overflow = originalOverflow;
      ctx.revert();
    };
  }, []); // Empty dependency array ensures GSAP context is never accidentally killed by parent re-renders

  if (!isActive) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[100] w-full h-full min-h-screen flex items-center justify-center bg-[#F7F5F0] select-none pointer-events-auto"
      style={{ willChange: 'opacity, transform' }}
      aria-label="Loading Excorto Builders & Interiors"
      role="dialog"
      aria-modal="true"
    >
      {/* Centered Logo Construction Window */}
      <div
        ref={logoWrapperRef}
        className="relative w-[130px] sm:w-[160px] md:w-[195px] aspect-[365/516] flex items-center justify-center will-change-transform"
      >
        <svg
          viewBox="0 0 365 516"
          className="w-full h-full overflow-visible"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* 1. Exact E Logo Mask (Instantaneous synchronous base64 white mask) */}
            <mask
              id="excorto-logo-mask"
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="365"
              height="516"
            >
              <image
                href={E_LOGO_WHITE_MASK_BASE64}
                x="0"
                y="0"
                width="365"
                height="516"
                preserveAspectRatio="none"
              />
            </mask>

            {/* 2. Progressive Horizontal Reveal Clip Rect */}
            <clipPath id="excorto-reveal-clip">
              <rect
                ref={revealRectRef}
                x="0"
                y="0"
                width="0"
                height="516"
              />
            </clipPath>

            {/* 3. Subtle Light Sheen Linear Gradient */}
            <linearGradient id="sheen-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="50%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* LAYER 1: Base Solid Charcoal-Grey E Logo (#676767) */}
          <rect
            x="0"
            y="0"
            width="365"
            height="516"
            fill="#676767"
            mask="url(#excorto-logo-mask)"
          />

          {/* LAYER 2: Progressive Left-to-Right Luxury Architectural Interior Fill */}
          <g mask="url(#excorto-logo-mask)">
            <g clipPath="url(#excorto-reveal-clip)">
              {/* Stationary Luxury Architecture Photograph */}
              <image
                href="/images/preloader/interior-fill.webp"
                x="0"
                y="0"
                width="365"
                height="516"
                preserveAspectRatio="xMidYMid slice"
              />
              {/* Warm Ambient Architectural Hue */}
              <rect
                x="0"
                y="0"
                width="365"
                height="516"
                fill="#C2633E"
                opacity="0.06"
                style={{ mixBlendMode: 'multiply' }}
              />
            </g>
          </g>

          {/* LAYER 3: Architectural Silhouette & Slats Crisp Outline Definition */}
          <image
            href={E_LOGO_BASE64}
            x="0"
            y="0"
            width="365"
            height="516"
            opacity="0.22"
            preserveAspectRatio="none"
            style={{ mixBlendMode: 'multiply', pointerEvents: 'none' }}
          />

          {/* LAYER 4: Moving Golden-Amber Hairline Beam at the Reveal Boundary */}
          <g mask="url(#excorto-logo-mask)">
            <line
              ref={beamLineRef}
              x1="0"
              y1="0"
              x2="0"
              y2="516"
              stroke="#E8B896"
              strokeWidth="3.5"
              strokeLinecap="round"
              opacity="0"
              filter="drop-shadow(0 0 6px rgba(232, 184, 150, 0.95))"
            />
          </g>

          {/* LAYER 5: Completed Mark Light Transition Sheen */}
          <rect
            ref={sheenRef}
            x="0"
            y="0"
            width="365"
            height="516"
            fill="url(#sheen-grad)"
            mask="url(#excorto-logo-mask)"
            opacity="0"
            style={{ mixBlendMode: 'overlay', pointerEvents: 'none' }}
          />
        </svg>
      </div>
    </div>
  );
}
