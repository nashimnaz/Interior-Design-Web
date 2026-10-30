'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  LayoutGrid, 
  List, 
  Edit3, 
  Trash2, 
  Eye, 
  Check, 
  Calendar, 
  FileText,
  Users,
  CheckCircle2,
  Clock,
  EyeOff
} from 'lucide-react';
import { BlogPost, BlogCategory } from '@/lib/types';

interface BlogViewProps {
  blogs: BlogPost[];
  subscribersCount?: number;
  onOpenNewBlog: () => void;
  onEditBlog: (blog: BlogPost) => void;
  onPreviewBlog: (blog: BlogPost) => void;
  onTogglePublish: (blog: BlogPost) => void;
  onDeleteBlog: (blog: BlogPost) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  blogs,
  subscribersCount = 0,
  onOpenNewBlog,
  onEditBlog,
  onPreviewBlog,
  onTogglePublish,
  onDeleteBlog,
}) => {
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('table');

  const categories: string[] = [
    'All',
    'Interior Design',
    'Home Construction',
    'Space Planning',
    'Materials & Finishes',
    'Tips & Guides'
  ];

  const totalArticles = blogs.length;
  const publishedArticles = blogs.filter(b => b.status === 'Published').length;
  const draftArticles = blogs.filter(b => b.status === 'Draft').length;
  const totalViews = blogs.reduce((sum, b) => sum + (b.views || 0), 0);

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch = 
      b.title.toLowerCase().includes(search.toLowerCase()) ||
      b.excerpt.toLowerCase().includes(search.toLowerCase()) ||
      b.author.toLowerCase().includes(search.toLowerCase()) ||
      b.tags.some(t => t.toLowerCase().includes(search.toLowerCase()));

    const matchesStatus = selectedStatus === 'All' || b.status === selectedStatus;
    const matchesCategory = selectedCategory === 'All' || b.category === selectedCategory;

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-[#DDD5C9] dark:border-[#3E3C33]">
        <div>
          <h2 className="text-2xl font-serif font-normal text-[#302A25] dark:text-[#F4EFE5] tracking-tight">
            Editorial Journal
          </h2>
          <p className="text-xs text-[#777067] dark:text-[#B6AEA1] mt-0.5">
            Architectural thought leadership essays, materials research, and studio publications.
          </p>
        </div>

        <button
          onClick={onOpenNewBlog}
          className="btn-primary flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Write Article</span>
        </button>
      </div>

      {/* Part 3: Blog Management Dashboard Metrics (5 Stats) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md divide-y sm:divide-y-0 sm:divide-x divide-[#DDD5C9] dark:divide-[#3E3C33]">
        {/* Metric 1: Total Articles */}
        <div className="p-4">
          <div className="flex items-center justify-between text-[#777067] dark:text-[#B6AEA1] mb-1">
            <span className="text-[10px] uppercase tracking-wider font-medium">Total Articles</span>
            <FileText className="w-3.5 h-3.5 opacity-70" />
          </div>
          <span className="font-serif text-2xl text-[#302A25] dark:text-[#F4EFE5] block">
            {totalArticles}
          </span>
          <span className="text-[11px] text-[#777067] dark:text-[#B6AEA1] mt-0.5 block">
            All database entries
          </span>
        </div>

        {/* Metric 2: Published Articles */}
        <div className="p-4">
          <div className="flex items-center justify-between text-[#777067] dark:text-[#B6AEA1] mb-1">
            <span className="text-[10px] uppercase tracking-wider font-medium">Published</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <span className="font-serif text-2xl text-[#302A25] dark:text-[#F4EFE5] block">
            {publishedArticles}
          </span>
          <span className="text-[11px] text-[#777067] dark:text-[#B6AEA1] mt-0.5 block">
            Live on public blog
          </span>
        </div>

        {/* Metric 3: Draft Articles */}
        <div className="p-4">
          <div className="flex items-center justify-between text-[#777067] dark:text-[#B6AEA1] mb-1">
            <span className="text-[10px] uppercase tracking-wider font-medium">Draft Articles</span>
            <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
          </div>
          <span className="font-serif text-2xl text-[#302A25] dark:text-[#F4EFE5] block">
            {draftArticles}
          </span>
          <span className="text-[11px] text-[#777067] dark:text-[#B6AEA1] mt-0.5 block">
            In review / unpublished
          </span>
        </div>

        {/* Metric 4: Total Views */}
        <div className="p-4">
          <div className="flex items-center justify-between text-[#777067] dark:text-[#B6AEA1] mb-1">
            <span className="text-[10px] uppercase tracking-wider font-medium">Total Views</span>
            <Eye className="w-3.5 h-3.5 text-[#94745F] dark:text-[#C5A880]" />
          </div>
          <span className="font-serif text-2xl text-[#302A25] dark:text-[#F4EFE5] block">
            {totalViews.toLocaleString()}
          </span>
          <span className="text-[11px] text-[#777067] dark:text-[#B6AEA1] mt-0.5 block">
            Lifetime readership
          </span>
        </div>

        {/* Metric 5: Newsletter Subscribers */}
        <div className="p-4 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-[#777067] dark:text-[#B6AEA1] mb-1">
            <span className="text-[10px] uppercase tracking-wider font-medium">Newsletter</span>
            <Users className="w-3.5 h-3.5 text-[#94745F] dark:text-[#C5A880]" />
          </div>
          <span className="font-serif text-2xl text-[#302A25] dark:text-[#F4EFE5] block">
            {subscribersCount}
          </span>
          <span className="text-[11px] text-[#777067] dark:text-[#B6AEA1] mt-0.5 block">
            Active subscribers
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pb-2">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#777067] dark:text-[#B6AEA1]" />
          <input
            type="text"
            placeholder="Search articles by title, author, or keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-[#FCFAF6] dark:bg-[#2E2D27] rounded border border-[#DDD5C9] dark:border-[#3E3C33] text-[#302A25] dark:text-[#F4EFE5] focus:outline-none focus:border-[#777963]"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-[#EBE5DA]/60 dark:bg-[#38362F]/60 p-0.5 rounded border border-[#DDD5C9] dark:border-[#3E3C33]">
            {['All', 'Published', 'Draft'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  selectedStatus === status
                    ? 'bg-[#FCFAF6] dark:bg-[#2E2D27] text-[#302A25] dark:text-[#F4EFE5] font-medium shadow-2xs'
                    : 'text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25] dark:hover:text-[#F4EFE5]'
                }`}
              >
                {status}
              </button>
            ))}
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-2.5 py-1.5 text-xs bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded text-[#302A25] dark:text-[#F4EFE5] focus:outline-none focus:border-[#777963]"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c === 'All' ? 'All Disciplines' : c}
              </option>
            ))}
          </select>

          <div className="flex items-center bg-[#EBE5DA]/60 dark:bg-[#38362F]/60 p-0.5 rounded border border-[#DDD5C9] dark:border-[#3E3C33]">
            <button
              onClick={() => setViewMode('table')}
              className={`p-1 rounded ${viewMode === 'table' ? 'bg-[#FCFAF6] dark:bg-[#2E2D27] text-[#302A25] dark:text-[#F4EFE5] shadow-2xs' : 'text-[#777067]'}`}
              title="Table View"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1 rounded ${viewMode === 'grid' ? 'bg-[#FCFAF6] dark:bg-[#2E2D27] text-[#302A25] dark:text-[#F4EFE5] shadow-2xs' : 'text-[#777067]'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Blog Listing: Table View */}
      {viewMode === 'table' ? (
        <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F5F1E9] dark:bg-[#24241F] border-b border-[#DDD5C9] dark:border-[#3E3C33] text-[#777067] dark:text-[#B6AEA1]">
                <tr>
                  <th className="py-2.5 px-4 font-normal">Article Title</th>
                  <th className="py-2.5 px-4 font-normal">Category</th>
                  <th className="py-2.5 px-4 font-normal">Author</th>
                  <th className="py-2.5 px-4 font-normal">Status</th>
                  <th className="py-2.5 px-4 font-normal">Views</th>
                  <th className="py-2.5 px-4 font-normal">Date</th>
                  <th className="py-2.5 px-4 font-normal text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDD5C9]/60 dark:divide-[#3E3C33]/60">
                {filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-[#EBE5DA]/30 dark:hover:bg-[#38362F]/30 transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={blog.coverImage}
                          alt={blog.title}
                          className="w-12 h-9 rounded object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <span 
                            onClick={() => onPreviewBlog(blog)}
                            className="font-serif text-xs text-[#302A25] dark:text-[#F4EFE5] hover:text-[#777963] dark:hover:text-[#8E9177] cursor-pointer truncate block max-w-md"
                          >
                            {blog.title}
                          </span>
                          <span className="text-[11px] text-[#777067] dark:text-[#B6AEA1] line-clamp-1">
                            {blog.excerpt}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[#777067] dark:text-[#B6AEA1]">
                      {blog.category}
                    </td>
                    <td className="py-3 px-4 text-[#302A25] dark:text-[#F4EFE5]">
                      {blog.author}
                    </td>
                    <td className="py-3 px-4">
                      <button
                        onClick={() => onTogglePublish(blog)}
                        title={blog.status === 'Published' ? 'Click to unpublish to Draft' : 'Click to Publish'}
                        className={`text-[10px] px-2 py-0.5 rounded border transition-colors inline-flex items-center gap-1 ${
                          blog.status === 'Published'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800/60'
                            : 'bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800/60'
                        }`}
                      >
                        <span className={`w-1.5 h-1.5 rounded-full ${blog.status === 'Published' ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                        {blog.status}
                      </button>
                    </td>
                    <td className="py-3 px-4 text-[#777067] dark:text-[#B6AEA1]">
                      <span className="font-mono text-[11px]">{(blog.views || 0).toLocaleString()}</span>
                    </td>
                    <td className="py-3 px-4 text-[#777067] dark:text-[#B6AEA1]">
                      {new Date(blog.publishedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          onClick={() => onPreviewBlog(blog)}
                          className="p-1 rounded text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25] dark:hover:text-[#F4EFE5]"
                          title="Read Article"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onTogglePublish(blog)}
                          className="p-1 rounded text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25] dark:hover:text-[#F4EFE5]"
                          title={blog.status === 'Published' ? 'Unpublish Article' : 'Publish Article'}
                        >
                          {blog.status === 'Published' ? <EyeOff className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={() => onEditBlog(blog)}
                          className="p-1 rounded text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25] dark:hover:text-[#F4EFE5]"
                          title="Edit"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onDeleteBlog(blog)}
                          className="p-1 rounded text-[#777067] dark:text-[#B6AEA1] hover:text-red-600"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Blog Listing: Grid View */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* 4:3 Editorial Thumbnail Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EAE5DE] dark:bg-[#38362F]">
                  <img
                    src={blog.coverImage}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-102"
                  />
                </div>
                <div className="p-4">
                  <div className="flex items-center justify-between text-[10px] text-[#777067] dark:text-[#B6AEA1] mb-1">
                    <span className="uppercase tracking-wider text-[#777963] dark:text-[#8E9177] font-medium">
                      {blog.category}
                    </span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 
                    onClick={() => onPreviewBlog(blog)}
                    className="font-serif text-sm text-[#302A25] dark:text-[#F4EFE5] hover:text-[#777963] dark:hover:text-[#8E9177] cursor-pointer line-clamp-2 mt-1"
                  >
                    {blog.title}
                  </h3>
                  <p className="text-xs text-[#777067] dark:text-[#B6AEA1] line-clamp-2 mt-1.5 leading-relaxed">
                    {blog.excerpt}
                  </p>
                </div>
              </div>

              <div className="p-3 px-4 border-t border-[#DDD5C9] dark:border-[#3E3C33] bg-[#F5F1E9]/50 dark:bg-[#24241F]/50 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#777067] dark:text-[#B6AEA1]">By {blog.author}</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => onPreviewBlog(blog)}
                    className="text-xs text-[#777963] dark:text-[#8E9177] hover:underline"
                  >
                    Read
                  </button>
                  <span className="text-[#DDD5C9] dark:text-[#3E3C33]">•</span>
                  <button
                    onClick={() => onEditBlog(blog)}
                    className="text-xs text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25] dark:hover:text-[#F4EFE5]"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {filteredBlogs.length === 0 && (
        <div className="p-12 text-center bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md">
          <FileText className="w-8 h-8 text-[#777067] dark:text-[#B6AEA1] mx-auto mb-2 opacity-50" />
          <h3 className="text-xs font-medium text-[#302A25] dark:text-[#F4EFE5]">No journal articles found</h3>
          <p className="text-[11px] text-[#777067] dark:text-[#B6AEA1] mt-0.5">
            Try adjusting your search query or status filter.
          </p>
        </div>
      )}
    </div>
  );
};
