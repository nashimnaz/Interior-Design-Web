'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Star, 
  Edit3, 
  Trash2, 
  Check, 
  Building,
  MessageSquare 
} from 'lucide-react';
import { Testimonial } from '@/lib/types';

interface TestimonialsViewProps {
  testimonials: Testimonial[];
  onOpenNewTestimonial: () => void;
  onEditTestimonial: (testimonial: Testimonial) => void;
  onToggleStatus: (testimonial: Testimonial) => void;
  onToggleFeatured: (testimonial: Testimonial) => void;
  onDeleteTestimonial: (testimonial: Testimonial) => void;
}

export const TestimonialsView: React.FC<TestimonialsViewProps> = ({
  testimonials,
  onOpenNewTestimonial,
  onEditTestimonial,
  onToggleStatus,
  onToggleFeatured,
  onDeleteTestimonial
}) => {
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filtered = testimonials.filter((t) => {
    const matchesSearch = 
      t.clientName.toLowerCase().includes(search.toLowerCase()) ||
      t.quote.toLowerCase().includes(search.toLowerCase()) ||
      t.projectTitle.toLowerCase().includes(search.toLowerCase()) ||
      t.clientRole.toLowerCase().includes(search.toLowerCase());

    const matchesStatus = selectedStatus === 'All' || t.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-[#DDD5C9] dark:border-[#3E3C33]">
        <div>
          <h2 className="text-2xl font-serif font-normal text-[#302A25] dark:text-[#F4EFE5] tracking-tight">
            Client Endorsements
          </h2>
          <p className="text-xs text-[#777067] dark:text-[#B6AEA1] mt-0.5">
            Verified private client reviews and architectural commission feedback.
          </p>
        </div>

        <button
          onClick={onOpenNewTestimonial}
          className="btn-primary flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Testimonial</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-2">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#777067] dark:text-[#B6AEA1]" />
          <input
            type="text"
            placeholder="Search by client name, project, or review keyword..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-[#FCFAF6] dark:bg-[#2E2D27] rounded border border-[#DDD5C9] dark:border-[#3E3C33] text-[#302A25] dark:text-[#F4EFE5] focus:outline-none focus:border-[#777963]"
          />
        </div>

        <div className="flex items-center bg-[#EBE5DA]/60 dark:bg-[#38362F]/60 p-0.5 rounded border border-[#DDD5C9] dark:border-[#3E3C33]">
          {['All', 'Approved', 'Pending'].map((status) => (
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
      </div>

      {/* Readable List of Endorsements */}
      <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md divide-y divide-[#DDD5C9]/60 dark:divide-[#3E3C33]/60">
        {filtered.map((item) => (
          <div key={item.id} className="p-5 flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="flex items-center gap-2.5">
                <span className="font-serif text-sm text-[#302A25] dark:text-[#F4EFE5]">
                  {item.clientName}
                </span>
                <span className="text-[11px] text-[#777067] dark:text-[#B6AEA1]">
                  • {item.clientRole}
                </span>
                {item.featured && (
                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-[#777963] text-[#FCFAF6]">
                    Featured
                  </span>
                )}
              </div>

              <p className="text-xs text-[#302A25] dark:text-[#F4EFE5] italic leading-relaxed">
                "{item.quote}"
              </p>

              <div className="flex items-center gap-3 text-[11px] text-[#777067] dark:text-[#B6AEA1] pt-1">
                <span className="flex items-center gap-1">
                  <Building className="w-3 h-3 text-[#777963]" />
                  <span>Project: <strong className="font-medium text-[#302A25] dark:text-[#F4EFE5]">{item.projectTitle}</strong></span>
                </span>
                <span>•</span>
                <span>Rating: {item.rating}.0 / 5.0</span>
                <span>•</span>
                <span>{new Date(item.createdAt).toLocaleDateString()}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
              <span className="text-[11px] px-2 py-0.5 rounded bg-[#EBE5DA] dark:bg-[#38362F] text-[#302A25] dark:text-[#F4EFE5] border border-[#DDD5C9] dark:border-[#3E3C33]">
                {item.status}
              </span>

              <button
                onClick={() => onToggleFeatured(item)}
                className={`p-1 rounded hover:bg-[#EBE5DA] dark:hover:bg-[#38362F] transition-colors ${
                  item.featured ? 'text-[#777963] dark:text-[#8E9177]' : 'text-[#777067] dark:text-[#B6AEA1]'
                }`}
                title={item.featured ? 'Remove from featured' : 'Feature on showroom'}
              >
                <Star className={`w-3.5 h-3.5 ${item.featured ? 'fill-current' : ''}`} />
              </button>

              <button
                onClick={() => onEditTestimonial(item)}
                className="p-1 rounded text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25] dark:hover:text-[#F4EFE5] hover:bg-[#EBE5DA] dark:hover:bg-[#38362F]"
                title="Edit review"
              >
                <Edit3 className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => onDeleteTestimonial(item)}
                className="p-1 rounded text-[#777067] dark:text-[#B6AEA1] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"
                title="Delete review"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md">
          <MessageSquare className="w-8 h-8 text-[#777067] dark:text-[#B6AEA1] mx-auto mb-2 opacity-50" />
          <h3 className="text-xs font-medium text-[#302A25] dark:text-[#F4EFE5]">No testimonials found</h3>
          <p className="text-[11px] text-[#777067] dark:text-[#B6AEA1] mt-0.5">
            Try adjusting your search query or status filter.
          </p>
        </div>
      )}
    </div>
  );
};
