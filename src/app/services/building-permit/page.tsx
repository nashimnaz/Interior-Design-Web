'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/frontend/Navbar';
import { Footer } from '@/components/frontend/Footer';
import { ConsultationModal } from '@/components/frontend/ConsultationModal';
import { ArrowLeft, CheckCircle2, ArrowRight, ShieldCheck, FileText, Check } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface PermitServiceItem {
  id: string;
  title: string;
  points: string[];
}

const permitServices: PermitServiceItem[] = [
  {
    id: '01',
    title: 'Site & Land Assessment',
    points: [
      'Preliminary review of land and site details.',
      'Understanding applicable spatial restrictions and planning regulations.',
      'Identifying relevant requirements before preparing the building plan.',
    ],
  },
  {
    id: '02',
    title: 'Architectural Building Plan Preparation',
    points: [
      'Preparation of detailed building plans.',
      'Floor plans, elevations and sections.',
      'Site plan and supporting drawings.',
      'Design consideration based on applicable building rules.',
    ],
  },
  {
    id: '03',
    title: 'Building Rule Compliance',
    points: [
      'Review of applicable building regulations.',
      'Preliminary scrutiny of building plans.',
      'Assessment of relevant setbacks, building height and other planning requirements.',
      'Necessary plan revisions where required.',
    ],
  },
  {
    id: '04',
    title: 'Documentation & K-SMART Application',
    points: [
      'Assistance with collecting required property and project documents.',
      'Preparation of application-related drawings and supporting information.',
      'Assistance with online application submission through K-SMART.',
      'Coordination of applicable application requirements and fees.',
    ],
  },
  {
    id: '05',
    title: 'Application Follow-up & Approval',
    points: [
      'Assistance in tracking the application.',
      'Coordination and response to observations or requests for corrections.',
      'Support with revisions and resubmission where necessary.',
      'Follow-up through the approval process until the competent authority issues its decision.',
    ],
  },
];

const processSteps = [
  { step: '01', label: 'Site Assessment' },
  { step: '02', label: 'Building Plan Preparation' },
  { step: '03', label: 'Rule Compliance Review' },
  { step: '04', label: 'Documentation' },
  { step: '05', label: 'K-SMART Submission' },
  { step: '06', label: 'Application Follow-up' },
  { step: '07', label: 'Building Permit Approval' },
];

export default function BuildingPermitPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const pageRef = useRef<HTMLElement>(null);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const breadcrumbRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingLinesRef = useRef<HTMLSpanElement[]>([]);
  const descRef = useRef<HTMLParagraphElement[]>([]);
  const ctaRef = useRef<HTMLDivElement>(null);
  const servicesGridRef = useRef<HTMLDivElement>(null);

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
            { scale: 1.1, opacity: 0.8 },
            { scale: 1.0, opacity: 1, duration: 1.8, ease: 'power2.out' },
            0
          );

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
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out' },
          0.3
        );
      }

      // 4. Supporting Descriptions Fade-Up
      const validDesc = descRef.current.filter(Boolean);
      if (validDesc.length > 0) {
        tl.fromTo(
          validDesc,
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.85, stagger: 0.14 },
          0.6
        );
      }

      // 5. CTA Buttons Staggered Fade-In
      if (ctaRef.current) {
        tl.fromTo(
          ctaRef.current,
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.85
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <main ref={pageRef} className="w-full bg-[#F5F0E8] min-h-screen selection:bg-[#94745F] selection:text-white relative">
      {/* Editorial Studio Navbar */}
      <Navbar 
        activePage="services" 
        onOpenConsultation={() => setIsConsultationOpen(true)} 
      />

      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section 
        id="permit-hero"
        aria-labelledby="permit-hero-heading"
        className="relative w-full min-h-[92vh] lg:min-h-screen flex items-center overflow-hidden bg-[#F5F0E8] select-text"
      >
        {/* Full Bleed Architectural Blueprint Background Image */}
        <div 
          ref={heroBgRef}
          className="absolute inset-0 z-0 bg-[#E8E1D5] overflow-hidden select-none pointer-events-none will-change-transform"
        >
          <Image
            src="/images/services/arch-fullscreen-hero.jpg"
            alt="Excorto Builders & Interiors - Architectural Building Plan Preparation and K-SMART Permit Approval"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_35%] lg:object-[right_center]"
          />
          {/* Subtle Warm Ivory Left Wash for Crisp Contrast */}
          <div 
            className="absolute inset-y-0 left-0 w-full lg:w-[60%] xl:w-[54%] bg-gradient-to-r from-[#F5F0E8] via-[#F5F0E8]/94 to-transparent pointer-events-none" 
            aria-hidden="true" 
          />
          <div 
            className="absolute inset-0 bg-[#F5F0E8]/40 lg:hidden pointer-events-none" 
            aria-hidden="true" 
          />
        </div>

        {/* Content Container */}
        <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-32 sm:pt-36 lg:pt-32 pb-16 sm:pb-20">
          <div className="max-w-[720px] xl:max-w-[760px]">
            
            {/* Breadcrumb Navigation */}
            <div 
              ref={breadcrumbRef}
              className="flex items-center gap-2 font-sans text-[11px] sm:text-[12px] uppercase tracking-[0.2em] text-[#8C8377] mb-5 sm:mb-6 will-change-transform"
            >
              <Link href="/services" className="hover:text-[#A65E3F] transition-colors flex items-center gap-1.5 font-medium">
                <ArrowLeft size={13} />
                <span>Services</span>
              </Link>
              <span className="text-[#D9D0C4]">/</span>
              <span className="text-[#1C201D] font-bold">Building Permit &amp; K-SMART</span>
            </div>

            {/* Category Eyebrow */}
            <div 
              ref={eyebrowRef}
              className="flex items-center gap-3 mb-4 will-change-transform"
            >
              <span className="font-serif text-[18px] text-[#A65E3F] font-bold [font-variant-numeric:lining-nums]">
                03
              </span>
              <span className="w-6 h-[1.5px] bg-[#94745F]" aria-hidden="true" />
              <span className="font-sans text-[11.5px] sm:text-[12px] font-bold tracking-[0.26em] uppercase text-[#8F5E3B]">
                KERALA BUILDING RULES &amp; K-SMART ONLINE PERMIT
              </span>
            </div>

            {/* Main Editorial Heading */}
            <h1 
              id="permit-hero-heading"
              className="font-serif text-[38px] sm:text-[46px] lg:text-[54px] xl:text-[60px] leading-[1.1] tracking-[-0.018em] font-normal mb-5 sm:mb-6 text-[#161B18]"
            >
              <span className="block">
                <span 
                  ref={(el) => { if (el) headingLinesRef.current[0] = el; }}
                  className="block will-change-transform"
                >
                  Building Permit &amp;
                </span>
              </span>
              <span className="block">
                <span 
                  ref={(el) => { if (el) headingLinesRef.current[1] = el; }}
                  className="block italic text-[#8F5E3B] will-change-transform"
                >
                  K-SMART Approval.
                </span>
              </span>
            </h1>

            {/* Subheading */}
            <p className="font-serif text-[20px] sm:text-[22px] lg:text-[24px] text-[#423C35] font-normal mb-5 italic leading-snug">
              From Building Plan Preparation to Permit Approval
            </p>

            {/* Supporting Descriptions */}
            <div className="space-y-4 mb-7 sm:mb-8 max-w-[660px]">
              <p 
                ref={(el) => { if (el) descRef.current[0] = el; }}
                className="font-sans text-[14.5px] sm:text-[15.5px] lg:text-[16px] leading-[1.72] text-[#332E28] will-change-transform font-normal"
              >
                Planning to build your dream home? EXCORTO provides professional building permit assistance, guiding you through the process from architectural plan preparation and documentation to online application submission and approval through Kerala&apos;s K-SMART platform.
              </p>

              <p 
                ref={(el) => { if (el) descRef.current[1] = el; }}
                className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15px] leading-[1.7] text-[#4A433B] will-change-transform font-normal"
              >
                We help ensure your proposed building plan is prepared with applicable building regulations in mind, required documents are organized, and the permit application is properly submitted through the relevant digital process.
              </p>
            </div>

            {/* Action Buttons */}
            <div 
              ref={ctaRef}
              className="flex flex-wrap items-center gap-3.5 sm:gap-4 select-none will-change-transform"
            >
              <button
                type="button"
                onClick={() => setIsConsultationOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 bg-[#8F5E3B] hover:bg-[#784B2B] text-[#FAF8F5] font-sans font-bold text-[12px] sm:text-[12.5px] uppercase tracking-[0.16em] rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer active:scale-98"
              >
                <span>Enquire About Building Permit Approval</span>
                <span aria-hidden="true">→</span>
              </button>
              <a
                href="#permit-services"
                className="inline-flex items-center justify-center px-7 py-4 bg-transparent hover:bg-[#1C201D] text-[#1C201D] hover:text-white border-2 border-[#1C201D]/40 hover:border-[#1C201D] font-sans font-bold text-[11.5px] sm:text-[12px] uppercase tracking-[0.16em] rounded-full transition-all duration-300 active:scale-98"
              >
                Explore Permit Services
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          KEY VALUE STATEMENT SECTION
          ========================================================================= */}
      <section className="w-full py-16 sm:py-20 lg:py-24 border-y border-[#D9D0C4]/70 bg-[#EDE7DD]/50">
        <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="max-w-[880px] mx-auto text-center">
            <span className="font-sans text-[11.5px] sm:text-[12px] font-bold tracking-[0.26em] uppercase text-[#8F5E3B] mb-3 block">
              STATUTORY CLARITY &amp; PEACE OF MIND
            </span>
            <h2 className="font-serif text-[30px] sm:text-[36px] lg:text-[42px] leading-[1.16] font-normal text-[#161B18] mb-6">
              Compliant Architectural Planning for Seamless Kerala Municipal Sanctions
            </h2>
            <div className="w-16 h-[1.5px] bg-[#8F5E3B] mx-auto mb-6" aria-hidden="true" />
            <p className="font-sans text-[15px] sm:text-[16px] leading-[1.8] text-[#423C35]">
              Navigating building regulations requires technical diligence, statutory knowledge, and precise digital documentation. EXCORTO streamlines the entire permit workflow—from land spatial restrictions and setback analysis to direct liaisoning on the K-SMART platform—so your project moves forward without administrative delays.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          OUR 5 BUILDING PERMIT SERVICES
          ========================================================================= */}
      <section id="permit-services" className="w-full py-20 sm:py-24 border-b border-[#D9D0C4]/70">
        <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14 pb-6 border-b border-[#DDD5C7]">
            <div>
              <span className="font-sans text-[11.5px] sm:text-[12px] font-bold tracking-[0.26em] uppercase text-[#8F5E3B] mb-2.5 block">
                SPECIALIZED SCOPE
              </span>
              <h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[44px] leading-[1.12] font-normal text-[#161B18]">
                Our Building Permit Services
              </h2>
            </div>
            <p className="font-sans text-[14px] sm:text-[14.5px] text-[#554E46] max-w-[460px] leading-relaxed">
              Every phase is handled with statutory rigor to ensure complete documentation accuracy, Kerala Municipality Building Rules (KMBR) compliance, and smooth approval.
            </p>
          </div>

          <div ref={servicesGridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {permitServices.map((service) => (
              <div 
                key={service.id} 
                className="bg-[#EDE7DD]/60 border border-[#D9D0C4] p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 hover:border-[#94745F] hover:bg-[#E5DDD0] hover:shadow-[0_12px_32px_rgba(41,39,34,0.12)] hover:-translate-y-1.5 rounded-sm will-change-transform cursor-pointer group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-[20px] text-[#A65E3F] font-bold [font-variant-numeric:lining-nums]">
                      {service.id}
                    </span>
                    <CheckCircle2 size={18} className="text-[#65745A] group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Highlighted Bold Headline */}
                  <h3 className="font-serif text-[20px] sm:text-[21px] text-[#161B18] font-bold leading-snug mb-4 group-hover:text-[#A65E3F] transition-colors">
                    {service.title}
                  </h3>

                  {/* Bullet Points */}
                  <ul className="space-y-2.5 font-sans text-[13.5px] sm:text-[14px] text-[#3D3730] leading-[1.6]">
                    {service.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#8F5E3B] shrink-0 mt-2" aria-hidden="true" />
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          OUR PROCESS: STEP-BY-STEP WORKFLOW
          ========================================================================= */}
      <section className="w-full py-20 sm:py-24 bg-[#EAE3D6]/60 border-b border-[#D9D0C4]/70">
        <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
          
          <div className="text-center max-w-[700px] mx-auto mb-14">
            <span className="font-sans text-[11.5px] sm:text-[12px] font-bold tracking-[0.26em] uppercase text-[#8F5E3B] mb-2.5 block">
              STEP-BY-STEP WORKFLOW
            </span>
            <h2 className="font-serif text-[32px] sm:text-[38px] lg:text-[44px] leading-[1.12] font-normal text-[#161B18]">
              Our Approval Process
            </h2>
            <p className="font-sans text-[14px] sm:text-[14.5px] text-[#554E46] mt-3">
              A transparent, sequential roadmap guiding your project from land evaluation to final sanction.
            </p>
          </div>

          {/* Desktop & Tablet Process Sequence */}
          <div className="hidden lg:grid grid-cols-7 gap-3 relative">
            {processSteps.map((step, idx) => (
              <div key={step.step} className="flex flex-col items-center text-center relative group">
                {/* Connecting arrow indicator */}
                {idx < processSteps.length - 1 && (
                  <div className="absolute top-5 left-[60%] w-[80%] h-[1.5px] bg-[#C5BBAE] z-0 pointer-events-none" aria-hidden="true" />
                )}

                <div className="relative z-10 w-10 h-10 rounded-full bg-[#F5F0E8] border-2 border-[#8F5E3B] flex items-center justify-center font-serif text-[14px] font-bold text-[#8F5E3B] mb-3 group-hover:scale-105 group-hover:bg-[#8F5E3B] group-hover:text-white transition-all shadow-xs">
                  {step.step}
                </div>
                <h4 className="font-sans text-[12.5px] font-bold text-[#161B18] tracking-tight uppercase leading-snug">
                  {step.label}
                </h4>
              </div>
            ))}
          </div>

          {/* Mobile Vertical Process Sequence */}
          <div className="lg:hidden space-y-4 max-w-[420px] mx-auto">
            {processSteps.map((step, idx) => (
              <div key={step.step} className="flex items-center gap-4 bg-[#EDE7DD]/80 p-3.5 rounded-sm border border-[#D9D0C4]">
                <div className="w-8 h-8 rounded-full bg-[#8F5E3B] text-white flex items-center justify-center font-serif text-[13px] font-bold shrink-0">
                  {step.step}
                </div>
                <span className="font-sans text-[13.5px] font-bold text-[#161B18] tracking-tight uppercase">
                  {step.label}
                </span>
                {idx < processSteps.length - 1 && (
                  <span className="ml-auto text-[#8F5E3B] font-bold text-[14px]" aria-hidden="true">↓</span>
                )}
                {idx === processSteps.length - 1 && (
                  <span className="ml-auto text-[#65745A] font-bold text-[14px]" aria-hidden="true">✓</span>
                )}
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          CLOSING PHILOSOPHY & FINAL CTA
          ========================================================================= */}
      <section className="w-full py-20 sm:py-24 bg-[#F5F0E8] text-center">
        <div className="max-w-[820px] mx-auto px-6 sm:px-10">
          <span className="font-sans text-[11.5px] sm:text-[12px] font-bold tracking-[0.26em] uppercase text-[#8F5E3B] mb-3 block">
            BUILD WITH CONFIDENCE
          </span>
          <h2 className="font-serif text-[34px] sm:text-[42px] lg:text-[48px] leading-[1.14] font-normal text-[#161B18] mb-5">
            Build with Clarity. Begin with the Right Approval.
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] leading-[1.72] text-[#423C35] mb-8 max-w-[620px] mx-auto font-normal">
            A properly prepared building plan and a well-managed permit process create a stronger foundation for your construction journey. Let EXCORTO assist you through the process with professional planning and permit application support.
          </p>
          <button
            type="button"
            onClick={() => setIsConsultationOpen(true)}
            className="inline-flex items-center justify-center gap-2.5 px-9 py-4 bg-[#8F5E3B] hover:bg-[#784B2B] text-[#FAF8F5] font-sans font-bold text-[12.5px] sm:text-[13px] uppercase tracking-[0.18em] rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer select-none active:scale-98"
          >
            <span>Enquire About Building Permit Approval</span>
            <span aria-hidden="true">→</span>
          </button>
        </div>
      </section>

      {/* Studio Footer */}
      <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Interactive Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </main>
  );
}

