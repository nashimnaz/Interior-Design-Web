'use client';

import React, { useState } from 'react';
import { Navbar } from '@/components/frontend/Navbar';
import { ContactHeroSection } from '@/components/frontend/ContactHeroSection';
import { ContactFormSection } from '@/components/frontend/ContactFormSection';
import { Footer } from '@/components/frontend/Footer';
import { ConsultationModal } from '@/components/frontend/ConsultationModal';

export default function ContactPage() {
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);

  const handleScrollToForm = () => {
    const el = document.getElementById('contact-form');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <main className="w-full bg-[#F4F0E9] min-h-screen selection:bg-[#94745F] selection:text-white relative">
      {/* Studio Navbar with Contact visibly active */}
      <Navbar 
        activePage="contact" 
        onOpenConsultation={() => setIsConsultationOpen(true)} 
      />

      {/* 1. Contact Page Hero Section with Full-Screen Landscape Consultation Background */}
      <ContactHeroSection onDiscussProject={handleScrollToForm} />

      {/* 2. Direct Studio Details & Interactive Project Enquiry Form */}
      <ContactFormSection />

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
