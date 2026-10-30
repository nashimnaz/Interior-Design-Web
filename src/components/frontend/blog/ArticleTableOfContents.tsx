'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Share2, Check, Copy, ChevronDown, ChevronUp } from 'lucide-react';

interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

interface ArticleTableOfContentsProps {
  content: string;
  articleTitle?: string;
  title?: string;
  slug?: string;
}

export function ArticleTableOfContents({ 
  content, 
  articleTitle, 
  title, 
  slug 
}: ArticleTableOfContentsProps) {
  const currentTitle = articleTitle || title || 'EXCORTO Journal';
  const [activeId, setActiveId] = useState<string>('');
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Extract H1, H2, and H3 headings synchronously for SSR and instant render
  const headings = useMemo<HeadingItem[]>(() => {
    if (!content) return [];
    const lines = content.split('\n');
    const items: HeadingItem[] = [];

    lines.forEach((line) => {
      const match = line.trim().match(/^(#{1,3})\s+(.*)$/);
      if (match) {
        const level = match[1].length;
        const text = match[2].trim();
        const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
        items.push({ id, text, level });
      }
    });

    return items;
  }, [content]);

  // Track active heading on scroll
  useEffect(() => {
    if (headings.length === 0) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      let currentActive = headings[0]?.id || '';

      for (let i = 0; i < headings.length; i++) {
        const el = document.getElementById(headings[i].id);
        if (el && el.offsetTop <= scrollPos) {
          currentActive = headings[i].id;
        }
      }

      setActiveId(currentActive);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [headings]);

  const handleScrollToHeading = (id: string, e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveId(id);
      setMobileOpen(false);
    }
  };

  const handleCopyLink = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleShareTwitter = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      const text = encodeURIComponent(`Reading "${currentTitle}" on EXCORTO Design Journal`);
      window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, '_blank');
    }
  };

  const handleShareLinkedIn = () => {
    if (typeof window !== 'undefined') {
      const url = encodeURIComponent(window.location.href);
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }
  };

  if (headings.length === 0) return null;

  return (
    <div className="w-full">
      {/* =========================================================================
          MOBILE COLLAPSIBLE TABLE OF CONTENTS
          ========================================================================= */}
      <div className="lg:hidden mb-8 bg-[#FCFAF6] border border-[#DDD5C7] rounded-[4px] p-4 select-none">
        <button
          type="button"
          onClick={() => setMobileOpen(!mobileOpen)}
          className="w-full flex items-center justify-between text-left font-serif text-[16px] text-[#292722] font-normal"
        >
          <span className="font-sans text-[11px] uppercase tracking-[0.2em] font-semibold text-[#8F5E3B]">
            Table of Contents ({headings.length})
          </span>
          {mobileOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>

        {mobileOpen && (
          <nav className="mt-4 pt-3 border-t border-[#EDE7DC] space-y-2">
            {headings.map((h) => {
              const isActive = activeId === h.id;
              return (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  onClick={(e) => handleScrollToHeading(h.id, e)}
                  className={`block text-[13px] transition-colors py-1 ${
                    h.level === 3 ? 'pl-3 text-[12px]' : ''
                  } ${
                    isActive
                      ? 'text-[#8F5E3B] font-semibold'
                      : 'text-[#554E48] hover:text-[#292722]'
                  }`}
                >
                  {h.text}
                </a>
              );
            })}
          </nav>
        )}
      </div>

      {/* =========================================================================
          DESKTOP STICKY TABLE OF CONTENTS & ARTICLE CONTROLS
          ========================================================================= */}
      <div className="hidden lg:block sticky top-28 space-y-8 select-none">
        
        {/* Back to Blog Navigation */}
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 font-sans text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7A746C] hover:text-[#8F5E3B] transition-colors"
        >
          <ArrowLeft size={14} className="transition-transform duration-200 group-hover:-translate-x-1" />
          <span>Back to All Articles</span>
        </Link>

        {/* Table of Contents Container */}
        <div className="bg-[#FCFAF6] border border-[#E5DFD4] rounded-[4px] p-6">
          <span className="font-sans text-[10.5px] font-semibold tracking-[0.24em] uppercase text-[#8F5E3B] mb-4 block">
            CONTENTS
          </span>

          <nav className="space-y-2.5">
            {headings.map((h) => {
              const isActive = activeId === h.id;
              return (
                <a
                  key={h.id}
                  href={`#${h.id}`}
                  onClick={(e) => handleScrollToHeading(h.id, e)}
                  className={`group flex items-start gap-2.5 text-[12.5px] leading-snug transition-all py-0.5 ${
                    h.level === 3 ? 'pl-3' : ''
                  } ${
                    isActive
                      ? 'text-[#8F5E3B] font-semibold translate-x-1'
                      : 'text-[#6E675E] hover:text-[#292722]'
                  }`}
                >
                  <span 
                    className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 transition-colors ${
                      isActive ? 'bg-[#8F5E3B]' : 'bg-transparent group-hover:bg-[#DDD5C7]'
                    }`} 
                    aria-hidden="true" 
                  />
                  <span>{h.text}</span>
                </a>
              );
            })}
          </nav>
        </div>

        {/* Share Article Section */}
        <div className="bg-[#FCFAF6] border border-[#E5DFD4] rounded-[4px] p-5">
          <span className="font-sans text-[10px] font-semibold tracking-[0.22em] uppercase text-[#8A8379] mb-3 block">
            SHARE ARTICLE
          </span>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleCopyLink}
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-[3px] bg-[#F4F0E9] hover:bg-[#EAE4D9] text-[#292722] font-sans text-[11px] font-medium tracking-wider uppercase transition-colors cursor-pointer"
              title="Copy article link"
            >
              {copied ? (
                <>
                  <Check size={13} className="text-[#2F5233]" />
                  <span className="text-[#2F5233]">Copied</span>
                </>
              ) : (
                <>
                  <Copy size={13} />
                  <span>Copy Link</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={handleShareTwitter}
              className="p-2 rounded-[3px] bg-[#F4F0E9] hover:bg-[#EAE4D9] text-[#292722] transition-colors cursor-pointer"
              aria-label="Share on X (Twitter)"
              title="Share on X"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </button>

            <button
              type="button"
              onClick={handleShareLinkedIn}
              className="p-2 rounded-[3px] bg-[#F4F0E9] hover:bg-[#EAE4D9] text-[#292722] transition-colors cursor-pointer"
              aria-label="Share on LinkedIn"
              title="Share on LinkedIn"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
              </svg>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
