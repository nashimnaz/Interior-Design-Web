'use client';

import React, { useState, useEffect } from 'react';
import { Sidebar, ActiveTab } from '@/components/Sidebar';
import { Header } from '@/components/Header';
import { DashboardView } from '@/components/DashboardView';
import { BlogView } from '@/components/BlogView';
import { ProjectsView } from '@/components/ProjectsView';
import { TestimonialsView } from '@/components/TestimonialsView';
import { EnquiriesView } from '@/components/EnquiriesView';
import { SettingsView } from '@/components/SettingsView';
import { ServicesView } from '@/components/ServicesView';
import { PageContentView } from '@/components/PageContentView';
import { 
  ProjectModal, 
  ProjectPreviewModal, 
  BlogModal, 
  BlogPreviewModal, 
  TestimonialModal, 
  ServiceModal,
  EnquiryDetailModal, 
  NewEnquiryModal, 
  ConfirmDeleteModal 
} from '@/components/Modals';
import { 
  Project, 
  BlogPost, 
  Testimonial, 
  Enquiry, 
  SiteSetting, 
  DashboardStats,
  EnquiryStatus,
  PublicationStatus,
  ServiceItem
} from '@/lib/types';
import { 
  initialProjects, 
  initialBlogs, 
  initialTestimonials, 
  initialEnquiries, 
  initialSiteSettings, 
  initialDashboardStats,
  initialServices
} from '@/lib/store';
import { Check } from 'lucide-react';

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Core Data States
  const [stats, setStats] = useState<DashboardStats>(initialDashboardStats);
  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [services, setServices] = useState<ServiceItem[]>(initialServices);
  const [enquiries, setEnquiries] = useState<Enquiry[]>(initialEnquiries);
  const [settings, setSettings] = useState<SiteSetting>(initialSiteSettings);
  const [subscribersCount, setSubscribersCount] = useState<number>(0);

  // Toast feedback state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Modals States
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [previewingProject, setPreviewingProject] = useState<Project | null>(null);

  const [isBlogModalOpen, setIsBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<BlogPost | null>(null);
  const [previewingBlog, setPreviewingBlog] = useState<BlogPost | null>(null);

  const [isTestimonialModalOpen, setIsTestimonialModalOpen] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);

  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState<ServiceItem | null>(null);

  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [isNewEnquiryOpen, setIsNewEnquiryOpen] = useState(false);

  const [deleteModal, setDeleteModal] = useState<{
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
  }>({
    isOpen: false,
    title: '',
    message: '',
    onConfirm: () => {}
  });

  // Fetch initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        const [statsRes, projRes, blogRes, testRes, enqRes, setRes, newsRes, servRes] = await Promise.allSettled([
          fetch('/api/stats').then(r => r.json()),
          fetch('/api/projects').then(r => r.json()),
          fetch('/api/blogs').then(r => r.json()),
          fetch('/api/testimonials').then(r => r.json()),
          fetch('/api/enquiries').then(r => r.json()),
          fetch('/api/settings').then(r => r.json()),
          fetch('/api/newsletter').then(r => r.json()),
          fetch('/api/services').then(r => r.json())
        ]);

        if (statsRes.status === 'fulfilled' && statsRes.value?.success) {
          setStats(statsRes.value.data);
        }
        if (projRes.status === 'fulfilled' && projRes.value?.success) {
          setProjects(projRes.value.data);
        }
        if (blogRes.status === 'fulfilled' && blogRes.value?.success) {
          setBlogs(blogRes.value.data);
        }
        if (testRes.status === 'fulfilled' && testRes.value?.success) {
          setTestimonials(testRes.value.data);
        }
        if (servRes.status === 'fulfilled' && servRes.value?.success) {
          setServices(servRes.value.data);
        }
        if (enqRes.status === 'fulfilled' && enqRes.value?.success) {
          setEnquiries(enqRes.value.data);
        }
        if (setRes.status === 'fulfilled' && setRes.value?.success) {
          setSettings(setRes.value.data);
        }
        if (newsRes.status === 'fulfilled' && newsRes.value?.success && Array.isArray(newsRes.value.data)) {
          setSubscribersCount(newsRes.value.data.length);
        }
      } catch (err) {
        console.warn('Connected in local studio memory mode:', err);
      }
    };

    loadInitialData();
  }, []);

  const refreshStats = (currentProj: Project[], currentBlogs: BlogPost[], currentEnq: Enquiry[], currentTest: Testimonial[]) => {
    const totalProj = currentProj.length;
    const activeProj = currentProj.filter(p => p.status === 'Published').length;
    const pubBlogs = currentBlogs.filter(b => b.status === 'Published').length;
    const draftBlogs = currentBlogs.filter(b => b.status === 'Draft').length;
    const newEnq = currentEnq.filter(e => e.status === 'New').length;
    const totalEnq = currentEnq.length;
    const converted = currentEnq.filter(e => e.status === 'Converted').length;
    const conversionRate = totalEnq > 0 ? Number(((converted / totalEnq) * 100).toFixed(1)) : 0;
    const approved = currentTest.filter(t => t.status === 'Approved');
    const avgRating = approved.length > 0 
      ? Number((approved.reduce((acc, t) => acc + t.rating, 0) / approved.length).toFixed(2)) 
      : 5.0;

    setStats(prev => ({
      ...prev,
      totalProjects: totalProj,
      activeProjects: activeProj,
      publishedBlogs: pubBlogs,
      draftBlogs: draftBlogs,
      newEnquiries: newEnq,
      totalEnquiries: totalEnq,
      conversionRate: conversionRate,
      averageRating: avgRating,
      totalTestimonials: currentTest.length
    }));
  };

  /* =======================================================================
     PROJECT ACTIONS
     ======================================================================= */
  const handleSaveProject = async (projectData: Partial<Project>) => {
    if (editingProject) {
      const updated = projects.map(p => p.id === editingProject.id ? { ...p, ...projectData } : p);
      setProjects(updated);
      refreshStats(updated, blogs, enquiries, testimonials);
      showToast(`Updated "${projectData.title || editingProject.title}"`);
      try {
        await fetch('/api/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingProject.id, ...projectData })
        });
      } catch (_) {}
    } else {
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        title: projectData.title || 'Untitled Project',
        slug: (projectData.title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: projectData.category || 'Residential Interiors',
        description: projectData.description || '',
        location: projectData.location || 'New York, NY',
        clientName: projectData.clientName || 'Private Client',
        year: projectData.year || '2026',
        areaSqFt: projectData.areaSqFt || 3000,
        coverImage: projectData.coverImage || '/images/projects/living-room.jpg',
        images: projectData.images || ['/images/projects/living-room.jpg'],
        featured: Boolean(projectData.featured),
        status: projectData.status || 'Published',
        displayOrder: projects.length + 1,
        createdAt: new Date().toISOString()
      };
      const updated = [newProj, ...projects];
      setProjects(updated);
      refreshStats(updated, blogs, enquiries, testimonials);
      showToast(`Added "${newProj.title}"`);
      try {
        await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newProj)
        });
      } catch (_) {}
    }
  };

  const handleTogglePublishProject = async (project: Project) => {
    const nextStatus: PublicationStatus = project.status === 'Published' ? 'Draft' : 'Published';
    const updated: Project[] = projects.map(p => p.id === project.id ? { ...p, status: nextStatus } : p);
    setProjects(updated);
    refreshStats(updated, blogs, enquiries, testimonials);
    showToast(`Status changed to ${nextStatus}`);
    try {
      await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: project.id, status: nextStatus })
      });
    } catch (_) {}
  };

  const handleToggleFeaturedProject = async (project: Project) => {
    const nextFeatured = !project.featured;
    const updated = projects.map(p => p.id === project.id ? { ...p, featured: nextFeatured } : p);
    setProjects(updated);
    showToast(nextFeatured ? `Featured in showcase` : `Removed from featured`);
    try {
      await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: project.id, featured: nextFeatured })
      });
    } catch (_) {}
  };

  const handleDeleteProject = (project: Project) => {
    setDeleteModal({
      isOpen: true,
      title: `Delete Project`,
      message: `Are you sure you want to delete "${project.title}"? This action cannot be reversed.`,
      onConfirm: async () => {
        const updated = projects.filter(p => p.id !== project.id);
        setProjects(updated);
        refreshStats(updated, blogs, enquiries, testimonials);
        showToast(`Project removed`);
        try {
          await fetch(`/api/projects?id=${project.id}`, { method: 'DELETE' });
        } catch (_) {}
      }
    });
  };

  /* =======================================================================
     BLOG ACTIONS
     ======================================================================= */
  const handleSaveBlog = async (blogData: Partial<BlogPost>) => {
    if (editingBlog) {
      const updated = blogs.map(b => b.id === editingBlog.id ? { ...b, ...blogData } : b);
      setBlogs(updated);
      refreshStats(projects, updated, enquiries, testimonials);
      showToast(`Updated "${blogData.title || editingBlog.title}"`);
      try {
        await fetch('/api/blogs', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingBlog.id, ...blogData })
        });
      } catch (_) {}
    } else {
      const newBlog: BlogPost = {
        id: `blog-${Date.now()}`,
        title: blogData.title || 'Untitled Article',
        slug: blogData.slug || (blogData.title || 'untitled').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        excerpt: blogData.excerpt || '',
        content: blogData.content || '',
        coverImage: blogData.coverImage || '/images/blogs/creating-timeless-interiors.jpg',
        category: (blogData.category as any) || 'Interior Design',
        tags: blogData.tags || ['Interior Architecture'],
        author: blogData.author || 'EXCORTO Design Studio',
        authorRole: blogData.authorRole || 'Principal Architect',
        authorImage: blogData.authorImage || '/images/team/lead-architect.jpg',
        readTime: blogData.readTime || '5 min read',
        status: blogData.status || 'Published',
        publishedAt: blogData.publishedAt || new Date().toISOString(),
        views: 0,
        featured: blogData.featured ?? false,
        seoTitle: blogData.seoTitle,
        seoDescription: blogData.seoDescription,
        seoKeywords: blogData.seoKeywords
      };
      const updated = [newBlog, ...blogs];
      setBlogs(updated);
      refreshStats(projects, updated, enquiries, testimonials);
      showToast(`Published article`);
      try {
        await fetch('/api/blogs', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newBlog)
        });
      } catch (_) {}
    }
  };

  const handleTogglePublishBlog = async (blog: BlogPost) => {
    const nextStatus: 'Published' | 'Draft' = blog.status === 'Published' ? 'Draft' : 'Published';
    const updated: BlogPost[] = blogs.map(b => b.id === blog.id ? { ...b, status: nextStatus } : b);
    setBlogs(updated);
    refreshStats(projects, updated, enquiries, testimonials);
    showToast(`Article set to ${nextStatus}`);
    try {
      await fetch('/api/blogs', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: blog.id, status: nextStatus })
      });
    } catch (_) {}
  };

  const handleDeleteBlog = (blog: BlogPost) => {
    setDeleteModal({
      isOpen: true,
      title: `Delete Article`,
      message: `Are you sure you want to delete "${blog.title}"?`,
      onConfirm: async () => {
        const updated = blogs.filter(b => b.id !== blog.id);
        setBlogs(updated);
        refreshStats(projects, updated, enquiries, testimonials);
        showToast(`Article deleted`);
        try {
          await fetch(`/api/blogs?id=${blog.id}`, { method: 'DELETE' });
        } catch (_) {}
      }
    });
  };

  /* =======================================================================
     TESTIMONIAL ACTIONS
     ======================================================================= */
  const handleSaveTestimonial = async (testData: Partial<Testimonial>) => {
    if (editingTestimonial) {
      const updated = testimonials.map(t => t.id === editingTestimonial.id ? { ...t, ...testData } : t);
      setTestimonials(updated);
      refreshStats(projects, blogs, enquiries, updated);
      showToast(`Updated testimonial`);
      try {
        await fetch('/api/testimonials', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingTestimonial.id, ...testData })
        });
      } catch (_) {}
    } else {
      const newTest: Testimonial = {
        id: `test-${Date.now()}`,
        clientName: testData.clientName || 'Anonymous Client',
        clientRole: testData.clientRole || 'Homeowner',
        clientPhoto: '',
        quote: testData.quote || '',
        rating: testData.rating || 5,
        projectTitle: testData.projectTitle || 'Bel Air Residence',
        status: testData.status || 'Approved',
        featured: Boolean(testData.featured),
        createdAt: new Date().toISOString()
      };
      const updated = [newTest, ...testimonials];
      setTestimonials(updated);
      refreshStats(projects, blogs, enquiries, updated);
      showToast(`Endorsement saved`);
      try {
        await fetch('/api/testimonials', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newTest)
        });
      } catch (_) {}
    }
  };

  const handleToggleStatusTestimonial = async (test: Testimonial) => {
    const next: 'Approved' | 'Pending' = test.status === 'Approved' ? 'Pending' : 'Approved';
    const updated: Testimonial[] = testimonials.map(t => t.id === test.id ? { ...t, status: next } : t);
    setTestimonials(updated);
    refreshStats(projects, blogs, enquiries, updated);
    showToast(`Status set to ${next}`);
    try {
      await fetch('/api/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: test.id, status: next })
      });
    } catch (_) {}
  };

  const handleToggleFeaturedTestimonial = async (test: Testimonial) => {
    const next = !test.featured;
    const updated = testimonials.map(t => t.id === test.id ? { ...t, featured: next } : t);
    setTestimonials(updated);
    showToast(next ? `Featured on showroom` : `Removed from featured`);
    try {
      await fetch('/api/testimonials', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: test.id, featured: next })
      });
    } catch (_) {}
  };

  const handleDeleteTestimonial = (test: Testimonial) => {
    setDeleteModal({
      isOpen: true,
      title: `Delete Testimonial`,
      message: `Delete endorsement from ${test.clientName}?`,
      onConfirm: async () => {
        const updated = testimonials.filter(t => t.id !== test.id);
        setTestimonials(updated);
        refreshStats(projects, blogs, enquiries, updated);
        showToast(`Testimonial removed`);
        try {
          await fetch(`/api/testimonials?id=${test.id}`, { method: 'DELETE' });
        } catch (_) {}
      }
    });
  };

  /* =======================================================================
     ENQUIRY ACTIONS
     ======================================================================= */
  const handleUpdateEnquiryStatus = async (enquiry: Enquiry, newStatus: EnquiryStatus) => {
    const updated = enquiries.map(e => e.id === enquiry.id ? { ...e, status: newStatus } : e);
    setEnquiries(updated);
    if (selectedEnquiry && selectedEnquiry.id === enquiry.id) {
      setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
    }
    refreshStats(projects, blogs, updated, testimonials);
    showToast(`Status updated to ${newStatus}`);
    try {
      await fetch('/api/enquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: enquiry.id, status: newStatus })
      });
    } catch (_) {}
  };

  const handleUpdateEnquiryNotes = async (enquiry: Enquiry, notes: string) => {
    const updated = enquiries.map(e => e.id === enquiry.id ? { ...e, notes } : e);
    setEnquiries(updated);
    if (selectedEnquiry && selectedEnquiry.id === enquiry.id) {
      setSelectedEnquiry({ ...selectedEnquiry, notes });
    }
    showToast(`Notes saved`);
    try {
      await fetch('/api/enquiries', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: enquiry.id, notes })
      });
    } catch (_) {}
  };

  const handleSaveNewEnquiry = async (enqData: Partial<Enquiry>) => {
    const newEnq: Enquiry = {
      id: `enq-${Date.now()}`,
      clientName: enqData.clientName || 'Anonymous Client',
      email: enqData.email || 'client@studio.com',
      phone: enqData.phone || '',
      service: enqData.service || 'Full Home Architecture',
      budget: enqData.budget || '$150,000 - $300,000',
      timeline: enqData.timeline || 'Flexible',
      message: enqData.message || '',
      status: 'New',
      assignedTo: enqData.assignedTo || 'Clara Delacroix',
      createdAt: new Date().toISOString()
    };
    const updated = [newEnq, ...enquiries];
    setEnquiries(updated);
    refreshStats(projects, blogs, updated, testimonials);
    showToast(`Lead logged for ${newEnq.clientName}`);
    try {
      await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newEnq)
      });
    } catch (_) {}
  };

  const handleDeleteEnquiry = (enquiry: Enquiry) => {
    setDeleteModal({
      isOpen: true,
      title: `Delete Enquiry`,
      message: `Remove consultation enquiry from ${enquiry.clientName}?`,
      onConfirm: async () => {
        const updated = enquiries.filter(e => e.id !== enquiry.id);
        setEnquiries(updated);
        if (selectedEnquiry && selectedEnquiry.id === enquiry.id) {
          setSelectedEnquiry(null);
        }
        refreshStats(projects, blogs, updated, testimonials);
        showToast(`Enquiry deleted`);
        try {
          await fetch(`/api/enquiries?id=${enquiry.id}`, { method: 'DELETE' });
        } catch (_) {}
      }
    });
  };

  /* =======================================================================
     SERVICE ACTIONS
     ======================================================================= */
  const handleSaveService = async (serviceData: Partial<ServiceItem>) => {
    if (editingService) {
      const updated = services.map(s => s.id === editingService.id ? ({ ...s, ...serviceData } as ServiceItem) : s);
      setServices(updated);
      showToast(`Updated "${serviceData.title || editingService.title}"`);
      try {
        await fetch('/api/services', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingService.id, ...serviceData })
        });
      } catch (_) {}
    } else {
      const newService: ServiceItem = {
        id: `service-${Date.now()}`,
        number: serviceData.number || `0${services.length + 1}`,
        title: serviceData.title || 'New Architectural Service',
        slug: (serviceData.title || 'new-service').toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        shortDescription: serviceData.shortDescription || '',
        fullDescription: serviceData.fullDescription || '',
        heroImage: serviceData.heroImage || '/images/services/arch-card.jpg',
        deliverables: serviceData.deliverables || [],
        features: serviceData.features || [],
        displayOrder: serviceData.displayOrder || (services.length + 1),
        status: serviceData.status || 'Published',
        seoTitle: serviceData.seoTitle || '',
        seoDesc: serviceData.seoDesc || '',
        createdAt: new Date().toISOString()
      };
      const updated = [...services, newService];
      setServices(updated);
      showToast(`Added service "${newService.title}"`);
      try {
        await fetch('/api/services', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newService)
        });
      } catch (_) {}
    }
  };

  const handleTogglePublishService = async (service: ServiceItem) => {
    const nextStatus: PublicationStatus = service.status === 'Published' ? 'Draft' : 'Published';
    const updated = services.map(s => s.id === service.id ? { ...s, status: nextStatus } : s);
    setServices(updated);
    showToast(`Service status changed to ${nextStatus}`);
    try {
      await fetch('/api/services', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: service.id, status: nextStatus })
      });
    } catch (_) {}
  };

  const handleDeleteService = (service: ServiceItem) => {
    setDeleteModal({
      isOpen: true,
      title: 'Delete Service Offering',
      message: `Are you sure you want to delete "${service.title}"? This will remove the discipline card and individual service page.`,
      onConfirm: async () => {
        const updated = services.filter(s => s.id !== service.id);
        setServices(updated);
        showToast(`Service deleted`);
        try {
          await fetch(`/api/services?id=${service.id}`, { method: 'DELETE' });
        } catch (_) {}
      }
    });
  };

  /* =======================================================================
     SETTINGS ACTIONS
     ======================================================================= */
  const handleSaveSettings = async (updatedSettings: SiteSetting) => {
    setSettings(updatedSettings);
    showToast(`Studio settings saved`);
    try {
      await fetch('/api/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSettings)
      });
    } catch (_) {}
  };

  const newEnquiriesCount = enquiries.filter(e => e.status === 'New').length;

  return (
    <div className="min-h-screen flex bg-[#F5F1E9] dark:bg-[#24241F] transition-colors">
      {/* Slim Sidebar Navigation */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileMenuOpen}
        setIsMobileOpen={setIsMobileMenuOpen}
        newEnquiriesCount={newEnquiriesCount}
      />

      {/* Main Workspace Area */}
      <div 
        className={`flex-1 flex flex-col min-w-0 transition-all duration-200 ${
          isSidebarCollapsed ? 'lg:pl-16' : 'lg:pl-64'
        }`}
      >
        {/* Understated Content Header */}
        <Header
          activeTab={activeTab}
          onOpenMobileMenu={() => setIsMobileMenuOpen(true)}
          enquiries={enquiries}
          onSelectEnquiry={(enq) => {
            setSelectedEnquiry(enq);
          }}
          setActiveTab={setActiveTab}
        />

        {/* Studio Content Body */}
        <main className="flex-1 px-8 lg:px-12 py-8 max-w-6xl w-full mx-auto">
          {activeTab === 'overview' && (
            <DashboardView
              stats={stats}
              projects={projects}
              blogs={blogs}
              enquiries={enquiries}
              testimonials={testimonials}
              setActiveTab={setActiveTab}
              onOpenNewProject={() => {
                setEditingProject(null);
                setIsProjectModalOpen(true);
              }}
              onOpenNewBlog={() => {
                setEditingBlog(null);
                setIsBlogModalOpen(true);
              }}
              onSelectEnquiry={(enq) => setSelectedEnquiry(enq)}
              onPreviewProject={(proj) => setPreviewingProject(proj)}
            />
          )}

          {activeTab === 'blogs' && (
            <BlogView
              blogs={blogs}
              subscribersCount={subscribersCount}
              onOpenNewBlog={() => {
                setEditingBlog(null);
                setIsBlogModalOpen(true);
              }}
              onEditBlog={(blog) => {
                setEditingBlog(blog);
                setIsBlogModalOpen(true);
              }}
              onPreviewBlog={(blog) => setPreviewingBlog(blog)}
              onTogglePublish={handleTogglePublishBlog}
              onDeleteBlog={handleDeleteBlog}
            />
          )}

          {activeTab === 'projects' && (
            <ProjectsView
              projects={projects}
              onOpenNewProject={() => {
                setEditingProject(null);
                setIsProjectModalOpen(true);
              }}
              onEditProject={(proj) => {
                setEditingProject(proj);
                setIsProjectModalOpen(true);
              }}
              onPreviewProject={(proj) => setPreviewingProject(proj)}
              onTogglePublish={handleTogglePublishProject}
              onToggleFeatured={handleToggleFeaturedProject}
              onDeleteProject={handleDeleteProject}
            />
          )}

          {activeTab === 'services' && (
            <ServicesView
              services={services}
              onOpenNewService={() => {
                setEditingService(null);
                setIsServiceModalOpen(true);
              }}
              onEditService={(serv) => {
                setEditingService(serv);
                setIsServiceModalOpen(true);
              }}
              onPreviewService={(serv) => {
                setEditingService(serv);
                setIsServiceModalOpen(true);
              }}
              onTogglePublish={handleTogglePublishService}
              onDeleteService={handleDeleteService}
            />
          )}

          {activeTab === 'testimonials' && (
            <TestimonialsView
              testimonials={testimonials}
              onOpenNewTestimonial={() => {
                setEditingTestimonial(null);
                setIsTestimonialModalOpen(true);
              }}
              onEditTestimonial={(test) => {
                setEditingTestimonial(test);
                setIsTestimonialModalOpen(true);
              }}
              onToggleStatus={handleToggleStatusTestimonial}
              onToggleFeatured={handleToggleFeaturedTestimonial}
              onDeleteTestimonial={handleDeleteTestimonial}
            />
          )}

          {activeTab === 'pages' && (
            <PageContentView
              onShowToast={(msg) => showToast(msg)}
            />
          )}

          {activeTab === 'enquiries' && (
            <EnquiriesView
              enquiries={enquiries}
              onSelectEnquiry={(enq) => setSelectedEnquiry(enq)}
              onOpenNewEnquiry={() => setIsNewEnquiryOpen(true)}
              onUpdateStatus={handleUpdateEnquiryStatus}
              onDeleteEnquiry={handleDeleteEnquiry}
            />
          )}

          {activeTab === 'settings' && (
            <SettingsView
              settings={settings}
              onSaveSettings={handleSaveSettings}
            />
          )}
        </main>
      </div>

      {/* Modal Dialogs */}
      <ProjectModal
        isOpen={isProjectModalOpen}
        project={editingProject}
        onClose={() => {
          setIsProjectModalOpen(false);
          setEditingProject(null);
        }}
        onSave={handleSaveProject}
      />

      <ProjectPreviewModal
        project={previewingProject}
        onClose={() => setPreviewingProject(null)}
        onEdit={(proj) => {
          setEditingProject(proj);
          setIsProjectModalOpen(true);
        }}
      />

      <BlogModal
        isOpen={isBlogModalOpen}
        blog={editingBlog}
        onClose={() => {
          setIsBlogModalOpen(false);
          setEditingBlog(null);
        }}
        onSave={handleSaveBlog}
      />

      <BlogPreviewModal
        blog={previewingBlog}
        onClose={() => setPreviewingBlog(null)}
        onEdit={(b) => {
          setEditingBlog(b);
          setIsBlogModalOpen(true);
        }}
      />

      <TestimonialModal
        isOpen={isTestimonialModalOpen}
        testimonial={editingTestimonial}
        onClose={() => {
          setIsTestimonialModalOpen(false);
          setEditingTestimonial(null);
        }}
        onSave={handleSaveTestimonial}
      />

      <ServiceModal
        isOpen={isServiceModalOpen}
        service={editingService}
        onClose={() => {
          setIsServiceModalOpen(false);
          setEditingService(null);
        }}
        onSave={handleSaveService}
      />

      <EnquiryDetailModal
        enquiry={selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
        onUpdateStatus={handleUpdateEnquiryStatus}
        onUpdateNotes={handleUpdateEnquiryNotes}
      />

      <NewEnquiryModal
        isOpen={isNewEnquiryOpen}
        onClose={() => setIsNewEnquiryOpen(false)}
        onSave={handleSaveNewEnquiry}
      />

      <ConfirmDeleteModal
        isOpen={deleteModal.isOpen}
        title={deleteModal.title}
        message={deleteModal.message}
        onClose={() => setDeleteModal(prev => ({ ...prev, isOpen: false }))}
        onConfirm={deleteModal.onConfirm}
      />

      {/* Understated Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-3.5 py-2.5 rounded bg-[#302A25] dark:bg-[#F4EFE5] text-[#FCFAF6] dark:text-[#24241F] text-xs font-medium border border-[#DDD5C9]/20 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-150">
          <Check className="w-3.5 h-3.5 text-[#8E9177] shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
