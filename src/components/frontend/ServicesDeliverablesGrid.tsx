'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';
import { ScrollReveal } from '@/components/frontend/ScrollReveal';

export interface ServiceDeliverableItem {
  id: string;
  title: string;
  desc: string;
  href?: string;
}

export const servicesDeliverablesList: ServiceDeliverableItem[] = [
  {
    id: '01',
    title: 'Initial Project Consultation and Requirement Analysis',
    desc: 'Detailed client discovery session to assess spatial needs, lifestyle preferences, plot constraints, and budget framework.',
  },
  {
    id: '02',
    title: 'Basic Vastu Followed Plan',
    desc: 'Harmonious architectural floor layouts designed in accordance with traditional Vastu principles, sunlight paths, and natural ventilation.',
  },
  {
    id: '03',
    title: 'Building permit',
    desc: "Permit plan approval through 'ksmart' ensuring full compliance with local municipal building regulations and statutory clearances.",
    href: '/services/building-permit',
  },
  {
    id: '04',
    title: 'Exterior 3D Elevation',
    desc: 'High-fidelity photorealistic 3D visualization showcasing modern architectural facades, material finishes, natural shadows, and lighting.',
  },
  {
    id: '05',
    title: 'Elevation 2D With Detailed Dimensions',
    desc: 'Accurate orthographic drawings with vertical datum heights, detailed dimensioning, fenestration levels, and finish annotations.',
  },
  {
    id: '06',
    title: 'Building Estimation for Bank Loan',
    desc: 'Comprehensive itemized bill of quantities (BOQ) and certified valuation schedules tailored for bank loan sanctioning.',
  },
  {
    id: '07',
    title: 'Plan With Furniture Layout',
    desc: 'Functional space planning illustrating furniture arrangements, ergonomic circulation paths, and room proportions.',
  },
  {
    id: '08',
    title: 'Set Back Plan / Site Plan',
    desc: 'Site boundary documentation detailing statutory municipal setback distances, vehicular access routes, and plot utilization.',
  },
  {
    id: '09',
    title: '3D Floor Plan',
    desc: 'Cutaway three-dimensional perspective rendering demonstrating internal spatial continuity, room connections, and room depth.',
  },
  {
    id: '10',
    title: 'Column & Footing Drawing',
    desc: 'Engineered structural foundation schematics detailing load-bearing column placements, footing depths, and steel rebar specifications.',
  },
  {
    id: '11',
    title: 'Plinth Beam Drawing',
    desc: 'Foundation tie-beam engineering layouts specifying concrete mix grades, bar diameters, and seismic anchor ties.',
  },
  {
    id: '12',
    title: 'Center Line Drawing',
    desc: 'Precision benchmark grid drawing providing accurate on-site coordinate gridlines for excavation and column setting out.',
  },
  {
    id: '13',
    title: 'Basic Electrical & Plumbing Drawing',
    desc: 'Strategic MEP schematic layouts detailing electrical switch points, conduit runs, plumbing supply lines, and drainage nodes.',
  },
  {
    id: '14',
    title: 'Joinery Drawings & Specification',
    desc: 'Architectural joinery details and material specifications for custom doors, windows, ventilators, and frame fixtures.',
  },
  {
    id: '15',
    title: 'Exterior Walkthrough Video',
    desc: 'Cinematic 3D exterior animation capturing approaching road view, entrance gate, landscape harmony, and architectural contours.',
  },
];

interface ServicesDeliverablesGridProps {
  onOpenConsultation?: () => void;
}

export function ServicesDeliverablesGrid({ onOpenConsultation }: ServicesDeliverablesGridProps) {
  return (
    <section
      id="services-scope"
      aria-labelledby="services-scope-heading"
      className="w-full bg-[#F5F0E8] py-20 sm:py-24 lg:py-28 border-t border-[#D9D0C4]/80 select-text"
    >
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">

        {/* Section Header */}
        <ScrollReveal distance={16} className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16 pb-6 border-b border-[#DDD5C7]">
          <div>
            <span className="font-sans text-[12px] sm:text-[12.5px] font-bold tracking-[0.26em] uppercase text-[#8F5E3B] mb-2.5 block">
              DETAILED SERVICES &amp; DELIVERABLES
            </span>
            <h2
              id="services-scope-heading"
              className="font-serif text-[32px] sm:text-[38px] lg:text-[44px] leading-[1.12] font-normal text-[#1C201D]"
            >
              Comprehensive Service Scope
            </h2>
          </div>
          <p className="font-sans text-[14px] sm:text-[14.5px] text-[#4F4A43] max-w-[480px] leading-relaxed">
            From preliminary design analysis and municipal permit approvals through complete structural drawings and 3D walkthroughs, we provide an all-inclusive documentation suite.
          </p>
        </ScrollReveal>

        {/* 15 Deliverables Grid (3 Columns on Desktop, 2 on Tablet, 1 on Mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {servicesDeliverablesList.map((item, idx) => {
            const cardInner = (
              <div className="h-full flex flex-col justify-between">
                <div>
                  {/* Header: Number and subtle check icon */}
                  <div className="flex items-center justify-between mb-3.5">
                    <span className="font-serif text-[18px] sm:text-[19px] text-[#A65E3F] font-bold [font-variant-numeric:lining-nums]">
                      {item.id}
                    </span>
                    <CheckCircle2 size={17} className="text-[#65745A] group-hover:scale-110 transition-transform" />
                  </div>

                  {/* Subcategory Service Headline with Bold Font as requested */}
                  <h3 className="font-serif text-[18px] sm:text-[19px] text-[#161B18] font-bold leading-snug mb-2.5 group-hover:text-[#A65E3F] transition-colors">
                    {item.title}
                  </h3>

                  {/* Small Description for each */}
                  <p className="font-sans text-[13.5px] sm:text-[14px] text-[#423C35] leading-[1.65]">
                    {item.desc}
                  </p>
                </div>

                {item.href && (
                  <div className="mt-4 pt-3.5 border-t border-[#D9D0C4]/70 flex items-center justify-between text-[12px] font-sans font-bold text-[#8F5E3B] group-hover:text-[#6E4225] transition-colors">
                    <span>View Permit &amp; K-SMART Process</span>
                    <span aria-hidden="true" className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                )}
              </div>
            );

            return (
              <ScrollReveal 
                key={item.id} 
                delay={idx * 30}
                distance={18}
                className="bg-[#EDE7DD]/60 border border-[#D9D0C4] p-6 sm:p-7 transition-all duration-300 hover:border-[#94745F] hover:bg-[#E5DDD0] hover:shadow-[0_12px_32px_rgba(41,39,34,0.12)] hover:-translate-y-1.5 rounded-sm will-change-transform cursor-pointer group"
              >
                {item.href ? (
                  <Link href={item.href} className="block h-full focus:outline-none" aria-label={`View full details for ${item.title}`}>
                    {cardInner}
                  </Link>
                ) : (
                  cardInner
                )}
              </ScrollReveal>
            );
          })}
        </div>

        {/* Consultation Prompt */}
        {onOpenConsultation && (
          <div className="mt-14 sm:mt-16 text-center">
            <button
              type="button"
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 sm:py-4 bg-[#8F5E3B] hover:bg-[#784B2B] text-[#FAF8F5] font-sans font-bold text-[12px] sm:text-[12.5px] uppercase tracking-[0.18em] rounded-full transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer active:scale-98"
            >
              <span>Discuss Your Project Requirements</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
}

