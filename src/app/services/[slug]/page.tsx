'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Navbar } from '@/components/frontend/Navbar';
import { Footer } from '@/components/frontend/Footer';
import { ConsultationModal } from '@/components/frontend/ConsultationModal';
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import { ServiceItem } from '@/lib/types';
import { initialServices } from '@/lib/store';

export default function DynamicServicePage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [isConsultationOpen, setIsConsultationOpen] = useState(false);
  const [service, setService] = useState<ServiceItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    
    // First check local initialServices
    const foundInitial = initialServices.find(s => s.slug === slug);
    if (foundInitial) {
      setService(foundInitial);
    }

    // Then fetch latest from API
    fetch('/api/services')
      .then(res => res.json())
      .then(data => {
        if (data.success && Array.isArray(data.data)) {
          const found = data.data.find((s: ServiceItem) => s.slug === slug);
          if (found) {
            setService(found);
          }
        }
      })
      .catch(() => {})
      .finally(() => setIsLoading(false));
  }, [slug]);

  if (!service && !isLoading) {
    return (
      <main className="w-full bg-[#F5F0E8] min-h-screen text-[#292722]">
        <Navbar activePage="services" onOpenConsultation={() => setIsConsultationOpen(true)} />
        <div className="max-w-4xl mx-auto px-6 py-32 text-center">
          <span className="text-xs uppercase tracking-widest text-[#94745F] font-semibold">404</span>
          <h1 className="font-serif text-3xl sm:text-4xl mt-3 text-[#292722]">Service Offering Not Found</h1>
          <p className="mt-4 text-sm text-[#777067]">The architectural discipline you requested does not exist or has been relocated.</p>
          <div className="mt-8">
            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#94745F] text-white text-xs uppercase tracking-widest rounded-none hover:bg-[#7E563B] transition-colors"
            >
              <ArrowLeft size={14} /> Back to All Services
            </Link>
          </div>
        </div>
        <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />
      </main>
    );
  }

  const deliverables = service?.deliverables || [];
  const features = service?.features || [];

  return (
    <main className="w-full bg-[#F5F0E8] min-h-screen text-[#292722] selection:bg-[#94745F] selection:text-white">
      <Navbar activePage="services" onOpenConsultation={() => setIsConsultationOpen(true)} />

      {/* Hero Section */}
      <section className="relative w-full pt-32 pb-20 sm:pt-40 sm:pb-28 border-b border-[#E5DDD2] bg-[#FAF7F2]">
        <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="mb-6">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-[#94745F] hover:text-[#292722] transition-colors"
            >
              <ArrowLeft size={14} />
              <span>Services Directory</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-serif text-base text-[#94745F] font-semibold">
                  {service?.number || '01'}
                </span>
                <span className="w-8 h-[1px] bg-[#94745F]" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-[#94745F]">
                  EXCORTO DISCIPLINE
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#292722] font-normal leading-[1.08] tracking-tight">
                {service?.title || 'Architectural Service'}
              </h1>

              <p className="mt-6 font-sans text-base sm:text-lg text-[#554F49] leading-relaxed max-w-2xl">
                {service?.fullDescription || service?.shortDescription}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setIsConsultationOpen(true)}
                  className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#94745F] hover:bg-[#7E563B] text-white text-xs uppercase tracking-[0.2em] font-medium transition-all shadow-sm hover:shadow"
                >
                  <span>Book Consultation</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#E5DDD2] shadow-xl">
                <Image
                  src={service?.heroImage || '/images/services/arch-card.jpg'}
                  alt={service?.title || 'Service Offering'}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deliverables & Scope of Work */}
      {deliverables.length > 0 && (
        <section className="py-20 sm:py-28 max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
          <div className="flex items-center gap-3 mb-10">
            <span className="w-6 h-[1px] bg-[#94745F]" />
            <h2 className="text-xs uppercase tracking-[0.24em] font-semibold text-[#94745F]">
              WHAT WE DELIVER
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {deliverables.map((item, index) => (
              <div
                key={index}
                className="bg-[#FAF7F2] p-6 sm:p-7 border border-[#E5DDD2] flex items-start gap-4 hover:border-[#94745F]/60 transition-colors"
              >
                <CheckCircle2 size={18} className="text-[#94745F] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[11px] font-mono text-[#94745F] font-semibold block mb-1">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  <p className="font-sans text-sm text-[#292722] font-medium leading-snug">{item}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Key Features */}
      {features.length > 0 && (
        <section className="py-16 sm:py-20 bg-[#ECE5DA] border-t border-[#DDD5C9]">
          <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
            <div className="max-w-2xl">
              <span className="text-xs uppercase tracking-[0.24em] font-semibold text-[#94745F] block mb-3">
                METHODOLOGY &amp; PRINCIPLES
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#292722] font-normal">
                Signature Approach
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mt-10">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3 p-5 bg-[#FCFAF6] border border-[#DDD5C9]">
                  <span className="w-2 h-2 rounded-full bg-[#94745F] mt-2 shrink-0" />
                  <p className="text-sm text-[#302A25] font-normal leading-relaxed">{feature}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <section className="py-20 sm:py-24 bg-[#292722] text-[#F5F2EC] text-center px-6">
        <div className="max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-widest text-[#94745F] font-semibold block mb-3">
            START YOUR PROJECT
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl text-white font-normal mb-6">
            Ready to discuss your vision?
          </h2>
          <p className="text-sm text-[#CDC4B5] mb-8 leading-relaxed">
            Connect with our lead architects and interior specialists for a personalized preliminary consultation.
          </p>
          <button
            type="button"
            onClick={() => setIsConsultationOpen(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#94745F] hover:bg-[#A6836D] text-white text-xs uppercase tracking-[0.2em] font-medium transition-colors"
          >
            <span>Book Consultation</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      <Footer onOpenConsultation={() => setIsConsultationOpen(true)} />
      <ConsultationModal isOpen={isConsultationOpen} onClose={() => setIsConsultationOpen(false)} />
    </main>
  );
}
