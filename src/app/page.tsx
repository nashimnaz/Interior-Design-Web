'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/frontend/Navbar';
import { HeroSection } from '@/components/frontend/HeroSection';
import { ServicesSection } from '@/components/frontend/ServicesSection';
import { AboutSection } from '@/components/frontend/AboutSection';
import { SelectedWorkSection } from '@/components/frontend/SelectedWorkSection';
import { WhyChooseUsSection } from '@/components/frontend/WhyChooseUsSection';
import { OurApproachSection } from '@/components/frontend/OurApproachSection';
import { CtaBannerSection } from '@/components/frontend/CtaBannerSection';
import { Footer } from '@/components/frontend/Footer';
import { ConsultationModal } from '@/components/frontend/ConsultationModal';

export default function HomePage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleScrollToServices = () => {
    const el = document.getElementById('services');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="w-full bg-[#F7F4EE] min-h-screen selection:bg-[#C2633E] selection:text-white relative">
      {/* Editorial Studio Navbar */}
      <Navbar onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Hero Section */}
      <HeroSection
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onExploreServices={handleScrollToServices}
      />

      {/* Services Strip */}
      <ServicesSection />

      {/* About Excorto Section */}
      <AboutSection onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Selected Work / Portfolio Section */}
      <SelectedWorkSection onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Why Choose Us / Our Approach Section */}
      <WhyChooseUsSection onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Our Approach / Design Process Timeline */}
      <OurApproachSection />

      {/* Final Call to Action (CTA) Banner */}
      <CtaBannerSection onOpenConsultation={() => setIsConsultationOpen(true)} />

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
