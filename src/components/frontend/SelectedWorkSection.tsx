'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SelectedWorkSectionProps {
  onOpenConsultation?: () => void;
}

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  location: string;
  image: string;
  alt: string;
}

export function SelectedWorkSection({ onOpenConsultation }: SelectedWorkSectionProps) {
  const defaultProjects: ProjectItem[] = [
    {
      id: 'residential-home',
      number: '01',
      title: 'RESIDENTIAL HOME',
      location: 'Thiruvananthapuram, Kerala',
      image: '/images/selected-work/project-01-residential-home.jpg',
      alt: '01 — Residential Home in Thiruvananthapuram, Kerala by Excorto Builders & Interiors',
    },
    {
      id: 'modern-interiors',
      number: '02',
      title: 'MODERN INTERIORS',
      location: 'Kochi, Kerala',
      image: '/images/selected-work/project-02-modern-interiors.jpg',
      alt: '02 — Modern Interiors in Kochi, Kerala by Excorto Builders & Interiors',
    },
    {
      id: 'courtyard-house',
      number: '03',
      title: 'COURTYARD HOUSE',
      location: 'Kollam, Kerala',
      image: '/images/selected-work/project-03-courtyard-house.jpg',
      alt: '03 — Courtyard House in Kollam, Kerala by Excorto Builders & Interiors',
    },
    {
      id: 'contemporary-space',
      number: '04',
      title: 'CONTEMPORARY SPACE',
      location: 'Kottayam, Kerala',
      image: '/images/selected-work/project-04-contemporary-space.jpg',
      alt: '04 — Contemporary Space in Kottayam, Kerala by Excorto Builders & Interiors',
    },
  ];

  const [projects, setProjects] = useState<ProjectItem[]>(defaultProjects);

  useEffect(() => {
    fetch('/api/projects?status=Published')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          const mapped: ProjectItem[] = data.data.map((p: any, idx: number) => ({
            id: p.id || `proj-${idx}`,
            number: p.displayOrder ? (p.displayOrder < 10 ? `0${p.displayOrder}` : `${p.displayOrder}`) : (idx < 9 ? `0${idx + 1}` : `${idx + 1}`),
            title: (p.title || 'ARCHITECTURAL RESIDENCE').toUpperCase(),
            location: p.location || 'Thiruvananthapuram, Kerala',
            image: p.coverImage || p.images?.[0] || '/images/selected-work/project-01-residential-home.jpg',
            alt: `${p.title} by Excorto Builders & Interiors`,
          }));
          setProjects(mapped);
        }
      })
      .catch(() => {});
  }, []);

  // Calculate relaxed, elegant architectural scroll duration (~8.5 seconds per card)
  const marqueeDuration = Math.max(70, Math.round(projects.length * 8.5));

  // Helper renderer for a 4-card sequence group
  const renderCardGroup = (isDuplicate = false, groupIndex = 0) => (
    <div 
      key={`group-${groupIndex}`}
      className="flex shrink-0 items-start gap-6 sm:gap-6 lg:gap-5 xl:gap-6 pr-6 sm:pr-6 lg:pr-5 xl:pr-6"
      aria-hidden={isDuplicate ? 'true' : undefined}
    >
      {projects.map((project) => (
        <Link 
          key={`${project.id}-${groupIndex}`}
          href="/projects"
          tabIndex={isDuplicate ? -1 : 0}
          className="group flex flex-col cursor-pointer w-[240px] sm:w-[270px] lg:w-[270px] xl:w-[290px] shrink-0 text-left focus:outline-none focus-visible:ring-1 focus-visible:ring-[#94745F]"
        >
          {/* Rectangular Architectural Photography with Sharp Corners */}
          <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#E5DFD4] rounded-none">
            <Image
              src={project.image}
              alt={isDuplicate ? '' : project.alt}
              fill
              sizes="(max-width: 640px) 240px, (max-width: 1024px) 270px, 290px"
              className="object-cover object-center rounded-none transition-transform duration-700 ease-out group-hover:scale-[1.03] select-none"
            />
          </div>

          {/* Typography Below Image */}
          <div className="mt-3.5 sm:mt-4">
            <h3 className="font-sans text-[11px] sm:text-[11.5px] font-medium tracking-[0.16em] uppercase text-[#292722] transition-colors group-hover:text-[#94745F]">
              {project.number} — {project.title}
            </h3>
            <p className="font-sans text-[11.5px] sm:text-[12px] font-light text-[#8A7E73] mt-1 tracking-normal">
              {project.location}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );

  return (
    <section 
      id="projects" 
      className="w-full bg-[#F7EFE0] py-16 sm:py-20 lg:py-24 xl:py-28 overflow-hidden select-text"
    >
      {/* Scoped CSS for Infinite Marquee Scroll and Hover Pause */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes selectedWorkMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-25%, 0, 0);
          }
        }

        .animate-selected-work {
          display: flex;
          width: max-content;
          animation: selectedWorkMarquee var(--marquee-duration, 85s) linear infinite;
          will-change: transform;
        }

        .marquee-carousel-wrapper:hover .animate-selected-work {
          animation-play-state: paused;
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-selected-work {
            animation: none !important;
            transform: none !important;
          }
          .marquee-carousel-wrapper {
            overflow-x: auto !important;
          }
        }
      `}} />

      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Horizontal Five-Column Composition */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-start gap-10 lg:gap-8 xl:gap-10">
          
          {/* Left Content Column (~20% Width) - Static */}
          <div className="w-full lg:w-[22%] xl:w-[20%] shrink-0 flex flex-col justify-between pt-1 lg:pt-2">
            <div>
              {/* Eyebrow Label */}
              <span className="font-sans text-[11px] sm:text-[11.5px] uppercase tracking-[0.24em] font-medium text-[#94745F] mb-3 sm:mb-4 block">
                SELECTED WORK
              </span>

              {/* Large Elegant Editorial Serif Heading */}
              <h2 className="font-serif text-[#292722] text-[34px] sm:text-[38px] lg:text-[38px] xl:text-[42px] leading-[1.12] tracking-[-0.015em] font-normal">
                Spaces<br />
                that inspire<br />
                everyday life.
              </h2>
            </div>

            {/* View All Projects Link with Muted Brown Underline */}
            <div className="mt-8 sm:mt-10 lg:mt-14">
              <Link
                href="/projects"
                className="group inline-flex items-center gap-2 font-sans text-[11px] sm:text-[11.5px] uppercase tracking-[0.18em] font-medium text-[#292722] hover:text-[#94745F] transition-colors cursor-pointer"
              >
                <span className="border-b border-[#94745F] pb-0.5 transition-colors group-hover:border-[#292722]">
                  VIEW ALL PROJECTS
                </span>
                <ArrowRight size={13} className="text-[#94745F] group-hover:text-[#292722] transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Right Area: Continuously Moving Horizontal Project-Card Carousel */}
          <div className="flex-1 min-w-0 overflow-hidden relative marquee-carousel-wrapper">
            <div 
              className="animate-selected-work"
              style={{ '--marquee-duration': `${marqueeDuration}s` } as React.CSSProperties}
            >
              {renderCardGroup(false, 0)}
              {renderCardGroup(true, 1)}
              {renderCardGroup(true, 2)}
              {renderCardGroup(true, 3)}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
