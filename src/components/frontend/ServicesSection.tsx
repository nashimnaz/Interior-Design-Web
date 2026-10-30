'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Layers, Building2 } from 'lucide-react';

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
    <section id="services" className="w-full bg-[#FAF7F2] border-y border-[#ECE5DC]/80 relative z-20">
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-12 lg:py-16">
        <div className="flex flex-col lg:flex-row items-stretch gap-8 lg:gap-0">
          {/* Vertical Side Tag: OUR SERVICES */}
          <Link 
            href="/services"
            className="hidden lg:flex items-center justify-center pr-8 xl:pr-10 border-r border-[#E5DDD2] shrink-0 group focus:outline-none"
            aria-label="View all services"
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
          >
            <div className="flex items-center gap-2">
              <span className="w-4 h-[1px] bg-[#9C7A63]" />
              <span className="text-[10.5px] font-medium tracking-[0.28em] uppercase text-[#7E563B]">
                OUR SERVICES
              </span>
            </div>
            <span className="text-[11px] font-sans text-[#9C7A63] tracking-widest uppercase">
              VIEW ALL →
            </span>
          </Link>

          {/* 4 Services Columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 flex-1 divide-y sm:divide-y-0 lg:divide-x divide-[#E5DDD2]">
            {services.map((item, idx) => (
              <Link 
                key={item.id} 
                href={getServiceHref(item.id, idx)}
                className={`group flex flex-col justify-between py-6 sm:py-4 lg:py-2 transition-all duration-300 hover:bg-[#F3EDE2]/50 cursor-pointer ${
                  idx === 0 ? 'lg:pl-8 xl:pl-10 lg:pr-8' : 'lg:px-8 xl:px-10'
                }`}
              >
                <div>
                  {/* Icon */}
                  <div className="h-10 flex items-center mb-4 transition-transform duration-300 group-hover:scale-105">
                    {item.icon}
                  </div>

                  {/* Service Title */}
                  <h3 className="font-sans text-[12px] sm:text-[12.5px] font-semibold tracking-[0.18em] uppercase text-[#2C2018] group-hover:text-[#9C7A63] transition-colors mb-2.5">
                    {item.title}
                  </h3>

                  {/* Service Description */}
                  <p className="font-sans text-[13px] sm:text-[13.5px] text-[#665B51] leading-[1.62]">
                    {item.description}
                  </p>
                </div>

                {/* Subtle explore prompt */}
                <div className="mt-4 pt-2 flex items-center gap-1.5 text-[11px] font-sans font-medium uppercase tracking-[0.16em] text-[#9C7A63] opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-1">
                  <span>Explore</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
