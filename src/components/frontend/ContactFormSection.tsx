'use client';

import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Clock, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';
import { ContactContent } from '@/lib/types';

export function ContactFormSection() {
  const [contactInfo, setContactInfo] = useState<Partial<ContactContent>>({});

  useEffect(() => {
    fetch('/api/content?page=contact')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setContactInfo(data.data);
        }
      })
      .catch(() => {});
  }, []);

  const [formData, setFormData] = useState({
    clientName: '',
    email: '',
    phone: '',
    service: 'Architectural Design',
    budget: '$50,000 - $100,000',
    timeline: 'Within 3-6 Months',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.clientName.trim() || !formData.email.trim()) {
      setErrorMsg('Please enter your name and email address.');
      return;
    }

    try {
      setIsSubmitting(true);
      setErrorMsg(null);

      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: formData.clientName.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          service: formData.service,
          budget: formData.budget,
          timeline: formData.timeline,
          message: formData.message.trim() || 'Enquiry submitted via contact page hero CTA.',
        }),
      });

      if (!res.ok) throw new Error('Submission failed');

      setIsSubmitted(true);
    } catch {
      setErrorMsg('Unable to submit enquiry at this time. Please reach out to us directly by phone or email.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section 
      id="contact-form"
      className="w-full bg-[#F4F0E9] text-[#292722] py-20 sm:py-24 lg:py-28 border-t border-[#E8E1D5] select-text"
      aria-labelledby="contact-form-heading"
    >
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* =====================================================================
              LEFT COLUMN: STUDIO DETAILS & EDITORIAL INTRO (5 cols)
              ===================================================================== */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="font-sans text-[11px] sm:text-[11.5px] font-semibold tracking-[0.24em] uppercase text-[#94745F] mb-3 block">
                DIRECT ENQUIRIES
              </span>
              <h2 
                id="contact-form-heading"
                className="font-serif text-[#292722] text-[32px] sm:text-[38px] lg:text-[42px] leading-[1.12] tracking-[-0.015em] font-normal mb-5 whitespace-pre-line"
              >
                {contactInfo.heading ? (
                  contactInfo.heading
                ) : (
                  <>
                    Let&apos;s build something <br className="hidden sm:inline" />
                    <span className="italic text-[#94745F]">extraordinary</span> together.
                  </>
                )}
              </h2>
              <p className="font-sans text-[14px] sm:text-[15px] leading-[1.72] text-[#554E48] mb-10 max-w-[460px]">
                {contactInfo.description || 'Every project begins with a conversation. Visit our architectural studio in Thiruvananthapuram or fill out the enquiry form to schedule your initial consultation.'}
              </p>

              {/* Contact Details List */}
              <div className="space-y-6 pt-4 border-t border-[#E2D8CA]/80">
                
                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#E8E0D2] flex items-center justify-center shrink-0 mt-0.5 text-[#94745F]">
                    <MapPin size={15} />
                  </div>
                  <div>
                    <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#78716A]">Studio Address</h3>
                    <p className="font-sans text-[13.5px] text-[#292722] mt-0.5 leading-relaxed whitespace-pre-line">
                      {contactInfo.address || 'TC 15/1982, Kowdiar Main Avenue,\nThiruvananthapuram, Kerala 695003'}
                    </p>
                  </div>
                </div>

                {/* Telephone */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#E8E0D2] flex items-center justify-center shrink-0 mt-0.5 text-[#94745F]">
                    <Phone size={15} />
                  </div>
                  <div>
                    <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#78716A]">Telephone</h3>
                    <p className="font-sans text-[13.5px] text-[#292722] mt-0.5">
                      <a href={`tel:${(contactInfo.phone || '+91 94470 12345').replace(/\s+/g, '')}`} className="hover:text-[#94745F] transition-colors">
                        {contactInfo.phone || '+91 94470 12345'}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#E8E0D2] flex items-center justify-center shrink-0 mt-0.5 text-[#94745F]">
                    <Mail size={15} />
                  </div>
                  <div>
                    <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#78716A]">Email</h3>
                    <p className="font-sans text-[13.5px] text-[#292722] mt-0.5">
                      <a href={`mailto:${contactInfo.email || 'info@excortobuilders.com'}`} className="hover:text-[#94745F] transition-colors">
                        {contactInfo.email || 'info@excortobuilders.com'}
                      </a>
                    </p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-[#E8E0D2] flex items-center justify-center shrink-0 mt-0.5 text-[#94745F]">
                    <Clock size={15} />
                  </div>
                  <div>
                    <h3 className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#78716A]">Office Hours</h3>
                    <p className="font-sans text-[13.5px] text-[#292722] mt-0.5 whitespace-pre-line">
                      {contactInfo.businessHours || 'Monday – Saturday: 9:00 AM – 6:30 PM\nSunday: By Appointment'}
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* =====================================================================
              RIGHT COLUMN: EDITORIAL ENQUIRY FORM (7 cols)
              ===================================================================== */}
          <div className="lg:col-span-7 bg-[#FCFAF4] border border-[#E5DFD4] p-8 sm:p-10 lg:p-12 shadow-xs">
            {isSubmitted ? (
              <div className="py-12 sm:py-16 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-[#94745F]/12 text-[#94745F] flex items-center justify-center mb-5">
                  <CheckCircle2 size={30} />
                </div>
                <h3 className="font-serif text-[26px] sm:text-[30px] font-normal text-[#292722] mb-3">
                  Thank You, {formData.clientName}.
                </h3>
                <p className="font-sans text-[14px] text-[#554E48] max-w-[420px] mb-8 leading-relaxed">
                  Your project enquiry has been received. Our architectural consulting team will review your requirements and reach out within 24 hours.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({
                      clientName: '',
                      email: '',
                      phone: '',
                      service: 'Architectural Design',
                      budget: '$50,000 - $100,000',
                      timeline: 'Within 3-6 Months',
                      message: '',
                    });
                  }}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#292722]/30 hover:border-[#292722] text-[#292722] font-sans text-[11px] tracking-[0.18em] uppercase transition-colors"
                >
                  Submit Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <span className="font-sans text-[10.5px] sm:text-[11px] font-semibold tracking-[0.2em] uppercase text-[#94745F] block mb-1">
                    START A PROJECT
                  </span>
                  <h3 className="font-serif text-[22px] sm:text-[24px] font-normal text-[#292722]">
                    Tell Us About Your Space
                  </h3>
                </div>

                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-sm">
                    {errorMsg}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#554E48] mb-1.5">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      name="clientName"
                      required
                      value={formData.clientName}
                      onChange={handleChange}
                      placeholder="e.g. Rahul Menon"
                      className="w-full bg-[#F4F0E9]/60 border border-[#DDD5C7] focus:border-[#292722] px-4 py-3 text-[13.5px] text-[#292722] placeholder-[#9E988F] outline-none transition-colors"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#554E48] mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="e.g. rahul@example.com"
                      className="w-full bg-[#F4F0E9]/60 border border-[#DDD5C7] focus:border-[#292722] px-4 py-3 text-[13.5px] text-[#292722] placeholder-[#9E988F] outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone */}
                  <div>
                    <label className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#554E48] mb-1.5">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#F4F0E9]/60 border border-[#DDD5C7] focus:border-[#292722] px-4 py-3 text-[13.5px] text-[#292722] placeholder-[#9E988F] outline-none transition-colors"
                    />
                  </div>

                  {/* Service Needed */}
                  <div>
                    <label className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#554E48] mb-1.5">
                      Service Needed
                    </label>
                    <select
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full bg-[#F4F0E9]/60 border border-[#DDD5C7] focus:border-[#292722] px-4 py-3 text-[13.5px] text-[#292722] outline-none transition-colors cursor-pointer"
                    >
                      <option value="Architectural Design">Architectural Design</option>
                      <option value="Interior Designing">Interior Designing</option>
                      <option value="Interior Installation">Interior Installation</option>
                      <option value="Complete Turnkey Build">Complete Turnkey Build</option>
                      <option value="Consultation">Consultation &amp; Feasibility</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Approximate Budget */}
                  <div>
                    <label className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#554E48] mb-1.5">
                      Target Budget
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full bg-[#F4F0E9]/60 border border-[#DDD5C7] focus:border-[#292722] px-4 py-3 text-[13.5px] text-[#292722] outline-none transition-colors cursor-pointer"
                    >
                      <option value="$25,000 - $50,000">₹25L – ₹50L ($30k – $60k)</option>
                      <option value="$50,000 - $100,000">₹50L – ₹1 Cr ($60k – $120k)</option>
                      <option value="$100,000 - $250,000">₹1 Cr – ₹2.5 Cr ($120k – $300k)</option>
                      <option value="$250,000+">₹2.5 Cr+ (Luxury Estate)</option>
                    </select>
                  </div>

                  {/* Timeline */}
                  <div>
                    <label className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#554E48] mb-1.5">
                      Expected Timeline
                    </label>
                    <select
                      name="timeline"
                      value={formData.timeline}
                      onChange={handleChange}
                      className="w-full bg-[#F4F0E9]/60 border border-[#DDD5C7] focus:border-[#292722] px-4 py-3 text-[13.5px] text-[#292722] outline-none transition-colors cursor-pointer"
                    >
                      <option value="Immediately">Immediate (Within 1 Month)</option>
                      <option value="Within 3-6 Months">Within 3–6 Months</option>
                      <option value="Within 6-12 Months">Within 6–12 Months</option>
                      <option value="Planning Phase">Planning Phase / Flexible</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block font-sans text-[11px] font-semibold uppercase tracking-[0.16em] text-[#554E48] mb-1.5">
                    Project Details &amp; Vision
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about the property, location, key requirements or questions you have..."
                    className="w-full bg-[#F4F0E9]/60 border border-[#DDD5C7] focus:border-[#292722] px-4 py-3 text-[13.5px] text-[#292722] placeholder-[#9E988F] outline-none transition-colors resize-y"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#292722] hover:bg-[#94745F] text-[#FAF8F5] font-sans text-[11.5px] font-medium tracking-[0.2em] uppercase transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group active:scale-98"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        <span>SENDING ENQUIRY...</span>
                      </>
                    ) : (
                      <>
                        <span>SEND PROJECT ENQUIRY</span>
                        <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
