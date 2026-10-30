'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '@/lib/types';
import { TrendingUp, FolderTree, Sparkles } from 'lucide-react';

interface BlogSidebarProps {
  popularArticles: BlogPost[];
  categories: { name: string; count: number }[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

export function BlogSidebar({
  popularArticles,
  categories,
  activeCategory,
  onSelectCategory,
}: BlogSidebarProps) {
  return (
    <aside className="w-full space-y-10 sm:space-y-12">
      
      {/* =========================================================================
          POPULAR ARTICLES BLOCK
          - Small thumbnail (aspect-square/4:3)
          - Article title
          - Published date
          - Retrieved by view-count
          ========================================================================= */}
      <div className="bg-[#FCFAF6] border border-[#E5DFD4] rounded-[4px] p-6 sm:p-7">
        <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#EDE7DC]">
          <TrendingUp size={16} className="text-[#8F5E3B]" />
          <h4 className="font-serif text-[18px] sm:text-[19px] text-[#292722] font-normal tracking-tight">
            Popular Articles
          </h4>
        </div>

        <div className="space-y-5">
          {popularArticles.slice(0, 4).map((article, idx) => (
            <Link
              key={article.id}
              href={`/blog/${article.slug}`}
              className="group flex items-start gap-4 transition-all"
            >
              <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-[3px] overflow-hidden bg-[#E8E1D5] shrink-0 border border-[#DDD5C7]">
                <Image
                  src={article.coverImage || '/images/blogs/creating-timeless-interiors.jpg'}
                  alt={article.title}
                  fill
                  sizes="72px"
                  unoptimized
                  className="object-cover object-center transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              <div className="flex-1 min-w-0">
                <span className="font-sans text-[9.5px] uppercase tracking-[0.16em] font-semibold text-[#8F5E3B] block mb-1">
                  {article.category}
                </span>
                <h5 className="font-serif text-[14px] sm:text-[14.5px] leading-[1.3] text-[#292722] font-normal transition-colors group-hover:text-[#8F5E3B] line-clamp-2 mb-1.5">
                  {article.title}
                </h5>
                <p className="font-sans text-[11px] text-[#8A8379]">
                  {new Date(article.publishedAt || Date.now()).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* =========================================================================
          CATEGORIES LIST WITH ARTICLE COUNTS
          - Clicking category filters the main gallery
          ========================================================================= */}
      <div className="bg-[#FCFAF6] border border-[#E5DFD4] rounded-[4px] p-6 sm:p-7">
        <div className="flex items-center gap-2.5 pb-4 mb-6 border-b border-[#EDE7DC]">
          <FolderTree size={16} className="text-[#8F5E3B]" />
          <h4 className="font-serif text-[18px] sm:text-[19px] text-[#292722] font-normal tracking-tight">
            Categories
          </h4>
        </div>

        <ul className="space-y-1.5" role="list">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.name;
            return (
              <li key={cat.name}>
                <button
                  type="button"
                  onClick={() => onSelectCategory(cat.name)}
                  className={`w-full flex items-center justify-between py-2 px-3 rounded-[3px] text-left transition-colors cursor-pointer select-none ${
                    isActive
                      ? 'bg-[#8F5E3B] text-[#FAF8F5] font-semibold'
                      : 'text-[#4A443E] hover:bg-[#F4F0E9] hover:text-[#292722]'
                  }`}
                >
                  <span className="font-sans text-[13px]">{cat.name}</span>
                  <span
                    className={`font-sans text-[11px] px-2 py-0.5 rounded-[2px] ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : 'bg-[#EDE7DC] text-[#7A746C]'
                    }`}
                  >
                    {cat.count}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Studio Curated Advisory Callout */}
      <div className="bg-[#F4EFE6] border border-[#DDD5C7] rounded-[4px] p-6 text-center">
        <div className="w-9 h-9 rounded-full bg-[#8F5E3B]/10 text-[#8F5E3B] flex items-center justify-center mx-auto mb-3">
          <Sparkles size={17} />
        </div>
        <h4 className="font-serif text-[17px] text-[#292722] font-normal mb-2">
          Design Consultation
        </h4>
        <p className="font-sans text-[12.5px] leading-relaxed text-[#6E675E] mb-4">
          Seeking custom spatial planning or bespoke materials curation for your residence?
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center w-full py-2.5 rounded-[3px] bg-[#8F5E3B] hover:bg-[#784B2B] text-white font-sans text-[10.5px] font-medium tracking-[0.16em] uppercase transition-colors"
        >
          Discuss Your Project →
        </Link>
      </div>

    </aside>
  );
}
