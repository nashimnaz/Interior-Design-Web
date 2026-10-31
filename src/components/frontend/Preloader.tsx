'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface PreloaderProps {
  onComplete?: () => void;
  onStartReveal?: () => void;
}

/**
 * Preloader
 * 
 * Architectural Image-Fill Logo Loading Experience.
 * - Uses the exact EXCORTO E Logo silhouette as a clipping mask.
 * - Stage 1: Displays original charcoal-grey E logo.
 * - Stage 2 & 3: Progressively fills the logo from LEFT TO RIGHT with a luxury interior photograph.
 * - Stage 4: Holds the complete image-filled architectural mark with a subtle light transition.
 * - Stage 5: Smoothly fades and scales out to reveal the homepage hero.
 * - Coordinates completion with initial hero frame readiness to eliminate blank flashes.
 * - Uses sessionStorage so it plays strictly once on initial site entry.
 */
export function Preloader({ onComplete, onStartReveal }: PreloaderProps) {
  const [isActive, setIsActive] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoWrapperRef = useRef<HTMLDivElement>(null);
  const revealLayerRef = useRef<HTMLDivElement>(null);
  const beamRef = useRef<HTMLDivElement>(null);
  const sheenRef = useRef<HTMLDivElement>(null);
  const hasFinishedRef = useRef<boolean>(false);

  useEffect(() => {
    // 1. Session check - only run on initial site visit in current session
    try {
      const alreadySeen = sessionStorage.getItem('excorto_preloader_seen');
      if (alreadySeen) {
        setIsActive(false);
        if (onStartReveal) onStartReveal();
        if (onComplete) onComplete();
        return;
      }
    } catch {
      // Ignore sessionStorage exceptions in restricted sandboxes
    }

    // 2. Preload Logo Mask and Architectural Interior Fill Image
    const maskImg = new window.Image();
    maskImg.src = '/images/preloader/e-logo-complete.png';

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
      if (onStartReveal) onStartReveal();
      if (onComplete) onComplete();
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
      if (onComplete) onComplete();
    };

    // 6. Safety fallback timeout
    const safetyTimer = setTimeout(() => {
      finishPreloader();
    }, 4800);

    // 7. GSAP Orchestrated Architectural Image-Fill Reveal Timeline
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial state: reveal layer 0% visible (100% clipped from right)
      if (revealLayerRef.current) {
        revealLayerRef.current.style.clipPath = 'inset(0% 100% 0% 0%)';
        revealLayerRef.current.style.setProperty('-webkit-clip-path', 'inset(0% 100% 0% 0%)');
      }
      if (beamRef.current) {
        beamRef.current.style.left = '0%';
        beamRef.current.style.opacity = '0';
      }

      // Stage 1: Initial Logo Display (charcoal-grey E logo visible for 350ms)
      tl.to({}, { duration: 0.35 });

      // Stage 2 & 3: Left-to-Right Progressive Fill Animation
      const progressObj = { value: 0 };
      tl.to(progressObj, {
        value: 100,
        duration: 1.55,
        ease: 'power2.inOut',
        onStart: () => {
          if (beamRef.current) {
            beamRef.current.style.opacity = '0.9';
          }
        },
        onUpdate: () => {
          const p = progressObj.value;
          if (revealLayerRef.current) {
            const insetVal = `inset(0% ${100 - p}% 0% 0%)`;
            revealLayerRef.current.style.clipPath = insetVal;
            revealLayerRef.current.style.setProperty('-webkit-clip-path', insetVal);
          }
          if (beamRef.current) {
            beamRef.current.style.left = `${p}%`;
            if (p >= 98) {
              beamRef.current.style.opacity = '0';
            }
          }
        },
      });

      // Stage 4: Complete Image Fill Hold & Subtle Architectural Sheen
      tl.to(
        sheenRef.current,
        {
          opacity: 0.75,
          duration: 0.32,
          ease: 'power2.inOut',
          yoyo: true,
          repeat: 1,
        },
        '+=0.05'
      );

      // Brief hold on completed image-filled logo
      tl.to({}, { duration: 0.28 });

      // Stage 5: Coordinate with hero readiness and reveal homepage
      tl.call(() => {
        const proceedToReveal = () => {
          const exitTl = gsap.timeline({
            onComplete: () => {
              finishPreloader();
            }
          });

          // Signal homepage hero to start its entrance timeline right as preloader lifts
          if (onStartReveal) onStartReveal();

          // Logo scales up subtly and fades
          exitTl.to(logoWrapperRef.current, {
            opacity: 0,
            scale: 1.025,
            y: -12,
            duration: 0.55,
            ease: 'power2.inOut',
          });

          // Warm ivory overlay fades out smoothly and slides up slightly
          exitTl.to(containerRef.current, {
            opacity: 0,
            yPercent: -3,
            duration: 0.65,
            ease: 'power3.inOut',
          }, '-=0.42');
        };

        if (isHeroReady) {
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
  }, [onComplete, onStartReveal]);

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
        className="relative w-[125px] sm:w-[155px] md:w-[185px] aspect-[365/516] flex items-center justify-center will-change-transform"
        style={{
          WebkitMaskImage: `url('/images/preloader/e-logo-complete.png')`,
          maskImage: `url('/images/preloader/e-logo-complete.png')`,
          WebkitMaskSize: 'contain',
          maskSize: 'contain',
          WebkitMaskRepeat: 'no-repeat',
          maskRepeat: 'no-repeat',
          WebkitMaskPosition: 'center',
          maskPosition: 'center',
        }}
      >
        {/* 1. Base Layer: Original Solid Charcoal-Grey E Logo Silhouette (#676767) */}
        <div className="absolute inset-0 bg-[#676767] pointer-events-none" />

        {/* 2. Reveal Layer: Progressive Left-to-Right Luxury Architectural Interior Fill */}
        <div
          ref={revealLayerRef}
          className="absolute inset-0 overflow-hidden pointer-events-none will-change-transform"
          style={{
            clipPath: 'inset(0% 100% 0% 0%)',
            WebkitClipPath: 'inset(0% 100% 0% 0%)',
          }}
        >
          {/* Stationary High-End Luxury Architectural Interior Photograph */}
          <img
            src="/images/preloader/interior-fill.webp"
            alt="Excorto Luxury Interior Architecture"
            className="absolute inset-0 w-full h-full object-cover select-none pointer-events-none"
          />

          {/* Subtle Warm Architectural Ambient Lighting Tint */}
          <div className="absolute inset-0 bg-[#C2633E]/[0.05] mix-blend-multiply pointer-events-none" />
        </div>

        {/* 3. Moving Golden-Amber Hairline Beam at the Reveal Boundary */}
        <div
          ref={beamRef}
          className="absolute top-0 bottom-0 w-[2.5px] -ml-[1.25px] bg-gradient-to-b from-transparent via-[#E8B896] to-transparent pointer-events-none shadow-[0_0_10px_rgba(232,184,150,0.85)] will-change-transform opacity-0"
        />

        {/* 4. Completed Mark Architectural Light Sheen Accent */}
        <div
          ref={sheenRef}
          className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-0 rounded-sm bg-gradient-to-tr from-transparent via-white/80 to-transparent"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}
