'use client';

import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  FileText, 
  Inbox, 
  ArrowUpRight, 
  MapPin, 
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Project, BlogPost, Enquiry, Testimonial, DashboardStats } from '@/lib/types';
import { ActiveTab } from './Sidebar';
import { useTheme } from '@/context/ThemeContext';

interface DashboardViewProps {
  stats: DashboardStats;
  projects: Project[];
  blogs: BlogPost[];
  enquiries: Enquiry[];
  testimonials: Testimonial[];
  setActiveTab: (tab: ActiveTab) => void;
  onOpenNewProject: () => void;
  onOpenNewBlog: () => void;
  onSelectEnquiry: (enquiry: Enquiry) => void;
  onPreviewProject: (project: Project) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  stats,
  projects,
  blogs,
  enquiries,
  testimonials,
  setActiveTab,
  onOpenNewProject,
  onOpenNewBlog,
  onSelectEnquiry,
  onPreviewProject
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('7d');
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const chartData = stats.chartData[dateRange] || stats.chartData['7d'];

  return (
    <div className="space-y-8 max-w-6xl">
      {/* Top Welcome & Quick Actions */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-[#DDD5C9] dark:border-[#3E3C33]">
        <div>
          <h2 className="text-2xl font-serif font-normal text-[#302A25] dark:text-[#F4EFE5] tracking-tight">
            Atelier Overview
          </h2>
          <p className="text-xs text-[#777067] dark:text-[#B6AEA1] mt-0.5">
            Interior architecture commissions, portfolio curation, and client enquiries.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenNewProject}
            className="btn-primary flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Project</span>
          </button>
          <button
            onClick={onOpenNewBlog}
            className="btn-secondary flex items-center gap-1.5"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Write Article</span>
          </button>
        </div>
      </div>

      {/* 4 Restrained Metric Blocks with Subtle Dividers */}
      <div className="grid grid-cols-2 lg:grid-cols-4 bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md divide-y lg:divide-y-0 lg:divide-x divide-[#DDD5C9] dark:divide-[#3E3C33]">
        {/* Metric 1: Total Projects */}
        <div className="p-5">
          <span className="text-[11px] uppercase tracking-wider text-[#777067] dark:text-[#B6AEA1] font-medium block">
            Total Projects
          </span>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="font-serif text-2xl text-[#302A25] dark:text-[#F4EFE5]">
              {stats.totalProjects}
            </span>
            <span className="text-xs text-[#777067] dark:text-[#B6AEA1]">
              ({stats.activeProjects} active)
            </span>
          </div>
          <div className="text-[11px] text-[#777963] dark:text-[#8E9177] mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>{stats.trends.projects} this season</span>
          </div>
        </div>

        {/* Metric 2: Published Articles */}
        <div className="p-5">
          <span className="text-[11px] uppercase tracking-wider text-[#777067] dark:text-[#B6AEA1] font-medium block">
            Published Articles
          </span>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="font-serif text-2xl text-[#302A25] dark:text-[#F4EFE5]">
              {stats.publishedBlogs}
            </span>
            <span className="text-xs text-[#777067] dark:text-[#B6AEA1]">
              ({stats.draftBlogs} drafts)
            </span>
          </div>
          <div className="text-[11px] text-[#777067] dark:text-[#B6AEA1] mt-1">
            Studio editorial journal
          </div>
        </div>

        {/* Metric 3: New Enquiries */}
        <div className="p-5">
          <span className="text-[11px] uppercase tracking-wider text-[#777067] dark:text-[#B6AEA1] font-medium block">
            New Enquiries
          </span>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="font-serif text-2xl text-[#302A25] dark:text-[#F4EFE5]">
              {stats.newEnquiries}
            </span>
            <span className="text-xs text-[#777067] dark:text-[#B6AEA1]">
              ({stats.totalEnquiries} total)
            </span>
          </div>
          <div className="text-[11px] text-[#777963] dark:text-[#8E9177] mt-1 flex items-center gap-1">
            <ArrowUpRight className="w-3 h-3" />
            <span>{stats.trends.enquiries} qualification rate</span>
          </div>
        </div>

        {/* Metric 4: Published Testimonials */}
        <div className="p-5">
          <span className="text-[11px] uppercase tracking-wider text-[#777067] dark:text-[#B6AEA1] font-medium block">
            Client Reviews
          </span>
          <div className="flex items-baseline gap-2 mt-1.5">
            <span className="font-serif text-2xl text-[#302A25] dark:text-[#F4EFE5]">
              {stats.averageRating}
            </span>
            <span className="text-xs text-[#777067] dark:text-[#B6AEA1]">
              / 5.0 ({stats.totalTestimonials} reviews)
            </span>
          </div>
          <div className="text-[11px] text-[#777067] dark:text-[#B6AEA1] mt-1">
            Verified private clients
          </div>
        </div>
      </div>

      {/* Restrained Analytics: Enquiry Activity Line Chart */}
      <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#DDD5C9] dark:border-[#3E3C33]">
          <div>
            <h3 className="text-sm font-medium text-[#302A25] dark:text-[#F4EFE5]">
              Enquiry & Consultation Trend
            </h3>
            <p className="text-[11px] text-[#777067] dark:text-[#B6AEA1]">
              Client consultation requests over time
            </p>
          </div>

          <div className="flex items-center gap-1 bg-[#F5F1E9] dark:bg-[#24241F] p-0.5 rounded border border-[#DDD5C9] dark:border-[#3E3C33]">
            {(['7d', '30d', '90d'] as const).map((range) => (
              <button
                key={range}
                onClick={() => setDateRange(range)}
                className={`px-2.5 py-0.5 text-xs rounded transition-colors ${
                  dateRange === range
                    ? 'bg-[#FCFAF6] dark:bg-[#2E2D27] text-[#302A25] dark:text-[#F4EFE5] font-medium shadow-2xs'
                    : 'text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25] dark:hover:text-[#F4EFE5]'
                }`}
              >
                {range === '7d' ? '7 Days' : range === '30d' ? '30 Days' : '90 Days'}
              </button>
            ))}
          </div>
        </div>

        <div className="h-56 w-full pt-4">
          {isMounted ? (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -25, bottom: 0 }}>
                <defs>
                  <linearGradient id="oliveGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#777963" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#777963" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid 
                  strokeDasharray="3 3" 
                  vertical={false} 
                  stroke={isDark ? '#3E3C33' : '#DDD5C9'} 
                />
                <XAxis 
                  dataKey="date" 
                  tickLine={false} 
                  axisLine={{ stroke: isDark ? '#3E3C33' : '#DDD5C9' }} 
                  tick={{ fill: isDark ? '#B6AEA1' : '#777067', fontSize: 11 }} 
                />
                <YAxis 
                  tickLine={false} 
                  axisLine={{ stroke: isDark ? '#3E3C33' : '#DDD5C9' }} 
                  tick={{ fill: isDark ? '#B6AEA1' : '#777067', fontSize: 11 }} 
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: isDark ? '#2E2D27' : '#FCFAF6',
                    borderRadius: '4px',
                    border: isDark ? '1px solid #3E3C33' : '1px solid #DDD5C9',
                    fontSize: '11px',
                    color: isDark ? '#F4EFE5' : '#302A25',
                  }}
                  itemStyle={{
                    color: isDark ? '#F4EFE5' : '#302A25',
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="enquiries" 
                  name="Enquiries" 
                  stroke="#777963" 
                  strokeWidth={1.75} 
                  fillOpacity={1} 
                  fill="url(#oliveGradient)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full flex items-center justify-center text-xs text-[#777067]">
              Loading chart...
            </div>
          )}
        </div>
      </div>

      {/* 2 Sections: Recent Enquiries & Portfolio Highlights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Recent Enquiries Table */}
        <div className="lg:col-span-2 bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md p-5">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDD5C9] dark:border-[#3E3C33]">
            <div>
              <h3 className="text-sm font-medium text-[#302A25] dark:text-[#F4EFE5]">
                Recent Client Enquiries
              </h3>
              <p className="text-[11px] text-[#777067] dark:text-[#B6AEA1]">
                Active consultation briefs awaiting review
              </p>
            </div>
            <button
              onClick={() => setActiveTab('enquiries')}
              className="text-xs text-[#777963] dark:text-[#8E9177] hover:underline flex items-center gap-0.5"
            >
              <span>View all ({enquiries.length})</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#DDD5C9] dark:border-[#3E3C33] text-[#777067] dark:text-[#B6AEA1]">
                  <th className="py-2.5 font-normal">Client</th>
                  <th className="py-2.5 font-normal">Service</th>
                  <th className="py-2.5 font-normal">Budget</th>
                  <th className="py-2.5 font-normal">Status</th>
                  <th className="py-2.5 font-normal text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DDD5C9]/60 dark:divide-[#3E3C33]/60">
                {enquiries.slice(0, 4).map((enq) => (
                  <tr 
                    key={enq.id}
                    onClick={() => onSelectEnquiry(enq)}
                    className="hover:bg-[#EBE5DA]/40 dark:hover:bg-[#38362F]/40 cursor-pointer transition-colors"
                  >
                    <td className="py-3 text-[#302A25] dark:text-[#F4EFE5]">
                      <span className="font-medium block">{enq.clientName}</span>
                      <span className="text-[11px] text-[#777067] dark:text-[#B6AEA1]">{enq.email}</span>
                    </td>
                    <td className="py-3 text-[#777067] dark:text-[#B6AEA1]">
                      {enq.service}
                    </td>
                    <td className="py-3 text-[#777067] dark:text-[#B6AEA1]">
                      {enq.budget}
                    </td>
                    <td className="py-3">
                      <span className="text-[11px] px-2 py-0.5 rounded bg-[#EBE5DA] dark:bg-[#38362F] text-[#302A25] dark:text-[#F4EFE5] border border-[#DDD5C9] dark:border-[#3E3C33]">
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectEnquiry(enq);
                        }}
                        className="text-xs text-[#777963] dark:text-[#8E9177] hover:underline"
                      >
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Col: Recently Published Projects */}
        <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#DDD5C9] dark:border-[#3E3C33]">
              <h3 className="text-sm font-medium text-[#302A25] dark:text-[#F4EFE5]">
                Portfolio Spotlight
              </h3>
              <button
                onClick={() => setActiveTab('projects')}
                className="text-xs text-[#777963] dark:text-[#8E9177] hover:underline"
              >
                Gallery
              </button>
            </div>

            <div className="space-y-3 mt-3">
              {projects.slice(0, 3).map((proj) => (
                <div
                  key={proj.id}
                  onClick={() => onPreviewProject(proj)}
                  className="flex items-center gap-3 p-1.5 rounded hover:bg-[#EBE5DA]/40 dark:hover:bg-[#38362F]/40 cursor-pointer transition-colors"
                >
                  <img
                    src={proj.coverImage}
                    alt={proj.title}
                    className="w-14 h-12 rounded object-cover shrink-0 grayscale-[20%] hover:grayscale-0 transition-all"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] truncate block">
                      {proj.title}
                    </span>
                    <span className="text-[10px] text-[#777067] dark:text-[#B6AEA1] block mt-0.5">
                      {proj.category} • {proj.location}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#DDD5C9] dark:border-[#3E3C33] mt-3">
            <button
              onClick={onOpenNewProject}
              className="w-full py-1.5 text-xs text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25] dark:hover:text-[#F4EFE5] text-center border border-dashed border-[#DDD5C9] dark:border-[#3E3C33] rounded transition-colors"
            >
              + Add Architectural Project
            </button>
          </div>
        </div>
      </div>

      {/* Latest Journal Articles Row */}
      <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md p-5">
        <div className="flex items-center justify-between pb-3 border-b border-[#DDD5C9] dark:border-[#3E3C33]">
          <div>
            <h3 className="text-sm font-medium text-[#302A25] dark:text-[#F4EFE5]">
              Editorial Journal
            </h3>
            <p className="text-[11px] text-[#777067] dark:text-[#B6AEA1]">
              Architectural thought leadership articles
            </p>
          </div>
          <button
            onClick={() => setActiveTab('blogs')}
            className="text-xs text-[#777963] dark:text-[#8E9177] hover:underline"
          >
            All Articles ({blogs.length})
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          {blogs.slice(0, 3).map((blog) => (
            <div
              key={blog.id}
              className="p-3 rounded border border-[#DDD5C9]/70 dark:border-[#3E3C33]/70 hover:border-[#DDD5C9] dark:hover:border-[#3E3C33] transition-colors flex flex-col justify-between"
            >
              <div>
                <img
                  src={blog.coverImage}
                  alt={blog.title}
                  className="w-full h-32 rounded object-cover mb-2.5"
                />
                <span className="text-[10px] tracking-wider uppercase text-[#777963] dark:text-[#8E9177] font-medium">
                  {blog.category}
                </span>
                <h4 className="text-xs font-serif text-[#302A25] dark:text-[#F4EFE5] line-clamp-2 mt-1">
                  {blog.title}
                </h4>
              </div>
              <div className="flex items-center justify-between pt-2.5 mt-2.5 border-t border-[#DDD5C9]/50 dark:border-[#3E3C33]/50 text-[10px] text-[#777067] dark:text-[#B6AEA1]">
                <span>By {blog.author}</span>
                <span>{blog.readTime}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
