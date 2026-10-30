'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/frontend/Navbar';
import { Footer } from '@/components/frontend/Footer';
import { ConsultationModal } from '@/components/frontend/ConsultationModal';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const deliverables = [
  { id: '01', title: 'Modular Kitchen Installation', desc: 'Precision carcass leveling, soft-close hardware calibration, seamless countertop mitering, and appliance integration.' },
  { id: '02', title: 'Wardrobe and Storage Installation', desc: 'Custom walk-in and sliding wardrobe assemblies with integrated sensor illumination, flush doors, and organizational hardware.' },
  { id: '03', title: 'Interior Panel and Feature Wall Installation', desc: 'Acoustical wall claddings, fluted timber battens, stone veneer backdrops, and shadow-gap architectural reveals.' },
  { id: '04', title: 'False Ceiling Installation', desc: 'Laser-leveled gypsum frameworks, peripheral lighting troughs, concealed curtain pelmets, and clean AC diffuser integrations.' },
  { id: '05', title: 'Selected Lighting and Decorative Element Coordination', desc: 'Architectural luminaire placement, low-voltage driver installation, dimmer calibration, and pendant suspension alignment.' },
  { id: '06', title: 'Furniture and Interior Fixture Installation', desc: 'Anchoring and positioning of bespoke loose furniture, vanity units, mirrors, and custom architectural metalwork.' },
  { id: '07', title: 'Installation of Agreed Decorative Finishes', desc: 'Artisanal lime plaster applications, micro-cement floor coatings, textured wallpaper installation, and premium wood varnishing.' },
  { id: '08', title: 'Final Detailing and Finishing Coordination', desc: 'Rigorous snag list audit, edge silicone clean-ups, hardware lubrication, final site deep cleaning, and client handover protocol.' },
];

export default function InteriorInstallationPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const pageRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingLinesRef = useRef<HTMLSpanElement[]>([]);
  const descRef = useRef<HTMLParagraphElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const philosophyLineRef = useRef<HTMLDivElement>(null);
  const deliverablesGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // 1. Background image gentle scale-in
      if (heroBgRef.current) {
        const bgImg = heroBgRef.current.querySelector('img');
        if (bgImg) {
          tl.fromTo(
            bgImg,
            { scale: 1.12, opacity: 0.8 },
            { scale: 1.05, opacity: 1, duration: 1.8, ease: 'power2.out' },
            0
          );

          // Subtle parallax scrub on scroll
          gsap.to(bgImg, {
            yPercent: 8,
            ease: 'none',
            scrollTrigger: {
              trigger: heroBgRef.current,
              start: 'top top',
              end: 'bottom top',
              scrub: 1,
            },
          });
        }
      }

      // 2. Breadcrumb & Eyebrow Reveal
      if (breadcrumbRef.current) {
        tl.fromTo(
          breadcrumbRef.current,
          { opacity: 0, y: 12 },
          { opacity: 1, y: 0, duration: 0.7 },
          0.1
        );
      }

      if (eyebrowRef.current) {
        tl.fromTo(
          eyebrowRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.75 },
          0.2
        );
      }

      // 3. Line-by-Line Upward Heading Reveal
      const validHeadingLines = headingLinesRef.current.filter(Boolean);
      if (validHeadingLines.length > 0) {
        tl.fromTo(
          validHeadingLines,
          { yPercent: 110, opacity: 0 },
          { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.12 },
          0.3
        );
      }

      // 4. Supporting Descriptions Fade-Up
      const validDesc = descRef.current.filter(Boolean);
      if (validDesc.length > 0) {
        tl.fromTo(
          validDesc,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.14 },
          0.65
        );
      }

      // 5. CTA Buttons Staggered Fade-In
      if (ctaRef.current) {
        const ctaChildren = Array.from(ctaRef.current.children);
        tl.fromTo(
          ctaChildren,
          { opacity: 0, y: 16, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, stagger: 0.1 },
          0.85
        );
      }

      // 6. Horizontal separator line scale reveal
      if (philosophyLineRef.current) {
        gsap.fromTo(
          philosophyLineRef.current,
          { scaleX: 0, transformOrigin: 'center center' },
          {
            scaleX: 1,
            duration: 0.9,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: philosophyLineRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 7. Staggered fade-up for 8 deliverables
      if (deliverablesGridRef.current) {
        const cards = Array.from(deliverablesGridRef.current.children);
        gsap.fromTo(
          cards,
          { opacity: 0, y: 30, scale: 0.98 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.75,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: deliverablesGridRef.current,
              start: 'top 80%',
              once: true,
            },
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="w-full bg-[#F4F0E9] min-h-screen selection:bg-[#94745F] selection:text-white text-[#292722]">
      {/* Studio Navbar */}
      <Navbar 
        activePage="services" 
        onOpenConsultation={() => setIsConsultationOpen(true)} 
      />

      {/* =========================================================================
          FULL-SCREEN CINEMATIC HERO SECTION (100vw × 100vh minimum)
          - Full-viewport architectural photograph with cover & center positioning
          - Sophisticated warm ivory gradient overlay: 95% left, 60% center, 15% right
          - Content positioned within left 45-50% with generous spacing
          ========================================================================= */}
      <section 
        id="installation-hero"
        aria-labelledby="installation-hero-heading"
        className="relative w-full min-h-screen flex items-center overflow-hidden bg-[#F4F0E9] text-[#292722] select-text"
      >
        {/* Full-Screen Architectural Background Image */}
        <div 
          ref={heroBgRef}
          className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden will-change-transform"
        >
          <Image
            src="/images/services/install-fullscreen-hero.jpg"
            alt="Excorto Turnkey Fitout &amp; Installation - Bespoke modular kitchen installation with walnut cabinetry, detailed joinery and warm lighting"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center will-change-transform"
          />

          {/* Sophisticated Warm Ivory Gradient Overlay:
              Strong on the left (95%) for maximum text contrast,
              gradually fading to transparent on the right (15%) to reveal architecture */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-[#F4F0E9]/92 via-[#F4F0E9]/70 to-[#F4F0E9]/25 sm:via-[#F4F0E9]/75 lg:from-[#F4F0E9]/95 lg:via-[#F4F0E9]/60 lg:to-[#F4F0E9]/15 pointer-events-none" 
            aria-hidden="true" 
          />
          {/* Subtle vertical wash for seamless navbar and edge transitions */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-[#F4F0E9]/50 via-transparent to-[#F4F0E9]/75 pointer-events-none" 
            aria-hidden="true" 
          />
        </div>

        {/* Content Container (Layered over the left 45-50% of the screen) */}
        <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-32 sm:pt-36 lg:pt-32 pb-16 sm:pb-20 flex items-center min-h-screen">
          <div className="w-full lg:w-[50%] xl:w-[48%] max-w-[620px] xl:max-w-[660px] flex flex-col justify-center">
            
            {/* Breadcrumb Navigation */}
            <div 
              ref={breadcrumbRef}
              className="flex items-center gap-2 mb-6 sm:mb-7 text-[11px] sm:text-[11.5px] font-sans uppercase tracking-[0.2em] text-[#94745F] will-change-transform select-none"
            >
              <Link href="/services" className="hover:text-[#A65E3F] transition-colors flex items-center gap-1.5">
                <ArrowLeft size={13} />
                <span>Services</span>
              </Link>
              <span className="text-[#D9D0C4]">/</span>
              <span className="text-[#292722] font-semibold">Interior Installation</span>
            </div>

            {/* Service Number & Category Eyebrow */}
            <div 
              ref={eyebrowRef}
              className="flex items-center gap-3 mb-4 will-change-transform"
            >
              <span className="font-serif text-[18px] text-[#A65E3F] font-medium [font-variant-numeric:lining-nums]">
                03
              </span>
              <span className="w-6 h-[1px] bg-[#94745F]" aria-hidden="true" />
              <span className="font-sans text-[11px] sm:text-[11.5px] font-semibold tracking-[0.26em] uppercase text-[#94745F]">
                TURNKEY FITOUT &amp; INSTALLATION
              </span>
            </div>

            {/* Large Editorial Serif Heading: Line-by-Line Upward Reveal */}
            <h1 
              id="installation-hero-heading"
              className="font-serif text-[38px] sm:text-[46px] lg:text-[54px] xl:text-[60px] leading-[1.08] tracking-[-0.018em] font-normal mb-5 sm:mb-6 text-[#292722]"
            >
              <span className="block overflow-hidden py-0.5">
                <span 
                  ref={(el) => { if (el) headingLinesRef.current[0] = el; }}
                  className="block will-change-transform"
                >
                  Every Detail Matters.
                </span>
              </span>
              <span className="block overflow-hidden py-0.5">
                <span 
                  ref={(el) => { if (el) headingLinesRef.current[1] = el; }}
                  className="block italic text-[#94745F] will-change-transform"
                >
                  Every Finish Counts.
                </span>
              </span>
            </h1>

            {/* Supporting Description */}
            <div className="space-y-3.5 sm:space-y-4 mb-7 sm:mb-8">
              <p 
                ref={(el) => { if (el) descRef.current[0] = el; }}
                className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15.5px] leading-[1.72] text-[#3D3832] will-change-transform"
              >
                Careful installation of approved interior elements, with attention to alignment, coordination, materials, detailing and finishing. Our experienced installation team transforms approved design concepts into precision built reality.
              </p>

              <p 
                ref={(el) => { if (el) descRef.current[1] = el; }}
                className="font-sans text-[13px] sm:text-[13.5px] lg:text-[14px] leading-[1.7] text-[#554F47] will-change-transform"
              >
                By combining factory-level joinery tolerances with rigorous site supervision and material protection protocols, we ensure your residence is executed with zero compromise.
              </p>
            </div>

            {/* Action Buttons: Primary & Secondary */}
            <div 
              ref={ctaRef}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4 select-none will-change-transform"
            >
              <button
                type="button"
                onClick={() => setIsConsultationOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#94745F] hover:bg-[#7D604D] text-[#FAF8F5] font-sans font-medium text-[11.5px] sm:text-[12px] uppercase tracking-[0.16em] rounded-full transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer active:scale-98"
              >
                <span>Enquire About Interior Installation</span>
                <span aria-hidden="true">→</span>
              </button>
              <a
                href="#deliverables"
                className="inline-flex items-center justify-center px-6 py-3.5 bg-[#F4F0E9]/80 hover:bg-[#65745A] text-[#292722] hover:text-white border border-[#292722]/20 hover:border-[#65745A] font-sans font-medium text-[11px] sm:text-[11.5px] uppercase tracking-[0.16em] rounded-full transition-all duration-300 backdrop-blur-[2px]"
              >
                View 8 Deliverables
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          INSTALLATION PHILOSOPHY SECTION
          ========================================================================= */}
      <section className="w-full py-16 sm:py-20 lg:py-24 border-b border-[#D9D0C4]/70 bg-[#EDE7DD]/50">
        <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="max-w-[840px] mx-auto text-center">
            <span className="font-sans text-[11px] sm:text-[11.5px] font-semibold tracking-[0.26em] uppercase text-[#94745F] mb-3 block">
              OUR INSTALLATION PHILOSOPHY
            </span>
            <h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[42px] leading-[1.14] font-normal text-[#292722] mb-6">
              Precision as the Bridge Between Vision and Permanence
            </h2>
            <div 
              ref={philosophyLineRef}
              className="w-16 h-[1.5px] bg-[#94745F] mx-auto mb-6 will-change-transform" 
              aria-hidden="true" 
            />
            <p className="font-sans text-[14px] sm:text-[15.5px] leading-[1.8] text-[#4F4A43] text-justify sm:text-center">
              Execution is the bridge between imagination and permanence. We approach installation with rigorous precision, unyielding quality control, and seamless coordination across specialized trades — ensuring alignments are micrometric, joinery is flush, and finishes endure for generations.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          8 SERVICE DELIVERABLES GRID
          ========================================================================= */}
      <section id="deliverables" className="w-full py-20 sm:py-24 border-b border-[#D9D0C4]/70">
        <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
            <div>
              <span className="font-sans text-[11px] sm:text-[11.5px] font-semibold tracking-[0.26em] uppercase text-[#94745F] mb-2.5 block">
                COMPREHENSIVE SCOPE
              </span>
              <h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[44px] leading-[1.12] font-normal text-[#292722]">
                Installation Deliverables
              </h2>
            </div>
            <p className="font-sans text-[13px] sm:text-[14px] text-[#635E58] max-w-[420px]">
              End-to-end turnkey project execution overseen by experienced site architects and master installation foremen.
            </p>
          </div>

          <div ref={deliverablesGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
            {deliverables.map((item) => (
              <div 
                key={item.id} 
                className="bg-[#EDE7DD]/40 border border-[#D9D0C4]/70 p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 hover:border-[#94745F]/60 hover:bg-[#EDE7DD]/70 will-change-transform"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-[18px] text-[#A65E3F] font-medium [font-variant-numeric:lining-nums]">
                      {item.id}
                    </span>
                    <CheckCircle2 size={16} className="text-[#65745A]" />
                  </div>
                  <h3 className="font-serif text-[18px] sm:text-[19px] text-[#292722] font-normal leading-snug mb-2.5">
                    {item.title}
                  </h3>
                  <p className="font-sans text-[12.5px] sm:text-[13px] text-[#554F49] leading-[1.6]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          CLOSING CTA SECTION
          ========================================================================= */}
      <section className="w-full py-20 sm:py-24 bg-[#EAE3D6]/70 text-center">
        <div className="max-w-[800px] mx-auto px-6 sm:px-10">
          <span className="font-sans text-[11px] sm:text-[11.5px] font-semibold tracking-[0.26em] uppercase text-[#94745F] mb-3 block">
            MASTER CRAFTSMANSHIP
          </span>
          <h2 className="font-serif text-[34px] sm:text-[42px] lg:text-[48px] leading-[1.12] font-normal text-[#292722] mb-5">
            Let&apos;s Bring Your Design to Life.
          </h2>
          <p className="font-sans text-[14px] sm:text-[15px] leading-[1.7] text-[#554F49] mb-8 max-w-[560px] mx-auto">
            Discuss your installation schedule, material delivery timelines, and fitout requirements with our turnkey project directors.
          </p>
          <button
            type="button"
            onClick={() => setIsConsultationOpen(true)}
            className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#94745F] hover:bg-[#7D604D] text-[#FAF8F5] font-sans font-medium text-[12px] sm:text-[12.5px] uppercase tracking-[0.18em] rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer select-none"
          >
            <span>Enquire About Interior Installation</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      {/* Studio Footer */}
      <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </main>
  );
}
