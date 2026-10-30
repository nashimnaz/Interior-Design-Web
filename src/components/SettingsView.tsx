'use client';

import React, { useState } from 'react';
import { 
  Building2, 
  Mail, 
  Phone, 
  Globe, 
  Share2, 
  Save, 
  Check, 
  Bell,
  Sun,
  Moon,
  Laptop
} from 'lucide-react';
import { SiteSetting } from '@/lib/types';
import { useTheme, Theme } from '@/context/ThemeContext';

interface SettingsViewProps {
  settings: SiteSetting;
  onSaveSettings: (updated: SiteSetting) => void;
}

export const SettingsView: React.FC<SettingsViewProps> = ({
  settings,
  onSaveSettings
}) => {
  const { theme, setTheme } = useTheme();
  const [formData, setFormData] = useState<SiteSetting>({ ...settings });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveSettings(formData);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-4 border-b border-[#DDD5C9] dark:border-[#3E3C33]">
        <div>
          <h2 className="text-2xl font-serif font-normal text-[#302A25] dark:text-[#F4EFE5] tracking-tight">
            Studio Configurations
          </h2>
          <p className="text-xs text-[#777067] dark:text-[#B6AEA1] mt-0.5">
            Brand identity, physical studio coordinates, concierge communication, and preferences.
          </p>
        </div>

        {savedSuccess && (
          <div className="flex items-center gap-1.5 px-3 py-1 rounded bg-[#EBE5DA] dark:bg-[#38362F] text-[#777963] dark:text-[#8E9177] text-xs font-medium border border-[#DDD5C9] dark:border-[#3E3C33]">
            <Check className="w-3.5 h-3.5" />
            <span>Settings saved</span>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Studio Identity Card */}
        <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md p-6">
          <div className="pb-3 border-b border-[#DDD5C9] dark:border-[#3E3C33] mb-4">
            <h3 className="text-sm font-medium text-[#302A25] dark:text-[#F4EFE5]">Studio Brand Identity</h3>
            <p className="text-[11px] text-[#777067] dark:text-[#B6AEA1]">Parameters displayed across client invoices and editorial features</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-[#302A25] dark:text-[#F4EFE5] mb-1">
                Studio Trade Name
              </label>
              <input
                type="text"
                value={formData.studioName}
                onChange={(e) => setFormData({ ...formData, studioName: e.target.value })}
                className="w-full studio-input"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-[#302A25] dark:text-[#F4EFE5] mb-1">
                Atelier Tagline
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full studio-input"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-[#302A25] dark:text-[#F4EFE5] mb-1">
                Concierge Contact Email
              </label>
              <input
                type="email"
                value={formData.contactEmail}
                onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                className="w-full studio-input"
                required
              />
            </div>

            <div>
              <label className="block text-xs text-[#302A25] dark:text-[#F4EFE5] mb-1">
                Studio Direct Telephone
              </label>
              <input
                type="text"
                value={formData.contactPhone}
                onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                className="w-full studio-input"
                required
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-xs text-[#302A25] dark:text-[#F4EFE5] mb-1">
                Principal Studio Address
              </label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full studio-input"
                required
              />
            </div>
          </div>
        </div>

        {/* Social Presence & Currency */}
        <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md p-6">
          <div className="pb-3 border-b border-[#DDD5C9] dark:border-[#3E3C33] mb-4">
            <h3 className="text-sm font-medium text-[#302A25] dark:text-[#F4EFE5]">Channels & Currency</h3>
            <p className="text-[11px] text-[#777067] dark:text-[#B6AEA1]">Public studio presence and project accounting currency</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-[#302A25] dark:text-[#F4EFE5] mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                value={formData.instagram}
                onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
                className="w-full studio-input"
              />
            </div>

            <div>
              <label className="block text-xs text-[#302A25] dark:text-[#F4EFE5] mb-1">
                LinkedIn Company Page
              </label>
              <input
                type="url"
                value={formData.linkedin}
                onChange={(e) => setFormData({ ...formData, linkedin: e.target.value })}
                className="w-full studio-input"
              />
            </div>

            <div>
              <label className="block text-xs text-[#302A25] dark:text-[#F4EFE5] mb-1">
                Default Currency
              </label>
              <select
                value={formData.defaultCurrency}
                onChange={(e) => setFormData({ ...formData, defaultCurrency: e.target.value })}
                className="w-full studio-input"
              >
                <option value="USD ($)">USD ($)</option>
                <option value="EUR (€)">EUR (€)</option>
                <option value="GBP (£)">GBP (£)</option>
                <option value="CHF">CHF</option>
              </select>
            </div>
          </div>
        </div>

        {/* Public Notice Banner & Notifications */}
        <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md p-6">
          <div className="pb-3 border-b border-[#DDD5C9] dark:border-[#3E3C33] mb-4">
            <h3 className="text-sm font-medium text-[#302A25] dark:text-[#F4EFE5]">Public Notice & Lead Alerts</h3>
            <p className="text-[11px] text-[#777067] dark:text-[#B6AEA1]">Announcement message and lead notification rules</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs text-[#302A25] dark:text-[#F4EFE5] mb-1">
                Public Announcement Banner Text
              </label>
              <input
                type="text"
                value={formData.featuredNotice || ''}
                onChange={(e) => setFormData({ ...formData, featuredNotice: e.target.value })}
                className="w-full studio-input"
              />
            </div>

            <div className="flex items-center justify-between p-3 rounded bg-[#F5F1E9] dark:bg-[#24241F] border border-[#DDD5C9] dark:border-[#3E3C33]">
              <div>
                <span className="text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] block">
                  Lead Dispatch Notification
                </span>
                <span className="text-[11px] text-[#777067] dark:text-[#B6AEA1]">
                  Email design partners immediately when a new consultation request is submitted.
                </span>
              </div>
              <input
                type="checkbox"
                checked={formData.autoNotifyEnquiries}
                onChange={(e) => setFormData({ ...formData, autoNotifyEnquiries: e.target.checked })}
                className="w-4 h-4 text-[#777963] rounded border-[#DDD5C9] focus:ring-[#777963]"
              />
            </div>
          </div>
        </div>

        {/* Studio Workspace Theme */}
        <div className="bg-[#FCFAF6] dark:bg-[#2E2D27] border border-[#DDD5C9] dark:border-[#3E3C33] rounded-md p-6">
          <div className="pb-3 border-b border-[#DDD5C9] dark:border-[#3E3C33] mb-4">
            <h3 className="text-sm font-medium text-[#302A25] dark:text-[#F4EFE5]">Atelier Visual Theme</h3>
            <p className="text-[11px] text-[#777067] dark:text-[#B6AEA1]">Choose your preferred workspace aesthetic palette</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Light Mode */}
            <button
              type="button"
              onClick={() => setTheme('light')}
              className={`p-3.5 rounded border text-left transition-all flex flex-col justify-between ${
                theme === 'light'
                  ? 'border-[#777963] dark:border-[#8E9177] bg-[#EBE5DA]/60 dark:bg-[#38362F]/60 ring-1 ring-[#777963] dark:ring-[#8E9177]'
                  : 'border-[#DDD5C9] dark:border-[#3E3C33] bg-[#FCFAF6] dark:bg-[#2E2D27] hover:border-[#777963]/50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Sun className="w-4 h-4 text-[#777963]" />
                {theme === 'light' && (
                  <span className="w-2 h-2 rounded-full bg-[#777963]" />
                )}
              </div>
              <div>
                <span className="text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] block">
                  Warm Atelier
                </span>
                <span className="text-[10.5px] text-[#777067] dark:text-[#B6AEA1] block mt-0.5">
                  Natural chalk, ivory, and soft espresso
                </span>
              </div>
            </button>

            {/* Dark Mode */}
            <button
              type="button"
              onClick={() => setTheme('dark')}
              className={`p-3.5 rounded border text-left transition-all flex flex-col justify-between ${
                theme === 'dark'
                  ? 'border-[#777963] dark:border-[#8E9177] bg-[#EBE5DA]/60 dark:bg-[#38362F]/60 ring-1 ring-[#777963] dark:ring-[#8E9177]'
                  : 'border-[#DDD5C9] dark:border-[#3E3C33] bg-[#FCFAF6] dark:bg-[#2E2D27] hover:border-[#777963]/50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Moon className="w-4 h-4 text-[#8E9177]" />
                {theme === 'dark' && (
                  <span className="w-2 h-2 rounded-full bg-[#8E9177]" />
                )}
              </div>
              <div>
                <span className="text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] block">
                  Midnight Studio
                </span>
                <span className="text-[10.5px] text-[#777067] dark:text-[#B6AEA1] block mt-0.5">
                  Deep charcoal, slate stone, and muted olive
                </span>
              </div>
            </button>

            {/* System Default */}
            <button
              type="button"
              onClick={() => setTheme('system')}
              className={`p-3.5 rounded border text-left transition-all flex flex-col justify-between ${
                theme === 'system'
                  ? 'border-[#777963] dark:border-[#8E9177] bg-[#EBE5DA]/60 dark:bg-[#38362F]/60 ring-1 ring-[#777963] dark:ring-[#8E9177]'
                  : 'border-[#DDD5C9] dark:border-[#3E3C33] bg-[#FCFAF6] dark:bg-[#2E2D27] hover:border-[#777963]/50'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <Laptop className="w-4 h-4 text-[#777067] dark:text-[#B6AEA1]" />
                {theme === 'system' && (
                  <span className="w-2 h-2 rounded-full bg-[#777963] dark:bg-[#8E9177]" />
                )}
              </div>
              <div>
                <span className="text-xs font-medium text-[#302A25] dark:text-[#F4EFE5] block">
                  System Synchronized
                </span>
                <span className="text-[10.5px] text-[#777067] dark:text-[#B6AEA1] block mt-0.5">
                  Follows your operating system theme
                </span>
              </div>
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex items-center justify-end pt-2">
          <button
            type="submit"
            className="btn-primary flex items-center gap-1.5"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
};
