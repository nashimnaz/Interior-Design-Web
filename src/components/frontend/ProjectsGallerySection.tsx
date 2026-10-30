'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { Search, Loader2, RefreshCw, ArrowUpRight } from 'lucide-react';
import { Project } from '@/lib/types';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const CATEGORIES = [
  { id: 'All', label: 'ALL' },
  { id: 'Residential', label: 'RESIDENTIAL' },
  { id: 'Commercial', label: 'COMMERCIAL' },
  { id: 'Interior', label: 'INTERIOR' },
  { id: 'Renovation', label: 'RENOVATION' },
] as const;

export function ProjectsGallerySection() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);

  // Fetch projects from the backend API
  const fetchProjects = useCallback(async (
    targetPage: number, 
    category: string, 
    search: string, 
    isLoadMore = false
  ) => {
    try {
      if (isLoadMore) {
        setIsLoadingMore(true);
      } else {
        setIsLoading(true);
      }
      setError(null);

      const params = new URLSearchParams({
        status: 'Published',
        page: targetPage.toString(),
        limit: '8',
      });

      if (category && category !== 'All') {
        params.set('category', category);
      }

      if (search && search.trim()) {
        params.set('search', search.trim());
      }

      const res = await fetch(`/api/projects?${params.toString()}`);
      if (!res.ok) {
        throw new Error(`Failed to load projects (${res.status})`);
      }

      const result = await res.json();
      if (!result.success) {
        throw new Error(result.error || 'Unable to retrieve projects');
      }

      const fetchedList: Project[] = result.data || [];

      if (isLoadMore) {
        // Deduplicate incoming projects
        setProjects(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const uniqueNew = fetchedList.filter(p => !existingIds.has(p.id));
          return [...prev, ...uniqueNew];
        });
      } else {
        setProjects(fetchedList);
      }

      setHasMore(Boolean(result.hasMore));
      setPage(targetPage);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Error fetching projects';
      setError(message);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  }, []);

  // Trigger initial fetch or filter change
  useEffect(() => {
    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      fetchProjects(1, activeCategory, searchQuery, false);
    }, 280);

    return () => {
      if (searchDebounceRef.current) {
        clearTimeout(searchDebounceRef.current);
      }
    };
  }, [activeCategory, searchQuery, fetchProjects]);

  // Handle Load More click
  const handleLoadMore = () => {
    if (isLoadingMore || !hasMore) return;
    fetchProjects(page + 1, activeCategory, searchQuery, true);
  };

  // Category switch handler
  const handleCategoryChange = (categoryId: string) => {
    if (categoryId === activeCategory) return;
    setActiveCategory(categoryId);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setActiveCategory('All');
    setSearchQuery('');
  };

  // GSAP animation for newly rendered project cards
  useEffect(() => {
    if (isLoading || projects.length === 0 || !gridRef.current) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const cards = Array.from(gridRef.current.children);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [projects, isLoading]);

  return (
    <section
      ref={sectionRef}
      id="projects-gallery"
      aria-labelledby="projects-gallery-heading"
      className="w-full bg-[#F4F0E9] text-[#292722] py-16 sm:py-20 lg:py-24 border-b border-[#D9D0C4]/70 select-text"
    >
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        {/* Section Accessible Heading */}
        <h2 id="projects-gallery-heading" className="sr-only">
          Published Architectural and Interior Projects
        </h2>

        {/* =====================================================================
            FILTER NAVIGATION & SEARCH BAR
            - Left: Horizontal Category Filter Navigation with active underline
            - Right: Minimal Search Input with Search Icon
            ===================================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pb-6 sm:pb-8 border-b border-[#D9D0C4]/70 mb-10 sm:mb-14">
          
          {/* Categories: Horizontally scrollable on mobile */}
          <nav 
            aria-label="Filter projects by category"
            className="flex items-center gap-6 sm:gap-8 lg:gap-10 overflow-x-auto no-scrollbar scroll-smooth -mx-6 px-6 sm:mx-0 sm:px-0 py-1"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => handleCategoryChange(cat.id)}
                  aria-pressed={isActive}
                  className={`relative shrink-0 font-sans text-[11px] sm:text-[11.5px] uppercase tracking-[0.2em] transition-colors duration-200 py-1 cursor-pointer ${
                    isActive 
                      ? 'text-[#292722] font-semibold' 
                      : 'text-[#7A746C] hover:text-[#292722] font-medium'
                  }`}
                >
                  <span>{cat.label}</span>
                  {isActive && (
                    <span 
                      className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#292722] transition-all duration-300" 
                      aria-hidden="true" 
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Minimal Search Input */}
          <div className="relative w-full sm:w-[220px] md:w-[260px] shrink-0">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects..."
              aria-label="Search projects by title, category, or location"
              className="w-full bg-transparent border-b border-[#292722]/20 focus:border-[#292722] text-[12px] sm:text-[13px] text-[#292722] placeholder-[#8A847C] py-1.5 pl-0 pr-7 outline-none font-sans transition-colors"
            />
            <Search 
              size={14} 
              className="absolute right-0 top-1/2 -translate-y-1/2 text-[#8A847C] pointer-events-none" 
              aria-hidden="true" 
            />
            {searchQuery && (
              <button 
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-[11px] text-[#8A847C] hover:text-[#292722] px-1"
                aria-label="Clear search input"
              >
                ✕
              </button>
            )}
          </div>

        </div>

        {/* =====================================================================
        {/* =====================================================================
            PROJECT GALLERY GRID (Four Equal-Width Columns on Desktop, 4:5 Portrait Ratio)
            ===================================================================== */}
        {isLoading && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-y-12 lg:gap-x-6 lg:gap-y-12 xl:gap-x-7">
            {Array.from({ length: 8 }).map((_, idx) => (
              <div key={`skeleton-${idx}`} className="flex flex-col animate-pulse">
                <div className="w-full aspect-[4/5] bg-[#E5DFD4] rounded-none mb-3.5" />
                <div className="w-20 h-2.5 bg-[#E5DFD4] rounded mb-2" />
                <div className="w-40 h-4 bg-[#E5DFD4] rounded mb-1" />
                <div className="w-28 h-2.5 bg-[#E5DFD4] rounded" />
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!isLoading && error && (
          <div className="py-16 text-center max-w-[500px] mx-auto">
            <p className="font-serif text-[22px] text-[#292722] mb-3">
              Unable to Load Projects
            </p>
            <p className="font-sans text-[13.5px] text-[#6E6860] mb-6">
              {error}
            </p>
            <button
              type="button"
              onClick={() => fetchProjects(1, activeCategory, searchQuery, false)}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#94745F] hover:bg-[#7D604D] text-[#FAF8F5] font-sans text-[11.5px] uppercase tracking-[0.16em] rounded-full transition-colors cursor-pointer"
            >
              <RefreshCw size={13} />
              <span>Retry</span>
            </button>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && projects.length === 0 && (
          <div className="py-20 text-center max-w-[520px] mx-auto">
            <span className="font-serif text-[26px] sm:text-[30px] text-[#292722] block mb-3 font-normal">
              No Projects Found
            </span>
            <p className="font-sans text-[13.5px] sm:text-[14px] text-[#6E6860] leading-[1.7] mb-6">
              We couldn&apos;t find any published projects matching &ldquo;{searchQuery || activeCategory}&rdquo;. Try another category or reset your search filters.
            </p>
            <button
              type="button"
              onClick={handleResetFilters}
              className="inline-flex items-center justify-center px-6 py-2.5 bg-transparent hover:bg-[#292722] text-[#292722] hover:text-[#FAF8F5] border border-[#292722]/30 hover:border-[#292722] font-sans font-medium text-[11px] sm:text-[11.5px] uppercase tracking-[0.16em] rounded-full transition-all duration-300 cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}

        {/* Active Projects Grid (4 images in a row on desktop) */}
        {!isLoading && !error && projects.length > 0 && (
          <div 
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 sm:gap-y-12 lg:gap-x-6 lg:gap-y-12 xl:gap-x-7"
          >
            {projects.map((project, index) => (
              <article 
                key={project.id}
                className="group flex flex-col focus:outline-none"
              >
                <div 
                  className="flex flex-col group select-none"
                >
                  {/* CRITICAL 4:5 Portrait Architectural Photograph */}
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#E8E2D8] select-none rounded-none">
                    <Image
                      src={project.coverImage || '/images/projects/living-room.jpg'}
                      alt={project.title}
                      fill
                      priority={index < 4}
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      className="object-cover object-center rounded-none transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.04]"
                    />
                  </div>

                  {/* Editorial Typography (No Arrow) */}
                  <div className="mt-3.5 sm:mt-4">
                    <span className="font-sans text-[10px] sm:text-[10.5px] font-semibold tracking-[0.22em] uppercase text-[#94745F] block mb-1">
                      {project.category}
                    </span>
                    <h3 className="font-serif text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[1.22] text-[#292722] group-hover:text-[#94745F] transition-colors duration-300">
                      {project.title}
                    </h3>
                    {project.location && (
                      <p className="font-sans text-[11.5px] sm:text-[12px] text-[#7A746C] mt-1 font-light tracking-normal">
                        {project.location}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* =====================================================================
            LOAD MORE PROJECTS BUTTON
            - Displayed only when more projects remain in the backend
            - Dynamically fetches and appends next batch of 9 projects
            ===================================================================== */}
        {hasMore && !isLoading && !error && (
          <div className="mt-14 sm:mt-16 lg:mt-20 flex justify-center">
            <button
              type="button"
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="inline-flex items-center justify-center gap-2.5 px-8 sm:px-10 py-3.5 sm:py-4 bg-transparent hover:bg-[#292722] text-[#292722] hover:text-[#FAF8F5] border border-[#292722]/30 hover:border-[#292722] font-sans font-medium text-[11.5px] sm:text-[12px] uppercase tracking-[0.18em] rounded-full transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed active:scale-98"
            >
              {isLoadingMore ? (
                <>
                  <Loader2 size={14} className="animate-spin text-[#94745F]" />
                  <span>LOADING PROJECTS...</span>
                </>
              ) : (
                <span>LOAD MORE PROJECTS</span>
              )}
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
