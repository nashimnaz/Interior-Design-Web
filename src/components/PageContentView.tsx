'use client';

import React, { useState, useEffect } from 'react';
import { PageContent } from '@/lib/types';
import { initialPageContent } from '@/lib/store';
import { ImageUploadZone } from './ImageUploadZone';
import { Save, Check, RefreshCw, Home, Info, Phone, MapPin } from 'lucide-react';

interface PageContentViewProps {
  onShowToast: (msg: string) => void;
}

export const PageContentView: React.FC<PageContentViewProps> = ({ onShowToast }) => {
  const [activeSubTab, setActiveSubTab] = useState<'home' | 'contact'>('home');
  const [content, setContent] = useState<PageContent>(initialPageContent);
  const [isSaving, setIsSaving] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.data) {
          setContent(data.data);
          setHasLoaded(true);
        }
      })
      .catch((err) => {
        console.warn('Could not load content from API:', err);
      });
  }, []);

  const handleSave = async () => {
    try {
      setIsSaving(true);
      const res = await fetch('/api/content', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(content),
      });

      if (!res.ok) throw new Error('Save failed');
      onShowToast('Page content updated successfully!');
    } catch {
      onShowToast('Failed to save content');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-6 max-w-5xl select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-[#DDD5C9] dark:border-[#3E3C33]">
        <div>
          <h2 className="text-2xl font-serif font-normal text-[#302A25] dark:text-[#F4EFE5] tracking-tight">
            Page Content Management
          </h2>
          <p className="text-xs text-[#777067] dark:text-[#B6AEA1] mt-0.5">
            Dynamically customize public Homepage and Contact page text, imagery, and studio touchpoints.
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary flex items-center gap-1.5 self-start sm:self-auto cursor-pointer"
        >
          {isSaving ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
          <span>{isSaving ? 'Saving...' : 'Save Changes'}</span>
        </button>
      </div>

      {/* Subtabs for Pages */}
      <div className="flex items-center gap-2 border-b border-[#DDD5C9] dark:border-[#3E3C33] pb-2">
        <button
          type="button"
          onClick={() => setActiveSubTab('home')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
            activeSubTab === 'home'
              ? 'bg-[#302A25] dark:bg-[#F4EFE5] text-[#FCFAF6] dark:text-[#24241F]'
              : 'text-[#777067] dark:text-[#B6AEA1] hover:bg-[#EBE5DA]/50'
          }`}
        >
          <Home size={14} />
          <span>Homepage Hero &amp; Media</span>
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab('contact')}
          className={`flex items-center gap-2 px-3.5 py-1.5 rounded-md text-xs font-medium transition-all cursor-pointer ${
            activeSubTab === 'contact'
              ? 'bg-[#302A25] dark:bg-[#F4EFE5] text-[#FCFAF6] dark:text-[#24241F]'
              : 'text-[#777067] dark:text-[#B6AEA1] hover:bg-[#EBE5DA]/50'
          }`}
        >
          <Phone size={14} />
          <span>Contact Page &amp; Studio Info</span>
        </button>
      </div>

      {/* =====================================================================
          1. HOMEPAGE TAB
          ===================================================================== */}
      {activeSubTab === 'home' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Hero Section Card */}
          <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md p-5 space-y-4">
            <h3 className="font-serif text-base text-[#302A25] dark:text-[#F4EFE5] border-b border-[#DDD5C9]/60 pb-2">
              Homepage Hero Section
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Hero Eyebrow Tag
                </label>
                <input
                  type="text"
                  value={content.home?.heroEyebrow || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: { ...content.home, heroEyebrow: e.target.value },
                    })
                  }
                  className="w-full studio-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={content.home?.heroCtaText || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: { ...content.home, heroCtaText: e.target.value },
                    })
                  }
                  className="w-full studio-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Headline Line 1
                </label>
                <input
                  type="text"
                  value={content.home?.heroHeadlineLine1 || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: { ...content.home, heroHeadlineLine1: e.target.value },
                    })
                  }
                  className="w-full studio-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Headline Highlighted Accent
                </label>
                <input
                  type="text"
                  value={content.home?.heroHeadlineHighlight || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: { ...content.home, heroHeadlineHighlight: e.target.value },
                    })
                  }
                  className="w-full studio-input text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Hero Sub-Description
                </label>
                <textarea
                  rows={2}
                  value={content.home?.heroDescription || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      home: { ...content.home, heroDescription: e.target.value },
                    })
                  }
                  className="w-full studio-input text-xs"
                />
              </div>

              {/* Hero Image Desktop (wide ratio) */}
              <div>
                <ImageUploadZone
                  value={content.home?.heroImageDesktop || ''}
                  onChange={(url) =>
                    setContent({
                      ...content,
                      home: { ...content.home, heroImageDesktop: url },
                    })
                  }
                  aspectRatio="16:9"
                  label="Hero Background (Desktop & Tablet)"
                  recommendedText="Wide 16:9 Landscape"
                />
              </div>

              {/* Hero Image Mobile (portrait) */}
              <div>
                <ImageUploadZone
                  value={content.home?.heroImageMobile || ''}
                  onChange={(url) =>
                    setContent({
                      ...content,
                      home: { ...content.home, heroImageMobile: url },
                    })
                  }
                  aspectRatio="4:5"
                  label="Hero Background (Mobile)"
                  recommendedText="Portrait 9:16 or 4:5"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          2. CONTACT PAGE TAB
          ===================================================================== */}
      {activeSubTab === 'contact' && (
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md p-5 space-y-4">
            <h3 className="font-serif text-base text-[#302A25] dark:text-[#F4EFE5] border-b border-[#DDD5C9]/60 pb-2">
              Studio Contact Details &amp; Location
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  value={content.contact?.email || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: { ...content.contact, email: e.target.value },
                    })
                  }
                  className="w-full studio-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Contact Phone
                </label>
                <input
                  type="text"
                  value={content.contact?.phone || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: { ...content.contact, phone: e.target.value },
                    })
                  }
                  className="w-full studio-input text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Studio Address
                </label>
                <input
                  type="text"
                  value={content.contact?.address || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: { ...content.contact, address: e.target.value },
                    })
                  }
                  className="w-full studio-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Business Hours
                </label>
                <input
                  type="text"
                  value={content.contact?.businessHours || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: { ...content.contact, businessHours: e.target.value },
                    })
                  }
                  className="w-full studio-input text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Google Maps URL
                </label>
                <input
                  type="text"
                  value={content.contact?.mapsUrl || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: { ...content.contact, mapsUrl: e.target.value },
                    })
                  }
                  className="w-full studio-input text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Contact Form Main Heading
                </label>
                <input
                  type="text"
                  value={content.contact?.heading || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: { ...content.contact, heading: e.target.value },
                    })
                  }
                  className="w-full studio-input text-xs"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] mb-1">
                  Contact Description
                </label>
                <textarea
                  rows={2}
                  value={content.contact?.description || ''}
                  onChange={(e) =>
                    setContent({
                      ...content,
                      contact: { ...content.contact, description: e.target.value },
                    })
                  }
                  className="w-full studio-input text-xs"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
