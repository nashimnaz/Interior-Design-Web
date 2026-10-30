'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/frontend/Navbar';
import { TestimonialsHeroSection } from '@/components/frontend/TestimonialsHeroSection';
import { TestimonialsGridSection } from '@/components/frontend/TestimonialsGridSection';
import { CtaBannerSection } from '@/components/frontend/CtaBannerSection';
import { Footer } from '@/components/frontend/Footer';
import { ConsultationModal } from '@/components/frontend/ConsultationModal';

export default function TestimonialsPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleScrollToTestimonials = () => {
    const el = document.getElementById('testimonials') || document.getElementById('testimonials-showcase');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="w-full bg-[#F4F0E9] min-h-screen selection:bg-[#94745F] selection:text-white relative">
      {/* Studio Header / Navbar */}
      <Navbar 
        activePage="testimonials"
        onOpenConsultation={() => setIsConsultationOpen(true)} 
      />

      {/* 1. Testimonials Hero Section with Asymmetric Curved Living Room Composition */}
      <TestimonialsHeroSection onExploreStories={handleScrollToTestimonials} />

      {/* 2. Curated Testimonials Grid Section */}
      <div id="testimonials-showcase">
        <TestimonialsGridSection />
      </div>

      {/* 3. Consultation CTA Banner */}
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
