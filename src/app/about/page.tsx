'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/frontend/Navbar';
import { AboutHeroSection } from '@/components/frontend/AboutHeroSection';
import { AboutStorySection } from '@/components/frontend/AboutStorySection';
import { AboutProcessSection } from '@/components/frontend/AboutProcessSection';
import { AboutWhyChooseSection } from '@/components/frontend/AboutWhyChooseSection';
import { Footer } from '@/components/frontend/Footer';
import { ConsultationModal } from '@/components/frontend/ConsultationModal';

export default function AboutPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  return (
    <main className="w-full bg-[#F7F4EE] min-h-screen selection:bg-[#C2633E] selection:text-white relative">
      {/* Editorial Studio Navbar with About visibly active */}
      <Navbar 
        activePage="about" 
        onOpenConsultation={() => setIsConsultationOpen(true)} 
      />

      {/* 1. About Page Hero Section */}
      <AboutHeroSection />

      {/* 2. Philosophy & Story Section with Sliding Scandinavian Dining Interior */}
      <AboutStorySection />

      {/* 3. Our Approach / 4-Step Process Section: From Vision to Reality */}
      <AboutProcessSection />

      {/* 4. Why Choose Excorto Section with Organic Cutout Visual Composition */}
      <AboutWhyChooseSection 
        onOpenConsultation={() => setIsConsultationOpen(true)} 
      />

      {/* Studio Footer */}
      <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Consultation Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />
    </main>
  );
}
