'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServiceOverviewItem {
  number: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
}

const defaultServicesData: ServiceOverviewItem[] = [
  {
    number: '01',
    title: 'ARCHITECTURAL DESIGN',
    description: 'Thoughtful architectural planning and consultation, creating functional, aesthetically balanced spaces that respond to your requirements and project vision.',
    image: '/images/services/arch-card.jpg',
    imageAlt: 'Excorto Architectural Design - Contemporary luxury residential exterior with landscaped entrance',
    href: '/services/architectural-design',
  },
  {
    number: '02',
    title: 'INTERIOR DESIGNING',
    description: 'Personalized interior concepts combining space planning, materials, colours, lighting and design details to create beautiful and functional environments.',
    image: '/images/services/interior-card.jpg',
    imageAlt: 'Excorto Interior Designing - Sophisticated modern living room with natural stone and warm wood',
    href: '/services/interior-design',
  },
  {
    number: '03',
    title: 'INTERIOR INSTALLATION',
    description: 'Careful installation of approved interior elements, with attention to alignment, coordination, materials, detailing and finishing.',
    image: '/images/services/install-card.jpg',
    imageAlt: 'Excorto Interior Installation - Bespoke luxury modular kitchen and cabinetry precision installation',
    href: '/services/interior-installation',
  },
  {
    number: '04',
    title: 'CONSULTATION',
    description: 'Start with a conversation. Discuss your requirements, project possibilities, planning considerations and the right direction for your space.',
    image: '/images/services/consult-card.jpg',
    imageAlt: 'Excorto Consultation - Premium architectural atelier workspace with material samples and design drawings',
    href: '/services/architectural-design#consultation',
  },
];

interface ServicesOverviewGridProps {
  onOpenConsultation?: () => void;
}

export function ServicesOverviewGrid({ onOpenConsultation }: ServicesOverviewGridProps) {
  const [services, setServices] = useState<ServiceOverviewItem[]>(defaultServicesData);
  const sectionRef = useRef<HTMLElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const imageWrappersRef = useRef<HTMLDivElement[]>([]);
  const cardContentsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    fetch('/api/services?status=Published')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const mapped: ServiceOverviewItem[] = data.data.map((s: any) => ({
            number: s.number || '01',
            title: (s.title || '').toUpperCase(),
            description: s.shortDescription || s.fullDescription || '',
            image: s.heroImage || '/images/services/arch-card.jpg',
            imageAlt: `${s.title} - Excorto Builders & Interiors`,
            href: `/services/${s.slug || 'architectural-design'}`,
          }));
          setServices(mapped);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Tag line animation
      if (tagRef.current) {
        gsap.fromTo(
          tagRef.current,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: tagRef.current,
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // 2. Sequential card clip-path image reveal with 150ms stagger
      const validImages = imageWrappersRef.current.filter(Boolean);
      if (validImages.length > 0) {
        gsap.fromTo(
          validImages,
          { clipPath: 'inset(100% 0% 0% 0%)', opacity: 0.8 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.1,
            stagger: 0.15, // approximately 150ms stagger as requested
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
              once: true,
            },
          }
        );
      }

      // 3. Fade and slide numbers, headings and descriptions into position
      const validContents = cardContentsRef.current.filter(Boolean);
      if (validContents.length > 0) {
        gsap.fromTo(
          validContents,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.15, // 150ms stagger
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
              once: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="services-overview"
      aria-labelledby="services-overview-heading"
      className="w-full bg-[#F4F0E9] text-[#292722] select-text py-16 sm:py-20 lg:py-24 border-t border-[#D9D0C4]/70"
    >
      <div className="w-full max-w-[1560px] mx-auto px-6 sm:px-8 lg:px-10 xl:px-12">
        
        {/* Subtle Section Tag with Animated Reveal */}
        <div ref={tagRef} className="flex items-center gap-3 mb-10 sm:mb-12 will-change-transform">
          <span className="w-6 h-[1px] bg-[#94745F]" aria-hidden="true" />
          <span 
            id="services-overview-heading"
            className="font-sans text-[11px] sm:text-[11.5px] font-semibold tracking-[0.26em] uppercase text-[#94745F]"
          >
            OUR CORE DISCIPLINES
          </span>
        </div>

        {/* 4 Equal-Width Service Cards with Thin Vertical Dividers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#D9D0C4]">
          {services.map((service, idx) => {
            const isConsultation = service.title === 'CONSULTATION';

            return (
              <div
                key={service.number}
                ref={(el) => { if (el) cardsRef.current[idx] = el; }}
                className="flex flex-col justify-between group py-8 sm:py-6 lg:py-0 px-4 sm:px-5 lg:px-6 xl:px-7"
              >
                {/* Entire Card Clickable Link */}
                <Link
                  href={service.href}
                  onClick={(e) => {
                    if (isConsultation && onOpenConsultation) {
                      e.preventDefault();
                      onOpenConsultation();
                    }
                  }}
                  className="flex flex-col flex-1 h-full cursor-pointer focus:outline-none"
                  aria-label={`${service.title} - Learn More`}
                >
                  {/* Card Image Container with GSAP Clip-Path Reveal and Maximum 1.04 Hover Zoom */}
                  <div 
                    ref={(el) => { if (el) imageWrappersRef.current[idx] = el; }}
                    className="relative w-full aspect-[4/3] overflow-hidden mb-5 sm:mb-6 select-none bg-[#EDE7DD] will-change-transform"
                  >
                    <Image
                      src={service.image}
                      alt={service.imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* Card Text Content with Fade and Slide Animation */}
                  <div 
                    ref={(el) => { if (el) cardContentsRef.current[idx] = el; }}
                    className="flex flex-col flex-1 will-change-transform"
                  >
                    {/* Number Label */}
                    <div className="mb-2.5 flex items-center gap-2">
                      <span className="font-serif text-[15px] sm:text-[16px] text-[#A65E3F] font-medium [font-variant-numeric:lining-nums]">
                        {service.number}
                      </span>
                      <span className="w-3 h-[1px] bg-[#D9D0C4]" aria-hidden="true" />
                    </div>

                    {/* Elegant Serif Service Title with Fixed Min-Height for Symmetry */}
                    <div className="min-h-[48px] sm:min-h-[52px] lg:min-h-[56px] mb-2 sm:mb-3 flex items-start">
                      <h3 className="font-serif text-[#292722] text-[20px] sm:text-[21px] lg:text-[22px] xl:text-[23px] font-normal leading-[1.18] tracking-[-0.015em] transition-colors duration-300 group-hover:text-[#A65E3F]">
                        {service.title}
                      </h3>
                    </div>

                    {/* Short Description with Min-Height for Perfect Baseline Alignment */}
                    <div className="min-h-[80px] sm:min-h-[85px] lg:min-h-[92px] mb-5 sm:mb-6 flex items-start">
                      <p className="font-sans text-[12.5px] sm:text-[13px] lg:text-[13.5px] leading-[1.66] text-[#554F49]">
                        {service.description}
                      </p>
                    </div>

                    {/* Underlined LEARN MORE link without arrow */}
                    <div className="mt-auto pt-2 border-t border-[#D9D0C4]/40">
                      <span className="inline-flex items-center font-sans font-semibold text-[11px] sm:text-[11.5px] uppercase tracking-[0.2em] text-[#94745F] group-hover:text-[#A65E3F] underline underline-offset-4 decoration-[#D9D0C4] group-hover:decoration-[#A65E3F] transition-all duration-300">
                        <span>LEARN MORE</span>
                      </span>
                    </div>
                  </div>

                </Link>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
