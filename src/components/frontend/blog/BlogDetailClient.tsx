'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/frontend/Navbar';
import { Footer } from '@/components/frontend/Footer';
import { ReadingProgressBar } from '@/components/frontend/blog/ReadingProgressBar';
import { ArticleContentRenderer } from '@/components/frontend/blog/ArticleContentRenderer';
import { ArticleTableOfContents } from '@/components/frontend/blog/ArticleTableOfContents';
import { BlogArticleCard } from '@/components/frontend/blog/BlogArticleCard';
import { BlogPost } from '@/lib/types';
import { ArrowLeft, Calendar, Clock, Tag, Sparkles } from 'lucide-react';

interface BlogDetailClientProps {
  initialArticle: BlogPost;
  initialRelated: BlogPost[];
}

// Split title into majestic normal line and italic coffee-brown line matching Image 2
function renderDualHeading(title: string) {
  if (title.includes(':')) {
    const [first, ...rest] = title.split(':');
    return (
      <>
        <span className="block">{first.trim()}</span>
        <span className="block italic text-[#94745F] font-normal">{rest.join(':').trim()}</span>
      </>
    );
  }

  const splitWords = [' That ', ' Where ', ' With ', ' For ', ' & ', ' In '];
  for (const word of splitWords) {
    if (title.includes(word)) {
      const idx = title.indexOf(word);
      const first = title.slice(0, idx).trim();
      const second = title.slice(idx).trim();
      return (
        <>
          <span className="block">{first}.</span>
          <span className="block italic text-[#94745F] font-normal">{second}</span>
        </>
      );
    }
  }

  const words = title.split(' ');
  if (words.length > 3) {
    const mid = Math.ceil(words.length / 2);
    const first = words.slice(0, mid).join(' ');
    const second = words.slice(mid).join(' ');
    return (
      <>
        <span className="block">{first}.</span>
        <span className="block italic text-[#94745F] font-normal">{second}</span>
      </>
    );
  }

  return <span className="block">{title}</span>;
}

export function BlogDetailClient({
  initialArticle: article,
  initialRelated: relatedArticles,
}: BlogDetailClientProps) {
  const publishedDateFormatted = new Date(article.publishedAt || Date.now()).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <main className="w-full bg-[#F4F0E9] min-h-screen text-[#292722] selection:bg-[#94745F] selection:text-white relative">
      {/* Reading Progress Indicator */}
      <ReadingProgressBar />

      {/* Global Header */}
      <Navbar activePage="blog" />

      {/* =========================================================================
          1. CINEMATIC FULL-WIDTH BLOG HERO (Matching Image 2 Reference)
          - Full-viewport architectural photograph with cover & center positioning
          - Sophisticated warm ivory gradient overlay: 95% left, 60% center, 15% right
          - Left 48-50% editorial text column with generous line spacing
          ========================================================================= */}
      <section 
        id="blog-detail-hero"
        aria-labelledby="blog-detail-hero-heading"
        className="relative w-full min-h-[90vh] lg:min-h-screen flex items-center overflow-hidden bg-[#F4F0E9] text-[#292722] select-text"
      >
        {/* Full-Screen Architectural Background Image */}
        <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
          <Image
            src={article.coverImage || '/images/services/interior-hero.jpg'}
            alt={article.title}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Sophisticated Warm Ivory Gradient Overlay:
              Strong on the left (95%) for maximum text contrast,
              gradually fading to transparent on the right (15%) to reveal architecture */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-[#F4F0E9]/95 via-[#F4F0E9]/75 to-[#F4F0E9]/20 sm:via-[#F4F0E9]/80 lg:from-[#F4F0E9]/95 lg:via-[#F4F0E9]/65 lg:to-[#F4F0E9]/15 pointer-events-none" 
            aria-hidden="true" 
          />
          {/* Subtle vertical wash for seamless navbar and edge transitions */}
          <div 
            className="absolute inset-0 bg-gradient-to-b from-[#F4F0E9]/50 via-transparent to-[#F4F0E9]/80 pointer-events-none" 
            aria-hidden="true" 
          />
        </div>

        {/* Content Container (Layered over the left 48-50% of the screen) */}
        <div className="relative z-10 w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 pt-32 sm:pt-36 lg:pt-32 pb-16 sm:pb-20 flex items-center min-h-[90vh] lg:min-h-screen">
          <div className="w-full lg:w-[50%] xl:w-[48%] max-w-[640px] xl:max-w-[680px] flex flex-col justify-center">
            
            {/* Breadcrumb Navigation matching Image 2 */}
            <div className="flex items-center gap-2 mb-6 sm:mb-7 text-[11px] sm:text-[11.5px] font-sans uppercase tracking-[0.2em] text-[#94745F] select-none">
              <Link href="/blog" className="hover:text-[#A65E3F] transition-colors flex items-center gap-1.5">
                <ArrowLeft size={13} />
                <span>Blog</span>
              </Link>
              <span className="text-[#D9D0C4]">/</span>
              <span className="text-[#292722] font-semibold">{article.category}</span>
            </div>

            {/* Category Eyebrow with Leading Number matching Image 2 */}
            <div className="flex items-center gap-3 mb-4">
              <span className="font-serif text-[18px] text-[#A65E3F] font-medium [font-variant-numeric:lining-nums]">
                01
              </span>
              <span className="w-6 h-[1px] bg-[#94745F]" aria-hidden="true" />
              <span className="font-sans text-[11px] sm:text-[11.5px] font-semibold tracking-[0.26em] uppercase text-[#94745F]">
                {article.category} · ARCHITECTURAL ESSAY
              </span>
            </div>

            {/* Large Editorial Serif Heading: Line 1 regular + Line 2 italic coffee brown matching Image 2 */}
            <h1 
              id="blog-detail-hero-heading"
              className="font-serif text-[38px] sm:text-[46px] lg:text-[54px] xl:text-[60px] leading-[1.08] tracking-[-0.018em] font-normal mb-5 sm:mb-6 text-[#292722]"
            >
              {renderDualHeading(article.title)}
            </h1>

            {/* Supporting Description / Introduction */}
            <div className="space-y-3.5 sm:space-y-4 mb-7 sm:mb-8">
              <p className="font-sans text-[13.5px] sm:text-[14.5px] lg:text-[15.5px] leading-[1.72] text-[#3D3832]">
                {article.excerpt}
              </p>
            </div>

            {/* Action & Meta Buttons matching Image 2 */}
            <div className="flex flex-wrap items-center gap-3.5 sm:gap-4 select-none">
              <a
                href="#article-reading"
                className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 bg-[#94745F] hover:bg-[#7D604D] text-[#FAF8F5] font-sans font-medium text-[11.5px] sm:text-[12px] uppercase tracking-[0.16em] rounded-full transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer active:scale-98"
              >
                <span>Read Full Article</span>
                <span aria-hidden="true">↓</span>
              </a>
              <div className="inline-flex items-center justify-center px-6 py-3.5 bg-transparent text-[#292722] border border-[#94745F]/40 font-sans font-medium text-[11px] sm:text-[11.5px] uppercase tracking-[0.16em] rounded-full">
                <span>By {article.author} · {article.readTime}</span>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================================
          2. ARTICLE READING SECTION + STICKY TABLE OF CONTENTS
          ========================================================================= */}
      <section 
        id="article-reading" 
        className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-16 sm:py-20 border-t border-[#DDD5C9]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 xl:gap-16 items-start">
          {/* Main Article Content (Left) */}
          <article className="lg:col-span-8 w-full max-w-3xl">
            <ArticleContentRenderer content={article.content} />

            {/* Tags Strip */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-12 pt-6 border-t border-[#DDD5C9] flex flex-wrap items-center gap-2">
                <Tag size={14} className="text-[#8F5E3B] mr-1" />
                {article.tags.map((t) => (
                  <span
                    key={t}
                    className="font-sans text-xs px-3 py-1 rounded-full bg-[#E8E1D5] text-[#5A554E] hover:text-[#8F5E3B] transition-colors"
                  >
                    #{t}
                  </span>
                ))}
              </div>
            )}

            {/* Author and Article Information Box */}
            <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#EBE5DA] border border-[#DDD5C9] flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden relative shrink-0 border-2 border-white shadow-sm">
                <Image
                  src={article.authorImage || '/images/team/lead-architect.jpg'}
                  alt={article.author}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-sans text-[10px] tracking-widest uppercase font-semibold text-[#8F5E3B]">
                    Article Contributor
                  </span>
                  <span className="text-[#DDD5C9]">•</span>
                  <span className="font-sans text-[11px] text-[#7A746C]">{article.category}</span>
                </div>
                <h4 className="font-serif text-xl sm:text-2xl text-[#292722] font-normal">
                  {article.author}
                </h4>
                <p className="font-sans text-xs sm:text-sm text-[#5A554E] leading-relaxed">
                  {article.authorRole || 'Principal Architect & Design Director'} at EXCORTO Builders & Interiors. Dedicated to tropical climate-sensitive spatial luxury, enduring natural stone, and bespoke residential joinery.
                </p>
                <div className="pt-2 text-[11px] text-[#7A746C] font-sans flex items-center gap-4">
                  <span>Published {publishedDateFormatted}</span>
                  {article.updatedAt && (
                    <span>• Updated {new Date(article.updatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                  )}
                </div>
              </div>
            </div>
          </article>

          {/* Sticky Table of Contents & Social Share (Right Sidebar) */}
          <aside className="lg:col-span-4 w-full">
            <ArticleTableOfContents
              content={article.content}
              title={article.title}
              slug={article.slug}
            />
          </aside>
        </div>
      </section>

      {/* =========================================================================
          3. RELATED ARTICLES (Continue Exploring)
          ========================================================================= */}
      {relatedArticles.length > 0 && (
        <section className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-16 sm:py-24 border-t border-[#DDD5C9]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
            <div>
              <div className="inline-flex items-center gap-2 font-sans text-[11px] font-semibold tracking-[0.25em] uppercase text-[#8F5E3B] mb-2">
                <Sparkles size={13} />
                <span>FURTHER INSPIRATION</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#292722] font-light tracking-tight">
                Continue Exploring
              </h2>
            </div>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 font-sans text-xs font-semibold tracking-wider uppercase text-[#8F5E3B] hover:text-[#734A2E] transition-colors"
            >
              <span>View All Journal Articles</span>
              <span>→</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {relatedArticles.map((rel) => (
              <BlogArticleCard key={rel.id} blog={rel} />
            ))}
          </div>
        </section>
      )}

      {/* Global Footer */}
      <Footer />
    </main>
  );
}
