'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { Navbar } from '@/components/frontend/Navbar';
import { Footer } from '@/components/frontend/Footer';
import { ConsultationModal } from '@/components/frontend/ConsultationModal';
import { BlogHeroSection } from '@/components/frontend/blog/BlogHeroSection';
import { BlogFilterSearch } from '@/components/frontend/blog/BlogFilterSearch';
import { BlogArticleCard } from '@/components/frontend/blog/BlogArticleCard';
import { BlogSidebar } from '@/components/frontend/blog/BlogSidebar';
import { BlogPost } from '@/lib/types';
import { initialBlogs } from '@/lib/store';
import { Loader2, Plus, Sparkles } from 'lucide-react';

const CATEGORIES = [
  'All Articles',
  'Interior Design',
  'Home Construction',
  'Space Planning',
  'Materials & Finishes',
  'Tips & Guides',
];

const INITIAL_VISIBLE_COUNT = 6;
const BATCH_SIZE = 3;

export default function BlogListingPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [articles, setArticles] = useState<BlogPost[]>(initialBlogs);
  const [activeCategory, setActiveCategory] = useState<string>('All Articles');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  // Fetch published blogs from API on mount
  useEffect(() => {
    fetch('/api/blogs?status=Published')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setArticles(data.data);
        }
      })
      .catch(() => {
        // Fallback to initialBlogs
      });
  }, []);

  // Filter and search articles
  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      // Must be Published for public view
      if (article.status !== 'Published') return false;

      // Category filter
      const matchesCategory =
        activeCategory === 'All Articles' || article.category === activeCategory;

      // Search query filter
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.content.toLowerCase().includes(query) ||
        article.author.toLowerCase().includes(query) ||
        (Array.isArray(article.tags) &&
          article.tags.some((t) => t.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [articles, activeCategory, searchQuery]);

  // Reset pagination count when category or search changes
  useEffect(() => {
    setVisibleCount(INITIAL_VISIBLE_COUNT);
  }, [activeCategory, searchQuery]);

  // Sliced articles currently visible in main grid
  const visibleArticles = useMemo(() => {
    return filteredArticles.slice(0, visibleCount);
  }, [filteredArticles, visibleCount]);

  const hasMoreArticles = visibleCount < filteredArticles.length;

  // Retrieve top popular articles sorted by view count
  const popularArticles = useMemo(() => {
    return [...articles]
      .filter((a) => a.status === 'Published')
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5);
  }, [articles]);

  // Calculate article counts per category
  const categoryCounts = useMemo(() => {
    return CATEGORIES.map((catName) => {
      const count =
        catName === 'All Articles'
          ? articles.filter((a) => a.status === 'Published').length
          : articles.filter(
              (a) => a.status === 'Published' && a.category === catName
            ).length;
      return { name: catName, count };
    });
  }, [articles]);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + BATCH_SIZE);
      setLoadingMore(false);
    }, 250);
  };

  return (
    <main className="w-full bg-[#F4F0E9] min-h-screen text-[#292722] selection:bg-[#94745F] selection:text-white relative">
      {/* 1. Global Website Header with Blog highlighted */}
      <Navbar 
        activePage="blog"
        onOpenConsultation={() => setIsConsultationOpen(true)} 
      />

      {/* 2. Editorial Blog Hero Section */}
      <BlogHeroSection />

      {/* 3. Main Content: Filter, Grid, and Sidebar */}
      <section 
        className="w-full max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16 py-14 sm:py-16 lg:py-20"
        aria-label="Blog Articles"
      >
        {/* Horizontal Category Filter & Search Bar */}
        <BlogFilterSearch
          categories={CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={(cat) => setActiveCategory(cat)}
          searchQuery={searchQuery}
          onSearchChange={(q) => setSearchQuery(q)}
          totalFiltered={filteredArticles.length}
        />

        {/* 2-Column Desktop Layout: 68% Article Grid, 32% Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 xl:gap-14 items-start">
          
          {/* Left Column: Article Grid + Load More */}
          <div className="lg:col-span-8 xl:col-span-8 flex flex-col">
            {visibleArticles.length === 0 ? (
              <div className="w-full py-20 px-6 bg-[#FCFAF6] border border-[#DDD5C7] rounded-[4px] text-center">
                <Sparkles size={28} className="mx-auto text-[#8F5E3B] mb-3 opacity-70" />
                <h3 className="font-serif text-[22px] text-[#292722] font-normal mb-2">
                  No articles found
                </h3>
                <p className="font-sans text-[14px] text-[#6E675E] max-w-md mx-auto mb-5">
                  We couldn&apos;t find any articles matching your search criteria. Try selecting another category or resetting the search filter.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('All Articles');
                    setSearchQuery('');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[3px] bg-[#8F5E3B] hover:bg-[#784B2B] text-white font-sans text-[11px] font-medium tracking-[0.16em] uppercase transition-colors"
                >
                  View All Articles
                </button>
              </div>
            ) : (
              <>
                {/* Responsive Article Grid (1 column on mobile, 2 columns on tablet, 2-3 columns on desktop) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-7 sm:gap-8">
                  {visibleArticles.map((article, index) => (
                    <BlogArticleCard 
                      key={article.id} 
                      article={article} 
                      priority={index < 2} 
                    />
                  ))}
                </div>

                {/* Dynamic "Load More Articles" Button */}
                {hasMoreArticles && (
                  <div className="mt-14 text-center">
                    <button
                      type="button"
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="group inline-flex items-center gap-2.5 px-8 py-4 rounded-[4px] bg-[#FCFAF6] hover:bg-[#8F5E3B] hover:text-[#FAF8F5] text-[#292722] border border-[#DDD5C7] hover:border-[#8F5E3B] font-sans text-[11.5px] font-medium tracking-[0.2em] uppercase transition-all duration-300 shadow-xs hover:shadow-md cursor-pointer select-none disabled:opacity-60"
                    >
                      {loadingMore ? (
                        <>
                          <Loader2 size={15} className="animate-spin text-[#8F5E3B] group-hover:text-white" />
                          <span>Loading Next Articles...</span>
                        </>
                      ) : (
                        <>
                          <span>Load More Articles</span>
                          <span className="transition-transform duration-200 group-hover:translate-y-0.5 inline-block text-[13px]" aria-hidden="true">
                            ↓
                          </span>
                        </>
                      )}
                    </button>
                    <p className="font-sans text-[11.5px] text-[#7A746C] mt-2.5">
                      Showing {visibleArticles.length} of {filteredArticles.length} articles
                    </p>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Right Column: Sidebar (Popular Articles + Categories) */}
          <div className="lg:col-span-4 xl:col-span-4 sticky top-28">
            <BlogSidebar
              popularArticles={popularArticles}
              categories={categoryCounts}
              activeCategory={activeCategory}
              onSelectCategory={(cat) => setActiveCategory(cat)}
            />
          </div>

        </div>
      </section>

      {/* 4. Existing EXCORTO Global Footer */}
      <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* 6. Interactive Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </main>
  );
}
