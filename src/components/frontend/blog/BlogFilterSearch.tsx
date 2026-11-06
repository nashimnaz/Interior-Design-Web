'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface BlogFilterSearchProps {
  categories: string[];
  activeCategory: string;
  onSelectCategory: (category: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalFiltered: number;
}

export function BlogFilterSearch({
  categories,
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  totalFiltered,
}: BlogFilterSearchProps) {
  return (
    <div className="w-full pb-8 sm:pb-10 border-b border-[#DDD5C7] mb-12 sm:mb-14">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
        
        {/* Horizontal Category Filter Pills (Scrollable on mobile) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none select-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => onSelectCategory(cat)}
                className={`px-4.5 sm:px-5 py-2.5 rounded-[4px] font-sans text-[12.5px] sm:text-[13px] font-bold tracking-[0.16em] uppercase whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#8F5E3B] text-[#FAF8F5] shadow-xs'
                    : 'bg-[#FCFAF6] text-[#3D3730] hover:bg-[#EAE4D9] hover:text-[#1E2522] border-2 border-[#DDD5C7]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Field on the Right */}
        <div className="relative w-full lg:w-72 shrink-0">
          <Search 
            size={16} 
            className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#736B62] pointer-events-none" 
            aria-hidden="true" 
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search articles..."
            className="w-full pl-9 pr-9 py-2.5 bg-[#FCFAF6] border-2 border-[#DDD5C7] rounded-[4px] text-[14px] font-medium text-[#1C201D] placeholder-[#736B62] font-sans focus:outline-none focus:border-[#8F5E3B] transition-colors"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#736B62] hover:text-[#1C201D] p-0.5 rounded cursor-pointer"
              aria-label="Clear search"
            >
              <X size={15} />
            </button>
          )}
        </div>

      </div>

      {/* Filter status indicator when searching or filtering */}
      {(searchQuery || activeCategory !== 'All Articles') && (
        <div className="mt-4 flex items-center justify-between text-[12px] font-sans text-[#7A746C]">
          <span>
            Showing {totalFiltered} {totalFiltered === 1 ? 'article' : 'articles'} 
            {activeCategory !== 'All Articles' ? ` in "${activeCategory}"` : ''}
            {searchQuery ? ` matching "${searchQuery}"` : ''}
          </span>
          <button
            type="button"
            onClick={() => {
              onSelectCategory('All Articles');
              onSearchChange('');
            }}
            className="text-[#8F5E3B] hover:underline font-medium cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
