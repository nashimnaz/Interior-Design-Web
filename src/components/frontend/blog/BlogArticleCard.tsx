'use client';

import React from 'react';
import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { SmoothImage } from '@/components/frontend/SmoothImage';

interface BlogArticleCardProps {
  article?: BlogPost;
  blog?: BlogPost;
  priority?: boolean;
}

export function BlogArticleCard({ article, blog, priority = false }: BlogArticleCardProps) {
  const item = (article || blog)!;
  if (!item) return null;

  return (
    <article 
      className="group flex flex-col bg-[#FCFAF6] border border-[#E5DFD4] rounded-[4px] overflow-hidden transition-all duration-300 hover:shadow-lg hover:border-[#94745F]/40 hover:-translate-y-1"
      aria-labelledby={`article-title-${item.id}`}
    >
      {/* =========================================================================
          FEATURED THUMBNAIL (Consistent 4:3 landscape ratio, object-fit: cover)
          ========================================================================= */}
      <Link 
        href={`/blog/${item.slug}`} 
        className="relative w-full aspect-[4/3] overflow-hidden bg-[#E8E1D5] block select-none"
        tabIndex={-1}
        aria-hidden="true"
      >
        <SmoothImage
          src={item.coverImage || '/images/blogs/creating-timeless-interiors.jpg'}
          alt={item.title}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          unoptimized
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Subtle warm gradient hover glow */}
        <div 
          className="absolute inset-0 bg-[#292722]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" 
          aria-hidden="true" 
        />
      </Link>

      {/* Card Content Envelope */}
      <div className="flex-1 p-6 sm:p-7 flex flex-col justify-between">
        <div>
          {/* Top Metadata: Category & Read Time */}
          <div className="flex items-center justify-between gap-3 mb-3">
            <span className="font-sans text-[11.5px] sm:text-[12px] uppercase tracking-[0.2em] font-bold text-[#8F5E3B]">
              {item.category}
            </span>
            <span className="font-sans text-[12px] sm:text-[12.5px] font-medium text-[#686158]">
              {item.readTime || '5 min read'}
            </span>
          </div>

          {/* Article Title: Canela/Cormorant Garamond serif */}
          <h3 
            id={`article-title-${item.id}`}
            className="font-serif text-[#1C201D] text-[22px] sm:text-[24px] leading-[1.28] tracking-[-0.015em] font-medium mb-3 transition-colors duration-200 group-hover:text-[#8F5E3B] line-clamp-2 select-text"
          >
            <Link href={`/blog/${item.slug}`}>
              {item.title}
            </Link>
          </h3>

          {/* Short Excerpt */}
          <p className="font-sans text-[14.5px] sm:text-[15px] leading-[1.68] text-[#3D3730] font-normal line-clamp-3 mb-6 select-text">
            {item.excerpt}
          </p>
        </div>

        {/* Card Footer: Read More Link */}
        <div className="pt-4 border-t border-[#EDE7DC] flex items-center justify-between">
          <Link
            href={`/blog/${item.slug}`}
            className="inline-flex items-center gap-2 font-sans text-[12px] sm:text-[12.5px] font-bold tracking-[0.18em] uppercase text-[#1C201D] transition-colors duration-200 group-hover:text-[#8F5E3B]"
          >
            <span>Read More</span>
            <span className="transition-transform duration-200 group-hover:translate-x-1 inline-block text-[14px]" aria-hidden="true">
              →
            </span>
          </Link>

          <span className="font-sans text-[12px] sm:text-[12.5px] font-medium text-[#6E675E]">
            {new Date(item.publishedAt || Date.now()).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        </div>
      </div>
    </article>
  );
}
