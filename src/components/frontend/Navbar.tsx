'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { createPortal } from 'react-dom';

interface NavbarProps {
  onOpenConsultation?: () => void;
  activePage?: 'home' | 'about' | 'projects' | 'services' | 'testimonials' | 'blog' | 'contact';
}

export function Navbar({ onOpenConsultation, activePage = 'home' }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const closeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => {
      if (closeTimerRef.current) {
        clearTimeout(closeTimerRef.current);
      }
    };
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
    if (!isOpen || isClosing) return;
    setIsClosing(true);

    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
    }

    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
      if (callback) {
        callback();
      }
    }, 380);
  }, [isOpen, isClosing]);

  const openMenu = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    setIsClosing(false);
    setIsOpen(true);
  }, []);

  const handleToggle = useCallback(() => {
    if (isOpen && !isClosing) {
      closeMenu();
    } else {
      openMenu();
    }
  }, [isOpen, isClosing, closeMenu, openMenu]);

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
      if (e.key === 'Escape' && isOpen && !isClosing) {
        closeMenu();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isClosing, closeMenu]);

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

  const isMenuVisible = isOpen && !isClosing;

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
          {/* Brand / Official Studio Logo */}
          <Link
            href="/"
            onClick={() => {
              if (isOpen) closeMenu();
            }}
            className="group flex items-center focus:outline-none select-none"
            aria-label="Excorto Builders & Interiors"
          >
            <Image
              src="/images/excorto-logo.png"
              alt="Excorto Builders and Interiors"
              width={190}
              height={46}
              priority
              unoptimized
              style={{ width: 'auto' }}
              className="h-7 sm:h-8 md:h-9 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
            />
          </Link>

          {/* Minimal Hamburger Trigger Button */}
          <button
            type="button"
            onClick={handleToggle}
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer shadow-xs active:scale-95 border ${
              isMenuVisible
                ? 'bg-[#F5F2EC] text-[#292722] border-[#786450]/20 shadow-md ring-2 ring-[#94745F]/20'
                : 'bg-[#F5F2EC]/80 hover:bg-[#F5F2EC] text-[#292722] border-white/70 backdrop-blur-md hover:border-[#786450]/20'
            }`}
            aria-label={isMenuVisible ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuVisible}
          >
            {/* Morphing 3-Line Hamburger to Elegant Centered X */}
            <div className="relative w-4.5 h-4 flex items-center justify-center pointer-events-none">
              <span
                style={{
                  transform: isMenuVisible 
                    ? 'translateY(0px) rotate(45deg)' 
                    : 'translateY(-5px) rotate(0deg)',
                  transition: 'transform 350ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="absolute w-4 h-[1.5px] bg-[#292722] rounded-full origin-center"
              />
              <span
                style={{
                  opacity: isMenuVisible ? 0 : 1,
                  transform: isMenuVisible ? 'scaleX(0)' : 'scaleX(1)',
                  transition: 'opacity 250ms ease-out, transform 250ms ease-out',
                }}
                className="absolute w-4 h-[1.5px] bg-[#292722] rounded-full origin-center"
              />
              <span
                style={{
                  transform: isMenuVisible 
                    ? 'translateY(0px) rotate(-45deg)' 
                    : 'translateY(5px) rotate(0deg)',
                  transition: 'transform 350ms cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                className="absolute w-4 h-[1.5px] bg-[#292722] rounded-full origin-center"
              />
            </div>
          </button>
        </div>
      </header>

      {/* =========================================================================
          PREMIUM GLASSMORPHISM NAVIGATION OVERLAY & FLOATING PANEL
          - Backdrop filter blur(24px)
          - Translucent warm ivory / off-white (~94% opacity)
          - Cormorant Garamond / Canela serif typography
          - Numbering in small coffee brown (#94745F)
          - Sage-green rounded CTA (#526653)
          - Fluid slide-down entrance and slide-down-out exit
          ========================================================================= */}
      {mounted && createPortal(
        <div
          onClick={() => closeMenu()}
          style={{
            opacity: isMenuVisible ? 1 : 0,
            pointerEvents: isMenuVisible ? 'auto' : 'none',
            transition: 'opacity 380ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-3.5 sm:p-6 md:p-8 bg-[#292722]/35 backdrop-blur-[12px] [-webkit-backdrop-filter:blur(12px)] select-none"
          role="dialog"
          aria-modal="true"
          aria-label="Site Navigation"
        >
          {/* Glass Panel Card (Slides smoothly down into view and down out when closing) */}
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: 'rgba(245, 242, 236, 0.94)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              opacity: isMenuVisible ? 1 : 0,
              transform: isMenuVisible
                ? 'translateY(0px) scale(1)'
                : isClosing
                ? 'translateY(60px) scale(0.97)'
                : 'translateY(-60px) scale(0.97)',
              transition: isClosing
                ? 'opacity 340ms cubic-bezier(0.16, 1, 0.3, 1), transform 380ms cubic-bezier(0.16, 1, 0.3, 1)'
                : 'opacity 450ms cubic-bezier(0.16, 1, 0.3, 1), transform 500ms cubic-bezier(0.16, 1, 0.3, 1)',
              pointerEvents: isMenuVisible ? 'auto' : 'none',
              willChange: 'transform, opacity',
            }}
            className="relative w-full max-w-[430px] flex flex-col justify-between rounded-[22px] sm:rounded-[26px] border border-white/70 shadow-[0_24px_60px_-15px_rgba(41,39,34,0.18),0_0_0_1px_rgba(120,100,80,0.12)] p-4 sm:p-6 md:p-7 overflow-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            <div>
              {/* Panel Top Header: Brand + Close Trigger */}
              <div 
                style={{
                  opacity: isMenuVisible ? 1 : 0,
                  transform: isMenuVisible
                    ? 'translateY(0px)'
                    : isClosing
                    ? 'translateY(12px)'
                    : 'translateY(-12px)',
                  transition: isClosing
                    ? 'opacity 240ms ease-out, transform 260ms ease-out'
                    : 'opacity 380ms cubic-bezier(0.16, 1, 0.3, 1) 80ms, transform 400ms cubic-bezier(0.16, 1, 0.3, 1) 80ms',
                }}
                className="flex items-center justify-between pb-3 sm:pb-3.5 border-b border-[#786450]/15"
              >
                <Link
                  href="/"
                  onClick={() => closeMenu()}
                  className="group flex items-center focus:outline-none"
                  aria-label="Excorto Builders & Interiors"
                >
                  <Image
                    src="/images/excorto-logo.png"
                    alt="Excorto Builders and Interiors"
                    width={150}
                    height={36}
                    unoptimized
                    style={{ width: 'auto' }}
                    className="h-6 sm:h-7 w-auto object-contain transition-transform duration-300 group-hover:scale-102"
                  />
                </Link>

                {/* Close Button with Subtle Rotation on Hover */}
                <button
                  type="button"
                  onClick={() => closeMenu()}
                  className="w-8 h-8 rounded-full bg-[#F5F2EC]/90 hover:bg-[#EAE5DE] text-[#292722] border border-[#786450]/15 flex items-center justify-center transition-all duration-300 cursor-pointer active:scale-95 group"
                  aria-label="Close navigation menu"
                >
                  <svg 
                    width="13" 
                    height="13" 
                    viewBox="0 0 16 16" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    className="transition-transform duration-300 group-hover:rotate-90"
                  >
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
              <div 
                style={{
                  opacity: isMenuVisible ? 1 : 0,
                  transform: isMenuVisible
                    ? 'translateY(0px)'
                    : isClosing
                    ? 'translateY(10px)'
                    : 'translateY(-10px)',
                  transition: isClosing
                    ? 'opacity 240ms ease-out, transform 260ms ease-out'
                    : 'opacity 380ms cubic-bezier(0.16, 1, 0.3, 1) 120ms, transform 400ms cubic-bezier(0.16, 1, 0.3, 1) 120ms',
                }}
                className="pt-2.5 pb-1 sm:pt-3 sm:pb-1.5 flex items-center justify-between"
              >
                <span className="font-mono text-[9px] font-medium tracking-[0.22em] uppercase text-[#94745F]">
                  01 – 07 · ARCHITECTURAL ATELIER
                </span>
                <span className="text-[8.5px] font-mono tracking-widest text-[#94745F]/60">
                  EST. 2018
                </span>
              </div>

              {/* Navigation Links (01 to 07) - Cascading Downward Entrance and Downward Exit */}
              <nav className="flex flex-col space-y-0.5 py-0.5" aria-label="Main Navigation">
                {navLinks.map((link, idx) => {
                  const openDelay = 140 + idx * 55;
                  const closeDelay = (navLinks.length - 1 - idx) * 15;

                  return (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => closeMenu()}
                      style={{
                        opacity: isMenuVisible ? 1 : 0,
                        transform: isMenuVisible
                          ? 'translateY(0px)'
                          : isClosing
                          ? 'translateY(14px)'
                          : 'translateY(-14px)',
                        transition: isClosing
                          ? `opacity 220ms ease-out ${closeDelay}ms, transform 250ms ease-out ${closeDelay}ms`
                          : `opacity 350ms cubic-bezier(0.16, 1, 0.3, 1) ${openDelay}ms, transform 380ms cubic-bezier(0.16, 1, 0.3, 1) ${openDelay}ms`,
                      }}
                      className={`group flex items-center justify-between py-1.5 px-2.5 rounded-lg ${
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
                  );
                })}
              </nav>
            </div>

            {/* Panel Bottom: Sage Green CTA & Studio Details with Fluid Entrance */}
            <div 
              style={{
                opacity: isMenuVisible ? 1 : 0,
                transform: isMenuVisible
                  ? 'translateY(0px)'
                  : isClosing
                  ? 'translateY(15px)'
                  : 'translateY(-15px)',
                transition: isClosing
                  ? 'opacity 220ms ease-out, transform 250ms ease-out'
                  : 'opacity 400ms cubic-bezier(0.16, 1, 0.3, 1) 480ms, transform 420ms cubic-bezier(0.16, 1, 0.3, 1) 480ms',
              }}
              className="pt-3 sm:pt-3.5 border-t border-[#786450]/15 mt-2 sm:mt-2.5 space-y-2 sm:space-y-2.5"
            >
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
