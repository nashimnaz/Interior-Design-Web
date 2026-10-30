'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/frontend/Navbar';
import { ProjectsHeroSection } from '@/components/frontend/ProjectsHeroSection';
import { ProjectsGallerySection } from '@/components/frontend/ProjectsGallerySection';
import { CtaBannerSection } from '@/components/frontend/CtaBannerSection';
import { Footer } from '@/components/frontend/Footer';
import { ConsultationModal } from '@/components/frontend/ConsultationModal';

export default function ProjectsPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleScrollToProjects = () => {
    const el = document.getElementById('projects-gallery') || document.getElementById('projects-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="w-full bg-[#F4F0E9] min-h-screen selection:bg-[#94745F] selection:text-white relative">
      {/* Studio Navbar with Projects active */}
      <Navbar 
        activePage="projects" 
        onOpenConsultation={() => setIsConsultationOpen(true)} 
      />

      {/* 1. Our Projects Hero Section */}
      <ProjectsHeroSection onExploreProjects={handleScrollToProjects} />

      {/* 2. Dynamic Projects Gallery Section (3-column, 4:5 portrait ratio, filters, search & pagination) */}
      <div id="projects-showcase">
        <ProjectsGallerySection />
      </div>

      {/* 3. Project Consultation CTA Banner */}
      <CtaBannerSection onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* 4. Studio Footer */}
      <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* 5. Interactive Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </main>
  );
}
