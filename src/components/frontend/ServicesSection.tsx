'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Layers, Building2 } from 'lucide-react';

import { ScrollReveal } from '@/components/frontend/ScrollReveal';

export function ServicesSection() {
  const defaultIcons = [
    (
      <svg key="icon-0" width="34" height="34" viewBox="0 0 32 32" fill="none" stroke="#7E563B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 14L16 4L28 14V27H4V14Z" />
        <path d="M13 27V19H19V27" />
      </svg>
    ),
    (
      <svg key="icon-1" width="34" height="34" viewBox="0 0 32 32" fill="none" stroke="#7E563B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M7 11C7 8.23858 9.23858 6 12 6H20C22.7614 6 25 8.23858 25 11V18H7V11Z" />
        <path d="M5 18H27V22C27 22.5523 26.5523 23 26 23H6C5.44772 23 5 22.5523 5 22V18Z" />
        <path d="M8 23V27M24 23V27" />
      </svg>
    ),
    <Layers key="icon-2" size={32} strokeWidth={1.5} className="text-[#7E563B]" />,
    <Building2 key="icon-3" size={32} strokeWidth={1.5} className="text-[#7E563B]" />,
  ];

  const defaultServices = [
    {
      id: 'architectural-design',
      title: 'ARCHITECTURAL DESIGN',
      description: 'Thoughtful architectural design rooted in context, functionality and your vision.',
      icon: defaultIcons[0],
    },
    {
      id: 'interior-designing',
      title: 'INTERIOR DESIGNING',
      description: 'Creative interior spaces that balance aesthetics, comfort and everyday living.',
      icon: defaultIcons[1],
    },
    {
      id: 'interior-installation',
      title: 'INTERIOR INSTALLATION',
      description: 'Quality execution with attention to detail, materials and finishing.',
      icon: defaultIcons[2],
    },
    {
      id: 'consultation',
      title: 'CONSULTATION',
      description: 'Professional guidance at every stage of your design journey.',
      icon: defaultIcons[3],
    },
  ];

  const [services, setServices] = useState(defaultServices);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Respect reduced motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHasAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect(); // Trigger strictly once on scroll arrival
        }
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -60px 0px',
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    fetch('/api/services?status=Published')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const mapped = data.data.map((s: any, idx: number) => ({
            id: s.id || `srv-${idx}`,
            title: (s.title || '').toUpperCase(),
            description: s.shortDescription || s.fullDescription || '',
            icon: defaultIcons[idx % defaultIcons.length],
          }));
          setServices(mapped);
        }
      })
      .catch(() => {});
  }, []);

  const getServiceHref = (id: string, idx: number) => {
    const lower = (id || '').toLowerCase();
    if (lower.includes('arch')) return '/services/architectural-design';
    if (lower.includes('install')) return '/services/interior-installation';
    if (lower.includes('interior')) return '/services/interior-design';
    if (lower.includes('consult')) return '/contact';
    if (idx === 0) return '/services/architectural-design';
    if (idx === 1) return '/services/interior-design';
    if (idx === 2) return '/services/interior-installation';
    return '/contact';
  };

  return (
    <section 
      ref={sectionRef} 
      id="services" 
      className="w-full bg-[#FAF7F2] border-y border-[#ECE5DC]/80 relative z-20 overflow-hidden"
    >
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-0">
          {/* Vertical Side Tag: OUR SERVICES */}
          <Link 
            href="/services"
            className="hidden lg:flex items-center justify-center pr-8 xl:pr-10 border-r border-[#E5DDD2] shrink-0 group focus:outline-none"
            aria-label="View all services"
            style={{
              opacity: hasAnimated ? 1 : 0,
              transform: hasAnimated ? 'translateY(0)' : 'translateY(16px)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '750ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: hasAnimated ? '100ms' : '0ms',
            }}
          >
            <div className="flex items-center gap-3 -rotate-90 origin-center whitespace-nowrap select-none transition-transform duration-300 group-hover:scale-105">
              <span className="w-5 h-[1px] bg-[#9C7A63]" />
              <span className="text-[10.5px] font-medium tracking-[0.28em] uppercase text-[#7E563B] group-hover:text-[#2C2018] transition-colors">
                OUR SERVICES
              </span>
              <span className="w-5 h-[1px] bg-[#9C7A63]" />
            </div>
          </Link>

          {/* Mobile Header for Services */}
          <Link 
            href="/services" 
            className="flex lg:hidden items-center justify-between mb-2 group"
            style={{
              opacity: hasAnimated ? 1 : 0,
              transform: hasAnimated ? 'translateY(0)' : 'translateY(-14px)',
              transitionProperty: 'opacity, transform',
              transitionDuration: '700ms',
              transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <div className="flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#9C7A63]" />
              <span className="text-[12px] font-bold tracking-[0.28em] uppercase text-[#7E563B]">
                OUR SERVICES
              </span>
            </div>
            <span className="text-[12px] font-sans font-semibold text-[#8F5E3B] tracking-widest uppercase">
              VIEW ALL →
            </span>
          </Link>

          {/* 4 Services Columns: Alternating Left-to-Right & Right-to-Left Simultaneous Stagger */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 flex-1 divide-y sm:divide-y-0 lg:divide-x divide-[#E5DDD2]">
            {services.map((item, idx) => {
              // Even indices (0, 2): slide in from Left to Right (-64px -> 0)
              // Odd indices (1, 3): slide in from Right to Left (64px -> 0)
              const initialX = idx % 2 === 0 ? '-64px' : '64px';
              const delay = idx * 150; // Staggered sequence: 0ms, 150ms, 300ms, 450ms

              return (
                <div
                  key={item.id}
                  className="flex flex-col will-change-transform"
                  style={{
                    opacity: hasAnimated ? 1 : 0,
                    transform: hasAnimated ? 'translateX(0)' : `translateX(${initialX})`,
                    transitionProperty: 'opacity, transform',
                    transitionDuration: '850ms',
                    transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    transitionDelay: hasAnimated ? `${delay}ms` : '0ms',
                  }}
                >
                  <Link 
                    href={getServiceHref(item.id, idx)}
                    className={`group flex flex-col justify-between h-full py-6 sm:py-4 lg:py-2 transition-all duration-300 hover:bg-[#F3EDE2]/50 cursor-pointer ${
                      idx === 0 ? 'lg:pl-8 xl:pl-10 lg:pr-8' : 'lg:px-8 xl:px-10'
                    }`}
                  >
                    <div>
                      {/* Icon */}
                      <div className="h-10 flex items-center mb-4 transition-transform duration-300 group-hover:scale-105">
                        {item.icon}
                      </div>

                      {/* Service Title - Bold and Readable */}
                      <h3 className="font-sans text-[13.5px] sm:text-[14px] font-bold tracking-[0.16em] uppercase text-[#1C1612] group-hover:text-[#9C7A63] transition-colors mb-2.5">
                        {item.title}
                      </h3>

                      {/* Service Description */}
                      <p className="font-sans text-[14px] sm:text-[14.5px] text-[#423A33] leading-[1.65]">
                        {item.description}
                      </p>
                    </div>

                    {/* Subtle explore prompt */}
                    <div className="mt-4 pt-2 flex items-center gap-1.5 text-[12px] font-sans font-bold uppercase tracking-[0.18em] text-[#8F4A2D] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                      <span>Explore</span>
                      <span>→</span>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
