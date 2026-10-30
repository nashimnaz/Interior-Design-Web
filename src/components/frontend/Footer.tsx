'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, Phone, Mail } from 'lucide-react';

interface FooterProps {
  onOpenConsultation?: () => void;
}

export function Footer({ onOpenConsultation }: FooterProps) {
  const [contact, setContact] = useState({
    location: 'Thiruvananthapuram, Kerala',
    phone: '+91 94470 12345',
    email: 'info@excortobuilders.com'
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.success && data.data) {
          setContact({
            location: data.data.address ? data.data.address.split(',')[0] + ', Kerala' : 'Thiruvananthapuram, Kerala',
            phone: data.data.contactPhone || '+91 94470 12345',
            email: data.data.contactEmail || 'info@excortobuilders.com'
          });
        }
      })
      .catch(() => {});
  }, []);
  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About Us', href: '/about' },
    { label: 'Services', href: '/services' },
    { label: 'Portfolio', href: '/projects' },
    { label: 'Our Process', href: '/about#process' },
    { label: 'Contact', href: '/contact' },
  ];

  const services = [
    { label: 'Architectural Design', href: '/services/architectural-design' },
    { label: 'Interior Designing', href: '/services/interior-design' },
    { label: 'Interior Installation', href: '/services/interior-installation' },
    { label: 'Consultation', href: '/contact', isAction: true },
  ];

  return (
    <footer 
      id="contact"
      className="w-full relative bg-[#F6EFE2] text-[#222420] select-text overflow-hidden"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">Footer Information</h2>

      {/* Subtle Interior Line Art Watermark Background with Light Density */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none opacity-20 mix-blend-multiply overflow-hidden">
        <Image
          src="/images/footer-interior-line-art.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-[center_60%]"
        />
        {/* Soft gradient wash to guarantee pristine text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#F6EFE2]/60 via-[#F6EFE2]/30 to-[#F6EFE2]/60 pointer-events-none" />
      </div>

      {/* Main 4-Column Footer Area */}
      <div className="relative z-10 max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-16 sm:pt-20 lg:pt-24 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-0 items-start">
          
          {/* Column 1: Brand, Tagline, Socials */}
          <div className="lg:col-span-3 xl:col-span-3 flex flex-col justify-between pr-0 lg:pr-8 lg:border-r lg:border-[#E5DACB]">
            <div>
              {/* Brand Typography */}
              <Link href="/" className="inline-block group focus:outline-none">
                <span className="font-sans text-[18px] sm:text-[19px] font-medium tracking-[0.24em] text-[#1E2522] leading-none block transition-colors group-hover:text-[#C2633E]">
                  EXCORTO
                </span>
                <span className="font-sans text-[8px] sm:text-[8.5px] font-semibold tracking-[0.3em] text-[#746E68] uppercase mt-1.5 leading-none block transition-colors group-hover:text-[#536453]">
                  BUILDERS &amp; INTERIORS
                </span>
              </Link>

              {/* Tagline */}
              <div className="mt-5 sm:mt-6 font-sans text-[13px] text-[#554E48] leading-[1.65]">
                <p>Thoughtfully Designed.</p>
                <p>Beautifully Executed.</p>
              </div>
            </div>

            {/* Social Icons (Instagram, Facebook, LinkedIn) */}
            <div className="flex items-center gap-3.5 mt-6 sm:mt-8">
              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Excorto on Instagram"
                className="w-7 h-7 flex items-center justify-center text-[#554E48] hover:text-[#C2633E] transition-colors"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>

              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Excorto on Facebook"
                className="w-7 h-7 flex items-center justify-center text-[#554E48] hover:text-[#C2633E] transition-colors"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Excorto on LinkedIn"
                className="w-7 h-7 flex items-center justify-center text-[#554E48] hover:text-[#C2633E] transition-colors"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 xl:col-span-3 pl-0 sm:pl-6 lg:pl-10 pr-0 lg:pr-6 lg:border-r lg:border-[#E5DACB]">
            <span className="font-sans text-[11px] sm:text-[11.5px] font-semibold tracking-[0.2em] uppercase text-[#1C201D] mb-4 sm:mb-5 block">
              QUICK LINKS
            </span>
            <ul className="space-y-2.5 font-sans text-[13px] text-[#554E48]">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link 
                    href={link.href}
                    className="hover:text-[#C2633E] transition-colors block py-0.5"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Our Services */}
          <div className="lg:col-span-3 xl:col-span-3 pl-0 lg:pl-10 pr-0 lg:pr-6 lg:border-r lg:border-[#E5DACB]">
            <span className="font-sans text-[11px] sm:text-[11.5px] font-semibold tracking-[0.2em] uppercase text-[#1C201D] mb-4 sm:mb-5 block">
              OUR SERVICES
            </span>
            <ul className="space-y-2.5 font-sans text-[13px] text-[#554E48]">
              {services.map((item) => (
                <li key={item.label}>
                  {item.isAction ? (
                    <button
                      type="button"
                      onClick={onOpenConsultation}
                      className="hover:text-[#C2633E] transition-colors text-left block py-0.5 cursor-pointer"
                    >
                      {item.label}
                    </button>
                  ) : (
                    <Link 
                      href={item.href}
                      className="hover:text-[#C2633E] transition-colors block py-0.5"
                    >
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="lg:col-span-3 xl:col-span-3 pl-0 sm:pl-6 lg:pl-10">
            <span className="font-sans text-[11px] sm:text-[11.5px] font-semibold tracking-[0.2em] uppercase text-[#1C201D] mb-4 sm:mb-5 block">
              CONTACT US
            </span>
            <ul className="space-y-3 font-sans text-[13px] text-[#554E48]">
              {/* Location */}
              <li className="flex items-start gap-2.5">
                <MapPin size={15} className="text-[#746E68] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{contact.location}</span>
              </li>

              {/* Phone */}
              <li className="flex items-center gap-2.5">
                <Phone size={15} className="text-[#746E68] shrink-0" aria-hidden="true" />
                <a 
                  href={`tel:${contact.phone.replace(/\s+/g, '')}`} 
                  className="hover:text-[#C2633E] transition-colors"
                >
                  {contact.phone}
                </a>
              </li>

              {/* Email */}
              <li className="flex items-center gap-2.5">
                <Mail size={15} className="text-[#746E68] shrink-0" aria-hidden="true" />
                <a 
                  href={`mailto:${contact.email}`} 
                  className="hover:text-[#C2633E] transition-colors"
                >
                  {contact.email}
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Thin Horizontal Divider Line */}
      <div className="relative z-10 max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="w-full h-[1px] bg-[#E5DACB]" aria-hidden="true" />
      </div>

      {/* Bottom Sub-Footer Bar */}
      <div className="relative z-10 max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-6 sm:py-7 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11.5px] sm:text-[12px] text-[#857C74] font-sans">
        <p>
          © 2026 Excorto Builders &amp; Interiors. All Rights Reserved.
        </p>
        <p className="tracking-wide">
          Your Vision. Our Expertise. A Space That Inspires.
        </p>
      </div>
    </footer>
  );
}
