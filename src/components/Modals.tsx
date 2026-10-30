'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { 
  X, 
  Star, 
  MapPin, 
  Mail, 
  Phone, 
  AlertCircle,
  Building,
  ArrowUpRight,
  Eye,
  Edit3,
  Layers,
  Sparkles,
  Plus,
  Trash2,
  Calendar,
  Clock,
  User
} from 'lucide-react';
import { 
  Project, 
  BlogPost, 
  Testimonial, 
  Enquiry, 
  ProjectCategory, 
  BlogCategory, 
  EnquiryStatus, 
  PublicationStatus,
  ServiceItem 
} from '@/lib/types';
import { ImageUploadZone } from './ImageUploadZone';
import { ImageGalleryManager } from './ImageGalleryManager';

// Preset local high-res luxury architectural images
export const LOCAL_IMAGE_PRESETS = [
  { label: 'Bel Air Living Room', url: '/images/projects/living-room.jpg' },
  { label: 'Tribeca Marble Kitchen', url: '/images/projects/kitchen.jpg' },
  { label: 'Serenity Master Suite', url: '/images/projects/bedroom.jpg' },
  { label: 'Hudson Yards Office', url: '/images/projects/office.jpg' },
  { label: 'Skyline Penthouse Salon', url: '/images/projects/dining.jpg' }
];

/* =========================================================================
   1. PROJECT CREATION / EDIT MODAL WITH LIVE 4:5 CARD PREVIEW
   ========================================================================= */
interface ProjectModalProps {
  isOpen: boolean;
  project?: Project | null;
  onClose: () => void;
  onSave: (projectData: Partial<Project>) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  isOpen,
  project,
  onClose,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    category: 'Residential Interiors',
    description: '',
    location: '',
    clientName: '',
    year: '2026',
    areaSqFt: 3500,
    coverImage: '/images/projects/living-room.jpg',
    images: ['/images/projects/living-room.jpg', '/images/projects/dining.jpg'],
    featured: false,
    status: 'Published',
    displayOrder: 1,
    seoTitle: '',
    seoDesc: ''
  });

  useEffect(() => {
    if (project) {
      setFormData(project);
    } else {
      setFormData({
        title: '',
        category: 'Residential Interiors',
        description: '',
        location: 'Thiruvananthapuram, Kerala',
        clientName: '',
        year: '2026',
        areaSqFt: 3500,
        coverImage: '/images/projects/living-room.jpg',
        images: ['/images/projects/living-room.jpg', '/images/projects/dining.jpg'],
        featured: false,
        status: 'Published',
        displayOrder: 1,
        seoTitle: '',
        seoDesc: ''
      });
    }
    setActiveTab('edit');
  }, [project, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#24241F]/60 backdrop-blur-xs animate-in fade-in duration-150 select-none">
      <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] rounded-lg border border-[#DDD5C9] dark:border-[#3E3C33] w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl">
        {/* Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#DDD5C9] dark:border-[#3E3C33] sticky top-0 bg-[#FCFAF6] dark:bg-[#2E2D27] z-20">
          <div>
            <h3 className="font-serif text-base text-[#302A25] dark:text-[#F4EFE5]">
              {project ? 'Edit Architectural Project' : 'New Architectural Project'}
            </h3>
            <p className="text-[11px] text-[#777067] dark:text-[#B6AEA1]">Portfolio commission credentials &amp; 4:5 portrait photography</p>
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Toggle: Edit vs Live Website Preview */}
            <div className="flex items-center bg-[#EBE5DA] dark:bg-[#38362F] p-0.5 rounded border border-[#DDD5C9] dark:border-[#3E3C33] text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'edit'
                    ? 'bg-[#FCFAF6] dark:bg-[#2E2D27] font-medium text-[#292722] dark:text-[#F5F2EB] shadow-2xs'
                    : 'text-[#777067] hover:text-[#292722]'
                }`}
              >
                Edit Details
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded transition-colors flex items-center gap-1.5 ${
                  activeTab === 'preview'
                    ? 'bg-[#FCFAF6] dark:bg-[#2E2D27] font-medium text-[#292722] dark:text-[#F5F2EB] shadow-2xs'
                    : 'text-[#777067] hover:text-[#292722]'
                }`}
              >
                <Eye size={12} />
                <span>Live Card Preview</span>
              </button>
            </div>

            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-[#EBE5DA] text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25]">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ===================================================================
            TAB 1: EDIT FORM
            =================================================================== */}
        {activeTab === 'edit' ? (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Project Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData({
                      ...formData,
                      title,
                      slug: formData.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                    });
                  }}
                  placeholder="e.g. Kowdiar Contemporary Villa"
                  className="w-full studio-input text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Category / Discipline
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as ProjectCategory })}
                  className="w-full studio-input text-xs"
                >
                  <option value="Residential Interiors">Residential Interiors</option>
                  <option value="Commercial Interiors">Commercial Interiors</option>
                  <option value="Kitchen Design">Kitchen Design</option>
                  <option value="Living Spaces">Living Spaces</option>
                  <option value="Bedroom Design">Bedroom Design</option>
                  <option value="Office Interiors">Office Interiors</option>
                  <option value="Penthouses & Villas">Penthouses &amp; Villas</option>
                  <option value="Residential">Residential</option>
                  <option value="Commercial">Commercial</option>
                  <option value="Interior">Interior</option>
                  <option value="Renovation">Renovation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Location (City, State) *
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Thiruvananthapuram, Kerala"
                  className="w-full studio-input text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Client Attribution / Name
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="e.g. Dr. Thomas &amp; Family"
                  className="w-full studio-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Completion Year
                </label>
                <input
                  type="text"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                  placeholder="2026"
                  className="w-full studio-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Area (Sq Ft)
                </label>
                <input
                  type="number"
                  value={formData.areaSqFt}
                  onChange={(e) => setFormData({ ...formData, areaSqFt: Number(e.target.value) })}
                  className="w-full studio-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Publication Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as PublicationStatus })}
                  className="w-full studio-input text-xs"
                >
                  <option value="Published">Published (Visible on Public Website)</option>
                  <option value="Draft">Draft (Unpublished)</option>
                  <option value="Archived">Archived</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Short Narrative / Description *
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Bespoke luxury interior architecture with natural stone, warm woodwork, and custom spatial appointments."
                  className="w-full studio-input text-xs leading-relaxed"
                  required
                />
              </div>

              {/* Cover Image Upload (Strict 4:5 ratio) */}
              <div className="sm:col-span-2 p-3.5 rounded-lg border border-[#DDD5C9] dark:border-[#3E3C33] bg-[#FAF8F5] dark:bg-[#24241F]">
                <ImageUploadZone
                  value={formData.coverImage || ''}
                  onChange={(url) => setFormData({ ...formData, coverImage: url })}
                  aspectRatio="4:5"
                  label="Featured Project Cover Image"
                  sublabel="Main Gallery Card"
                  recommendedText="4:5 Portrait Ratio"
                  altText={formData.title}
                  folder="projects"
                />
              </div>

              {/* Gallery Images Manager */}
              <div className="sm:col-span-2 p-3.5 rounded-lg border border-[#DDD5C9] dark:border-[#3E3C33] bg-[#FAF8F5] dark:bg-[#24241F]">
                <ImageGalleryManager
                  images={formData.images || []}
                  onChange={(imgs) => setFormData({ ...formData, images: imgs })}
                  coverImage={formData.coverImage}
                  onSetCover={(url) => setFormData({ ...formData, coverImage: url })}
                  aspectRatio="4:5"
                />
              </div>

              {/* Homepage Feature Toggle */}
              <div className="sm:col-span-2 flex items-center gap-2.5 p-3 rounded bg-[#F5F1E9] dark:bg-[#24241F] border border-[#DDD5C9] dark:border-[#3E3C33]">
                <input
                  type="checkbox"
                  id="featuredProj"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-[#94745F] rounded border-[#DDD5C9] focus:ring-[#94745F] cursor-pointer"
                />
                <label htmlFor="featuredProj" className="text-xs text-[#302A25] dark:text-[#F4EFE5] cursor-pointer font-medium">
                  Feature this project in the Homepage &quot;Selected Work&quot; Showcase
                </label>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#DDD5C9] dark:border-[#3E3C33]">
              <button type="button" onClick={onClose} className="btn-secondary text-xs">
                Cancel
              </button>
              <button type="submit" className="btn-primary text-xs">
                Save Project
              </button>
            </div>
          </form>
        ) : (
          /* ===================================================================
              TAB 2: LIVE CARD PREVIEW MATCHING PUBLIC WEBSITE (4:5)
              =================================================================== */
          <div className="p-6 sm:p-8 flex flex-col items-center justify-center bg-[#F4F0E9]">
            <span className="text-[11px] font-mono tracking-widest text-[#94745F] uppercase mb-4">
              EXACT PUBLIC WEBSITE CARD PREVIEW (4:5 RATIO)
            </span>

            {/* Card Replica */}
            <div className="w-full max-w-[340px] bg-[#FCFAF6] border border-[#E5DFD4] rounded-lg p-3 shadow-md">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded bg-[#EAE5DE]">
                <Image
                  src={formData.coverImage || '/images/projects/living-room.jpg'}
                  alt={formData.title || 'Project'}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono tracking-wider">
                  {formData.category}
                </div>
              </div>

              <div className="pt-3 px-1">
                <span className="text-[10px] font-mono text-[#94745F] tracking-wider uppercase block">
                  {formData.location || 'Location Not Specified'}
                </span>
                <h4 className="font-serif text-[18px] text-[#292722] font-medium leading-snug mt-1">
                  {formData.title || 'Untitled Commission'}
                </h4>
                <p className="text-[12px] text-[#656B66] line-clamp-2 mt-1 leading-relaxed">
                  {formData.description || 'No description provided.'}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className="mt-6 btn-secondary text-xs inline-flex items-center gap-1.5"
            >
              <Edit3 size={13} />
              <span>Return to Editing</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   2. PROJECT PREVIEW MODAL
   ========================================================================= */
interface ProjectPreviewModalProps {
  project?: Project | null;
  onClose: () => void;
  onEdit: (project: Project) => void;
}

export const ProjectPreviewModal: React.FC<ProjectPreviewModalProps> = ({
  project,
  onClose,
  onEdit
}) => {
  const [activeImage, setActiveImage] = useState<string>('');

  useEffect(() => {
    if (project) {
      setActiveImage(project.coverImage);
    }
  }, [project]);

  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#24241F]/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] rounded-lg border border-[#DDD5C9] dark:border-[#3E3C33] w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl">
        <div className="relative aspect-[16/10] w-full bg-[#EBE5DA] dark:bg-[#38362F] overflow-hidden">
          <Image src={activeImage || project.coverImage} alt={project.title} fill unoptimized className="object-cover" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#24241F]/60 text-white hover:bg-[#24241F]/90 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-baseline justify-between gap-4 pb-3 border-b border-[#DDD5C9] dark:border-[#3E3C33]">
            <div>
              <span className="text-[10.5px] uppercase tracking-wider text-[#94745F] font-mono font-medium">
                {project.category} · {project.year}
              </span>
              <h2 className="font-serif text-2xl text-[#302A25] dark:text-[#F4EFE5] mt-1">{project.title}</h2>
              <p className="text-xs text-[#777067] dark:text-[#B6AEA1] flex items-center gap-1.5 mt-1">
                <MapPin className="w-3.5 h-3.5 text-[#94745F]" />
                {project.location} · Client: {project.clientName} · {project.areaSqFt.toLocaleString()} sq ft
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                onEdit(project);
              }}
              className="btn-secondary text-xs"
            >
              Edit Project
            </button>
          </div>

          {/* Additional Images Strip */}
          {Array.isArray(project.images) && project.images.length > 1 && (
            <div className="pt-4">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#94745F] block mb-2">
                Gallery Strip ({project.images.length} photos)
              </span>
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {project.images.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`relative w-16 h-16 rounded overflow-hidden shrink-0 border-2 transition-all ${
                      activeImage === img ? 'border-[#94745F] scale-105' : 'border-transparent opacity-80'
                    }`}
                  >
                    <Image src={img} alt="" fill unoptimized className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4">
            <h4 className="text-xs uppercase tracking-wider text-[#777067] dark:text-[#B6AEA1] mb-1.5 font-medium">Narrative</h4>
            <p className="text-xs text-[#302A25] dark:text-[#F4EFE5] leading-relaxed whitespace-pre-line">
              {project.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   3. BLOG ARTICLE CREATION / EDIT MODAL WITH LIVE 4:3 CARD PREVIEW
   ========================================================================= */
interface BlogModalProps {
  isOpen: boolean;
  blog?: BlogPost | null;
  onClose: () => void;
  onSave: (blogData: Partial<BlogPost>) => void;
}

export const BlogModal: React.FC<BlogModalProps> = ({
  isOpen,
  blog,
  onClose,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [formData, setFormData] = useState<Partial<BlogPost>>({
    title: '',
    slug: '',
    category: 'Interior Design',
    excerpt: '',
    content: '',
    coverImage: '/images/blogs/trends-2026.jpg',
    tags: ['Quiet Luxury', 'Interior Architecture'],
    author: 'Clara Delacroix',
    authorRole: 'Design Director',
    readTime: '5 min read',
    status: 'Published',
    seoTitle: '',
    seoDesc: ''
  });

  const [tagInput, setTagInput] = useState('');

  useEffect(() => {
    if (blog) {
      setFormData(blog);
      setTagInput(Array.isArray(blog.tags) ? blog.tags.join(', ') : '');
    } else {
      setFormData({
        title: '',
        slug: '',
        category: 'Interior Design',
        excerpt: '',
        content: '',
        coverImage: '/images/blogs/trends-2026.jpg',
        tags: ['Quiet Luxury', 'Interior Architecture'],
        author: 'Clara Delacroix',
        authorRole: 'Design Director',
        readTime: '5 min read',
        status: 'Published',
        seoTitle: '',
        seoDesc: ''
      });
      setTagInput('Quiet Luxury, Interior Architecture');
    }
    setActiveTab('edit');
  }, [blog, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedTags = tagInput.split(',').map(t => t.trim()).filter(Boolean);
    onSave({ ...formData, tags: parsedTags });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#24241F]/60 backdrop-blur-xs animate-in fade-in duration-150 select-none">
      <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] rounded-lg border border-[#DDD5C9] dark:border-[#3E3C33] w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#DDD5C9] dark:border-[#3E3C33] sticky top-0 bg-[#FCFAF6] dark:bg-[#2E2D27] z-20">
          <div>
            <h3 className="font-serif text-base text-[#302A25] dark:text-[#F4EFE5]">
              {blog ? 'Edit Journal Article' : 'Write Journal Article'}
            </h3>
            <p className="text-[11px] text-[#777067] dark:text-[#B6AEA1]">Studio perspective &amp; 4:3 editorial magazine thumbnail</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#EBE5DA] dark:bg-[#38362F] p-0.5 rounded border border-[#DDD5C9] dark:border-[#3E3C33] text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'edit'
                    ? 'bg-[#FCFAF6] dark:bg-[#2E2D27] font-medium text-[#292722] dark:text-[#F5F2EB] shadow-2xs'
                    : 'text-[#777067] hover:text-[#292722]'
                }`}
              >
                Edit Content
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded transition-colors flex items-center gap-1.5 ${
                  activeTab === 'preview'
                    ? 'bg-[#FCFAF6] dark:bg-[#2E2D27] font-medium text-[#292722] dark:text-[#F5F2EB] shadow-2xs'
                    : 'text-[#777067] hover:text-[#292722]'
                }`}
              >
                <Eye size={12} />
                <span>Live 4:3 Preview</span>
              </button>
            </div>

            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-[#EBE5DA] text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25]">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab 1: Edit */}
        {activeTab === 'edit' ? (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData({
                      ...formData,
                      title,
                      slug: formData.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                    });
                  }}
                  placeholder="e.g. The Quiet Luxury Palette in Modern Architecture"
                  className="w-full studio-input text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Category
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value as BlogCategory })}
                  className="w-full studio-input text-xs"
                >
                  <option value="Interior Design">Interior Design</option>
                  <option value="Home Construction">Home Construction</option>
                  <option value="Space Planning">Space Planning</option>
                  <option value="Materials & Finishes">Materials &amp; Finishes</option>
                  <option value="Tips & Guides">Tips &amp; Guides</option>
                  <option value="Design Trends">Design Trends</option>
                  <option value="Sustainable Architecture">Sustainable Architecture</option>
                  <option value="Lighting & Textures">Lighting &amp; Textures</option>
                  <option value="Bespoke Furniture">Bespoke Furniture</option>
                  <option value="Renovation Guides">Renovation Guides</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Publication Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Published' | 'Draft' })}
                  className="w-full studio-input text-xs"
                >
                  <option value="Published">Published (Live on Public Blog)</option>
                  <option value="Draft">Draft (In Review)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Author Name
                </label>
                <input
                  type="text"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Clara Delacroix"
                  className="w-full studio-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Estimated Reading Time
                </label>
                <input
                  type="text"
                  value={formData.readTime}
                  onChange={(e) => setFormData({ ...formData, readTime: e.target.value })}
                  placeholder="5 min read"
                  className="w-full studio-input text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Short Summary / Excerpt *
                </label>
                <textarea
                  rows={2}
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  placeholder="Brief summary appearing on blog card..."
                  className="w-full studio-input text-xs"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Full Article Content *
                </label>
                <textarea
                  rows={8}
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Full editorial article body..."
                  className="w-full studio-input text-xs leading-relaxed"
                  required
                />
              </div>

              {/* Cover Image Upload (Strict 4:3 Ratio) */}
              <div className="sm:col-span-2 p-3.5 rounded-lg border border-[#DDD5C9] dark:border-[#3E3C33] bg-[#FAF8F5] dark:bg-[#24241F]">
                <ImageUploadZone
                  value={formData.coverImage || ''}
                  onChange={(url) => setFormData({ ...formData, coverImage: url })}
                  aspectRatio="4:3"
                  label="Featured Article Cover Photo"
                  sublabel="Blog Listing & Wide Hero"
                  recommendedText="4:3 Ratio"
                  altText={formData.title}
                  folder="blogs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  placeholder="Quiet Luxury, Materials, Architecture"
                  className="w-full studio-input text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#DDD5C9] dark:border-[#3E3C33]">
              <button type="button" onClick={onClose} className="btn-secondary text-xs">
                Cancel
              </button>
              <button type="submit" className="btn-primary text-xs">
                Save Article
              </button>
            </div>
          </form>
        ) : (
          /* Tab 2: Live 4:3 Card Preview */
          <div className="p-6 sm:p-8 flex flex-col items-center justify-center bg-[#F4F0E9]">
            <span className="text-[11px] font-mono tracking-widest text-[#94745F] uppercase mb-4">
              EXACT PUBLIC WEBSITE BLOG CARD PREVIEW (4:3 RATIO)
            </span>

            <div className="w-full max-w-[340px] bg-[#FCFAF6] border border-[#E5DFD4] rounded-lg overflow-hidden shadow-md">
              <div className="relative aspect-[4/3] w-full bg-[#EAE5DE]">
                <Image
                  src={formData.coverImage || '/images/blogs/trends-2026.jpg'}
                  alt={formData.title || 'Blog'}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded bg-black/60 text-white text-[10px] font-mono">
                  {formData.category}
                </div>
              </div>

              <div className="p-4">
                <div className="flex items-center justify-between text-[10px] text-[#777067] mb-1">
                  <span>{formData.readTime}</span>
                  <span>{new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <h4 className="font-serif text-[18px] text-[#292722] font-medium leading-snug line-clamp-2">
                  {formData.title || 'Untitled Article'}
                </h4>
                <p className="text-[12px] text-[#656B66] line-clamp-2 mt-1.5 leading-relaxed">
                  {formData.excerpt || 'Article summary preview.'}
                </p>
                <div className="mt-3 pt-2.5 border-t border-[#EDE7DC] flex items-center justify-between text-[11px] text-[#292722]">
                  <span>By {formData.author || 'Excorto Studio'}</span>
                  <span className="text-[#94745F] font-medium">Read More →</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className="mt-6 btn-secondary text-xs inline-flex items-center gap-1.5"
            >
              <Edit3 size={13} />
              <span>Return to Editing</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   4. BLOG PREVIEW MODAL
   ========================================================================= */
interface BlogPreviewModalProps {
  blog?: BlogPost | null;
  onClose: () => void;
  onEdit: (blog: BlogPost) => void;
}

export const BlogPreviewModal: React.FC<BlogPreviewModalProps> = ({
  blog,
  onClose,
  onEdit
}) => {
  if (!blog) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#24241F]/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] rounded-lg border border-[#DDD5C9] dark:border-[#3E3C33] w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl">
        <div className="relative aspect-[16/9] w-full bg-[#EBE5DA] dark:bg-[#38362F] overflow-hidden">
          <Image src={blog.coverImage} alt={blog.title} fill unoptimized className="object-cover" />
          <button
            onClick={onClose}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#24241F]/60 text-white hover:bg-[#24241F]/90 flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between pb-3 border-b border-[#DDD5C9] dark:border-[#3E3C33]">
            <div>
              <span className="text-[10.5px] uppercase tracking-wider text-[#94745F] font-mono font-medium">
                {blog.category} · {blog.readTime}
              </span>
              <h2 className="font-serif text-2xl text-[#302A25] dark:text-[#F4EFE5] mt-1">{blog.title}</h2>
              <span className="text-xs text-[#777067] dark:text-[#B6AEA1] block mt-1">
                By {blog.author} · {new Date(blog.publishedAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}
              </span>
            </div>
            <a
              href={`/blog/${blog.slug}`}
              target="_blank"
              rel="noreferrer"
              className="btn-secondary text-xs inline-flex items-center gap-1"
            >
              <span>View Live Article</span>
              <ArrowUpRight size={12} />
            </a>
          </div>

          <div className="pt-4 space-y-4">
            <p className="text-sm font-serif italic text-[#777067] dark:text-[#B6AEA1] leading-relaxed border-l-2 border-[#94745F] pl-3">
              {blog.excerpt}
            </p>
            <div className="text-xs text-[#302A25] dark:text-[#F4EFE5] leading-relaxed whitespace-pre-line">
              {blog.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   5. TESTIMONIAL MODAL WITH LIVE CARD PREVIEW
   ========================================================================= */
interface TestimonialModalProps {
  isOpen: boolean;
  testimonial?: Testimonial | null;
  onClose: () => void;
  onSave: (testimonialData: Partial<Testimonial>) => void;
}

export const TestimonialModal: React.FC<TestimonialModalProps> = ({
  isOpen,
  testimonial,
  onClose,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [formData, setFormData] = useState<Partial<Testimonial>>({
    clientName: '',
    clientRole: 'Homeowner',
    clientLocation: 'Thiruvananthapuram, Kerala',
    clientPhoto: '',
    quote: '',
    rating: 5,
    projectTitle: 'Residential Commission',
    displayOrder: 1,
    status: 'Approved',
    featured: true
  });

  useEffect(() => {
    if (testimonial) {
      setFormData(testimonial);
    } else {
      setFormData({
        clientName: '',
        clientRole: 'Homeowner',
        clientLocation: 'Thiruvananthapuram, Kerala',
        clientPhoto: '',
        quote: '',
        rating: 5,
        projectTitle: 'Residential Commission',
        displayOrder: 1,
        status: 'Approved',
        featured: true
      });
    }
    setActiveTab('edit');
  }, [testimonial, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#24241F]/60 backdrop-blur-xs animate-in fade-in duration-150 select-none">
      <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] rounded-lg border border-[#DDD5C9] dark:border-[#3E3C33] w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#DDD5C9] dark:border-[#3E3C33] sticky top-0 bg-[#FCFAF6] dark:bg-[#2E2D27] z-20">
          <h3 className="font-serif text-base text-[#302A25] dark:text-[#F4EFE5]">
            {testimonial ? 'Edit Client Story & Review' : 'Add Client Story & Review'}
          </h3>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#EBE5DA] dark:bg-[#38362F] p-0.5 rounded border border-[#DDD5C9] text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'edit'
                    ? 'bg-[#FCFAF6] dark:bg-[#2E2D27] font-medium text-[#292722] shadow-2xs'
                    : 'text-[#777067]'
                }`}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded transition-colors flex items-center gap-1 ${
                  activeTab === 'preview'
                    ? 'bg-[#FCFAF6] dark:bg-[#2E2D27] font-medium text-[#292722] shadow-2xs'
                    : 'text-[#777067]'
                }`}
              >
                <Eye size={12} />
                <span>Live Preview</span>
              </button>
            </div>

            <button onClick={onClose} className="p-1 rounded text-[#777067] hover:text-[#302A25]">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {activeTab === 'edit' ? (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-3.5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Client Full Name *
                </label>
                <input
                  type="text"
                  value={formData.clientName}
                  onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                  placeholder="e.g. Arun &amp; Meera Pillai"
                  className="w-full studio-input text-xs"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Designation / Role
                </label>
                <input
                  type="text"
                  value={formData.clientRole}
                  onChange={(e) => setFormData({ ...formData, clientRole: e.target.value })}
                  placeholder="e.g. Villa Owner, Kowdiar"
                  className="w-full studio-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.clientLocation}
                  onChange={(e) => setFormData({ ...formData, clientLocation: e.target.value })}
                  placeholder="Thiruvananthapuram, Kerala"
                  className="w-full studio-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Project Reference
                </label>
                <input
                  type="text"
                  value={formData.projectTitle}
                  onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                  placeholder="e.g. Contemporary Residence"
                  className="w-full studio-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Rating Stars (1 to 5)
                </label>
                <select
                  value={formData.rating}
                  onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
                  className="w-full studio-input text-xs"
                >
                  <option value={5}>5 Stars (★★★★★)</option>
                  <option value={4}>4 Stars (★★★★☆)</option>
                  <option value={3}>3 Stars (★★★☆☆)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Testimonial Quote *
                </label>
                <textarea
                  rows={3}
                  value={formData.quote}
                  onChange={(e) => setFormData({ ...formData, quote: e.target.value })}
                  placeholder="Client feedback quote..."
                  className="w-full studio-input text-xs leading-relaxed"
                  required
                />
              </div>

              {/* Avatar Upload */}
              <div className="sm:col-span-2">
                <ImageUploadZone
                  value={formData.clientPhoto || ''}
                  onChange={(url) => setFormData({ ...formData, clientPhoto: url })}
                  aspectRatio="1:1"
                  label="Client Photograph (Optional Avatar)"
                  recommendedText="1:1 Square"
                  folder="testimonials"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Approved' | 'Pending' | 'Hidden' })}
                  className="w-full studio-input text-xs"
                >
                  <option value="Approved">Approved (Publicly Displayed)</option>
                  <option value="Pending">Pending Review</option>
                  <option value="Hidden">Hidden</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.displayOrder || 1}
                  onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                  className="w-full studio-input text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#DDD5C9] dark:border-[#3E3C33]">
              <button type="button" onClick={onClose} className="btn-secondary text-xs">
                Cancel
              </button>
              <button type="submit" className="btn-primary text-xs">
                Save Review
              </button>
            </div>
          </form>
        ) : (
          /* Live Testimonial Card Preview */
          <div className="p-6 sm:p-8 flex flex-col items-center justify-center bg-[#F4F0E9]">
            <span className="text-[11px] font-mono tracking-widest text-[#94745F] uppercase mb-4">
              EXACT PUBLIC WEBSITE TESTIMONIAL CARD PREVIEW
            </span>

            <div className="w-[360px] h-[230px] bg-[#FCFAF4] border border-[#E5DFD4] rounded-[4px] p-5 flex flex-col justify-between shadow-md">
              <div>
                <div className="flex items-center justify-between gap-3 mb-2.5">
                  <div className="flex items-center gap-1 text-[#8F5E3B]">
                    {[...Array(formData.rating || 5)].map((_, i) => (
                      <Star key={i} size={13} className="fill-[#8F5E3B] text-[#8F5E3B]" />
                    ))}
                  </div>
                  {formData.projectTitle && (
                    <span className="font-sans text-[10px] uppercase tracking-[0.16em] font-semibold text-[#94745F] bg-[#F4F0E9] px-2 py-0.5 rounded truncate">
                      {formData.projectTitle}
                    </span>
                  )}
                </div>

                <blockquote className="font-serif text-[14px] leading-[1.48] text-[#292722] line-clamp-3">
                  &ldquo;{formData.quote || 'Client testimonial text will appear here.'}&rdquo;
                </blockquote>
              </div>

              <div className="flex items-center gap-3 pt-3 border-t border-[#EDE7DC]">
                {formData.clientPhoto ? (
                  <div className="relative w-9 h-9 rounded-full overflow-hidden bg-[#E5DFD4] shrink-0 border border-[#D9D0C4]">
                    <Image src={formData.clientPhoto} alt="" fill unoptimized className="object-cover" />
                  </div>
                ) : (
                  <div className="w-9 h-9 rounded-full bg-[#E8E0D2] flex items-center justify-center shrink-0 font-serif text-[14px] text-[#94745F] font-semibold">
                    {(formData.clientName || 'C').charAt(0)}
                  </div>
                )}
                <div className="min-w-0">
                  <h4 className="font-sans text-[13px] font-semibold text-[#292722] truncate">
                    {formData.clientName || 'Client Name'}
                  </h4>
                  <p className="font-sans text-[11px] text-[#6E675E] truncate">
                    {formData.clientRole || 'Homeowner'}
                  </p>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className="mt-6 btn-secondary text-xs inline-flex items-center gap-1.5"
            >
              <Edit3 size={13} />
              <span>Return to Editing</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   6. SERVICE CREATION / EDIT MODAL WITH LIVE CARD PREVIEW
   ========================================================================= */
interface ServiceModalProps {
  isOpen: boolean;
  service?: ServiceItem | null;
  onClose: () => void;
  onSave: (serviceData: Partial<ServiceItem>) => void;
}

export const ServiceModal: React.FC<ServiceModalProps> = ({
  isOpen,
  service,
  onClose,
  onSave
}) => {
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [formData, setFormData] = useState<Partial<ServiceItem>>({
    number: '01',
    title: '',
    slug: '',
    shortDescription: '',
    fullDescription: '',
    heroImage: '/images/services/arch-card.jpg',
    deliverables: [],
    features: [],
    displayOrder: 1,
    status: 'Published',
    seoTitle: '',
    seoDesc: ''
  });

  const [deliverablesInput, setDeliverablesInput] = useState('');
  const [featuresInput, setFeaturesInput] = useState('');

  useEffect(() => {
    if (service) {
      setFormData(service);
      setDeliverablesInput(Array.isArray(service.deliverables) ? service.deliverables.join('\n') : '');
      setFeaturesInput(Array.isArray(service.features) ? service.features.join('\n') : '');
    } else {
      setFormData({
        number: '01',
        title: '',
        slug: '',
        shortDescription: '',
        fullDescription: '',
        heroImage: '/images/services/arch-card.jpg',
        deliverables: [
          'Conceptual Masterplans',
          '3D Visualizations',
          'Detailed Construction Blueprints'
        ],
        features: [
          'Contextual Environmental Orientation',
          'Passive Ventilation Design'
        ],
        displayOrder: 1,
        status: 'Published',
        seoTitle: '',
        seoDesc: ''
      });
      setDeliverablesInput('Conceptual Masterplans\n3D Visualizations\nDetailed Construction Blueprints');
      setFeaturesInput('Contextual Environmental Orientation\nPassive Ventilation Design');
    }
    setActiveTab('edit');
  }, [service, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const deliverables = deliverablesInput.split('\n').map(s => s.trim()).filter(Boolean);
    const features = featuresInput.split('\n').map(s => s.trim()).filter(Boolean);
    onSave({
      ...formData,
      deliverables,
      features
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#24241F]/60 backdrop-blur-xs animate-in fade-in duration-150 select-none">
      <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] rounded-lg border border-[#DDD5C9] dark:border-[#3E3C33] w-full max-w-3xl max-h-[92vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#DDD5C9] dark:border-[#3E3C33] sticky top-0 bg-[#FCFAF6] dark:bg-[#2E2D27] z-20">
          <div>
            <h3 className="font-serif text-base text-[#302A25] dark:text-[#F4EFE5]">
              {service ? 'Edit Service Offering' : 'New Service Offering'}
            </h3>
            <p className="text-[11px] text-[#777067] dark:text-[#B6AEA1]">Public website discipline card &amp; individual service page</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-[#EBE5DA] dark:bg-[#38362F] p-0.5 rounded border border-[#DDD5C9] text-xs">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`px-3 py-1 rounded transition-colors ${
                  activeTab === 'edit'
                    ? 'bg-[#FCFAF6] dark:bg-[#2E2D27] font-medium text-[#292722] shadow-2xs'
                    : 'text-[#777067]'
                }`}
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('preview')}
                className={`px-3 py-1 rounded transition-colors flex items-center gap-1 ${
                  activeTab === 'preview'
                    ? 'bg-[#FCFAF6] dark:bg-[#2E2D27] font-medium text-[#292722] shadow-2xs'
                    : 'text-[#777067]'
                }`}
              >
                <Eye size={12} />
                <span>Live Card Preview</span>
              </button>
            </div>

            <button onClick={onClose} className="p-1 rounded text-[#777067] hover:text-[#302A25]">
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {activeTab === 'edit' ? (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Service Number *
                </label>
                <input
                  type="text"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  placeholder="01"
                  className="w-full studio-input text-xs"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Service Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => {
                    const title = e.target.value;
                    setFormData({
                      ...formData,
                      title,
                      slug: formData.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                    });
                  }}
                  placeholder="Architectural Design"
                  className="w-full studio-input text-xs"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  URL Slug (/services/...)
                </label>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="architectural-design"
                  className="w-full studio-input text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Display Order
                </label>
                <input
                  type="number"
                  value={formData.displayOrder || 1}
                  onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                  className="w-full studio-input text-xs"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Short Description (Card Overview) *
                </label>
                <textarea
                  rows={2}
                  value={formData.shortDescription}
                  onChange={(e) => setFormData({ ...formData, shortDescription: e.target.value })}
                  placeholder="Concise summary shown on services overview..."
                  className="w-full studio-input text-xs leading-relaxed"
                  required
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Full Service Description (Detailed Page)
                </label>
                <textarea
                  rows={4}
                  value={formData.fullDescription}
                  onChange={(e) => setFormData({ ...formData, fullDescription: e.target.value })}
                  placeholder="Complete architectural methodology and detail..."
                  className="w-full studio-input text-xs leading-relaxed"
                />
              </div>

              {/* Service Hero Image Upload */}
              <div className="sm:col-span-3 p-3.5 rounded-lg border border-[#DDD5C9] bg-[#FAF8F5]">
                <ImageUploadZone
                  value={formData.heroImage || ''}
                  onChange={(url) => setFormData({ ...formData, heroImage: url })}
                  aspectRatio="16:9"
                  label="Service Hero &amp; Overview Photograph"
                  recommendedText="16:9 Landscape"
                  folder="services"
                />
              </div>

              <div className="sm:col-span-3 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#302A25] mb-1">
                    Key Deliverables (one per line)
                  </label>
                  <textarea
                    rows={4}
                    value={deliverablesInput}
                    onChange={(e) => setDeliverablesInput(e.target.value)}
                    placeholder="Conceptual Masterplans&#10;3D Photorealistic Renderings&#10;Structural Blueprints"
                    className="w-full studio-input text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#302A25] mb-1">
                    Core Features &amp; Principles (one per line)
                  </label>
                  <textarea
                    rows={4}
                    value={featuresInput}
                    onChange={(e) => setFeaturesInput(e.target.value)}
                    placeholder="Contextual Environmental Planning&#10;Natural Daylight Optimization"
                    className="w-full studio-input text-xs font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] mb-1">
                  Publication Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'Published' | 'Draft' })}
                  className="w-full studio-input text-xs"
                >
                  <option value="Published">Published (Live on Website)</option>
                  <option value="Draft">Draft (Unpublished)</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#DDD5C9]">
              <button type="button" onClick={onClose} className="btn-secondary text-xs">
                Cancel
              </button>
              <button type="submit" className="btn-primary text-xs">
                Save Service
              </button>
            </div>
          </form>
        ) : (
          /* Live Service Card Preview */
          <div className="p-6 sm:p-8 flex flex-col items-center justify-center bg-[#F5F0E8]">
            <span className="text-[11px] font-mono tracking-widest text-[#94745F] uppercase mb-4">
              EXACT PUBLIC SERVICES OVERVIEW CARD PREVIEW
            </span>

            <div className="w-full max-w-[420px] bg-[#FCFAF6] border border-[#E5DFD4] rounded-lg overflow-hidden shadow-md">
              <div className="relative aspect-[16/9] w-full bg-[#EAE5DE]">
                <Image
                  src={formData.heroImage || '/images/services/arch-card.jpg'}
                  alt={formData.title || 'Service'}
                  fill
                  unoptimized
                  className="object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#94745F] text-white font-mono text-xs font-bold px-2 py-0.5 rounded">
                  {formData.number || '01'}
                </div>
              </div>

              <div className="p-5">
                <span className="font-mono text-[10px] text-[#94745F] tracking-widest uppercase block mb-1">
                  SERVICE {formData.number || '01'}
                </span>
                <h4 className="font-serif text-[20px] text-[#292722] font-medium leading-snug">
                  {formData.title || 'Service Title'}
                </h4>
                <p className="text-[13px] text-[#656B66] line-clamp-3 mt-2 leading-relaxed">
                  {formData.shortDescription || 'Short description preview.'}
                </p>
                <div className="mt-4 pt-3 border-t border-[#EDE7DC] flex items-center justify-between text-xs text-[#94745F] font-medium">
                  <span>DISCOVER DISCIPLINE</span>
                  <span>→</span>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveTab('edit')}
              className="mt-6 btn-secondary text-xs inline-flex items-center gap-1.5"
            >
              <Edit3 size={13} />
              <span>Return to Editing</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

/* =========================================================================
   7. ENQUIRY DETAIL MODAL
   ========================================================================= */
interface EnquiryDetailModalProps {
  enquiry?: Enquiry | null;
  onClose: () => void;
  onUpdateStatus: (enquiryId: string, status: EnquiryStatus, notes?: string) => void;
}

export const EnquiryDetailModal: React.FC<EnquiryDetailModalProps> = ({
  enquiry,
  onClose,
  onUpdateStatus
}) => {
  const [status, setStatus] = useState<EnquiryStatus>('New');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    if (enquiry) {
      setStatus(enquiry.status);
      setNotes(enquiry.notes || '');
    }
  }, [enquiry]);

  if (!enquiry) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#24241F]/60 backdrop-blur-xs animate-in fade-in duration-150 select-none">
      <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] rounded-lg border border-[#DDD5C9] dark:border-[#3E3C33] w-full max-w-xl max-h-[92vh] overflow-y-auto shadow-2xl">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#DDD5C9] dark:border-[#3E3C33] sticky top-0 bg-[#FCFAF6] dark:bg-[#2E2D27] z-20">
          <div>
            <h3 className="font-serif text-base text-[#302A25] dark:text-[#F4EFE5]">Client Consultation Enquiry</h3>
            <span className="text-[11px] font-mono text-[#94745F]">ID: #{enquiry.id}</span>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-[#EBE5DA] text-[#777067]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-2 gap-3 p-3.5 bg-[#FAF8F5] rounded border border-[#E5DFD4] text-xs">
            <div>
              <span className="text-[10px] uppercase font-mono text-[#777067] block">Client Name</span>
              <span className="font-semibold text-[#292722]">{enquiry.clientName}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-[#777067] block">Service Requested</span>
              <span className="font-semibold text-[#292722]">{enquiry.service}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-[#777067] block">Email</span>
              <a href={`mailto:${enquiry.email}`} className="text-[#94745F] hover:underline font-mono text-[11px]">
                {enquiry.email}
              </a>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-[#777067] block">Phone</span>
              <a href={`tel:${enquiry.phone}`} className="text-[#94745F] hover:underline font-mono text-[11px]">
                {enquiry.phone}
              </a>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-[#777067] block">Budget Bracket</span>
              <span className="text-[#292722]">{enquiry.budget}</span>
            </div>
            <div>
              <span className="text-[10px] uppercase font-mono text-[#777067] block">Desired Timeline</span>
              <span className="text-[#292722]">{enquiry.timeline || 'Flexible'}</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#302A25] mb-1">Consultation Message</label>
            <p className="p-3 bg-white border border-[#E5DFD4] rounded text-xs text-[#292722] leading-relaxed whitespace-pre-line">
              {enquiry.message}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div>
              <label className="block text-xs font-medium text-[#302A25] mb-1">Pipeline Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value as EnquiryStatus)}
                className="w-full studio-input text-xs"
              >
                <option value="New">New</option>
                <option value="In Progress">In Progress</option>
                <option value="Contacted">Contacted</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Converted">Converted</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#302A25] mb-1">Internal Studio Notes</label>
              <input
                type="text"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Follow-up notes..."
                className="w-full studio-input text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-[#DDD5C9]">
            <button type="button" onClick={onClose} className="btn-secondary text-xs">
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onUpdateStatus(enquiry.id, status, notes);
                onClose();
              }}
              className="btn-primary text-xs"
            >
              Update Status
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   8. NEW ENQUIRY MODAL (MANUAL INTAKE)
   ========================================================================= */
interface NewEnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Partial<Enquiry>) => void;
}

export const NewEnquiryModal: React.FC<NewEnquiryModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [formData, setFormData] = useState<Partial<Enquiry>>({
    clientName: '',
    email: '',
    phone: '',
    service: 'Architectural Design',
    budget: '$50,000 - $100,000',
    timeline: 'Within 3-6 Months',
    message: ''
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#24241F]/60 backdrop-blur-xs animate-in fade-in duration-150 select-none">
      <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] rounded-lg border border-[#DDD5C9] dark:border-[#3E3C33] w-full max-w-lg shadow-2xl">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#DDD5C9]">
          <h3 className="font-serif text-base text-[#302A25]">New Consultation Lead</h3>
          <button onClick={onClose} className="p-1 rounded text-[#777067] hover:text-[#302A25]">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5">
          <div>
            <label className="block text-xs font-medium text-[#302A25] mb-1">Client Name *</label>
            <input
              type="text"
              value={formData.clientName}
              onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
              className="w-full studio-input text-xs"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#302A25] mb-1">Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full studio-input text-xs"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-[#302A25] mb-1">Phone</label>
              <input
                type="text"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full studio-input text-xs"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-[#302A25] mb-1">Service</label>
              <select
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full studio-input text-xs"
              >
                <option value="Architectural Design">Architectural Design</option>
                <option value="Interior Designing">Interior Designing</option>
                <option value="Interior Installation">Interior Installation</option>
                <option value="Consultation">Consultation</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-[#302A25] mb-1">Budget</label>
              <input
                type="text"
                value={formData.budget}
                onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                className="w-full studio-input text-xs"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-[#302A25] mb-1">Notes / Message</label>
            <textarea
              rows={3}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              className="w-full studio-input text-xs"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#DDD5C9]">
            <button type="button" onClick={onClose} className="btn-secondary text-xs">
              Cancel
            </button>
            <button type="submit" className="btn-primary text-xs">
              Create Lead
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* =========================================================================
   9. CONFIRM DELETE MODAL
   ========================================================================= */
interface ConfirmDeleteModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  isOpen,
  title,
  message,
  onConfirm,
  onCancel
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#24241F]/60 backdrop-blur-xs animate-in fade-in duration-150 select-none">
      <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] rounded-lg border border-red-200 dark:border-red-900 w-full max-w-sm p-5 shadow-2xl space-y-3">
        <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-950/60 text-red-600 flex items-center justify-center">
          <Trash2 size={20} />
        </div>

        <div>
          <h4 className="font-serif text-lg text-[#302A25] dark:text-[#F4EFE5]">{title}</h4>
          <p className="text-xs text-[#777067] dark:text-[#B6AEA1] mt-1 leading-relaxed">
            {message}
          </p>
        </div>

        <div className="flex items-center justify-end gap-2 pt-2">
          <button type="button" onClick={onCancel} className="btn-secondary text-xs">
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-3.5 py-1.5 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-colors"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
