'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/frontend/Navbar';
import { ServicesHeroSection } from '@/components/frontend/ServicesHeroSection';
import { ServicesOverviewGrid } from '@/components/frontend/ServicesOverviewGrid';
import { CtaBannerSection } from '@/components/frontend/CtaBannerSection';
import { Footer } from '@/components/frontend/Footer';
import { ConsultationModal } from '@/components/frontend/ConsultationModal';

export default function ServicesPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <main className="w-full bg-[#F5F0E8] min-h-screen selection:bg-[#94745F] selection:text-white relative">
      {/* Editorial Studio Navbar with Services active */}
      <Navbar 
        activePage="services" 
        onOpenConsultation={() => setIsConsultationOpen(true)} 
      />

      {/* 1. Services Page Split Hero Section with Organic Curved Cutout */}
      <ServicesHeroSection 
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* 2. Four-Card Editorial Services Overview Section */}
      <ServicesOverviewGrid 
        onOpenConsultation={() => setIsConsultationOpen(true)}
      />

      {/* Consultation Call to Action Banner */}
      <CtaBannerSection onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Studio Footer */}
      <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Interactive Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </main>
  );
}
