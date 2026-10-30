'use client';

import React, { useState, useEffect } from 'react';
import { 
  Bell, 
  Menu, 
  Moon, 
  Sun, 
  ChevronDown, 
  User, 
  LogOut 
} from 'lucide-react';
import { ActiveTab } from './Sidebar';
import { Enquiry } from '@/lib/types';
import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
  activeTab: ActiveTab;
  onOpenMobileMenu: () => void;
  enquiries: Enquiry[];
  onSelectEnquiry: (enquiry: Enquiry) => void;
  setActiveTab: (tab: ActiveTab) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onOpenMobileMenu,
  enquiries,
  onSelectEnquiry,
  setActiveTab
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { resolvedTheme, toggleTheme } = useTheme();
  const isDarkMode = resolvedTheme === 'dark';

  const getPageTitle = (tab?: ActiveTab) => {
    switch (tab) {
      case 'overview':
        return { title: 'Studio Overview', category: 'Workspace' };
      case 'blogs':
        return { title: 'Editorial Journal', category: 'Articles' };
      case 'projects':
        return { title: 'Projects & Gallery', category: 'Portfolio' };
      case 'testimonials':
        return { title: 'Client Endorsements', category: 'Testimonials' };
      case 'enquiries':
        return { title: 'Client Enquiries', category: 'Consultations' };
      case 'services':
        return { title: 'Studio Services', category: 'Offerings' };
      case 'pages':
        return { title: 'Page Content & Copy', category: 'Website CMS' };
      case 'settings':
        return { title: 'Studio Settings', category: 'Configuration' };
      default:
        return { title: 'Studio Overview', category: 'Workspace' };
    }
  };

  const { title } = getPageTitle(activeTab);
  const newEnquiries = enquiries.filter(e => e.status === 'New');

  return (
    <header className="sticky top-0 z-30 h-16 bg-[#FCFAF6] dark:bg-[#2E2D27] border-b border-[#DDD5C9] dark:border-[#3E3C33] px-8 lg:px-12 flex items-center justify-between transition-colors">
      {/* Left: Mobile trigger & Restrained Page Title */}
      <div className="flex items-center gap-4 pl-3 lg:pl-6">
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-1.5 rounded text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25] dark:hover:text-[#F4EFE5]"
          title="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-lg lg:text-xl font-serif text-[#302A25] dark:text-[#F4EFE5] tracking-tight">
            {title}
          </h1>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2">
        {/* Minimal Theme Switch */}
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-md flex items-center justify-center text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25] dark:hover:text-[#F4EFE5] hover:bg-[#EBE5DA] dark:hover:bg-[#38362F] transition-all border border-transparent hover:border-[#DDD5C9] dark:hover:border-[#3E3C33]"
          title={isDarkMode ? 'Switch to Warm Atelier (Light Mode)' : 'Switch to Midnight Studio (Dark Mode)'}
          aria-label={isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDarkMode ? (
            <Sun className="w-4 h-4 text-[#8E9177] transition-transform duration-200" />
          ) : (
            <Moon className="w-4 h-4 text-[#777067] transition-transform duration-200" />
          )}
        </button>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="w-8 h-8 rounded flex items-center justify-center text-[#777067] dark:text-[#B6AEA1] hover:text-[#302A25] dark:hover:text-[#F4EFE5] hover:bg-[#EBE5DA] dark:hover:bg-[#38362F] relative transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {newEnquiries.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-[#777963] dark:bg-[#8E9177]" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-[#FCFAF6] dark:bg-[#2E2D27] rounded-md shadow-sm border border-[#DDD5C9] dark:border-[#3E3C33] p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-[#DDD5C9] dark:border-[#3E3C33]">
                <span className="font-medium text-xs text-[#302A25] dark:text-[#F4EFE5]">Recent Inquiries</span>
                <span className="text-[11px] font-medium text-[#777963] dark:text-[#8E9177]">
                  {newEnquiries.length} New
                </span>
              </div>

              <div className="divide-y divide-[#DDD5C9] dark:divide-[#3E3C33] max-h-64 overflow-y-auto mt-1">
                {enquiries.slice(0, 4).map((enq) => (
                  <div 
                    key={enq.id}
                    onClick={() => {
                      onSelectEnquiry(enq);
                      setShowNotifications(false);
                    }}
                    className="py-2 px-1 hover:bg-[#EBE5DA]/50 dark:hover:bg-[#38362F]/50 rounded cursor-pointer transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-[#302A25] dark:text-[#F4EFE5]">{enq.clientName}</span>
                      <span className="text-[10px] text-[#777067] dark:text-[#B6AEA1]">
                        {new Date(enq.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#777963] dark:text-[#8E9177] mt-0.5">{enq.service}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Minimal Profile Chip */}
        <div className="relative ml-1">
          <button
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 px-2 py-1 rounded border border-[#DDD5C9] dark:border-[#3E3C33] bg-[#FCFAF6] dark:bg-[#2E2D27] hover:bg-[#EBE5DA] dark:hover:bg-[#38362F] transition-colors"
          >
            <span className="w-5 h-5 rounded bg-[#302A25] dark:bg-[#F4EFE5] text-[#F5F1E9] dark:text-[#24241F] text-[10px] font-medium flex items-center justify-center">
              CD
            </span>
            <span className="text-xs text-[#302A25] dark:text-[#F4EFE5] hidden sm:inline">
              Clara Delacroix
            </span>
            <ChevronDown className="w-3 h-3 text-[#777067] dark:text-[#B6AEA1]" />
          </button>

          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-[#FCFAF6] dark:bg-[#2E2D27] rounded-md shadow-sm border border-[#DDD5C9] dark:border-[#3E3C33] p-1.5 z-50">
              <div className="px-2.5 py-1.5 border-b border-[#DDD5C9] dark:border-[#3E3C33] mb-1">
                <p className="text-xs font-medium text-[#302A25] dark:text-[#F4EFE5]">Clara Delacroix</p>
                <p className="text-[10px] text-[#777067] dark:text-[#B6AEA1]">Principal Director</p>
              </div>
              <button 
                onClick={() => {
                  setActiveTab('settings');
                  setShowProfileMenu(false);
                }}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#302A25] dark:text-[#F4EFE5] hover:bg-[#EBE5DA] dark:hover:bg-[#38362F] rounded text-left transition-colors"
              >
                <User className="w-3.5 h-3.5 text-[#777067]" />
                <span>Studio Settings</span>
              </button>
              <button 
                onClick={() => setShowProfileMenu(false)}
                className="w-full flex items-center gap-2 px-2.5 py-1.5 text-xs text-[#777067] dark:text-[#B6AEA1] hover:bg-[#EBE5DA] dark:hover:bg-[#38362F] rounded text-left transition-colors mt-0.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
