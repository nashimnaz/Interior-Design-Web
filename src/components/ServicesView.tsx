'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Plus, 
  Search, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff, 
  Check, 
  Layers, 
  Sparkles, 
  ArrowUpRight 
} from 'lucide-react';
import { ServiceItem } from '@/lib/types';

interface ServicesViewProps {
  services: ServiceItem[];
  onOpenNewService: () => void;
  onEditService: (service: ServiceItem) => void;
  onPreviewService: (service: ServiceItem) => void;
  onTogglePublish: (service: ServiceItem) => void;
  onDeleteService: (service: ServiceItem) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  services,
  onOpenNewService,
  onEditService,
  onPreviewService,
  onTogglePublish,
  onDeleteService,
}) => {
  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.title.toLowerCase().includes(search.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
      s.fullDescription.toLowerCase().includes(search.toLowerCase()) ||
      s.number.toLowerCase().includes(search.toLowerCase());

    const matchesStatus =
      selectedStatus === 'All' || s.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  const publishedCount = services.filter((s) => s.status === 'Published').length;
  const draftCount = services.filter((s) => s.status === 'Draft').length;

  return (
    <div className="space-y-6 max-w-6xl select-none">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-[#DDD5C9] dark:border-[#3E3C33]">
        <div>
          <h2 className="text-2xl font-serif font-normal text-[#302A25] dark:text-[#F4EFE5] tracking-tight">
            Services &amp; Offerings
          </h2>
          <p className="text-xs text-[#777067] dark:text-[#B6AEA1] mt-0.5">
            Manage public website discipline offerings, deliverables, and dynamic detail pages.
          </p>
        </div>

        <button
          onClick={onOpenNewService}
          className="btn-primary flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Service</span>
        </button>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md p-3 divide-y sm:divide-y-0 sm:divide-x divide-[#DDD5C9] dark:divide-[#3E3C33]">
        <div className="px-3 py-1">
          <span className="text-[10px] uppercase tracking-wider text-[#777067] dark:text-[#B6AEA1] font-medium block">
            Total Offerings
          </span>
          <span className="font-serif text-2xl text-[#302A25] dark:text-[#F4EFE5]">
            {services.length}
          </span>
        </div>
        <div className="px-3 py-1">
          <span className="text-[10px] uppercase tracking-wider text-[#777067] dark:text-[#B6AEA1] font-medium block">
            Published Live
          </span>
          <span className="font-serif text-2xl text-[#526653]">
            {publishedCount}
          </span>
        </div>
        <div className="px-3 py-1 col-span-2 sm:col-span-1">
          <span className="text-[10px] uppercase tracking-wider text-[#777067] dark:text-[#B6AEA1] font-medium block">
            Draft / In Review
          </span>
          <span className="font-serif text-2xl text-amber-600">
            {draftCount}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pb-2">
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#777067] dark:text-[#B6AEA1]" />
          <input
            type="text"
            placeholder="Search services by title, deliverables, or index..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-[#FCFAF6] dark:bg-[#2E2D27] rounded border border-[#DDD5C9] dark:border-[#3E3C33] text-[#302A25] dark:text-[#F4EFE5] focus:outline-none focus:border-[#777963]"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-[#EBE5DA]/60 dark:bg-[#38362F]/60 p-0.5 rounded border border-[#DDD5C9] dark:border-[#3E3C33]">
            {['All', 'Published', 'Draft'].map((status) => (
              <button
                key={status}
                onClick={() => setSelectedStatus(status)}
                className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer ${
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
      </div>

      {/* Services Grid with Exact Website Image Ratio & Styling */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md overflow-hidden flex flex-col justify-between group shadow-2xs"
          >
            <div>
              {/* Header with image */}
              <div 
                className="relative aspect-[16/9] w-full overflow-hidden bg-[#EBE5DA] dark:bg-[#38362F] cursor-pointer"
                onClick={() => onPreviewService(service)}
              >
                <Image
                  src={service.heroImage || '/images/services/arch-card.jpg'}
                  alt={service.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-500 group-hover:scale-102"
                />

                {/* Overlays */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="font-mono text-[11px] font-bold px-2 py-0.5 rounded bg-[#94745F] text-white shadow-xs">
                    {service.number}
                  </span>
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#FCFAF6]/90 dark:bg-[#2E2D27]/90 text-[#302A25] dark:text-[#F4EFE5] backdrop-blur-xs font-medium">
                    Order #{service.displayOrder}
                  </span>
                </div>

                <div className="absolute top-2.5 right-2.5">
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-medium backdrop-blur-xs ${
                      service.status === 'Published'
                        ? 'bg-[#526653] text-white shadow-xs'
                        : 'bg-[#DDD5C9]/90 text-[#777067]'
                    }`}
                  >
                    {service.status}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-4 sm:p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3
                    onClick={() => onPreviewService(service)}
                    className="font-serif text-lg text-[#302A25] dark:text-[#F4EFE5] hover:text-[#94745F] cursor-pointer"
                  >
                    {service.title}
                  </h3>
                  <span className="text-[11px] font-mono text-[#94745F]">
                    /services/{service.slug}
                  </span>
                </div>

                <p className="text-xs text-[#777067] dark:text-[#B6AEA1] line-clamp-2 mt-2 leading-relaxed">
                  {service.shortDescription}
                </p>

                {/* Deliverables Chips */}
                {Array.isArray(service.deliverables) && service.deliverables.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-[#DDD5C9]/60 dark:border-[#3E3C33]/60">
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#94745F] block mb-1.5">
                      Key Deliverables ({service.deliverables.length})
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {service.deliverables.slice(0, 3).map((d, i) => (
                        <span
                          key={i}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#EAE5DE] dark:bg-[#38403C] text-[#292722] dark:text-[#F5F2EB]"
                        >
                          {d}
                        </span>
                      ))}
                      {service.deliverables.length > 3 && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EAE5DE]/60 text-[#777067]">
                          +{service.deliverables.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="p-3 px-4 border-t border-[#DDD5C9] dark:border-[#3E3C33] bg-[#F5F1E9]/50 dark:bg-[#24241F]/50 flex items-center justify-between text-xs">
              <a
                href={`/services/${service.slug}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] text-[#94745F] hover:underline"
              >
                <span>View Public Page</span>
                <ArrowUpRight size={11} />
              </a>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => onPreviewService(service)}
                  className="p-1 rounded text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25] dark:hover:text-[#F4EFE5] cursor-pointer"
                  title="Card Preview"
                >
                  <Eye className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onTogglePublish(service)}
                  className="p-1 rounded text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25] dark:hover:text-[#F4EFE5] cursor-pointer"
                  title={service.status === 'Published' ? 'Unpublish Service' : 'Publish Service'}
                >
                  {service.status === 'Published' ? (
                    <EyeOff className="w-3.5 h-3.5" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => onEditService(service)}
                  className="p-1 rounded text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25] dark:hover:text-[#F4EFE5] cursor-pointer"
                  title="Edit Service"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => onDeleteService(service)}
                  className="p-1 rounded text-[#777067] dark:text-[#B6AEA1] hover:text-red-600 cursor-pointer"
                  title="Delete Service"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
