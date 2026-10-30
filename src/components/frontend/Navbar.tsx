'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { createPortal } from 'react-dom';

interface NavbarProps {
  onOpenConsultation?: () => void;
  activePage?: 'home' | 'about' | 'projects' | 'services' | 'testimonials' | 'blog' | 'contact';
}

export function Navbar({ onOpenConsultation, activePage = 'home' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll listener for header elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = useCallback((callback?: () => void) => {
    setIsOpen(false);
    if (callback) {
      setTimeout(callback, 150);
    }
  }, []);

  const openMenu = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleToggle = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  // Lock background scroll without layout jump while menu is open
  useEffect(() => {
    if (isOpen) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
      const originalOverflow = document.body.style.overflow;
      const originalPaddingRight = document.body.style.paddingRight;

      document.body.style.overflow = 'hidden';
      if (scrollbarWidth > 0) {
        document.body.style.paddingRight = `${scrollbarWidth}px`;
      }

      return () => {
        document.body.style.overflow = originalOverflow;
        document.body.style.paddingRight = originalPaddingRight;
      };
    }
  }, [isOpen]);

  // Handle ESC key to smoothly close menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, closeMenu]);

  // Navigation Links definition with exact indices and labels
  const navLinks = [
    { num: '01', label: 'Home', href: '/', active: activePage === 'home' },
    { num: '02', label: 'About', href: '/about', active: activePage === 'about' },
    { num: '03', label: 'Services', href: '/services', active: activePage === 'services' },
    { num: '04', label: 'Projects', href: '/projects', active: activePage === 'projects' },
    { num: '05', label: 'Testimonials', href: '/testimonials', badge: 'STORIES', active: activePage === 'testimonials' },
    { num: '06', label: 'Blog', href: '/blog', badge: 'JOURNAL', active: activePage === 'blog' },
    { num: '07', label: 'Contact', href: '/contact', active: activePage === 'contact' },
  ];

  return (
    <>
      {/* =========================================================================
          SITE HEADER (Sticky elevation & minimal glass hamburger trigger)
          ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-[60] w-full transition-all duration-300 ${
          isScrolled
            ? 'bg-[#F5F2EC]/90 backdrop-blur-md border-b border-[#786450]/15 shadow-xs py-3.5 sm:py-4'
            : 'bg-transparent py-5 sm:py-6 lg:py-7'
        }`}
      >
        <div className="max-w-[1520px] mx-auto px-5 sm:px-8 lg:px-12 xl:px-14 flex items-center justify-between">
          {/* Brand / Logo with Split Arch Icon */}
          <Link
            href="/"
            onClick={() => {
              if (isOpen) closeMenu();
            }}
            className="group flex items-center gap-2.5 sm:gap-3 focus:outline-none select-none"
          >
            {/* Geometric Split Arch Vector Icon */}
            <div className="relative w-8 h-8 shrink-0 transition-transform duration-300 group-hover:scale-105">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                {/* Left Terracotta Quarter-Arch Ribbon */}
                <path d="M3 16C3 8.82 8.82 3 16 3V7.5C11.306 7.5 7.5 11.306 7.5 16H3Z" fill="#C2633E" />
                {/* Right Sage Green Monolith with Quarter-Circle Top-Right */}
                <path d="M17.5 3H18.5C25.404 3 31 8.596 31 15.5V28H17.5V3Z" fill="#526653" />
              </svg>
            </div>

            {/* Brand Name Typography */}
            <div className="flex flex-col">
              <span className="font-sans text-[16px] sm:text-[18px] font-medium tracking-[0.24em] text-[#292722] leading-none transition-colors group-hover:text-[#94745F]">
                EXCORTO
              </span>
              <span className="text-[7px] sm:text-[7.5px] font-semibold tracking-[0.3em] text-[#94745F] uppercase mt-1 leading-none transition-colors group-hover:text-[#526653]">
                BUILDERS &amp; INTERIORS
              </span>
            </div>
          </Link>

          {/* Minimal Hamburger Trigger Button */}
          <button
            type="button"
            onClick={handleToggle}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xs active:scale-95 border ${
              isOpen
                ? 'bg-[#F5F2EC] text-[#292722] border-[#786450]/20 shadow-md ring-2 ring-[#94745F]/20'
                : 'bg-[#F5F2EC]/80 hover:bg-[#F5F2EC] text-[#292722] border-white/70 backdrop-blur-md hover:border-[#786450]/20'
            }`}
            aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isOpen}
          >
            {/* Morphing 3-Line Hamburger to Elegant X */}
            <div className="relative w-4 h-4 flex flex-col justify-center items-center pointer-events-none">
              <span
                className={`block h-[1.5px] w-4 bg-[#292722] rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                  isOpen ? 'translate-y-[1.5px] rotate-45' : '-translate-y-1'
                }`}
              />
              <span
                className={`block h-[1.5px] w-4 bg-[#292722] rounded-full transition-all duration-200 ease-out ${
                  isOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                }`}
              />
              <span
                className={`block h-[1.5px] w-4 bg-[#292722] rounded-full transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] origin-center ${
                  isOpen ? '-translate-y-[1.5px] -rotate-45' : 'translate-y-1'
                }`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* =========================================================================
          PREMIUM GLASSMORPHISM NAVIGATION OVERLAY & FLOATING PANEL
          - Backdrop filter blur(24px)
          - Translucent warm ivory / off-white (~90% opacity)
          - Cormorant Garamond / Canela serif typography
          - Numbering in small coffee brown (#94745F)
          - Sage-green rounded CTA (#526653)
          ========================================================================= */}
      {mounted && createPortal(
        <div
          onClick={() => closeMenu()}
          className={`fixed inset-0 z-[100] flex items-center justify-center p-3.5 sm:p-6 md:p-8 bg-[#292722]/30 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] select-none transition-all duration-300 ${
            isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
        >
          {/* Glass Panel Card (Floating architectural atelier menu - compact & zero-scroll) */}
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            backgroundColor: 'rgba(245, 242, 236, 0.94)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
          className={`relative w-full max-w-[430px] flex flex-col justify-between rounded-[22px] sm:rounded-[26px] border border-white/70 shadow-[0_24px_60px_-15px_rgba(41,39,34,0.18),0_0_0_1px_rgba(120,100,80,0.12)] p-4 sm:p-6 md:p-7 overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] transition-all duration-300 ease-out ${
            isOpen ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto' : 'opacity-0 scale-95 translate-y-3 pointer-events-none'
          }`}
        >
          <div>
            {/* Panel Top Header: Brand + Close Trigger */}
            <div className="flex items-center justify-between pb-3 sm:pb-3.5 border-b border-[#786450]/15">
              <Link
                href="/"
                onClick={() => closeMenu()}
                className="group flex items-center gap-2.5 focus:outline-none"
              >
                <div className="relative w-6 h-6 sm:w-7 sm:h-7 shrink-0 transition-transform duration-300 group-hover:scale-105">
                  <svg width="26" height="26" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M3 16C3 8.82 8.82 3 16 3V7.5C11.306 7.5 7.5 11.306 7.5 16H3Z" fill="#C2633E" />
                    <path d="M17.5 3H18.5C25.404 3 31 8.596 31 15.5V28H17.5V3Z" fill="#526653" />
                  </svg>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[13px] sm:text-[14px] font-semibold tracking-[0.24em] text-[#292722] leading-none transition-colors group-hover:text-[#94745F]">
                    EXCORTO
                  </span>
                  <span className="text-[6.5px] sm:text-[7px] font-semibold tracking-[0.28em] text-[#94745F] uppercase mt-0.5 leading-none">
                    BUILDERS &amp; INTERIORS
                  </span>
                </div>
              </Link>

              {/* Close Button */}
              <button
                type="button"
                onClick={() => closeMenu()}
                className="w-8 h-8 rounded-full bg-[#F5F2EC]/90 hover:bg-[#EAE5DE] text-[#292722] border border-[#786450]/15 flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95"
                aria-label="Close navigation menu"
              >
                <svg width="13" height="13" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3 3L13 13M13 3L3 13"
                    stroke="#292722"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Eyebrow / Architectural Subtitle */}
            <div className="pt-2.5 pb-1 sm:pt-3 sm:pb-1.5 flex items-center justify-between">
              <span className="font-mono text-[9px] font-medium tracking-[0.22em] uppercase text-[#94745F]">
                01 – 07 · ARCHITECTURAL ATELIER
              </span>
              <span className="text-[8.5px] font-mono tracking-widest text-[#94745F]/60">
                EST. 2018
              </span>
            </div>

            {/* Navigation Links (01 to 07) - Compact & Elegant */}
            <nav className="flex flex-col space-y-0.5 py-0.5" aria-label="Main Navigation">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => closeMenu()}
                  className={`group flex items-center justify-between py-1.5 px-2.5 rounded-lg transition-all duration-200 ${
                    link.active
                      ? 'bg-[#94745F]/10 text-[#292722]'
                      : 'text-[#292722] hover:bg-[#94745F]/5 hover:text-[#94745F]'
                  }`}
                >
                    {/* Link Number & Serif Heading */}
                    <div className="flex items-baseline gap-2.5 sm:gap-3 transition-transform duration-200 ease-out group-hover:translate-x-1.5">
                      <span className="font-mono text-[10px] sm:text-[10.5px] text-[#94745F] font-medium tracking-wider">
                        {link.num}
                      </span>
                      <span
                        className={`font-serif text-[17px] sm:text-[18px] font-normal tracking-tight leading-snug transition-colors duration-200 ${
                          link.active ? 'text-[#292722] font-medium' : 'text-[#292722] group-hover:text-[#94745F]'
                        }`}
                      >
                        {link.label}
                      </span>
                    </div>

                    {/* Badge / Indicator */}
                    <div className="flex items-center gap-2">
                      {link.badge && (
                        <span className="text-[8px] uppercase tracking-[0.16em] font-sans font-semibold text-[#94745F] bg-[#94745F]/10 border border-[#94745F]/20 px-2 py-0.5 rounded-full">
                          {link.badge}
                        </span>
                      )}
                      {link.active ? (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#94745F]" title="Current Page" />
                      ) : (
                        <span className="opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 text-[#94745F] text-[11px]">
                          →
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </nav>
            </div>

            {/* Panel Bottom: Sage Green CTA & Studio Details */}
            <div className="pt-3 sm:pt-3.5 border-t border-[#786450]/15 mt-2 sm:mt-2.5 space-y-2 sm:space-y-2.5">
              {/* Rounded Sage-Green CTA Button */}
              {onOpenConsultation ? (
                <button
                  type="button"
                  onClick={() => {
                    closeMenu(() => onOpenConsultation());
                  }}
                  className="w-full py-2.5 sm:py-3 rounded-full bg-[#526653] hover:bg-[#435243] text-[#F5F2EC] font-sans text-[10.5px] sm:text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_4px_14px_rgba(82,102,83,0.22)] hover:shadow-[0_6px_18px_rgba(82,102,83,0.32)] flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
                >
                  <span>GET A QUOTE</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1 font-serif text-xs">
                    →
                  </span>
                </button>
              ) : (
                <Link
                  href="/contact"
                  onClick={() => closeMenu()}
                  className="w-full py-2.5 sm:py-3 rounded-full bg-[#526653] hover:bg-[#435243] text-[#F5F2EC] font-sans text-[10.5px] sm:text-[11px] font-medium tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_4px_14px_rgba(82,102,83,0.22)] hover:shadow-[0_6px_18px_rgba(82,102,83,0.32)] flex items-center justify-center gap-2 group cursor-pointer active:scale-[0.99]"
                >
                  <span>GET A QUOTE</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1 font-serif text-xs">
                    →
                  </span>
                </Link>
              )}

              {/* Minimal Studio Location & Touchpoint */}
              <div className="flex items-center justify-between text-[10px] text-[#656B66] font-sans pt-0.5 px-1">
                <span className="tracking-wide">Thiruvananthapuram, Kerala</span>
                <span className="text-[#94745F] font-mono text-[9.5px] tracking-wider">
                  studio@excorto.com
                </span>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
