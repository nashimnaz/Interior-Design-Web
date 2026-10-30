'use client';

import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

export function BlogNewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState(''); // Anti-bot spam protection

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard for bots

    const trimmed = email.trim().toLowerCase();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed || !emailRegex.test(trimmed)) {
      setStatus('error');
      setMessage('Please enter a valid email address.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmed })
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setStatus('success');
        setMessage(data.message || 'Thank you for subscribing to EXCORTO Design Journal.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage(data.error || 'Unable to subscribe. Please try again.');
      }
    } catch {
      setStatus('error');
      setMessage('A connection error occurred. Please try again.');
    }
  };

  return (
    <section 
      id="newsletter"
      aria-labelledby="newsletter-heading"
      className="w-full bg-[#F4F0E9] text-[#292722] py-20 sm:py-28 lg:py-32 border-t border-[#DDD5C7] select-text relative overflow-hidden"
    >
      <div className="relative z-10 max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="max-w-[760px] mx-auto text-center">
          
          {/* Eyebrow */}
          <span className="font-sans text-[11px] sm:text-[12px] font-semibold tracking-[0.26em] uppercase text-[#94745F] mb-4 block">
            THE EXCORTO JOURNAL
          </span>

          {/* Heading: Get Design Ideas in Your Inbox. */}
          <h2 
            id="newsletter-heading"
            className="font-serif text-[#292722] text-[40px] sm:text-[52px] lg:text-[60px] leading-[1.08] tracking-[-0.015em] font-normal mb-5"
          >
            Get Design Ideas <br />
            <span className="italic text-[#94745F] font-normal">in Your Inbox.</span>
          </h2>

          {/* Description */}
          <p className="font-sans text-[15px] sm:text-[16px] leading-[1.7] text-[#554E48] mb-9 sm:mb-10 max-w-[580px] mx-auto">
            Subscribe to our blog for the latest insights, tips and inspiration from our design experts.
          </p>

          {/* Subscription Form */}
          <form onSubmit={handleSubmit} className="w-full max-w-[560px] mx-auto">
            {/* Honeypot field (hidden from humans, catches automated bots) */}
            <input 
              type="text" 
              name="company_url_hp"
              value={honeypot}
              onChange={(e) => setHoneypot(e.target.value)}
              className="hidden pointer-events-none" 
              tabIndex={-1} 
              autoComplete="off" 
            />

            <div className="flex flex-col sm:flex-row items-stretch gap-2 bg-[#FCFAF6] p-2 rounded-[6px] border border-[#DDD5C7] shadow-sm focus-within:border-[#94745F] transition-colors">
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === 'error') setStatus('idle');
                }}
                placeholder="Email Address"
                className="flex-1 px-4 py-3 bg-transparent text-[#292722] placeholder-[#9E968B] font-sans text-[14px] focus:outline-none"
                required
                disabled={status === 'loading'}
              />

              <button
                type="submit"
                disabled={status === 'loading'}
                className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-[4px] bg-[#8F5E3B] hover:bg-[#784B2B] text-white font-sans text-[11px] sm:text-[11.5px] font-medium tracking-[0.2em] uppercase transition-all duration-200 cursor-pointer disabled:opacity-70 select-none shadow-xs hover:shadow-md shrink-0"
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    <span>SUBSCRIBING...</span>
                  </>
                ) : (
                  <>
                    <span>SUBSCRIBE</span>
                    <span className="transition-transform duration-200 group-hover:translate-x-1 inline-block text-[13px]" aria-hidden="true">
                      →
                    </span>
                  </>
                )}
              </button>
            </div>

            {/* Status Messages */}
            {status === 'success' && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#E7EFE6] border border-[#BACFBA] rounded-[4px] text-[#2F5233] text-[12.5px] font-sans animate-in fade-in duration-200">
                <CheckCircle2 size={15} className="shrink-0 text-[#2F5233]" />
                <span>{message}</span>
              </div>
            )}

            {status === 'error' && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-[#FBF0EE] border border-[#E9C3BE] rounded-[4px] text-[#A33B31] text-[12.5px] font-sans animate-in fade-in duration-200">
                <AlertCircle size={15} className="shrink-0 text-[#A33B31]" />
                <span>{message}</span>
              </div>
            )}

            {/* Centered below text matching Image 1 */}
            <p className="font-sans text-[12px] sm:text-[12.5px] text-[#7A746C] mt-5 text-center w-full block">
              We respect your privacy. Unsubscribe at any time with a single click.
            </p>
          </form>

        </div>
      </div>
    </section>
  );
}
