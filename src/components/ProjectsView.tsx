'use client';

import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MapPin, 
  Star, 
  Edit3, 
  Trash2, 
  Eye, 
  Check, 
  Image as ImageIcon
} from 'lucide-react';
import { Project } from '@/lib/types';

interface ProjectsViewProps {
  projects: Project[];
  onOpenNewProject: () => void;
  onEditProject: (project: Project) => void;
  onPreviewProject: (project: Project) => void;
  onTogglePublish: (project: Project) => void;
  onToggleFeatured: (project: Project) => void;
  onDeleteProject: (project: Project) => void;
}

export const ProjectsView: React.FC<ProjectsViewProps> = ({
  projects,
  onOpenNewProject,
  onEditProject,
  onPreviewProject,
  onTogglePublish,
  onToggleFeatured,
  onDeleteProject
}) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const categories: string[] = [
    'All',
    'Residential Interiors',
    'Commercial Interiors',
    'Kitchen Design',
    'Living Spaces',
    'Bedroom Design',
    'Office Interiors'
  ];

  const filteredProjects = projects.filter((p) => {
    const matchesSearch = 
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase()) ||
      p.clientName.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesStatus = 
      selectedStatus === 'All' || 
      (selectedStatus === 'Featured' ? p.featured : p.status === selectedStatus);

    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-[#DDD5C9] dark:border-[#3E3C33]">
        <div>
          <h2 className="text-2xl font-serif font-normal text-[#302A25] dark:text-[#F4EFE5] tracking-tight">
            Projects & Gallery
          </h2>
          <p className="text-xs text-[#777067] dark:text-[#B6AEA1] mt-0.5">
            Architectural portfolio commissions, private residences, and commercial salons.
          </p>
        </div>

        <button
          onClick={onOpenNewProject}
          className="btn-primary flex items-center gap-1.5 self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Add Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 pb-2">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#777067] dark:text-[#B6AEA1]" />
          <input
            type="text"
            placeholder="Search projects by title, client, or location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8.5 pr-3 py-1.5 text-xs bg-[#FCFAF6] dark:bg-[#2E2D27] rounded border border-[#DDD5C9] dark:border-[#3E3C33] text-[#302A25] dark:text-[#F4EFE5] focus:outline-none focus:border-[#777963]"
          />
        </div>

        {/* Filter Dropdowns / Status Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="flex items-center bg-[#EBE5DA]/60 dark:bg-[#38362F]/60 p-0.5 rounded border border-[#DDD5C9] dark:border-[#3E3C33]">
            {['All', 'Published', 'Draft', 'Featured'].map((status) => (
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
        </div>
      </div>

      {/* Photography-Led Editorial Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md overflow-hidden flex flex-col justify-between group"
          >
            <div>
              {/* Cover Image Container with exact 4:5 portrait ratio */}
              <div 
                className="relative aspect-[4/5] w-full overflow-hidden bg-[#EBE5DA] dark:bg-[#38362F] cursor-pointer"
                onClick={() => onPreviewProject(project)}
              >
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-102"
                />

                {/* Subtle Overlays */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                  <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-[#FCFAF6]/90 dark:bg-[#2E2D27]/90 text-[#302A25] dark:text-[#F4EFE5] backdrop-blur-xs font-medium">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#777963] text-[#FCFAF6] flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-[#FCFAF6]" />
                      Featured
                    </span>
                  )}
                </div>

                <div className="absolute top-2.5 right-2.5">
                  <span className={`text-[10px] px-2 py-0.5 rounded backdrop-blur-xs ${
                    project.status === 'Published'
                      ? 'bg-[#EBE5DA]/90 dark:bg-[#38362F]/90 text-[#302A25] dark:text-[#F4EFE5]'
                      : 'bg-[#DDD5C9]/90 dark:bg-[#3E3C33]/90 text-[#777067] dark:text-[#B6AEA1]'
                  }`}>
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Project Narrative & Details */}
              <div className="p-4">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 
                    onClick={() => onPreviewProject(project)}
                    className="font-serif text-sm text-[#302A25] dark:text-[#F4EFE5] hover:text-[#777963] dark:hover:text-[#8E9177] cursor-pointer transition-colors truncate"
                  >
                    {project.title}
                  </h3>
                  <span className="text-[10px] text-[#777067] dark:text-[#B6AEA1] shrink-0">
                    {project.year}
                  </span>
                </div>

                <p className="text-[11px] text-[#777067] dark:text-[#B6AEA1] flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-[#777963] shrink-0" />
                  <span>{project.location}</span>
                </p>

                <p className="text-xs text-[#777067] dark:text-[#B6AEA1] line-clamp-2 mt-2 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex items-center gap-3 pt-3 mt-3 border-t border-[#DDD5C9]/60 dark:border-[#3E3C33]/60 text-[10px] text-[#777067] dark:text-[#B6AEA1]">
                  <span>{project.areaSqFt.toLocaleString()} sq ft</span>
                  <span>•</span>
                  <span>Client: {project.clientName}</span>
                </div>
              </div>
            </div>

            {/* Discreet Actions Footer */}
            <div className="p-3 px-4 border-t border-[#DDD5C9] dark:border-[#3E3C33] bg-[#F5F1E9]/50 dark:bg-[#24241F]/50 flex items-center justify-between">
              <button
                onClick={() => onPreviewProject(project)}
                className="text-xs text-[#777963] dark:text-[#8E9177] hover:underline"
              >
                Inspect Project
              </button>

              <div className="flex items-center gap-1">
                <button
                  onClick={() => onToggleFeatured(project)}
                  className={`p-1 rounded hover:bg-[#EBE5DA] dark:hover:bg-[#38362F] transition-colors ${
                    project.featured ? 'text-[#777963] dark:text-[#8E9177]' : 'text-[#777067] dark:text-[#B6AEA1]'
                  }`}
                  title={project.featured ? 'Unfeature' : 'Mark as Featured'}
                >
                  <Star className={`w-3.5 h-3.5 ${project.featured ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => onEditProject(project)}
                  className="p-1 rounded text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25] dark:hover:text-[#F4EFE5] hover:bg-[#EBE5DA] dark:hover:bg-[#38362F] transition-colors"
                  title="Edit Project"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onTogglePublish(project)}
                  className="p-1 rounded text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25] dark:hover:text-[#F4EFE5] hover:bg-[#EBE5DA] dark:hover:bg-[#38362F] transition-colors"
                  title={project.status === 'Published' ? 'Unpublish' : 'Publish'}
                >
                  <Check className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => onDeleteProject(project)}
                  className="p-1 rounded text-[#777067] dark:text-[#B6AEA1] hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors"
                  title="Delete Project"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="p-12 text-center bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md">
          <ImageIcon className="w-8 h-8 text-[#777067] dark:text-[#B6AEA1] mx-auto mb-2 opacity-50" />
          <h3 className="text-xs font-medium text-[#302A25] dark:text-[#F4EFE5]">No projects found</h3>
          <p className="text-[11px] text-[#777067] dark:text-[#B6AEA1] mt-0.5">
            Try adjusting your search keyword or selected category.
          </p>
        </div>
      )}
    </div>
  );
};
